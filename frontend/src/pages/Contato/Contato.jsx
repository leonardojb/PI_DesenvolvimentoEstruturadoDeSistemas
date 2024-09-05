import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
  } from "@chakra-ui/react";
  import Footer from "../../components/Footer";
  import Header from "../../components/Header";
  
  const ContactPage = () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Formulário enviado!");
      alert("Formulário Enviado!");
    };
  
    return (
      <>
        <Header actualPage="/contact" />
        <Box maxW="lg" mx="auto" p={8}>
          <Heading as="h1" mb={6}>
            Entre em Contato
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Seu email" />
            </FormControl>
            <FormControl id="name" mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" placeholder="Seu nome" />
            </FormControl>
            <FormControl id="message" mb={4}>
              <FormLabel>Comentário</FormLabel>
              <Textarea placeholder="Seu comentário" />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Enviar
            </Button>
          </form>
        </Box>
        <Footer />
      </>
    );
  };
  
  export default ContactPage;
  