import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import logo from "./pages/components/Videotape.gif";

function KayitOl() {
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kayıt işlemleri burada gerçekleştirilecek
    console.log(register);
  };

  return (
    <>
      <Flex mt={"120px"} justifyContent="center" alignItems="center">
        <Box
          maxW="md"
          mx="auto"
          mt={8}
          p={8}
          borderWidth={4}
          borderRadius="22px"
          borderColor={"#ECC94B"}
          borderStyle={"double"}
        >
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Kayıt Ol
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired>
              <FormLabel>Ad</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Adınız"
              />
            </FormControl>

            <FormControl id="surname" mt={4} isRequired>
              <FormLabel>Soyad</FormLabel>
              <Input
                type="text"
                name="surname"
                onChange={handleInputChange}
                placeholder="Soyadınız"
              />
            </FormControl>

            <FormControl id="email" mt={4} isRequired>
              <FormLabel>E-posta</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="E-posta adresiniz"
              />
            </FormControl>

            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Şifre</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Şifreniz"
              />
            </FormControl>

            <Button colorScheme="yellow" width="full" mt={6} type="submit">
              Kayıt Ol
            </Button>
          </form>
        </Box>
        <Box mt={"10px"} ml={4} mr={"200px"}>
          <img src={logo} alt="Giris img" width={"600px"} height={"600px"} />
        </Box>
      </Flex>
    </>
  );
}

export default KayitOl;
