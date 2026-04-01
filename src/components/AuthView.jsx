import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Button, VStack, Text, Heading, Input, useToast, Card, CardBody } from '@chakra-ui/react';

export default function AuthView() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login, signup } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            const esValido = /^[a-zA-Z0-9]+$/.test(username);
            
            if (!esValido) {
                toast({ 
                    title: "Formato incorrecto", 
                    description: "El nombre de usuario solo puede contener letras y números (sin espacios ni caracteres especiales).", 
                    status: "warning", 
                    duration: 5000,
                    isClosable: true
                });
                return;
            }
        }

        setLoading(true);
        try {
            if (isLogin) {
                await login(username, password);
                toast({ title: "Sesión iniciada", status: "success", duration: 2000 });
            } else {
                await signup(username, password);
                toast({ title: "Cuenta creada con éxito", status: "success", duration: 2000 });
            }
            navigate('/'); 
        } catch (error) {
            if (isLogin) {
                toast({ 
                    title: "Acceso denegado", 
                    description: "Usuario/Contraseña incorrectos. Pruebe de nuevo.", 
                    status: "error", 
                    duration: 4000,
                    isClosable: true
                });
            } else {
                toast({ 
                    title: "Error en el registro", 
                    description: "El nombre de usuario ya está en uso o ha ocurrido un problema.", 
                    status: "error", 
                    duration: 4000,
                    isClosable: true
                });
            }
        }
        setLoading(false);
    };

    return (
        <VStack spacing={8} align="center" mt={{ base: 10, md: 20 }}>
            <Card width="full" maxW="400px" borderRadius="2xl" shadow="xl">
                <CardBody p={8}>
                    <Heading size="lg" textAlign="center" color="brand.800" mb={6}>
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </Heading>
                    
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} width="full">
                            
                            <Box width="full">
                                <Input 
                                    type="text" 
                                    placeholder="Nombre de usuario" 
                                    size="lg"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isRequired 
                                />

                                {!isLogin && (
                                    <Text fontSize="xs" color="gray.500" mt={1} ml={1}>
                                        Solo letras y números. Sin espacios ni caracteres especiales.
                                    </Text>
                                )}
                            </Box>

                            <Box width="full">
                                <Input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    size="lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isRequired 
                                />

                                {!isLogin && (
                                    <Text fontSize="xs" color="gray.500" mt={1} ml={1}>
                                        Debe tener al menos 6 caracteres.
                                    </Text>
                                )}
                            </Box>

                            <Button 
                                type="submit" 
                                colorScheme="brand" 
                                size="lg" 
                                width="full" 
                                isLoading={loading}
                                mt={2}
                            >
                                {isLogin ? 'Entrar' : 'Registrarse'}
                            </Button>
                        </VStack>
                    </form>

                    <Text textAlign="center" mt={6} color="gray.600">
                        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                        <Button variant="link" colorScheme="brand" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                        </Button>
                    </Text>
                </CardBody>
            </Card>
        </VStack>
    );
}