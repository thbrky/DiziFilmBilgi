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
import Header from "./pages/components/Header";
import logo from "./pages/components/Videotape.gif";
function KayitOl() {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    sifre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Form bilgilerini konsola yazdır
    // Form gönderme işlemleri burada yapılabilir
  };

  return (
    <>
      <Flex mt={"120px"}>
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
            <FormControl id="ad" isRequired>
              <FormLabel>Ad</FormLabel>
              <Input
                type="text"
                name="ad"
                value={formData.ad}
                onChange={handleChange}
                placeholder="Adınız"
              />
            </FormControl>

            <FormControl id="soyad" mt={4} isRequired>
              <FormLabel>Soyad</FormLabel>
              <Input
                type="text"
                name="soyad"
                value={formData.soyad}
                onChange={handleChange}
                placeholder="Soyadınız"
              />
            </FormControl>

            <FormControl id="email" mt={4} isRequired>
              <FormLabel>E-posta</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
              />
            </FormControl>

            <FormControl id="sifre" mt={4} isRequired>
              <FormLabel>Şifre</FormLabel>
              <Input
                type="password"
                name="sifre"
                value={formData.sifre}
                onChange={handleChange}
                placeholder="Şifreniz"
              />
            </FormControl>

            <Button colorScheme="yellow" width="full" mt={6} type="submit">
              Kayıt Ol
            </Button>
          </form>
        </Box>
        <Box mt={"10px"} mr={"260px"}>
          <img src={logo} alt="Giris img" width={"600px"} height={"60px"} />
        </Box>
      </Flex>
    </>
  );
}

export default KayitOl;
