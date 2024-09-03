import { Box, Text } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const About = () => {
  return (
    <>
      <Header actualPage="/about" />
      <Box mx="auto" p={8}>
        <Text fontSize="4xl" fontWeight="bold" mb={8}>
          Sobre nós
        </Text>
        <Text mt="10" fontSize="large" lineHeight="1.2">
          Acreditamos no poder da solidariedade e na importância do trabalho
          voluntário e das doações para transformar a sociedade. Nossa missão é
          ser a ponte entre aqueles que querem ajudar e as ONGs que precisam de
          suporte. <br />
          <br />
          Através da união de esforços entre governos, ONGs, empresas e a
          sociedade civil, é possível construir um futuro mais promissor para
          todos, compreendendo a importância dos avanços tecnológicos na
          melhoria da qualidade de vida como um todo.!
        </Text>
      </Box>
      <Footer />
    </>
  );
};
