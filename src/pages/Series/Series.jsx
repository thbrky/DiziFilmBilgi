import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Link bileşenini ekleyin

function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993";

    const seriesUrls = Array.from(
      { length: 5 },
      (_, i) =>
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${i + 1}`
    );

    const requests = seriesUrls.map((url) => axios.get(url));

    Promise.all(requests)
      .then((responses) => {
        const allSeries = responses.flatMap(
          (response) => response.data.results
        );
        console.log("Top Series:", allSeries);
        setSeries(allSeries);
      })
      .catch((error) => {
        console.error("Error fetching series:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Box bg={"#020202"} height={"100%"}>
        <Flex direction="column" alignItems="center">
          <Flex wrap="wrap" justifyContent="center">
            {series.map((serie) => (
              <Box m={4} textAlign="center" position="relative" key={serie.id}>
                <Link
                  to={`/series/${serie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                    alt={serie.name}
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
                      {serie.name} (
                      {new Date(serie.first_air_date).getFullYear()})
                    </Text>
                    <Text color="white" fontSize="xs">
                      IMDb: {serie.vote_average}
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

export default Series;
