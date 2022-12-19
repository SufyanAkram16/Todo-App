import React from "react";
import {
    IconButton,
    Stack,
    Box,
    Flex,
    Text,
    Spacer,
    Button,
  } from "@chakra-ui/react";
  import { CloseIcon } from "@chakra-ui/icons";
import { taskType } from "./TodoCard";

  interface todoProps {
    completeTodo: taskType
    completeDeleteHandler(item : taskType) :void
  }

function CompleteTask({completeTodo,completeDeleteHandler}:todoProps) {
  return (
    <>
      <Stack mt={"4"} spacing={"3"} bg={"blue1.300"} rounded={"md"} w={"100%"}>
        <Box>
          <Flex alignItems={"center"} justifyContent="center">
            <Text h="8" fontSize="2xl" m={2} color="white">
              {completeTodo.name}
            </Text>
            <Spacer />
            <Spacer />
            <IconButton
              bg={"blue1.400"}
              alignSelf={"end"}
              rounded="3xl"
              size={"sm"}
              aria-label="check-icon"
              m={2}
              p={1}
              icon={<CloseIcon color={"blue"} />}
              onClick={() => {
                completeDeleteHandler(completeTodo);
              }}
            />
          </Flex>
        </Box>
      </Stack>
    </>
  );
}

export default CompleteTask;
