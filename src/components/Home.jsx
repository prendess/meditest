import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Card, CardHeader, Icon, Flex } from '@chakra-ui/react';
import { FaChevronRight } from "react-icons/fa";
import { subjectsData } from '../data/subjects';

export default function Home() {
    const navigate = useNavigate();

    return (
        <VStack spacing={{ base: 10, md: 16 }} align="center" mt={{ base: 4, md: 8 }}>
            <Box textAlign="center" px={{ base: 2, md: 0 }}>
                <Heading as="h1" size={{ base: "2xl", md: "3xl" }} color="brand.800" fontWeight="extrabold" mb={4} letterSpacing="tight">
                    Bienvenidos a MediTest
                </Heading>
                <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.700" maxW="700px" fontWeight="normal">
                    Selecciona una especialidad médica y pon a prueba tus conocimientos.
                </Text>
            </Box>

            <VStack spacing={6} width="full" maxW="800px" px={{ base: 4, lg: 0 }}>
                {subjectsData.map((subject) => (
                    <Card 
                        key={subject.id} 
                        variant="elevated"
                        bg="white" 
                        shadow="xl" 
                        borderRadius="2xl"
                        width="full"
                        borderLeft="8px solid"
                        borderLeftColor="brand.500"
                        cursor="pointer"
                        onClick={() => navigate(`/subject/${subject.id}`)}
                        transition="transform 0.2s ease, shadow 0.2s ease"
                        _hover={{ transform: 'translateY(-3px)', shadow: '2xl', bg: "gray.50" }}
                    >
                        <CardHeader py={6} px={{ base: 6, md: 8 }}>
                            <Flex align="center" justify="space-between" width="full">
                                <Flex align="center" gap={5}>
                                    <Icon as={subject.icon} color="brand.500" boxSize={{ base: 8, md: 10 }} />
                                    <Box>
                                        <Heading size={{ base: "lg", md: "xl" }} color="brand.900" fontWeight="bold">
                                            {subject.name}
                                        </Heading>
                                        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }} mt={1}>
                                            {subject.tests.length} temas disponibles
                                        </Text>
                                    </Box>
                                </Flex>
                                <Icon as={FaChevronRight} color="gray.400" boxSize={6} />
                            </Flex>
                        </CardHeader>
                    </Card>
                ))}
            </VStack>
        </VStack>
    );
}