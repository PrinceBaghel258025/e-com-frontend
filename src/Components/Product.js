import React from "react";

import {
  Box, Divider,
  Button,
  CardFooter, Heading,
  Text,
  Stack,
  Image,
  Card,
  CardBody
} from '@chakra-ui/react';
// import { Link } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useContext} from 'react'
import { Store } from "../store";

// import Photo from '../images/13.png'

const Product = ({ product }) => {


  const {state, dispatch: ctxDispatch} = useContext(Store)
  const image = product.pImages[0];



  const addToCartHandler = () => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product, quantity: 1
      }
    })
  }

  return (
    <Box maxW="sm">

      <Card m={2} >
        <Link to={`/products/${product._id}`} >
          <CardBody align={'center'}  >
            <Image
              boxSize={'100px'}
              // src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              src={image}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{product.pName}</Heading>
              <Text>
                {product.pDescription}
              </Text>
              <Stack direction={'row'} align="center" justify={'center'}>
                <Text textDecoration={'line-through'} color={'gray.600'} fontSize='xl'>
                  ${product.pPrice}
                </Text>
                <Text color='cyan.500' fontSize='xl'>
                  ${product.pOfferPrice}
                </Text>
              </Stack>
            </Stack>
          </CardBody>
        </Link>
        <Divider />
        <CardFooter p={['10px']}>
          <Stack direction={'row'} spacing='2'>
            <Button size='sm' variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button size='sm' variant='ghost' colorScheme='blue' onClick={addToCartHandler}>
              Add to cart
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  )

}

export default Product;