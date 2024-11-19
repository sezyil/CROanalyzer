import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/forgot-password`, { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/reset-password`, { token, password });
  },

  verifyEmail: async (token: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/verify-email`, { token });
  },
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
  });
};
