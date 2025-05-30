import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTaskStore } from '../store/task'
import TaskCard from '../components/TaskCard'
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const {fetchTasks,tasks} = useTaskStore();
  const location = useLocation();
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks,location.pathname]);
  console.log("Tasks:", tasks);
  return (
    <Container maxW="container.md" py={12}>
        <VStack spacing={6}>
          <Text 
            fontSize={"30"}
            fontWeight="bold" 
            bgGradient={`linear(to-r, teal.500, blue.500)`}
            bgClip="text"
            textAlign="center">
              Create Task 🚀
          </Text>

          <SimpleGrid column={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
            {tasks
              .filter(task => task && task._id) // only valid tasks with _id
              .map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}

          </SimpleGrid>

          {tasks.length === 0 && (
            <Text fontSize="xl" color="gray.500" textAlign="center">
              No tasks available. Please <Link to={"/create"}>
              <Text as="span" color="teal.500" _hover={{textDecoration: 'underline'}}>create a new task</Text>
              </Link>.
            </Text>
          )}
        </VStack>
    </Container>
  )
}

export default HomePage