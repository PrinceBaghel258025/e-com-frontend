import {
  Stack,
  HStack,
  Image,
  Button,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { useContext } from "react";
import { Store } from "../store";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GooglePayButtonComponent from "./GooglePayButton";


const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate()
  const toast = useToast();

  const checkOutPrice = cart.cartItems.reduce((a, item) => {
    const itemPrice = (item.quantity * item.pOfferPrice).toFixed(2);
    // console.log("a", a)
    // console.log(Number(a) + Number(itemPrice));
    const toReturn = (Number(a) + Number(itemPrice)).toFixed(2);
    return toReturn;
  }, 0);
  const checkOutItems = cart.cartItems.reduce((a, item) => {
    return a + item.quantity;
  }, 0);
  // console.log(price);

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
  };
  const handleCheckOut = async () => {
    // check if user is logged in
    if (state.user && state.token) {
      toast({
        title: "CheckedOut Successfully",
        position: "top-right",
        stats: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please Login to Checkout",
        position: "top-right",
        stats: "info",
        duration: 4000,
        isClosable: true,
      });
      navigate('/signin')
    }
  };

  return (
    <Box w="full">
      <Stack
        m={8}
        border={"2px solid #ccc"}
        padding={8}
        borderRadius={"xl"}
        spacing={4}
        justifyItems="center"
        alignItems={"center"}
        minW={"max-content"}
      >
        <Text
          align={"center"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          lineHeight="8"
        >
          Cart Products
        </Text>
        {cart.cartItems.length
          ? cart.cartItems.map((item) => (
              <HStack
                key={item._id}
                spacing={16}
                padding={4}
                shadow="2px 2px 5px"
                borderRadius={"xl"}
              >
                <Image
                  src={item.pImages[0]}
                  alt={item.pDescription}
                  boxSize={"80px"}
                  borderRadius="large"
                />
                <HStack px={8} spacing={4}>
                  <Button
                    onClick={() =>
                      ctxDispatch({
                        type: "DECREASE_COUNT",
                        payload: item,
                      })
                    }
                  >
                    -
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button
                    onClick={() =>
                      ctxDispatch({
                        type: "INCREASE_COUNT",
                        payload: item,
                      })
                    }
                  >
                    +
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    onClick={() => removeItemHandler(item)}
                  >
                    {" "}
                    Delete
                  </Button>
                  <Text fontSize={"xl"} fontWeight={"semibold"}>
                    Total : ${(item.quantity * item.pOfferPrice).toFixed(2)}
                  </Text>
                </HStack>
              </HStack>
            ))
          : null}
        {/* leave the functionality for the grand total */}
      </Stack>
      <Divider />
      <Stack mt={4} justifyItems={"center"} alignItems="center">
        {cart.cartItems.length ? (
          <HStack
            spacing={24}
            padding={4}
            px={24}
            shadow="2px 2px 5px"
            borderRadius={"xl"}
          >
            <Text>Number of items: {checkOutItems}</Text>
            <Text> Total Cart Value: ${checkOutPrice}</Text>
            <Button
              variant={"outline"}
              size="xl"
              padding={4}
              colorScheme={"linkedin"}
              onClick={handleCheckOut}
            >
              {/* <GooglePayButton
  environment="TEST"
  paymentRequest={{ ... }}
  onLoadPaymentData={() => {}}
  /> */}
              {state.user && state.token ? <GooglePayButtonComponent /> : 'Checkout' }
              
            </Button>
          </HStack>
        ) : null}
      </Stack>
    </Box>
    //
  );
};

export default CartScreen;
