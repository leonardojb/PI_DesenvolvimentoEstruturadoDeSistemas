/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/button";
import { Avatar, Link as ChakraLink, Menu, MenuButton, IconButton, MenuList, useBreakpointValue, MenuItem } from "@chakra-ui/react";
import { Flex, Box, Text, } from "@chakra-ui/layout";
import { useAuth } from "../provider/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Header = ({ actualPage = "home" }) => {
    const { user, handleLogout } = useAuth();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate()

    return (
        <Box py={4} borderBottom="1px" borderColor="gray">
            <Flex justifyContent="space-between" alignItems="center" px="2">
                <Flex alignItems="center">
                    {isMobile ? <MobileMenu actualLink={actualPage} /> : <DesktopMenu actualLink={actualPage} />}
                </Flex>
                {user ? (
                    <Flex alignItems="center">
                        <Text color="gray.500" mr={2}>{user?.displayName}</Text>
                        <Menu>
                            <MenuButton as={Avatar} name={user?.displayName} size="sm" p={2} _hover={{ cursor: "pointer" }} />
                            <MenuList>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                   
                ) : (
                    <Flex alignItems="center">
                        <Button onClick={() => {
                            navigate("/login")
                        }} ml={4}>Faça o Login</Button>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Header;


const DesktopMenu = ({ actualLink }) => {
    return (
        <Flex alignItems="center" px="8">
            <CustomMenuItem href="/home" actualLink={actualLink}>ONGS</CustomMenuItem>
            <CustomMenuItem href="/about" actualLink={actualLink}>SOBRE NÓS</CustomMenuItem>
            <CustomMenuItem href="/contact" actualLink={actualLink}>CONTATO</CustomMenuItem>
        </Flex>
    );
};

const MobileMenu = ({ actualLink }) => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Opções de menu"
                icon={<HamburgerIcon />}
                variant="ghost"
                mr={4}
            />
            <MenuList>
                <CustomMenuItem href="/home" actualLink={actualLink}>ONGS</CustomMenuItem>
                <CustomMenuItem href="/about" actualLink={actualLink}>SOBRE NÓS</CustomMenuItem>
                <CustomMenuItem href="/contact" actualLink={actualLink}>CONTATO</CustomMenuItem>
            </MenuList>
        </Menu>
    );
};

const CustomMenuItem = ({ href, actualLink, children }) => {
    const isActive = actualLink === href;
    return (
        <ChakraLink
            color={isActive ? "gray.600" : "gray.500"}
            _hover={{ color: "gray.800" }}
            fontWeight={isActive ? "bold" : "normal"}
            href={href}
            mr={4}
        >
            {children}
        </ChakraLink>
    );
};

