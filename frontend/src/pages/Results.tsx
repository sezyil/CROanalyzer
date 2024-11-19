import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Progress,
  Grid,
  GridItem,
  Button,
  Badge,
  Divider,
  useColorModeValue,
  Icon,
  HStack,
  Flex,
  Link
} from '@chakra-ui/react'
import { FaLock, FaExternalLinkAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface Metric {
  name: string
  score: number
  status: 'good' | 'warning' | 'poor'
  description: string
}

interface Recommendation {
  title: string
  description: string
  impact: 'High' | 'Medium' | 'Low'
  isPremium?: boolean
}

function Results() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const metrics: Metric[] = [
    {
      name: 'Page Load Speed',
      score: 85,
      status: 'good',
      description: 'Your page loads faster than 85% of tested websites'
    },
    {
      name: 'Mobile Responsiveness',
      score: 92,
      status: 'good',
      description: 'Your site is well-optimized for mobile devices'
    },
    {
      name: 'Call-to-Action Visibility',
      score: 65,
      status: 'warning',
      description: 'CTAs could be more prominent and strategically placed'
    }
  ]

  const recommendations: Recommendation[] = [
    {
      title: 'Optimize CTA Placement',
      description: 'Move primary CTAs above the fold and use contrasting colors',
      impact: 'High'
    },
    {
      title: 'Improve Form UX',
      description: 'Reduce form fields and add progress indicators',
      impact: 'Medium'
    },
    {
      title: 'Add Social Proof',
      description: 'Display customer testimonials and trust badges prominently',
      impact: 'High'
    },
    {
      title: 'Optimize Product Images',
      description: 'Use high-quality images and implement lazy loading',
      impact: 'Medium',
      isPremium: true
    },
    {
      title: 'Implement Exit Intent Popup',
      description: 'Capture leaving visitors with targeted offers',
      impact: 'High',
      isPremium: true
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green'
    if (score >= 60) return 'orange'
    return 'red'
  }

  const getStatusIcon = (status: Metric['status']) => {
    switch (status) {
      case 'good':
        return <Icon as={FaCheckCircle} color="green.500" />
      case 'warning':
        return <Icon as={FaTimesCircle} color="orange.500" />
      case 'poor':
        return <Icon as={FaTimesCircle} color="red.500" />
    }
  }

  const overallScore = 78

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* Overall Score Section */}
          <Box 
            w="full" 
            bg={cardBg} 
            p={8} 
            borderRadius="xl" 
            boxShadow="xl"
            textAlign="center"
          >
            <Heading size="lg" mb={6}>
              Your CRO Score
            </Heading>
            <Box position="relative" w="200px" h="200px" mx="auto" mb={6}>
              <CircularProgress value={overallScore} color={getScoreColor(overallScore)} />
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="4xl"
                fontWeight="bold"
              >
                {overallScore}
              </Text>
            </Box>
            <Text color="gray.600">
              Your website's conversion rate optimization score is {overallScore}/100
            </Text>
          </Box>

          {/* Metrics Grid */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} w="full">
            {metrics.map((metric, index) => (
              <GridItem
                key={index}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack justify="space-between" mb={4}>
                  <Heading size="sm">{metric.name}</Heading>
                  {getStatusIcon(metric.status)}
                </HStack>
                <Progress
                  value={metric.score}
                  colorScheme={getScoreColor(metric.score)}
                  mb={4}
                  borderRadius="full"
                />
                <Text fontSize="sm" color="gray.600">
                  {metric.description}
                </Text>
              </GridItem>
            ))}
          </Grid>

          {/* Recommendations Section */}
          <Box w="full" bg={cardBg} p={8} borderRadius="xl" boxShadow="xl">
            <Heading size="lg" mb={6}>
              Recommendations
            </Heading>
            <VStack spacing={6} align="stretch">
              {recommendations.map((rec, index) => (
                <Box
                  key={index}
                  p={6}
                  borderRadius="lg"
                  borderWidth={1}
                  borderColor="gray.200"
                  filter={rec.isPremium ? "blur(4px)" : "none"}
                  position="relative"
                >
                  {rec.isPremium && (
                    <Flex
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      justify="center"
                      align="center"
                      bg="blackAlpha.200"
                      borderRadius="lg"
                      zIndex={1}
                    >
                      <Icon as={FaLock} w={8} h={8} color="gray.500" />
                    </Flex>
                  )}
                  <HStack justify="space-between" mb={2}>
                    <Heading size="sm">{rec.title}</Heading>
                    <Badge
                      colorScheme={
                        rec.impact === 'High'
                          ? 'red'
                          : rec.impact === 'Medium'
                          ? 'orange'
                          : 'yellow'
                      }
                    >
                      {rec.impact} Impact
                    </Badge>
                  </HStack>
                  <Text color="gray.600">{rec.description}</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* CTA Section */}
          <Box
            w="full"
            bg="blue.500"
            color="white"
            p={8}
            borderRadius="xl"
            textAlign="center"
          >
            <Heading size="lg" mb={4}>
              Unlock All Recommendations
            </Heading>
            <Text fontSize="lg" mb={6}>
              Get access to our complete CRO guideline for DTC brands
            </Text>
            <Button
              size="lg"
              colorScheme="white"
              variant="outline"
              _hover={{ bg: 'whiteAlpha.200' }}
              rightIcon={<FaExternalLinkAlt />}
            >
              Buy Now - $19.90
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

const CircularProgress = ({ value, color }: { value: number; color: string }) => (
  <Box
    position="relative"
    w="100%"
    h="100%"
    borderRadius="full"
    border="16px solid"
    borderColor="gray.100"
    transform="rotate(-90deg)"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      borderRadius="full"
      border="16px solid"
      borderColor={`${color}.500`}
      clipPath={`polygon(0 0, 100% 0, 100% ${value}%, 0 ${value}%)`}
    />
  </Box>
)

export default Results
