"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { LoginRequest, RegisterRequest } from "@/types/auth"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { login, register, error, isLoading, isAuthenticated, clearError } = useAuth()
  const router = useRouter()

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      await login(credentials)
    } catch (error) {
      // L'erreur est gérée par le hook useAuth
    }
  }

  const handleRegister = async (userData: RegisterRequest) => {
    try {
      await register(userData)
    } catch (error) {
      // L'erreur est gérée par le hook useAuth
    }
  }

  const handleSwitchToRegister = () => {
    setIsLogin(false)
    clearError()
  }

  const handleSwitchToLogin = () => {
    setIsLogin(true)
    clearError()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={handleSwitchToRegister}
            error={error}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={handleSwitchToLogin}
            error={error}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
} 