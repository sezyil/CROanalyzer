import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Progress,
  Button,
  useToast,
  Badge,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  HStack,
} from '@chakra-ui/react'
import { FaCheckCircle, FaExclamationTriangle, FaArrowLeft, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface AnalysisResult {
  overallScore: number
  metrics: {
    name: string
    score: number
    description: string
    status: 'good' | 'warning' | 'poor'
  }[]
  recommendations: {
    title: string
    description: string
    isPremium: boolean
  }[]
}

function Results() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const storedResults = localStorage.getItem('analysisResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      toast({
        title: 'No Results Found',
        description: 'Please analyze a website first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      navigate('/')
    }
  }, [navigate, toast])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green'
    if (score >= 60) return 'yellow'
    return 'red'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return FaCheckCircle
      case 'warning':
      case 'poor':
        return FaExclamationTriangle
      default:
        return FaCheckCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'green'
      case 'warning':
        return 'yellow'
      case 'poor':
        return 'red'
      default:
        return 'gray'
    }
  }

  if (!results) {
    return null
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              onClick={() => navigate('/')}
              mb={4}
            >
              Back to Analysis
            </Button>
            <Heading size="xl" mb={2}>Website Analysis Results</Heading>
            <Text color="gray.600">
              Here's a comprehensive analysis of your website's conversion rate optimization potential.
            </Text>
          </Box>

          {/* Overall Score */}
          <Box bg="white" p={8} borderRadius="xl" boxShadow="md">
            <VStack spacing={4} align="center">
              <Heading size="md">Overall CRO Score</Heading>
              <Box position="relative" w="200px" h="200px">
                <Progress
                  value={results.overallScore}
                  size="lg"
                  thickness="12px"
                  colorScheme={getScoreColor(results.overallScore)}
                  borderRadius="full"
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  <Heading size="3xl">{results.overallScore}</Heading>
                  <Text textAlign="center">out of 100</Text>
                </Box>
              </Box>
            </VStack>
          </Box>

          {/* Metrics Grid */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {results.metrics.map((metric, index) => (
              <GridItem key={index}>
                <Box bg="white" p={6} borderRadius="lg" boxShadow="md" h="full">
                  <VStack spacing={4} align="stretch">
                    <Heading size="sm">{metric.name}</Heading>
                    <Progress
                      value={metric.score}
                      size="sm"
                      colorScheme={getScoreColor(metric.score)}
                    />
                    <Badge
                      colorScheme={getStatusColor(metric.status)}
                      alignSelf="flex-start"
                    >
                      <Icon as={getStatusIcon(metric.status)} mr={2} />
                      {metric.status.toUpperCase()}
                    </Badge>
                    <Text fontSize="sm" color="gray.600">
                      {metric.description}
                    </Text>
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>

          {/* Recommendations */}
          <Box bg="white" p={8} borderRadius="xl" boxShadow="md">
            <Heading size="md" mb={6}>Recommendations</Heading>
            <List spacing={4}>
              {results.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <Box
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: 'gray.50' }}
                  >
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">{rec.title}</Heading>
                      {rec.isPremium && (
                        <Badge colorScheme="purple">
                          <Icon as={FaLock} mr={1} />
                          Premium
                        </Badge>
                      )}
                    </HStack>
                    <Text color="gray.600">{rec.description}</Text>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Results
