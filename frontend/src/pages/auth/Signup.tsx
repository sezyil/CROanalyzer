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
  Checkbox,
  HStack,
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Signup() {
  const { signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to continue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    
    try {
      const success = await signup(email, password, companyName)
      if (!success) {
        toast({
          title: 'Signup Failed',
          description: 'Please check your information and try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } else {
        navigate('/dashboard')
        toast({
          title: 'Account Created',
          description: 'Welcome to CRO Analyzer!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during signup',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    if (!acceptTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to continue.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Google Signup Failed',
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
              Create Your Account
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Join the leading DTC brands using CRO Analyzer
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
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your Company Name"
                    size="lg"
                    bg={bgColor}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Work Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
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
                      placeholder="Create a strong password"
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

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      bg={bgColor}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Checkbox
                  isChecked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  size="lg"
                  colorScheme="blue"
                >
                  <Text fontSize="sm">
                    I agree to the{' '}
                    <ChakraLink
                      color="blue.500"
                      href="/terms"
                      isExternal
                      _hover={{ textDecoration: 'underline' }}
                    >
                      Terms of Service
                    </ChakraLink>
                    {' '}and{' '}
                    <ChakraLink
                      color="blue.500"
                      href="/privacy"
                      isExternal
                      _hover={{ textDecoration: 'underline' }}
                    >
                      Privacy Policy
                    </ChakraLink>
                  </Text>
                </Checkbox>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Creating Account..."
                  height="54px"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Create Account
                </Button>

                <Text textAlign="center" color="gray.500">
                  or
                </Text>

                <Button
                  width="full"
                  height="54px"
                  fontSize="md"
                  leftIcon={<FaGoogle />}
                  onClick={handleGoogleSignup}
                  isLoading={isLoading}
                  variant="outline"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bg: 'gray.50'
                  }}
                  transition="all 0.2s"
                >
                  Sign up with Google
                </Button>
              </VStack>
            </form>
          </Box>

          <Flex gap={2} fontSize="md">
            <Text color="gray.600">Already have an account?</Text>
            <ChakraLink
              as={Link}
              to="/login"
              color="blue.500"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              Log in
            </ChakraLink>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default Signup
