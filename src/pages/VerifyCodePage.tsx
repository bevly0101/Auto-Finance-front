import React, { useEffect } from 'react';
import { useVerifyCode } from '@/hooks/useVerifyCode';
import Logo from '@/components/login-inter/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { VerifyCodeToast } from '@/components/VerifyCodeToast';

const VerifyCodePage: React.FC = () => {
  const { code, setCode, loading, handleSubmit } = useVerifyCode();

  useEffect(() => {
    toast({
      description: <VerifyCodeToast />,
    });
  }, []);

  return (
    <div className="h-full flex flex-col">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 pb-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Verifique sua Conta</h1>
          
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Enviamos um código de 6 dígitos para o seu WhatsApp. Por favor, insira-o abaixo para continuar.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-[0.5em]"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;