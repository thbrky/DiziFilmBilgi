import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link bileşenini ekliyoruz
import Header from "./pages/components/Header";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";

function Anasayfa() {
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993";
    const topMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=1`;
    const topSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=tr-TR&page=1`;

    axios
      .get(topMoviesUrl)
      .then((response) => {
        setTopMovies(response.data.results.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching top movies:", error);
      });

    axios
      .get(topSeriesUrl)
      .then((response) => {
        setTopSeries(response.data.results.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching top series:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Box bg={"#020202"}>
        <Flex direction="column" alignItems="center">
          <section>
            <Heading
              flex={1}
              textAlign={"center"}
              as="h2"
              mt={2}
              mb={6}
              color={"#ECC94B"}
              fontWeight={"200"}
            >
              En İyi 10 Film
            </Heading>

            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {topMovies.map((movie) => (
                <GridItem
                  key={movie.id}
                  position="relative"
                  onMouseOver={(e) =>
                    (e.currentTarget.childNodes[0].style.filter = "blur(4px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.childNodes[0].style.filter = "none")
                  }
                >
                  <Link to={`/movies/${movie.id}`}>
                    {" "}
                    {/* Link bileşeni eklendi */}
                    <Image
                      width={"250px"}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bg="rgba(0, 0, 0, 0.6)"
                      color="#ECC94B"
                      p={1}
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        textAlign={"center"}
                        flex={1}
                      >
                        {movie.title}
                      </Text>
                      <Text
                        textAlign={"center"}
                        flex={1}
                        fontSize="xs"
                      >{`Yıl: ${movie.release_date.split("-")[0]}, IMDb: ${
                        movie.vote_average
                      }`}</Text>
                    </Box>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </section>
          <Divider
            height={"50px"}
            mb={12}
            mt={12}
            borderColor={"#ECC94B"}
          ></Divider>
          <section mt={6}>
            <Heading
              flex={1}
              textAlign={"center"}
              as="h2"
              mb={6}
              color={"#ECC94B"}
              fontWeight={"200"}
            >
              En İyi 10 Dizi
            </Heading>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {topSeries.map((series) => (
                <GridItem
                  key={series.id}
                  position="relative"
                  onMouseOver={(e) =>
                    (e.currentTarget.childNodes[0].style.filter = "blur(4px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.childNodes[0].style.filter = "none")
                  }
                >
                  <Link to={`/series/${series.id}`}>
                    {" "}
                    {/* Link bileşeni eklendi */}
                    <Image
                      width={"250px"}
                      src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                      alt={series.name}
                    />
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bg="rgba(0, 0, 0, 0.6)"
                      color="#ECC94B"
                      p="2"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        textAlign={"center"}
                        flex={1}
                      >
                        {series.name}
                      </Text>
                      <Text
                        flex={1}
                        fontSize="xs"
                        textAlign={"center"}
                      >{`Yıl: ${series.first_air_date.split("-")[0]}, IMDb: ${
                        series.vote_average
                      }`}</Text>
                    </Box>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </section>
        </Flex>
      </Box>
    </>
  );
}

export default Anasayfa;
