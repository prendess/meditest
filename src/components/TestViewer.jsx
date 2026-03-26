import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, Button, VStack, Text, RadioGroup, Radio, Heading, useToast, 
    Card, CardHeader, CardBody, Progress, Alert, AlertIcon, AlertTitle, AlertDescription, Flex 
} from '@chakra-ui/react';
import { parseTestFile } from '../utils/parser';

const subjectNames = {
    dermatologia: "Dermatología",
    pediatria: "Pediatría"
};

const filePrefixes = {
    dermatologia: "derma",
    pediatria: "pedia"
};

export default function TestViewer() {
    const { subject, testId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const prefix = filePrefixes[subject] || subject;
        const fileUrl = `${import.meta.env.BASE_URL}data/${subject}/${prefix}_${testId}.txt`;
        
        fetch(fileUrl)
            .then(res => {
                if (res.headers.get('content-type')?.includes('text/html')) {
                    throw new Error("No se encontró el archivo del test.");
                }
                return res.text();
            })
            .then(text => {
                const parsed = parseTestFile(text);
                setQuestions(parsed);
            })
            .catch(err => {
                console.error("Error cargando el test:", err);
                setErrorMsg(err.message);
            });
    }, [subject, testId]);

    const handleAnswer = (qIndex, oIndex) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qIndex]: parseInt(oIndex) }));
    };

    const checkTest = () => {
        if (Object.keys(answers).length < questions.length) {
            toast({
                title: "Faltan preguntas",
                description: `Debes responder las ${questions.length} preguntas. Has respondido ${Object.keys(answers).length}.`,
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        setIsSubmitted(true);
    };

    const resetTest = () => {
        setAnswers({}); 
        setIsSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (errorMsg) return <Text p={5} color="red.500">Error: {errorMsg}</Text>;
    if (questions.length === 0) return <Text p={5}>Cargando test...</Text>;

    const progressValue = (Object.keys(answers).length / questions.length) * 100;
    const numCorrect = questions.reduce((acc, q, index) => acc + (answers[index] === q.correctIndex ? 1 : 0), 0);
    const score = ((numCorrect / questions.length) * 10).toFixed(2);
    
    const displayName = subjectNames[subject] || subject;

    return (
        <VStack spacing={{ base: 6, md: 8 }} maxW="900px" mx="auto" mt={{ base: 2, md: 8 }}>
            <Card width="full" bg="white" p={{ base: 4, md: 6 }} borderRadius="2xl" variant="outline" shadow="sm">
                <Heading size={{ base: "lg", md: "xl" }} color="brand.700" mb={4} textAlign="center">
                    {displayName} - Tema {testId}
                </Heading>
                
                <Box borderTopWidth="1px" pt={4} borderColor="gray.100">
                    <Progress value={progressValue} colorScheme="brand" size={{ base: "md", md: "lg" }} borderRadius="lg" mb={2} bg="gray.100" />
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center" fontWeight="bold">
                        Pregunta {Object.keys(answers).length} de {questions.length} respondidas
                    </Text>
                </Box>
            </Card>

            <VStack spacing={{ base: 6, md: 8 }} align="stretch" width="full">
                {questions.map((q, qIndex) => (
                    <Card 
                        key={qIndex} 
                        bg="white" 
                        borderRadius="xl" 
                        variant="outline" 
                        borderColor="gray.200"
                        shadow="sm"
                    >
                        <CardHeader bg="white" borderTopRadius="xl" pb={4} pt={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
                            <Text fontWeight="extrabold" fontSize={{ base: "lg", md: "xl" }} color="gray.800">
                                {qIndex + 1}. {q.question}
                            </Text>
                        </CardHeader>
                        
                        <CardBody p={{ base: 4, md: 6 }} pt={0}>
                            <RadioGroup 
                                onChange={(val) => handleAnswer(qIndex, val)} 
                                value={answers[qIndex] !== undefined ? answers[qIndex].toString() : ""}
                            >
                                <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                                    {q.options.map((opt, oIndex) => {
                                        let bgColor = "gray.50"; 
                                        let borderColor = "gray.300";
                                        let isCorrect = q.correctIndex === oIndex;
                                        let isSelected = answers[qIndex] === oIndex;

                                        if (isSubmitted) {
                                            if (isCorrect) {
                                                bgColor = "green.100";
                                                borderColor = "green.500";
                                            } else if (isSelected && !isCorrect) {
                                                bgColor = "red.100";
                                                borderColor = "red.500";
                                            }
                                        } else if (isSelected) {
                                            bgColor = "brand.50";
                                            borderColor = "brand.500";
                                        }

                                        return (
                                            <Box 
                                                key={oIndex} 
                                                bg={bgColor} 
                                                p={{ base: 3, md: 4 }} 
                                                borderRadius="lg"
                                                as="label" 
                                                display="flex"
                                                alignItems="center"
                                                cursor={isSubmitted ? "default" : "pointer"}
                                                transition="all 0.2s"
                                                _hover={!isSubmitted && !isSelected ? { bg: "gray.100", borderColor: "gray.400" } : {}}
                                                borderWidth="2px"
                                                borderColor={borderColor}
                                            >
                                                <Radio 
                                                    value={oIndex.toString()} 
                                                    isDisabled={isSubmitted} 
                                                    colorScheme="brand"
                                                    size={{ base: "md", md: "lg" }}
                                                    mt={0.5} 
                                                >
                                                    <Text ml={{ base: 2, md: 3 }} fontSize={{ base: "md", md: "lg" }} fontWeight={isSelected ? "semibold" : "normal"} color="gray.800">
                                                        {opt}
                                                    </Text>
                                                </Radio>
                                            </Box>
                                        );
                                    })}
                                </VStack>
                            </RadioGroup>
                        </CardBody>
                    </Card>
                ))}
            </VStack>

            {isSubmitted && (
                <Alert status={score >= 5 ? "success" : "error"} variant="solid" borderRadius="xl" p={{ base: 4, md: 6 }}>
                    <AlertIcon boxSize={{ base: 6, md: 8 }} />
                    <Box>
                        <AlertTitle fontSize={{ base: "lg", md: "xl" }}>¡Test Completado!</AlertTitle>
                        <AlertDescription fontSize={{ base: "md", md: "lg" }}>
                            Has acertado {numCorrect} de {questions.length} preguntas.
                            <Text fontWeight="extrabold" display={{ base: "block", sm: "inline" }}> Tu nota es: {score} / 10</Text>
                        </AlertDescription>
                    </Box>
                </Alert>
            )}

            <Flex 
                mt={4} 
                width="full" 
                direction={{ base: 'column-reverse', md: 'row' }} 
                justifyContent="space-between" 
                gap={4}
                pb={12}
            >
                <Button variant="ghost" size="lg" width={{ base: "full", md: "auto" }} onClick={() => navigate('/')}>
                    Volver al inicio
                </Button>
                
                {!isSubmitted ? (
                    <Button colorScheme="brand" size="lg" width={{ base: "full", md: "auto" }} onClick={checkTest}>
                        Comprobar Test
                    </Button>
                ) : (
                    <Button colorScheme="blue" size="lg" width={{ base: "full", md: "auto" }} onClick={resetTest}>
                        Reiniciar Test
                    </Button>
                )}
            </Flex>
        </VStack>
    );
}