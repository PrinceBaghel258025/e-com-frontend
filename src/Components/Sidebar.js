import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue, Drawer,
  DrawerContent, useDisclosure, Input
} from '@chakra-ui/react';
import {
  // FiHome,
  FiMenu,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
// const LinkItems = [
//   { name: 'All', icon: FiHome },
//   { name: 'Watch', icon: FiHome },
//   { name: 'Shirt', icon: FiHome },
//   { name: 'Gown', icon: FiHome },
//   { name: 'Jewellery', icon: FiHome },
//   { name: 'Mens', icon: FiHome },
//   { name: 'Womens', icon: FiHome },
//   { name: 'Kids', icon: FiHome },
//   { name: 'Accessories', icon: FiHome },
//   { name: 'Mobiles', icon: FiHome },
//   { name: 'Laptops', icon: FiHome },
// ];

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // console.log(action.payload)
      return { ...state, categories: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function SimpleSidebar({ children }) {






  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    // <Box pos={'fixed'} left={'0'} minH='max-content' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Box  minH='max-content' pos={'static'} bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
       <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
       <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}



const SidebarContent = ({ onClose,  ...rest }) => {

  const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
    categories: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // const result = await
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('http://localhost:5000/api/category/all-category');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.categories });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  const handleSearch = async (e) => {
    const value = e.target.value.trim()
    if(value !== ''){
      navigate(`/search?products=${value}`, {replace: true} )
      console.log(value)
    }
  }

  return (
    <Box
      // overflow={'scroll'}
      // minH={'max-content'}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      // pos="fixed"
      h="full"
      mt={2}
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <Input align="center"
          p="4"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          placeholder={'Search Products'}
          onChange={handleSearch} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {categories.map((category) => (
        // <NavItem key={category._id} icon={link.icon}>
        // <RouterLink to={`/products/${category._id}}`} >
          <NavItem href={`/products-by-category/${category.cName}`} key={category._id}  >
            {category.cName}
          </NavItem>
        // </RouterLink>
      ))}
    </Box>
  );
};


const NavItem = ({ icon, children, href, ...rest }) => {
  return (
    <RouterLink to={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        px="4"
        py="3"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </RouterLink>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text> */}
      <Input align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        placeholder={'Search Products'} />
    </Flex>
  );
};