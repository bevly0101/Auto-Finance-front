import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const useRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    apelido: '',
    email: '',
    countryCode: '+55',
    telefone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    inviteCode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { signUp } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      updateField('inviteCode', code);
    }
  }, [location.search]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password: string): boolean => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    const passedChecks = checks.filter(Boolean).length;
    return passedChecks >= 2;
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (typeof value === 'string') {
      if (field === 'email' && value) {
        if (!validateEmail(value)) {
          setErrors(prev => ({ ...prev, email: 'Por favor, insira um email válido' }));
        }
      }

      if (field === 'telefone') {
        const phoneNumber = parsePhoneNumberFromString(formData.countryCode + value);
        if (!phoneNumber || !phoneNumber.isValid()) {
          setErrors(prev => ({ ...prev, telefone: 'Número de telefone inválido' }));
        }
      }

      if (field === 'countryCode') {
        const phoneNumber = parsePhoneNumberFromString(value + formData.telefone);
        if (phoneNumber && phoneNumber.isValid()) {
          setErrors(prev => ({ ...prev, telefone: '' }));
        }
      }

      if (field === 'confirmPassword' && value) {
        if (value !== formData.password) {
          setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
        }
      }

      if (field === 'password' && formData.confirmPassword) {
        if (formData.confirmPassword !== value) {
          setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!formData.apelido.trim()) {
      newErrors.apelido = 'Apelido é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Número de telefone é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!validatePasswordStrength(formData.password)) {
      newErrors.password = 'A senha deve atender a pelo menos 2 dos seguintes critérios: 8 caracteres, uma maiúscula, um número e um caractere especial.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos e a política de privacidade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const metadata = {
        nome_completo: formData.nomeCompleto,
        apelido: formData.apelido,
        telefone_whatsapp: `${formData.countryCode.replace('+', '')}${formData.telefone}`,
        verify_code: verifyCode,
        invite_code: formData.inviteCode
      };
      await signUp(formData.email, formData.password, metadata);
      toast({
        title: "Cadastro quase concluído!",
        description: "Enviamos um código de verificação para o seu WhatsApp.",
      });
      navigate("/verify-code");
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      if (error.message.includes('User already registered')) {
        setServerError('Este e-mail já está cadastrado. Tente fazer login.');
      } else {
        setServerError('Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    serverError,
    updateField,
    handleSubmit,
  };
};