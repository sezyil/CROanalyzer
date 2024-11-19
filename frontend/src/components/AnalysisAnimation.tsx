import { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Progress,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const pulseKeyframes = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`

const pulse = `${pulseKeyframes} 2s infinite`

interface AnalysisAnimationProps {
  onComplete: () => void
}

function AnalysisAnimation({ onComplete }: AnalysisAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const bgColor = useColorModeValue('white', 'gray.800')

  const steps = [
    'Analyzing page structure...',
    'Checking conversion elements...',
    'Evaluating user experience...',
    'Analyzing performance metrics...',
    'Generating recommendations...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)

    return () => clearInterval(stepInterval)
  }, [])

  const MotionBox = motion(Box)

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.7)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <MotionBox
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        bg={bgColor}
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        maxW="md"
        w="full"
        mx={4}
      >
        <VStack spacing={6}>
          <Box
            as="svg"
            viewBox="0 0 24 24"
            width="60px"
            height="60px"
            animation={pulse}
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              fill="currentColor"
              d="M12 6v6l4 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Box>

          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            {steps[currentStep]}
          </Text>

          <Box w="full">
            <Progress
              value={progress}
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              hasStripe
              isAnimated
            />
            <Text textAlign="center" mt={2} fontSize="sm" color="gray.500">
              {progress}% Complete
            </Text>
          </Box>
        </VStack>
      </MotionBox>
    </Box>
  )
}

export default AnalysisAnimation
