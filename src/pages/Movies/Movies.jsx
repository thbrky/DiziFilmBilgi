import React, { useState, useEffect } from "react"; // React ve gerekli hook'ları ve axios'u içe aktarıyoruz
import axios from "axios";
import Header from "../components/Header"; // Header bileşenini içe aktarıyoruz
import { Box, Flex, Image, Text } from "@chakra-ui/react"; // Chakra UI'dan gerekli bileşenleri içe aktarıyoruz
import { Link } from "react-router-dom"; // React Router'dan Link bileşenini içe aktarıyoruz

function Movies() {
  const [topRatedFilms, setTopRatedFilms] = useState([]); // TopRatedFilms adında bir state oluşturuyoruz ve bunu setTopRatedFilms fonksiyonu ile güncelliyoruz

  useEffect(() => {
    const API_KEY = "5dc30b20339031934bac3647e8f28993"; // The Movie Database API anahtarını tanımlıyoruz

    // İlk 5 sayfadaki en yüksek puanlı filmlerin URL'lerini oluşturuyoruz
    const filmsUrls = Array.from(
      { length: 5 },
      (_, i) =>
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${
          i + 1
        }`
    );

    // Axios kullanarak her URL için GET isteği hazırlıyoruz
    const requests = filmsUrls.map((url) => axios.get(url));

    // Tüm istekler tamamlandığında sonuçları işliyoruz
    Promise.all(requests)
      .then((responses) => {
        // Gelen cevaplardan filmleri düz bir diziye çeviriyoruz
        const allTopRatedFilms = responses.flatMap(
          (response) => response.data.results
        );
        console.log("Top Rated Films:", allTopRatedFilms); // Konsola en yüksek puanlı filmleri yazdırıyoruz
        setTopRatedFilms(allTopRatedFilms); // Filmleri state'e kaydediyoruz
      })
      .catch((error) => {
        console.error("Error fetching top rated films:", error); // Hata durumunda hatayı konsola yazdırıyoruz
      });
  }, []); // Bu effect sadece bileşen ilk yüklendiğinde çalışacak

  return (
    <>
      <Header /> {/* Header bileşenini ekliyoruz */}
      <Box bg={"#020202"} height={"100%"}>
        {" "}
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
                    borderRadius="xl"
                    width="200px"
                    height="300px"
                    _hover={{ filter: "blur(2px)" }} // Resme hover yapıldığında bulanıklaştırıyoruz
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="rgba(0, 0, 0, 0.5)"
                    p={1}
                  >
                    <Text color="#ECC94B" fontSize="sm">
                      {film.title} ({new Date(film.release_date).getFullYear()}){" "}
                      {/* Filmin başlığını ve çıkış yılını gösteriyoruz */}
                    </Text>
                    <Text color="#ECC94B" fontSize="xs">
                      IMDb: {film.vote_average}{" "}
                      {/* Filmin IMDb puanını gösteriyoruz */}
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

export default Movies; // Movies bileşenini dışa aktarıyoruz
