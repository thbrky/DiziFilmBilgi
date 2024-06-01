import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // createRoot fonksiyonunu değiştirdik
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./pages/components/Header";
import App from "./App";

const root = createRoot(document.getElementById("root")); // createRoot fonksiyonunu değiştirdik

root.render(
  <StrictMode>
    <ChakraProvider>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </StrictMode>
);
