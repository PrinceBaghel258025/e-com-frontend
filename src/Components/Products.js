import React, { useEffect } from "react";
// import products from "../data/products.js";
import Product from "./Product";
import axios from 'axios';
import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useReducer } from "react";
import ProductsLoader from "./ProductsLoader";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Products = (props) => {
    
    const {category} = props;

    // const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    const [{ loading, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            // const result = await axios.get('/api/products');
            // setProducts(result.data);
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`http://localhost:5000/api/${category}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.products });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, [category]);

    return (
        < >{
            loading ?
                <Skeleton  spacing={8} ml={4} mt={6}>
                    <ProductsLoader />
                </Skeleton>
                :
                 (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }}  spacing={8} ml={4} mt={16}>
                        {
                            products.map(product => <Product key={product._id} product={product} />)
                        }
                    </SimpleGrid>
                )
        }

        </>

    )
}

export default Products;