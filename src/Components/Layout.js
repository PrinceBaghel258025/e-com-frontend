import Navbar from './Navbar';
import { Container, Flex } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'


const Layout = (props) => {





    return (

        // <Flex position={'relative'} direction="row">
        <Flex direction={'column'} >
            <Navbar />
            {/* <Link to="/cart">Cart</Link> */}
            {/* <Flex position="relative" top={'16'} > */}
            <Flex >
                    {/* <Sidebar /> */}
                    <Outlet />
            </Flex>
        </Flex>
    )
}

export default Layout;