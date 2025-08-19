import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '../login-inter/Logo';
import InputField from '../login-inter/InputField';
import GoogleButton from '../login-inter/GoogleButton';
import CountrySelect from './countryselect';
import PasswordStrength from './passwordstrengh';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const {
    formData,
    errors,
    updateField,
    handleSubmit,
  } = useRegistrationForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log('Google registration initiated');
    alert('Cadastro com Google iniciado! (Integração OAuth será implementada)');
  };

  const handleLoginClick = () => {
    navigate('/signin');
  };

  return (
    <div className="h-full bg-background dark:bg-gray-800 flex flex-col">
      {/* Logo Section */}
      <Logo />
      
      {/* Form Section */}
      <div className="flex-1 px-6 sm:px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Crie sua conta</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">É rápido e fácil. Vamos começar!</p>
          </div>

          {/* Google Button */}
          <GoogleButton onClick={handleGoogleLogin} className="mb-4" />

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Nome Completo */}
          <InputField
            type="text"
            placeholder="Nome Completo"
            value={formData.nomeCompleto}
            onChange={(value) => updateField('nomeCompleto', value)}
            icon={User}
            error={errors.nomeCompleto}
            name="nomeCompleto"
          />

          {/* Apelido */}
          <InputField
            type="text"
            placeholder="Como podemos te chamar?"
            value={formData.apelido}
            onChange={(value) => updateField('apelido', value)}
            icon={User}
            error={errors.apelido}
            name="apelido"
          />

          {/* Email */}
          <InputField
            type="email"
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            icon={Mail}
            error={errors.email}
            name="email"
          />

          {/* Número WhatsApp */}
          <div>
            <CountrySelect
              value={formData.countryCode}
              onChange={(value) => updateField('countryCode', value)}
              phoneValue={formData.telefone}
              onPhoneChange={(value) => updateField('telefone', value)}
            />
            {errors.telefone && (
              <p className="text-red-500 text-xs mt-1 px-1">{errors.telefone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Crie uma senha forte"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="
                  w-full pl-12 pr-12 py-3
                  bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-gray-500 text-gray-900
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all duration-200
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>
            )}
            <PasswordStrength password={formData.password} />
          </div>

          {/* Confirma Senha */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="
                  w-full pl-12 pr-12 py-3
                  bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-gray-500 text-gray-900
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all duration-200
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 px-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateField('acceptTerms', !!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="acceptTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Eu li e aceito os{' '}
                <Link to="/terms" target="_blank" className="text-blue-600 hover:underline">
                  Termos de Serviço
                </Link>{' '}
                e a{' '}
                <Link to="/privacy" target="_blank" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-xs mt-1 px-1">{errors.acceptTerms}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              py-3
              px-6
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              dark:focus:ring-offset-gray-800
              transition-all duration-300
              shadow-lg
              hover:shadow-xl
              transform hover:-translate-y-0.5
            "
          >
            Criar minha conta
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <span className="text-gray-500 dark:text-gray-400">Já tem uma conta? </span>
            <button
              type="button"
              onClick={handleLoginClick}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Faça login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

