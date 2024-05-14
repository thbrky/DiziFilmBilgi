import React from "react";
import {
  Button,
  Flex,
  Box,
  Spacer,
  Link as ChakraLink,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Header from "./pages/components/Header";
import logo from "./pages/components/Home-cinema.gif";
import { Link } from "react-router-dom";
// Burayı düzelttik

function Signin() {
  return (
    <>
      {/* <Header /> */}
      <Flex mt={"120px"}>
        <Box ml={"230px"}>
          <img src={logo} alt="Giris img" width={"650px"} height={"60px"} />
        </Box>

        <Box
          maxW="md"
          mx="auto"
          mt={8}
          p={8}
          borderWidth={4}
          borderRadius="22px"
          borderStyle={"double"}
          borderColor={"#ECC94B"}
        >
          <br />
          <br />

          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Giriş Yap
          </Heading>
          <br />

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Eposta adresiniz" />
          </FormControl>
          <br />
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Şifre</FormLabel>
            <Input type="password" placeholder="Şifreniz" />
          </FormControl>

          <br />

          <Button colorScheme="yellow" width="full" mt={6}>
            Giriş Yap
          </Button>

          <ChakraLink href="#" mt={4} textAlign="center" color="#ECC94B">
            <br />
            Şifremi unuttum
          </ChakraLink>
        </Box>
      </Flex>
    </>
  );
}

export default Signin;
