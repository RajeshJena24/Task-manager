import { Box, Button, Heading, HStack, useColorModeValue, useDisclosure, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, VStack, Select, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTaskStore } from '../store/task';

const TaskCard = ({task}) => {
    const [updatedTask, setUpdateTask] = useState(task);
    const textColor = useColorModeValue('gray.800', 'gray.900');
    const bg = useColorModeValue('white', 'gray.800');
    const {updateTask, deleteTask} = useTaskStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleUpdateTask = async () => {
        const {success, message} = await updateTask(task._id, updatedTask);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message || "Failed to update task",
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message || "Task updated successfully",
                status: "success",
                isClosable: true,
            });
        }
    };

    const handleDeleteTask = async () => {
        const {success, message} = await deleteTask(task._id);
        if(!success) {
            toast({
                title: "Error",
                description: message || "Failed to delete task",
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message || "Task deleted successfully",
                status: "success",
                isClosable: true,
            });
        }
    };

  return (
    <Box
      shadow='lg'
      rounded='lg'  
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translate(-5px)', shadow: 'xl' }}
      bg={bg}>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {task.task_name}
            </Heading>
            <Text fontWeight='bold  ' color={textColor} mb={4}>
                {task.task_description}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
                Time Limit: {task.task_timelimit || "N/A"}
            </Text>

            <Text fontSize="sm" color="gray.500">
                Priority: {task.task_priority || "N/A"}
            </Text>

            <Text fontSize="sm" color="gray.500" mb={4}>
                Status: {task.task_status || "N/A"}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<MdDelete />} onClick={handleDeleteTask} colorScheme='red' />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Task Name'
                            name='name'
                            value={updatedTask.task_name}
                            onChange={(e) => setUpdateTask({ ...updatedTask, task_name: e.target.value })} />
                        <Input
                            placeholder='Task Description'
                            name='Description'
                            value={updatedTask.task_description}
                            onChange={(e) => setUpdateTask({ ...updatedTask, task_description: e.target.value })} />
                        <Input      
                            placeholder='Task Time Limit'
                            type='date'
                            value={updatedTask.task_timelimit}
                            onChange={(e) => setUpdateTask({ ...updatedTask, task_timelimit: e.target.value })}/>
                        <Select
                            placeholder="Select Priority"
                            value={updatedTask.task_priority}
                            onChange={(e) =>
                            setUpdateTask({ ...updatedTask, task_priority: e.target.value })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Select>
                        <Select
                            placeholder="Select Status"
                            value={updatedTask.task_status}
                            onChange={(e) =>
                            setUpdateTask({ ...updatedTask, task_status: e.target.value })}>
                            <option value="pending">pending</option>
                            <option value="in-progress">in-progress</option>
                            <option value="completed">completed</option>
                        </Select>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default TaskCard