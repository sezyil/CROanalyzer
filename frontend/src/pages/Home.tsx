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
  Grid,
  GridItem,
  Icon,
  useToast,
  HStack,
  Image
} from '@chakra-ui/react'
import { FaSearch, FaChartLine, FaLightbulb } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { analyzeWebsite } from '../services/analysisService'

const features = [
  {
    icon: FaSearch,
    title: 'Comprehensive Analysis',
    description: 'Deep dive into your DTC website performance with our advanced CRO metrics'
  },
  {
    icon: FaChartLine,
    title: 'Performance Score',
    description: 'Get a clear CRO score out of 100 to understand where you stand'
  },
  {
    icon: FaLightbulb,
    title: 'Actionable Insights',
    description: 'Receive detailed recommendations to boost your conversion rate'
  }
]

function Home() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

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
      const data = await analyzeWebsite(url)
      localStorage.setItem('analysisResults', JSON.stringify(data))
      navigate('/results')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze website. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Analysis error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <Box textAlign="center" w="full">
            <Heading 
              as="h1" 
              size="2xl" 
              mb={6}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              CRO Analyzer for DTC Brands
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" mb={12}>
              Boost your DTC website's conversion rate with our AI-powered analysis tool.
              Get instant insights and actionable recommendations.
            </Text>

            <Box 
              w="full" 
              maxW="2xl" 
              mx="auto" 
              p={8} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="xl"
              borderWidth={1}
              borderColor="gray.100"
            >
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel fontSize="lg">Enter Your Website URL</FormLabel>
                  <Input
                    size="lg"
                    placeholder="https://yourdtcbrand.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    bg="white"
                    borderWidth={2}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px blue.400"
                    }}
                  />
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  height="60px"
                  onClick={handleAnalyze}
                  isLoading={isLoading}
                  loadingText="Analyzing..."
                  fontSize="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Analyze Now
                </Button>
              </VStack>
            </Box>
          </Box>

          {/* Features Section */}
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
            gap={8}
            w="full"
          >
            {features.map((feature, index) => (
              <GridItem 
                key={index}
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                }}
              >
                <Icon 
                  as={feature.icon} 
                  w={10} 
                  h={10} 
                  color="blue.400" 
                  mb={4}
                />
                <Heading as="h3" size="md" mb={4}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">
                  {feature.description}
                </Text>
              </GridItem>
            ))}
          </Grid>

          {/* Trust Indicators */}
          <Box textAlign="center" w="full">
            <Text fontSize="sm" color="gray.500" mb={4}>
              TRUSTED BY LEADING DTC BRANDS
            </Text>
            <HStack spacing={8} justify="center" wrap="wrap">
              <Image h="30px" opacity={0.5} src="/brand1-logo.png" alt="Brand 1" />
              <Image h="30px" opacity={0.5} src="/brand2-logo.png" alt="Brand 2" />
              <Image h="30px" opacity={0.5} src="/brand3-logo.png" alt="Brand 3" />
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home
