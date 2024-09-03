/* eslint-disable react/prop-types */
import { Link } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <Box bg="gray.100" py={{ base: 4, md: 8 }}>
            <Flex justifyContent="center">
                <Flex
                    alignItems="center"
                    flexDirection={{ base: "column", md: "row" }}
                    maxWidth="container.xl"
                    mx="auto"
                    gridGap={8}
                    textAlign={{ base: "center", md: "initial" }}
                >
                    <div>
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                            Contatos
                        </Text>
                        <Text color="gray.600">Brasil</Text>
                        <Text color="gray.600">(11) 9999-5555</Text>
                        <Text color="gray.600">fulano@gmail.com</Text>
                    </div>
                    <div>
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                            Redes sociais
                        </Text>
                        <Flex gridGap={4}>
                            <CustomLink href="#">
                                <Icon as={FaFacebook} boxSize={6} />
                            </CustomLink>
                            <CustomLink href="#">
                                <Icon as={FaTwitter} boxSize={6} />
                            </CustomLink>
                            <CustomLink href="#">
                                <Icon as={FaLinkedin} boxSize={6} />
                            </CustomLink>
                            <CustomLink href="#">
                                <Icon as={FaMapMarkerAlt} boxSize={6} />
                            </CustomLink>
                        </Flex>
                    </div>
                </Flex>
            </Flex>
        </Box>
    );
};

const CustomLink = ({ href, children }) => {
    return (
        <Link color="gray.600" _hover={{ color: "gray.800" }} href={href}>
            {children}
        </Link>
    );
};

export default Footer;
