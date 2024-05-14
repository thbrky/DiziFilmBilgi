import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  // Eğer paths dizisinin ilk elemanı boş bir string ise, bu elemanı kaldır
  if (paths.length > 0 && paths[0] === "") {
    paths.shift();
  }

  if (paths.length === 0) {
    return null;
  }

  return (
    <Box
      display="inline-block"
      mt={"4rem"}
      ml={"12rem"}
      fontSize="sm"
      bg="yellow.500"
      p={2}
      borderRadius="md"
    >
      <Text display="inline" mr={1}>
        <Link to="/" color="black" fontWeight="bold">
          Home
        </Link>
      </Text>
      {paths.map((path, index) => (
        <Box key={index} display="inline" mx={1}>
          <Text display="inline" color="gray.700" mr={2}>
            /
          </Text>
          <Text display="inline">
            <Link
              to={`/${paths.slice(0, index + 1).join("/")}`}
              color={index === paths.length - 1 ? "black" : "blue.500"}
              fontWeight={index === paths.length - 1 ? "bold" : "normal"}
            >
              {path}
            </Link>
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default Breadcrumb;
