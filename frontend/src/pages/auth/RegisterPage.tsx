import React from 'react';
import { Container, Flex, Box, Image, useColorModeValue, Text } from '@chakra-ui/react';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const RegisterPage = () => {
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
          {/* Left side - Branding and Benefits */}
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
              <Text
                fontSize="xl"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.200')}
                mb={6}
              >
                Join thousands of businesses optimizing their conversion rates
              </Text>

              {/* Benefits Grid */}
              <Box>
                {benefits.map((benefit, index) => (
                  <Flex
                    key={index}
                    mb={4}
                    align="start"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    <Text fontSize="xl" mr={3}>
                      {benefit.icon}
                    </Text>
                    <Box>
                      <Text fontWeight="medium" mb={1}>
                        {benefit.title}
                      </Text>
                      <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                        {benefit.description}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right side - Register Form */}
          <Box flex={1}>
            <RegisterForm />
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

const benefits = [
  {
    icon: '🚀',
    title: 'Instant AI Analysis',
    description: 'Get immediate insights into your website's performance with our advanced AI engine.',
  },
  {
    icon: '📈',
    title: 'Boost Conversion Rates',
    description: 'Our customers see an average increase of 27% in their conversion rates.',
  },
  {
    icon: '🔬',
    title: 'Advanced A/B Testing',
    description: 'Run sophisticated A/B tests with our intelligent testing platform.',
  },
  {
    icon: '📊',
    title: 'Comprehensive Analytics',
    description: 'Track every aspect of your website's performance in real-time.',
  },
];
