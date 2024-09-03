import { Spinner } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";

const FullSpin = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh" 
    >
      <Spinner size="xl" />
    </Flex>
  );
};

export default FullSpin;
