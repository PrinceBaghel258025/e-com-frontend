import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack, Icon, HStack, Button, Text, Flex } from "@chakra-ui/react";
// import { TBCheckBox, FiUsers, BsBookmark, BiHome, IoStatsChart } from '@react-icons'
import { MdSettings } from "react-icons/md";
// import { FiUsers } from 'react-icons/fi'
// import { BiHome } from 'react-icons/bi'
// import { IoStatsChart } from 'react-icons/io'
// import { BsBookmark } from 'react-icons/bs'
// const LinkItems = [
//     { name: 'Home', icon: BiHome },
//     { name: 'DashBoard', icon: IoStatsChart },
//     { name: 'Tasks', icon: TBCheckBox },
//     { name: 'BookMarks', icon: BsBookmark },
//     { name: 'Users', icon: FiUsers },
//   ];
const AdminLayout = () => {
  return (
    <Flex>
      <Box px={4} py={8} width={60} minH={"100vh"} bgColor={"#2b6cb0"}>
        <Stack spacing={4}>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              Home
            </Text>
          </HStack>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              DashBoard
            </Text>
          </HStack>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              Tasks
            </Text>
          </HStack>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              Products
            </Text>
          </HStack>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              Users
            </Text>
          </HStack>
          <HStack _hover={{ bg: "#3182ce" }} px={4} py={2} rounded={"xl"}>
            <Icon as={MdSettings} />
            <Text fontSize="xl" color={"#bee3f4"}>
              Settings
            </Text>
          </HStack>
        </Stack>
      </Box>
      <Outlet />
    </Flex>
  );
};

export default AdminLayout;
