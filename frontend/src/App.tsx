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
  useToast
} from '@chakra-ui/react'

function App() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: 'URL Required',
        description: 'Please enter a URL to analyze',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      setIsLoading(true)
      // TODO: API call will be implemented here
      toast({
        title: 'Analysis Started',
        description: 'Your website is being analyzed',
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start analysis',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            CRO Analyzer
          </Heading>
          <Heading as="h2" size="md" color="gray.600" fontWeight="normal">
            Analyze your website for conversion rate optimization opportunities
          </Heading>
        </Box>

        <Box w="full" maxW="xl" p={8} borderRadius="lg" borderWidth={1}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Website URL</FormLabel>
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
              />
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={handleAnalyze}
              isLoading={isLoading}
              loadingText="Analyzing..."
            >
              Analyze Website
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
