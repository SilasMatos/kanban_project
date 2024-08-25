import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { register as registerService } from '../services/Api'

interface RegisterFormInputs {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterResponse {
  token: string
}

interface ApiError {
  response?: {
    data?: {
      msg?: string
    }
  }
}

const Register: React.FC = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterFormInputs>({
    mode: 'onBlur'
  })

  const onSubmit = async (formData: RegisterFormInputs) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await registerService(
        formData.name,
        formData.email,
        formData.password
      )
      login(response.token)
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.response?.data?.msg) {
        setError(apiError.response.data.msg)
      } else {
        setError('Ocorreu um erro durante o registro.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Registrar
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Nome
            </label>
            <input
              type="text"
              {...register('name', { required: 'O nome é obrigatório' })}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'O email é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Endereço de email inválido'
                }
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'A senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres'
                }
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Confirmar Senha
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'A confirmação de senha é obrigatória',
                validate: value =>
                  value === watch('password') || 'As senhas não coincidem'
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        {isLoading && <p className="mt-4 text-indigo-500">Carregando...</p>}
        {error && <p className="mt-4 text-red-500">Erro: {error}</p>}
      </div>
    </div>
  )
}

export default Register
