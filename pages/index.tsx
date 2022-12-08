import type { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import TodoCard from "../components/TodoCard";
import { Box, Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <TodoCard />
    </>
  );
};

export default Home;
