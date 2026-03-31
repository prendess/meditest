import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Icon, Container, Link, Text, VStack } from '@chakra-ui/react';
import { FaNotesMedical } from "react-icons/fa";
import Home from './components/Home';
import TestViewer from './components/TestViewer';
import SubjectView from './components/SubjectView';

const Header = () => (
    <Box 
        bgGradient="linear(to-r, brand.500, brand.600)" 
        py={{ base: 3, md: 4 }} 
        shadow="md" 
        position="sticky" 
        top={0} 
        zIndex={10}
    >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none', opacity: 0.9 }} transition="opacity 0.2s">
                <Flex align="center" gap={3} display="inline-flex">
                    <Icon as={FaNotesMedical} color="white" boxSize={{ base: 6, md: 8 }} />
                    <Heading size={{ base: "md", md: "lg" }} color="white" letterSpacing="tight">
                        MediTest
                    </Heading>
                </Flex>
            </Link>
        </Container>
    </Box>
);

const Footer = () => (
    <Box bg="white" py={8} mt="auto" borderTop="1px" borderColor="gray.200">
        <Container maxW="container.xl">
            <VStack spacing={2} textAlign="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    © {new Date().getFullYear()} Hugo Prendes Menéndez. Todos los derechos reservados.
                </Text>
                <Text fontSize="xs" color="gray.500" fontStyle="italic" maxW="600px">
                    Aviso legal: Esta plataforma tiene un propósito exclusivamente educativo. 
                    La información contenida no debe ser utilizada para diagnóstico o tratamiento médico real.
                </Text>
            </VStack>
        </Container>
    </Box>
);

function App() {
    return (
        <Box minH="100vh" bg="gray.50" position="relative" overflow="hidden" display="flex" flexDirection="column">
            <Box position="absolute" top="-5%" left="-5%" width={{ base: "200px", md: "400px" }} height={{ base: "200px", md: "400px" }} bg="brand.200" borderRadius="full" filter="blur(80px)" opacity="0.4" zIndex={0} pointerEvents="none" />
            <Box position="absolute" bottom="10%" right="-5%" width={{ base: "250px", md: "500px" }} height={{ base: "250px", md: "500px" }} bg="brand.100" borderRadius="full" filter="blur(100px)" opacity="0.6" zIndex={0} pointerEvents="none" />

            <Header />
            
            <Container maxW="container.xl" py={{ base: 6, md: 10 }} px={{ base: 4, md: 8 }} position="relative" zIndex={1} flex="1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/subject/:subjectId" element={<SubjectView />} />
                    <Route path="/test/:subject/:testId" element={<TestViewer />} />
                </Routes>
            </Container>

            <Footer />
        </Box>
    );
}

export default App;