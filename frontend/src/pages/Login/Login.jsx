/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";
import FullSpin from "../../components/FullSpin";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { user, loading, handleLogin } = useAuth()
    
    useEffect(() => {
        if (user) {
            navigate("/home")
        }
    }, [loading, user])

    if (loading) {
        return <FullSpin />
    }

    const handleRegisterPage = () => {
        navigate("/register");
    };

    return (
        <Box
            p={8}
            maxWidth="400px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            margin="auto"
            mt={20}
        >
            <Box textAlign="center">
                <Heading>Login</Heading>
                <Text mt={2} color="gray.500">
                    Entre com seu e-mail e senha
                </Text>
            </Box>
            <Box mt={4}>
                <form>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
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
                            />
                        </FormControl>
                        <Button
                            bg="gray.800"
                            color="white"
                            _hover={{ bg: "gray.600" }}
                            onClick={() => handleLogin(email, password)}

                        >
                            Entrar
                        </Button>
                        <Text textAlign="center">
                            <Link color="gray.800"
                                onClick={handleRegisterPage}
                            >
                                Cadastrar
                            </Link>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}
