import { useState, useContext } from "react";
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
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
// import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  // const {state, dispatch} = useContext(Store);
  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const container = useColorModeValue("gray.300", "gray.700");
  const shadow = useColorModeValue("5px 5px 4px #ccc", "5px 5px 8px #171923");

  const handleSignUp = async (data) => {
    const { firstName, lastName, email, password, cPassword, role } = data;
    // console.log(firstName, lastName, email, password, cPassword, role)
    const baseUrl = "http://localhost:5000/api/signup";
    try {
      const user = await axios.post(baseUrl, {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        cPassword: cPassword,
        role
      });

      toast({
        title: "Signed In Sucessfully",
        position: "top-right",
        description: "Please Login",
        stats: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/signin");
      console.log(user);
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

  return (
    <Container
      bg={container}
      my={16}
      mt={24}
      mx={"72"}
      rounded={"2xl"}
      shadow={shadow}
      padding={8}
      minW={{ lg: "2xl" }}
    >
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Stack padding={4}>
          <Text as="b" fontSize={"2xl"} align="center" mb={4}>
            Register Here
          </Text>
          <HStack>
            <FormControl required>
              <Input
                {...register("firstName")}
                variant="filled"
                placeholder={"First Name"}
              />
            </FormControl>
            <FormControl>
              <Input
                {...register("lastName")}
                variant="filled"
                placeholder={"Last Name"}
              />
            </FormControl>
          </HStack>
          <FormControl w={"50%"}>
            <Input
              {...register("email")}
              variant="filled"
              type="email"
              placeholder={"Email Address"}
            />
          </FormControl>
          <HStack>
            <InputGroup size="md" variant={"filled"}>
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
            <InputGroup size="md" variant={"filled"}>
              <Input
                {...register("cPassword")}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password again"
              />
            </InputGroup>
          </HStack>
          <Select
            {...register("role")}
            variant={"filled"}
            w={"50%"}
            placeholder="Select a role"
            required
          >
            <option value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
          </Select>
          <HStack my={24} justify="center" spacing={24}>
            <Button
              size={"lg"}
              colorScheme={"cyan"}
              variant={"solid"}
              type="submit"
            >
              Submit
            </Button>
            <Button
              size={"lg"}
              colorScheme={"cyan"}
              variant={"outline"}
              type={"reset"}
            >
              Reset
            </Button>
          </HStack>
          <HStack justify={"center"} pt={4}>
            <Text>Already a Member?</Text>{" "}
            <Link
              as={RouterLink}
              to="/signin"
              color={useColorModeValue("blue", "blue.400")}
            >
              SignIn Here
            </Link>
          </HStack>
        </Stack>
      </form>
    </Container>
  );
};

export default SignUp;
