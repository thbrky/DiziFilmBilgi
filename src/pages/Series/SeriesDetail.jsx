import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
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

function SeriesDetail() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [serieName, setSerieName] = useState("");
  const [episodeRuntime, setEpisodeRuntime] = useState(null);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993";
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=tr`;
    const castUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=tr`;

    axios
      .get(url)
      .then((response) => {
        console.log("Series Detail:", response.data);
        setSerie(response.data);
        setSerieName(response.data.name);
        if (
          response.data.episode_run_time &&
          response.data.episode_run_time.length > 0
        ) {
          setEpisodeRuntime(response.data.episode_run_time[0]);
        } else {
          setEpisodeRuntime(45); // Varsayılan değer
        }
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching series detail:", error);
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

  if (!serie) {
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
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt={serieName}
              borderRadius="md"
              width="300px"
              height="450px"
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
              fontWeight={"bold"}
              mt={12}
            >
              {serieName}
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
              Yıl: {new Date(serie.first_air_date).getFullYear()}
            </Text>
            <Text mt={2} mb={2}>
              IMDb Puanı: {serie.vote_average}
            </Text>
            <Text mt={2} mb={2}>
              Özet: {serie.overview}
            </Text>
            <Text mt={2} mb={2}>
              Her Bölüm Ortalama: {episodeRuntime} dakika
            </Text>
            <Text mt={2} mb={2}>
              Toplam Sezon: {serie.number_of_seasons}
            </Text>
            <Text mt={2} mb={2}>
              Toplam Bölüm: {serie.number_of_episodes}
            </Text>
            <Text mt={2} mb={2}>
              Tür:{" "}
              <Wrap spacing="4px">
                {genres.map((genre) => (
                  <WrapItem key={genre.id}>
                    <Text color="#ECC94B" fontSize="sm" fontWeight="bold">
                      {genre.name}
                    </Text>
                  </WrapItem>
                ))}
              </Wrap>
            </Text>
            <Divider mt={4} mb={4} />
            <Text fontWeight="bold" fontSize="lg">
              Başrol Oyuncuları:
            </Text>
            <VStack spacing={4} align="start">
              {cast.map((actor) => (
                <Text key={actor.id}>
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

export default SeriesDetail;
