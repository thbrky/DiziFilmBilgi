import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../pages/components/Header";
import {
  Box,
  Image,
  Text,
  Flex,
  Center,
  Wrap,
  WrapItem,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function MoviesDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [filmTitle, setFilmTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993";
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=tr`;
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=tr`;

    axios
      .get(url)
      .then((response) => {
        console.log("Film Detail:", response.data);
        setFilm(response.data);
        setFilmTitle(response.data.title);
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching film detail:", error);
      });

    axios
      .get(castUrl)
      .then((response) => {
        console.log("Cast:", response.data.cast);
        setCast(response.data.cast.slice(0, 5)); // İlk 5 oyuncuyu al
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
      });
  }, [id]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box bg={"#040404"}>
        <Header />
        <Flex
          width={"1200px"}
          height={"91.8vh"}
          m={"auto"}
          bg={"#020202"}
          direction={"row"}
          position="relative"
        >
          <Center flex={"1"} p={8} position="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={filmTitle}
              borderRadius="md"
              width="320px"
              height="480px"
            />
            <Text
              position="absolute"
              top={0}
              left={0}
              right={0}
              bg="rgba(0, 0, 0, 0.7)"
              color="#ECC94B"
              p={2}
              fontSize="2xl"
              textAlign="center"
              fontWeight={"800"}
              mt={12}
            >
              {filmTitle}
            </Text>
          </Center>
          <Box
            flex={"1"}
            p={8}
            textAlign={"left"}
            color={"#ECC94B"}
            fontWeight={"semibold"}
            fontSize={"medium"}
          >
            <Text fontSize="xl" mt={48}>
              <strong>Yıl:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>
                {new Date(film.release_date).getFullYear()}
              </span>
            </Text>
            <Text mt={2} mb={2}>
              <strong>IMDb Puanı:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{film.vote_average}</span>
            </Text>
            <Text mt={2} mb={2}>
              <strong>Özet:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{film.overview}</span>
            </Text>
            <Text mt={2} mb={2}>
              <strong>Tür: </strong>
              <Wrap spacing="4px">
                {genres.map((genre) => (
                  <WrapItem key={genre.id}>
                    <Text color="#ECC94B" fontSize="sm" fontWeight="normal">
                      {genre.name}
                    </Text>
                  </WrapItem>
                ))}
              </Wrap>
            </Text>
            <Divider mt={4} mb={4} />
            <Text fontWeight="bolder" fontSize="lg">
              Başrol Oyuncuları:
            </Text>
            <VStack spacing={4} align="start">
              {cast.map((actor) => (
                <Text fontWeight={"normal"} key={actor.id}>
                  {actor.name} - {actor.character}
                </Text>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default MoviesDetail;
