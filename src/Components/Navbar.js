import { useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Store } from "../store";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;
  const navigate = useNavigate()
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogOut = async () => {
    console.log("Handling log out");
    toast({
      title: "Signed Out Sucessfully",
      position: "top-right",
      stats: "success",
      duration: 2000,
      isClosable: true,
    });
    dispatch({
      type: "LOG_OUT",
    });
    navigate('/')
  };

  return (
    <>
      <Box
        sx={{ "z-index": 100 }}
        // pos={"fixed"}
        pos={'static'}
        top={0}
        left={0}
        minW={"full"}
        bg={useColorModeValue("blue.300", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontSize={"xl"}><Link to={'/'}>E-Bay</Link></Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {/* {window.location.pathname !== "/" ? (
                <Link to="/">
                  <Button>Go Home</Button>
                </Link>
              ) : null} */}

              <Link to={"/cart"}>
                <Button colorScheme={"purple"}>
                  Cart{" "}
                  {cart.cartItems.length && (
                    <Text bg={"cyan.500"} p={1} rounded={"full"}>
                      {cart.cartItems.reduce((a, item) => a + item.quantity, 0)}
                    </Text>
                  )}
                </Button>
              </Link>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                {user ? (
                  <>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <Button onClick={handleLogOut}>LogOut</Button>
                  </>
                ) : (
                  <Link to={"/signin"}>
                    <Button>Sign In</Button>
                  </Link>
                )}

                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user ? user.name : 'Username'}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
