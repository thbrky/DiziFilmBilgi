import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY="1rem"
      bg="#040404"
      color="gray.600"
      // m={"auto"}
      // width={"1200px"}
    >
      {/* Diziler ve Filmler Başlıkları */}
      <Box flex="1" ml={"2rem"}>
        <Button
          as={Link}
          to="/Series"
          fontSize="xl"
          ml="15rem"
          mr="2rem"
          bg={"#020202"}
          color={"#ECC94B"}
          fontWeight={"600"}
          _hover={{ bg: "#ECC94B", color: "gray.200" }}
          _active={{ color: "gray.600", fontWeight: "bold" }}
        >
          Diziler
        </Button>
        <Button
          as={Link}
          to="/Movies"
          fontSize="xl"
          mr="2rem"
          bg={"#020202"}
          color={"#ECC94B"}
          fontWeight={"600"}
          _hover={{ bg: "#ECC94B", color: "gray.200" }}
          _active={{ color: "gray.600", fontWeight: "bold" }}
        >
          Filmler
        </Button>
      </Box>

      {/* Ortadaki Başlık */}
      <Box flex="1" textAlign="center">
        <Link to="/">
          <Heading
            as="h1"
            size="xl"
            letterSpacing={".1rem"}
            color="#ECC94B"
            fontWeight={"bolder"}
            cursor="pointer" // İlgilenecek imleç stilini ekledik
          >
            Dizi Film Diyarı
          </Heading>
        </Link>
      </Box>

      {/* Giriş Yap ve Kayıt Ol Butonları */}
      <Box flex="1" display="flex" justifyContent="flex-end" mr={"2rem"}>
        <Button
          as={Link}
          to="/Login"
          mr="2rem"
          fontSize="xl"
          bg={"#020202"}
          color={"#ECC94B"}
          fontWeight={"600"}
          _hover={{
            bg: "#ECC94B",
            color: "gray.200",
          }}
          _active={{ color: "gray.600", fontWeight: "bold" }}
        >
          Giriş Yap
        </Button>
        <Button
          as={Link}
          to="/Signup"
          fontSize="xl"
          mr="15rem"
          bg={"#020202"}
          color={"#ECC94B"}
          fontWeight={"600"}
          _hover={{ bg: "#ECC94B", color: "gray.200" }}
          _active={{ color: "gray.600", fontWeight: "bold" }}
        >
          Kayıt Ol
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
