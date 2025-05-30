import { Box, Button, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Navigate to home ("/")
    // Even if already on "/", this forces React Router to process navigation
    navigate("/", { replace: false });
  };

  return (
    <Box bg={'gray.800'} color={'white'} boxShadow={'md'} width="100%">
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={6}
      >
        {/* Left corner */}
        <Text
          fontSize={'xl'}
          fontWeight={'bold'}
          textTransform={"capitalize"}
          bgGradient={"linear(to-r, teal.400, blue.500)"}
          bgClip={"text"}
          cursor="pointer"
          onClick={handleHomeClick}
          userSelect="none"
        >
          TASK MANAGER
        </Text>

        {/* Right corner */}
        <HStack spacing={4}>
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
