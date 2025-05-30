import { Box, Button, Container, Heading, Input, Select, useColorModeValue, VStack, useToast } from '@chakra-ui/react'
import React, { use, useState } from 'react'
import { useTaskStore } from '../store/task';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    task_name:"",
    task_description: "",
    task_timelimit: "",
    task_priority: "",
    task_status: "",
  });

  const toast = useToast();
  const navigate = useNavigate();  // <-- initialize navigate

  const {createTask} = useTaskStore()

  const handleAddTask = async () => {

    const taskToSubmit = {
    ...newTask,
    task_priority: newTask.task_priority || "medium",
    task_status: newTask.task_status || "pending",
  };

    const {success, message} = await createTask(taskToSubmit);
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      })
      setNewTask({
        task_name:"",
        task_description: "",
        task_timelimit: "",
        task_priority: "",
        task_status: "",
      });
      // navigate('/');
    }
  }
    

  return (
    <Container maxW="container.sm">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>Create New Task</Heading>
        <Box w={"full"} gb={useColorModeValue("white", "gray.8  00")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack justifyContent="space-between" mb={4}>
            <Input 
                placeholder='Task Name'
                name='name'
                value={newTask.task_name}
                onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}/>
            <Input 
                placeholder='Task Description'
                name='Description'
                value={newTask.task_description}
                onChange={(e) => setNewTask({ ...newTask, task_description: e.target.value })}/>
            <Input 
                placeholder='Task Name'
                type='date'
                value={newTask.task_timelimit}
                onChange={(e) => setNewTask({ ...newTask, task_timelimit: e.target.value })}/>
            <Select
              placeholder="Select Priority"
              value={newTask.task_priority}
              onChange={(e) =>
                setNewTask({ ...newTask, task_priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Select
              placeholder="Select Status"
              value={newTask.task_status}
              onChange={(e) =>
                setNewTask({ ...newTask, task_status: e.target.value })
              }
            >
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </Select>
            <Button colorScheme='blue' onClick={handleAddTask} w='full'>Add Task</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage