import {
  Heading,
  Center,
  Flex,
  Input,
  InputGroup,
  Box,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import React, { ChangeEvent, useState } from "react";
import TodoTask from "./TodoTask";

export type taskType = {
  name: string;
  id: number;
};

const TodoCard = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<taskType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [olditemID, setOldItemID] = useState(Number);

  const addtask = (): void => {
    if (task) {
      let newTodo: taskType = {
        name: task,
        id: new Date().getTime(),
      };

      setTodoList([...todoList, newTodo]);
      setTask("");
    } else {
      alert("plz fill data");
    }
  };
  const deleteTask = (id: number): void => {
    const updateItem = todoList.filter((elem) => {
      return id != elem.id;
    });
    setTodoList(updateItem);
  };

  const onUpdateHandler = (item: taskType) => {
    setOldItemID(item.id);
    console.log("user want to update this item", item);
    setTask(item.name);
    setIsEditing(true);
    console.log("old item id", setOldItemID);
  };

  const editItem = () => {
    let updateTodo = {
      name: task,
      id: olditemID,
    };

    let newEditItem = todoList.map((todo) => {
      if (olditemID == todo.id) {
        return updateTodo;
      } else {
        return todo;
      }
    });

    setIsEditing(false);
    setTodoList(newEditItem);
    setTask("");
    console.log(newEditItem);
  };

  return (
    <Flex
      height="100vh"
      alignItems={"center"}
      justifyContent="center"
      bg="blue.300"
    >
      <Flex
        height="auto"
        width="100vw"
        direction="column"
        background="blue1.200"
        p={12}
        m={12}
        rounded={16}
      >
        <Center>
          <Heading mb={6}>Todo List</Heading>
        </Center>

        <Center mb={6}>
          <InputGroup>
            <Input
              fontSize="2xl"
              bg={"white"}
              type={"text"}
              placeholder="Add Task Here..."
              name="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              width="100vw"
              h={"3rem"}
              border="2px"
              borderColor={"blue1.300"}
            />
            <InputRightElement
              width="4rem"
              h={"3rem"}
              children={
                <Button
                  colorScheme={"blue"}
                  h="3rem"
                  w="6rem"
                  p={2}
                  onClick={() => null}
                >
                  {isEditing ? (
                    <EditIcon onClick={editItem} />
                  ) : (
                    <AddIcon onClick={addtask} w={6} h={3} />
                  )}
                </Button>
              }
            />
          </InputGroup>
        </Center>
        <Center>
          <Box w="100%" p={4} color="blue1.300">
            {todoList.map((item: taskType) => {
              return (
                <TodoTask
                  task={item}
                  deleteTask={deleteTask}
                  onUpdateHandler={onUpdateHandler}
                />
              );
            })}
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
};

export default TodoCard;
