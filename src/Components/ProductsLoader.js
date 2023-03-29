import React from "react";

import {
    Box, Divider,
    Button,
    CardFooter, Stack,
    Image,
    Card,
    CardBody,
    Skeleton
} from '@chakra-ui/react';
const ProductsLoader = () => {
    return (
        <Box maxW="sm">

            <Card  >
                <Skeleton />
                <CardBody align={'center'}  >
                    <Image/>
                    <Stack mt='6' spacing='3'>
                        <Skeleton />
                        <Skeleton />
                        <Stack direction={'row'} align="center" justify={'center'}>
                            <Skeleton />
                            <Skeleton />
                        </Stack>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter p={['10px']}>
                    <Stack direction={'row'} spacing='2'>
                        <Button size='sm' variant='solid' colorScheme='blue'>
                            
                        </Button>
                        <Button size='sm' variant='ghost' colorScheme='blue'>
                            
                        </Button>
                    </Stack>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default ProductsLoader;