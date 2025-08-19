import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    apelido: '',
    email: '',
    countryCode: '+55',
    telefone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password: string): boolean => {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
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
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e caractere especial';
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

    if (!validateForm()) {
      return;
    }

    try {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const metadata = {
        nome_completo: formData.nomeCompleto,
        apelido: formData.apelido,
        telefone_whatsapp: `${formData.countryCode.replace('+', '')}${formData.telefone}`,
        verify_code: verifyCode
      };
      await signUp(formData.email, formData.password, metadata);
      const selectedPlanJSON = localStorage.getItem('selectedPlan');
      if (selectedPlanJSON) {
        const selectedPlan = JSON.parse(selectedPlanJSON);
        localStorage.removeItem('selectedPlan'); // Limpa para não afetar futuros cadastros
        window.location.href = selectedPlan.checkoutLink;
      } else {
        toast({
          title: "Cadastro quase concluído!",
          description: "Enviamos um código de verificação para o seu WhatsApp.",
        });
        navigate("/verify-code");
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrors({ ...errors, form: error.message });
    }
  };

  return {
    formData,
    errors,
    updateField,
    handleSubmit,
  };
};