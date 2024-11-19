import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Badge,
  Icon,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FaSearch,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaCaretDown,
  FaPlus,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface AnalysisResult {
  url: string
  date: string
  score: number
  metrics: {
    name: string
    value: number
    change: number
  }[]
}

function Dashboard() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResult[]>([])
  const toast = useToast()
  const navigate = useNavigate()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    // TODO: Fetch recent analyses from API
    const mockAnalyses: AnalysisResult[] = [
      {
        url: 'https://example.com',
        date: '2024-01-15',
        score: 85,
        metrics: [
          { name: 'Conversion Rate', value: 3.2, change: 0.5 },
          { name: 'Bounce Rate', value: 45, change: -2.1 },
          { name: 'Avg. Session Duration', value: 180, change: 15 },
        ],
      },
      // Add more mock data as needed
    ]
    setRecentAnalyses(mockAnalyses)
  }, [])

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

    setIsLoading(true)
    try {
      // TODO: Implement actual analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/results')
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navigation Bar */}
      <Box bg={bgColor} borderBottom={1} borderStyle="solid" borderColor={borderColor}>
        <Container maxW="container.xl">
          <Flex py={4} justify="space-between" align="center">
            <Heading
              size="lg"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              CRO Analyzer
            </Heading>

            <HStack spacing={6}>
              <Button
                variant="ghost"
                leftIcon={<FaBell />}
                position="relative"
              >
                Notifications
                <Badge
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  borderRadius="full"
                >
                  3
                </Badge>
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaCaretDown />}
                  variant="ghost"
                >
                  <HStack>
                    <Avatar size="sm" name="John Doe">
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <Text>John Doe</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaUserCircle />}>Profile</MenuItem>
                  <MenuItem icon={<FaCog />}>Settings</MenuItem>
                  <Divider />
                  <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={8}>
          {/* Main Content */}
          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <VStack spacing={8} align="stretch">
              {/* Quick Analysis Section */}
              <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="md">
                <Heading size="md" mb={6}>Quick Analysis</Heading>
                <FormControl>
                  <FormLabel>Enter Website URL</FormLabel>
                  <HStack>
                    <Input
                      placeholder="https://your-dtc-store.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      size="lg"
                    />
                    <Button
                      colorScheme="blue"
                      size="lg"
                      leftIcon={<FaSearch />}
                      onClick={handleAnalyze}
                      isLoading={isLoading}
                      loadingText="Analyzing..."
                      minW="200px"
                    >
                      Analyze
                    </Button>
                  </HStack>
                </FormControl>
              </Box>

              {/* Recent Analyses */}
              <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="md">
                <HStack justify="space-between" mb={6}>
                  <Heading size="md">Recent Analyses</Heading>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    leftIcon={<FaPlus />}
                    onClick={() => navigate('/history')}
                  >
                    View All
                  </Button>
                </HStack>

                <VStack spacing={4} align="stretch">
                  {recentAnalyses.map((analysis, index) => (
                    <Box
                      key={index}
                      p={4}
                      borderWidth={1}
                      borderRadius="lg"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <Grid templateColumns="1fr auto" gap={4}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">{analysis.url}</Text>
                          <Text fontSize="sm" color="gray.500">
                            Analyzed on {analysis.date}
                          </Text>
                        </VStack>
                        <HStack>
                          <Badge
                            colorScheme={analysis.score >= 80 ? 'green' : 'orange'}
                            fontSize="sm"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            Score: {analysis.score}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/results/${index}`)}
                          >
                            View Details
                          </Button>
                        </HStack>
                      </Grid>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Sidebar */}
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <VStack spacing={8} align="stretch">
              {/* Performance Overview */}
              <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="md">
                <Heading size="md" mb={4}>Performance Overview</Heading>
                <VStack spacing={4} align="stretch">
                  <Stat>
                    <StatLabel>Average CRO Score</StatLabel>
                    <StatNumber>82.5</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                  <Progress value={82.5} colorScheme="green" size="sm" borderRadius="full" />
                </VStack>
              </Box>

              {/* Quick Stats */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="md">
                    <VStack align="start" spacing={2}>
                      <Icon as={FaChartLine} boxSize={6} color="blue.500" />
                      <Text fontSize="sm" color="gray.500">Total Analyses</Text>
                      <Heading size="md">24</Heading>
                    </VStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="md">
                    <VStack align="start" spacing={2}>
                      <Icon as={FaChartBar} boxSize={6} color="purple.500" />
                      <Text fontSize="sm" color="gray.500">This Month</Text>
                      <Heading size="md">8</Heading>
                    </VStack>
                  </Box>
                </GridItem>
              </Grid>

              {/* Premium Features */}
              <Box
                bg="blue.500"
                color="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
              >
                <VStack align="start" spacing={4}>
                  <Icon as={FaChartPie} boxSize={8} />
                  <Heading size="md">Unlock Premium Features</Heading>
                  <Text>
                    Get access to advanced analytics, competitor analysis, and more.
                  </Text>
                  <Button
                    colorScheme="whiteAlpha"
                    onClick={() => navigate('/pricing')}
                  >
                    Upgrade Now
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard
