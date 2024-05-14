import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Movies() {
  const [topRatedFilms, setTopRatedFilms] = useState([]);

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993";

    const filmsUrls = Array.from(
      { length: 5 },
      (_, i) =>
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${i + 1}`
    );

    const requests = filmsUrls.map((url) => axios.get(url));

    Promise.all(requests)
      .then((responses) => {
        const allTopRatedFilms = responses.flatMap(
          (response) => response.data.results
        );
        console.log("Top Rated Films:", allTopRatedFilms);
        setTopRatedFilms(allTopRatedFilms);
      })
      .catch((error) => {
        console.error("Error fetching top rated films:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Box bg={"#020202"} height={"100%"}>
        <Flex direction="column" alignItems="center">
          <Flex wrap="wrap" justifyContent="center">
            {topRatedFilms.map((film) => (
              <Box m={4} textAlign="center" position="relative" key={film.id}>
                <Link
                  to={`/Movies/${film.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    borderRadius="md"
                    width="200px"
                    height="300px"
                    _hover={{ filter: "blur(4px)" }}
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="rgba(0, 0, 0, 0.5)"
                    p={2}
                  >
                    <Text color="white" fontSize="sm">
                      {film.title} ({new Date(film.release_date).getFullYear()})
                    </Text>
                    <Text color="white" fontSize="xs">
                      IMDb: {film.vote_average}
                    </Text>
                  </Box>
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Movies;
