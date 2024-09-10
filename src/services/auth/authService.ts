import axios from "axios";
import { LoginData, RegisterData, Response } from "./authDtos";

class AuthService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:8081/api/auth";
  }

  async login(data: LoginData): Promise<Response> {
    try {
      const response = await axios.post<Response>(`${this.apiUrl}/login`, data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<Response> {
    try {
      const response = await axios.post<Response>(
        `${this.apiUrl}/register`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
