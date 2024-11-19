import React from 'react';
import { Container, Flex, Box, Image, useColorModeValue } from '@chakra-ui/react';
import { LoginForm } from '../../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <Flex
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.800')}
      align="center"
      justify="center"
    >
      <Container maxW="container.xl" py={12}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={8}
        >
          {/* Left side - Branding and Info */}
          <Box flex={1} display={{ base: 'none', md: 'block' }}>
            <Image
              src="/logo.svg"
              alt="CRO Analyzer"
              mb={8}
              maxW="200px"
            />
            <Box
              bg={useColorModeValue('white', 'gray.700')}
              p={8}
              borderRadius="lg"
              boxShadow="lg"
            >
              <Box
                fontSize="xl"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.200')}
              >
                Welcome to CRO Analyzer
              </Box>
              <Box
                mt={4}
                color={useColorModeValue('gray.500', 'gray.400')}
              >
                The most comprehensive AI-powered platform for optimizing your website's conversion rate. Get started with:
                <Box as="ul" mt={4} ml={4} spacing={2}>
                  <Box as="li" mb={2}>
                    🎯 Advanced A/B Testing
                  </Box>
                  <Box as="li" mb={2}>
                    🤖 AI-Driven Insights
                  </Box>
                  <Box as="li" mb={2}>
                    📊 Real-time Analytics
                  </Box>
                  <Box as="li">
                    🔍 Comprehensive CRO Analysis
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right side - Login Form */}
          <Box flex={1}>
            <LoginForm />
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};
