import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import {
    Button, Heading,
    Text,
    Stack,
    Box,
    Image, Flex,
    HStack,
    Divider
} from '@chakra-ui/react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            console.log(action.payload)
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


const SingleProduct = () => {
    const { productId } = useParams();
    console.log(productId)

    const [{ loading, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            // const result = await axios.get('/api/products');
            // setProducts(result.data);
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`http://localhost:5000/api/product/${productId}`);
                console.log(result)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.product });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, []);


    return (<Box padding={4}>
        {
            loading ? <div>loading...</div>
                : (
                    <Stack direction={'row'}  spacing={12} >
                        <Image
                        shadow={"5px 5px 10px #ccc"}
                            boxSize={'sm'}
                            // src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            // src={product.pImages[0]}
                            src={product.pImages ? `${product.pImages[0]}` : "#"}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Stack spacing='5' minWidth={'max-content'} mt={6} borderRadius={'xl'} shadow={"5px 5px 10px #ccc"} padding={8}>
                            <Heading size={"3xl"}>{product.pName}</Heading>
                            <Text fontSize={'xl'}>
                                {product.pDescription}
                            </Text>
                            <Divider />
                            <Stack  spacing={8} >
                                <HStack shadow={"dark-lg"} rounded={"2xl"} spacing={8} padding={4}>
                                    <Text textDecoration={'line-through'} color={'gray.600'} fontSize='4xl'>
                                        ${product.pPrice}
                                    </Text>
                                    <Text color='cyan.500' fontSize='4xl'>
                                        ${product.pOfferPrice}
                                    </Text>
                                </HStack>
                                <Stack dropShadow={"inner"} shadow={"lg"} w={'100%'}  direction={'row'} spacing={20} padding={8} >
                                    <Button size='lg' variant='solid' colorScheme='blue' px={4}>
                                        Buy now
                                    </Button>
                                    <Button size='lg' variant='solid' colorScheme='blue'>
                                        Add to cart
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                    </Stack>
                    // <Flex
                    //     w='full'
                    //     justifyContent='center'
                    // >
                    //     {/* <Box  w={{ base: 'sm', md: 'md', lg: 'xl', xl: 'xl' }} > */}
                    //     <Box maxW='xl' >

                    //         <Card m={2} >
                    //             {/* <Link to={`/products/${product._id}`} > */}
                    //             <CardBody   >

                    //             </CardBody>
                    //             {/* </Link> */}
                    //             <Divider />
                    //             <CardFooter p={['10px']}>

                    //             </CardFooter>
                    //         </Card>
                    //     </Box>
                    // </Flex>
                )
        }
    </Box>


    )

}

export default SingleProduct;