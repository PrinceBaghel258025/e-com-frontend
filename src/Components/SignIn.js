import { useState } from "react";
import {
  Container,
  Link,
  FormControl,
  useColorModeValue,
  FormLabel,
  Text,
  Input,
  Stack,
  HStack,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, Navigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../store";
const SignIn = () => {

  const {state, dispatch} = useContext(Store)
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleSignIn = async (data) => {
    const { username, password } = data;
    try {
      const baseUrl = "http://localhost:5000/api/signin";
      const res = await axios.post(baseUrl, {
        email: username,
        password: password
      });

      toast({
        title: "Logged In Sucessfully",
        position: "top-right",
        stats: "success",
        duration: 4000,
        isClosable: true,
      });
      if(res.data.user.role === "admin"){
        navigate('/admin-dashboard')
      } else {
        navigate("/");
      }
      // console.log(res.data)
      // save the user to context
      dispatch({
        type: "LOGGED_IN",
        payload: res.data
      })

      // console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
      toast({
        title: "Request Failed",
        position: "top",
        description: `${err.response.data.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const container = useColorModeValue("gray.300", "gray.700");
  const shadow = useColorModeValue("5px 5px 4px #ccc", "5px 5px 8px #171923");

  return (
    <Container
      bg={container}
      my={16}
      mx={72}
      mt={24}
      rounded={"2xl"}
      shadow={shadow}
      padding={8}
    >
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Stack padding={4} spacing={6}>
          <Text as="b" fontSize={"2xl"} align="center" mb={4}>
            Sign In
          </Text>
          <Divider />
          <FormControl required shadow={"xl"} rounded={"2xl"}>
            <Input
              {...register("username")}
              variant="filled"
              placeholder={"Username or Email Address"}
            />
          </FormControl>
          <InputGroup
            size="md"
            variant={"filled"}
            shadow={"xl"}
            rounded={"2xl"}
          >
            <Input
              {...register("password")}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button
                variant={"outline"}
                shadow={"base"}
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <Select
            {...register("role")}
            variant={"filled"}
            placeholder="Select a role"
            required
            shadow={"xl"}
            rounded={"2xl"}
          >
            <option value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
          </Select> */}
          <HStack my={24} justify="center" spacing={24}>
            <Button
              type={"submit"}
              shadow={"xl"}
              size={"lg"}
              colorScheme={"cyan"}
              variant={"solid"}
            >
              Submit
            </Button>
            <Button
              type={"reset"}
              shadow={"xl"}
              size={"lg"}
              colorScheme={"cyan"}
              variant={"outline"}
            >
              Reset
            </Button>
          </HStack>
          <HStack justify={"center"} pt={4}>
            <Text>Not a Member?</Text>{" "}
            <Link
              as={RouterLink}
              to="/signup"
              color={useColorModeValue("blue", "blue.400")}
            >
              Register Here
            </Link>
          </HStack>
        </Stack>
      </form>
    </Container>
  );
};

export default SignIn;
