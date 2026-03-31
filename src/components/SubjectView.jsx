import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack, SimpleGrid, Icon, Flex } from '@chakra-ui/react';
import { FaArrowLeft } from "react-icons/fa";
import { subjectsData } from '../data/subjects';

export default function SubjectView() {
    const { subjectId } = useParams();
    const navigate = useNavigate();

    const subject = subjectsData.find(s => s.id === subjectId);

    if (!subject) return <Text p={5}>Asignatura no encontrada.</Text>;

    return (
        <VStack spacing={{ base: 8, md: 10 }} align="stretch" mt={{ base: 2, md: 8 }} maxW="1000px" mx="auto">
            
            <Button 
                leftIcon={<FaArrowLeft />} 
                variant="ghost" 
                onClick={() => navigate('/')} 
                alignSelf="flex-start"
                color="gray.600"
                size="lg"
            >
                Volver a Especialidades
            </Button>

            <Flex align="center" gap={4} borderBottom="2px solid" borderColor="gray.100" pb={6} px={{base: 2, md: 0}}>
                <Icon as={subject.icon} color="brand.500" boxSize={{ base: 10, md: 12 }} />
                <Heading as="h2" size={{ base: "xl", md: "2xl" }} color="brand.900" fontWeight="extrabold">
                    {subject.name}
                </Heading>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 5, md: 6 }} px={{base: 2, md: 0}}>
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
                        whiteSpace="normal"
                        textAlign="left"
                        _hover={{ 
                            bg: 'brand.50', 
                            borderColor: 'brand.500',
                            transform: 'translateY(-3px)', 
                            shadow: 'md' 
                        }}
                        transition="all 0.2s"
                        onClick={() => navigate(`/test/${subject.id}/${test.id}`)}
                        justifyContent="flex-start"
                        width="full"
                    >
                        <VStack align="flex-start" spacing={1} width="full">
                            <Text fontWeight="bold" fontSize="lg" color="brand.800">Tema {test.id}</Text>
                            <Text fontSize="sm" fontWeight="medium" color="gray.700" lineHeight="tall">
                                {test.name}
                            </Text>
                        </VStack>
                    </Button>
                ))}
            </SimpleGrid>
        </VStack>
    );
}