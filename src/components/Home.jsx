import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, Stack, Icon, Flex } from '@chakra-ui/react';
import { FaStethoscope } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();

    const subjects = [
        {
            id: 'dermatologia',
            name: 'Dermatología',
            tests: [
                { id: 1, name: 'Generalidades' },
                { id: 2, name: 'Patología Benigna' },
                { id: 3, name: 'Patología Maligna' },
            ]
        },
        {
            id: 'pediatria',
            name: 'Pediatría',
            tests: [
                { id: 1, name: 'Conceptos Básicos' }, 
                { id: 2, name: 'Defectos y Enfermedades Congénitas' },
                { id: 3, name: 'Dificultad Respiratoria Neonatal' },
            ]
        }
    ];

    return (
        <VStack spacing={{ base: 10, md: 16 }} align="center" mt={{ base: 4, md: 8 }}>
            <Box textAlign="center" px={{ base: 2, md: 0 }}>
                <Heading as="h1" size={{ base: "2xl", md: "3xl" }} color="brand.800" fontWeight="extrabold" mb={4} letterSpacing="tight">
                    Bienvenidos a MediTest
                </Heading>
                <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.700" maxW="700px" fontWeight="normal">
                    Selecciona una especialidad médica y pon a prueba tus conocimientos con nuestros tests estructurados.
                </Text>
            </Box>

            <VStack spacing={10} width="full" px={{ base: 0, lg: 10 }}>
                {subjects.map((subject) => (
                    <Card 
                        key={subject.id} 
                        variant="elevated"
                        bg="white" 
                        shadow="2xl" 
                        borderRadius="3xl"
                        width="full"
                        borderTop="8px solid"
                        borderTopColor="brand.500"
                        overflow="hidden"
                        transition="transform 0.3s ease, shadow 0.3s ease"
                        _hover={{ transform: 'translateY(-5px)', shadow: 'dark-lg' }}
                    >
                        <CardHeader bg="white" pt={8} pb={2} px={{ base: 6, md: 10 }}>
                            <Flex align="center" gap={5}>
                                <Icon as={FaStethoscope} color="brand.500" boxSize={{ base: 10, md: 12 }} />
                                <Box>
                                    <Heading size={{ base: "xl", md: "2xl" }} color="brand.900" fontWeight="extrabold">
                                        {subject.name}
                                    </Heading>
                                    <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} mt={1}>
                                        {subject.tests.length} temas disponibles para evaluación
                                    </Text>
                                </Box>
                            </Flex>
                        </CardHeader>
                        
                        <CardBody p={{ base: 6, md: 10 }} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
                            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 5, md: 6 }}>
                                {subject.tests.map((test) => (
                                    <Button
                                        key={test.id}
                                        colorScheme="brand"
                                        variant="outline"
                                        size="lg"
                                        h="auto"
                                        py={6}
                                        px={5}
                                        borderRadius="2xl"
                                        borderWidth="2px"
                                        _hover={{ 
                                            bg: 'brand.100', 
                                            borderColor: 'brand.500',
                                            transform: 'translateY(-3px)', 
                                            shadow: 'md' 
                                        }}
                                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                        onClick={() => navigate(`/test/${subject.id}/${test.id}`)}
                                        justifyContent="flex-start"
                                    >
                                        <Stack align="flex-start" spacing={1} textAlign="left">
                                            <Text fontWeight="bold" fontSize="lg" color="brand.800">Tema {test.id}</Text>
                                            <Text fontSize="sm" fontWeight="medium" color="gray.700" noOfLines={1}>
                                                {test.name}
                                            </Text>
                                        </Stack>
                                    </Button>
                                ))}
                            </SimpleGrid>
                        </CardBody>
                    </Card>
                ))}
            </VStack>
        </VStack>
    );
}