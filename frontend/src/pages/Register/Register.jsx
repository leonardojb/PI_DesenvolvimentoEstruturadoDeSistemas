/* eslint-disable react-hooks/exhaustive-deps */
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
  } from "firebase/auth";
  import firebaseApp from "../../../firebase";
  import { useAuth } from "../../provider/AuthContext";
  import { useNavigate } from "react-router-dom";
  import FullSpin from "../../components/FullSpin";
  
  export const Register = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, loading, setUser } = useAuth()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (user) {
        navigate("/home")
      }
    }, [loading, user])
  
    if (loading) {
      return <FullSpin />
    }
  
    const handleSignup = () => {
      if (!nome || !email || !password) {
        alert("Erro no formulário. Preencha todos os campos");
        return;
      }
  
      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nome,
          }).then(() => {
            console.log("Usuário criado:", user);
            alert("Usuário criado com sucesso!")
            setUser(user)
            setError("");
          });
        })
        .catch((error) => {
          console.error("Erro ao criar usuário:", error);
          setError(`Erro ao criar usuário:, ${error}`);
        });
    };
  
    return (
      <Box
        p={8}
        maxWidth="450px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        margin="auto"
        mt={20}
      >
        <Box textAlign="center">
          <Heading>Cadastro</Heading>
        </Box>
        <Box mt={4}>
          <form>
            <Stack spacing={4}>
              <FormControl id="nome">
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  min={6}
                />
              </FormControl>
              <Button
                bg="gray.800"
                color="white"
                _hover={{ bg: "gray.600" }}
                onClick={handleSignup}
              >
                Cadastrar
              </Button>
              {error?.length > 1 && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
            </Stack>
          </form>
        </Box>
      </Box>
    );
  };
  