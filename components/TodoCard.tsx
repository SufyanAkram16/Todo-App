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
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { ChangeEvent, useState, useEffect } from "react";
import TodoTask from "./TodoTask";

export type taskType = {
  name: string;
  id: string;
};

const TodoCard = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<taskType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevId, setPrevId] = useState(String);

  useEffect(() => {
    getData();
  }, []);

  const addtask = async () => {
    const newDoc = {
      name: task,
    };

    if (task) {
      try {
        const docRef = await addDoc(collection(db, "TodoList"), newDoc);
        console.log("Document written with ID: ", docRef.id);
        setTodoList([...todoList, { ...newDoc, id: docRef.id }]);
        setTask("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("fill data");
    }
  };

  const deleteTask = async (item: taskType) => {
    try {
      await deleteDoc(doc(db, "TodoList", item.id));
      let filteredTodos = todoList.filter(
        (elem: taskType) => item.id !== elem.id
      );
      setTodoList(filteredTodos);
      console.log("item deleted");
    } catch (error) {
      alert(error);
    }
  };

  const onUpdateHandler = (item: taskType) => {
    console.log("user want to update this item", item);
    setPrevId(item.id);
    setTask(item.name);
    setIsEditing(true);
  };

  const getData = async () => {
    try {
      const getTodos = await getDocs(collection(db, "TodoList"));
      let todoData: taskType[] = [];
      getTodos.forEach((doc) => {
        todoData.push({
          name: doc.data()?.name,
          id: doc.id,
        });
      });

      setTodoList(todoData);
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = () => {
    const newData = {
      name: task,
    };

    try {
      todoList.forEach(async (todo: taskType) => {
        if (prevId === todo.id) {
          const docRef = await doc(db, "TodoList", todo.id);
          setDoc(docRef, { ...newData });
        }
      });
    } catch (error) {
      console.log(error);
    }

    let updatedTodos = todoList.map((todo: taskType) => {
      const newData = {
        name: task,
        id: prevId,
      };

      if (prevId === todo.id) {
        return newData;
      } else {
        return todo;
      }
    });

    setIsEditing(false);
    setTodoList(updatedTodos);
    setTask("");
  };

  return (
    <Flex
      height="100vh"
      alignItems={"center"}
      justifyContent="center"
      width="auto"
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

        <Center mb={1}>
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
              width="3rem"
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
          <Box width ={'100%'} p={4} color="blue1.300">
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
