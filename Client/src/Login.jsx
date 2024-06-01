import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate kancasını ekleyin
import {
  Button,
  Flex,
  Box,
  Link as ChakraLink,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import logo from "./pages/components/Home-cinema.gif";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // Giriş başarılı durumu için bir state ekledik
  const navigate = useNavigate(); // useNavigate kancasını kullanarak tarayıcı geçmişi üzerinde işlem yapacağız

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Giriş başarılı:", data);
        setLoginSuccess(true); // Giriş başarılı olduğunda state'i güncelle
        // Giriş başarılı olduğunda ana sayfaya yönlendirme
        navigate("/");
      } else {
        console.error("Giriş hatası:", data);
        // Hata işlemleri (örneğin kullanıcıya hata mesajı gösterme)
      }
    } catch (error) {
      console.error("İstek hatası:", error);
    }
  };

  return (
    <>
      <Flex mt={"50px"}>
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

          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Eposta adresiniz"
                value={email}
                onChange={handleEmailChange}
              />
            </FormControl>
            <br />
            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Şifre</FormLabel>
              <Input
                type="password"
                placeholder="Şifreniz"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <br />

            <Button colorScheme="yellow" width="full" mt={6} type="submit">
              Giriş Yap
            </Button>
          </form>

          {loginSuccess && ( // Eğer giriş başarılıysa mesajı göster
            <Box mt={4} textAlign="center" color="green">
              Giriş başarılı!
            </Box>
          )}

          <ChakraLink
            as={Link}
            to="/forgot-password"
            mt={4}
            textAlign="center"
            color="#ECC94B"
          >
            <br />
            Şifremi unuttum
          </ChakraLink>
        </Box>
      </Flex>
    </>
  );
}

export default Signin;
