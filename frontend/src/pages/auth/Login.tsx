import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Link as ChakraLink,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (!success) {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } else {
        navigate('/dashboard')
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Google Login Failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={20}>
      <Container maxW="lg">
        <VStack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Heading 
              fontSize="4xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Welcome Back
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Log in to access your CRO insights
            </Text>
          </VStack>

          <Box
            w="full"
            bg={bgColor}
            rounded="xl"
            boxShadow="2xl"
            p={8}
            borderWidth={1}
            borderColor={borderColor}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    size="lg"
                    bg={bgColor}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      bg={bgColor}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Logging in..."
                  height="54px"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Log In
                </Button>

                <Text textAlign="center" color="gray.500">
                  or
                </Text>

                <Button
                  width="full"
                  height="54px"
                  fontSize="md"
                  leftIcon={<FaGoogle />}
                  onClick={handleGoogleLogin}
                  isLoading={isLoading}
                  variant="outline"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bg: 'gray.50'
                  }}
                  transition="all 0.2s"
                >
                  Continue with Google
                </Button>
              </VStack>
            </form>
          </Box>

          <Flex gap={2} fontSize="md">
            <Text color="gray.600">Don't have an account?</Text>
            <ChakraLink
              as={Link}
              to="/signup"
              color="blue.500"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              Sign up
            </ChakraLink>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default Login
