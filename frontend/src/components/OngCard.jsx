/* eslint-disable react/prop-types */
import { Box, GridItem, Image, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const OngCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, address, description, img, id } = item;

  const goToLocal = () => {
    navigate(`/ong/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <GridItem>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={img} alt={name} height="200px" objectFit="cover" w="100%" />
        <Box p={6}>
          <Text fontSize="xl" fontWeight="semibold">
            {name}
          </Text>
          <Text mt={2} color="gray.600">
            {description}
          </Text>
          <Text mt={2} color="gray.600">
            {address}
          </Text>
        </Box>
        <Box p={2} display="flex" justifyContent="flex-end">
          <Link
            color="indigo.600"
            _hover={{ textDecoration: "underline" }}
            onClick={goToLocal}
          >
            FIQUEI INTERESSADO
          </Link>
        </Box>
      </Box>
    </GridItem>
  );
};
