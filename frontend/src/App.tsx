import { Box, Container, Heading } from '@chakra-ui/react'

function App() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={8}>
          CRO Analyzer
        </Heading>
      </Box>
    </Container>
  )
}

export default App
