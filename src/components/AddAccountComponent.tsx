import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseclient";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Bank {
  id: number;
  name: string;
  logo_url: string;
}

interface AddAccountComponentProps {
  onAccountAdded?: () => void;
}

export default function AddAccountComponent({ onAccountAdded }: AddAccountComponentProps): JSX.Element {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [accountType, setAccountType] = useState<"banco" | "carteira">("banco");
  const [customName, setCustomName] = useState("");
  const [isDefault, setIsDefault] = useState<"sim" | "não">("não");
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      const { data, error } = await supabase.from('banks').select('id, name, logo_url');
      if (error) {
        console.error("Erro ao buscar bancos:", error);
      } else {
        setBanks(data || []);
      }
    };
    fetchBanks();
  }, []);

  const isFormValid = () => {
    if (!customName) return false;
    if (accountType === 'banco' && !selectedBankId) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !user) return;

    setLoading(true);
    
    const newAccount = {
      user_id: user.id,
      custom_name: customName,
      is_default: isDefault === 'sim',
      bank_id: accountType === 'banco' ? selectedBankId : null,
      // account_type é omitido conforme solicitado
    };

    const { error } = await supabase.from('user_banks').insert([newAccount]);

    setLoading(false);

    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "A nova conta foi adicionada à sua lista.",
      });
      setCustomName("");
      setIsDefault("não");
      setSelectedBankId(null);
      if (onAccountAdded) {
        onAccountAdded();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-[25px] p-6 shadow-sm">
      <h2 className="text-foreground text-[22px] font-semibold mb-2">
        Adicionar Conta
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        Crie aqui suas contas para organizar e gerenciar melhor o seu dinheiro.
      </p>
      
      <div className="space-y-6">
        <div>
          <Label className="block text-foreground text-sm font-medium mb-3">Tipo da Conta</Label>
          <RadioGroup value={accountType} onValueChange={(value) => setAccountType(value as any)} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="banco" id="banco" />
              <Label htmlFor="banco">Banco</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="carteira" id="carteira" />
              <Label htmlFor="carteira">Carteira</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="customName" className="block text-foreground text-sm font-medium mb-3">Nome da conta</Label>
          <Input
            id="customName"
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Ex: Conta Principal"
            className="h-[50px] rounded-[15px]"
          />
        </div>

        {accountType === 'banco' && (
          <div>
            <Label className="block text-foreground text-sm font-medium mb-3">Banco</Label>
            <Select onValueChange={setSelectedBankId} value={selectedBankId || undefined}>
              <SelectTrigger className="h-[50px] rounded-[15px]">
                <SelectValue placeholder="Selecione um banco" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={String(bank.id)}>
                    <div className="flex items-center">
                      <img src={bank.logo_url} alt={bank.name} className="w-6 h-6 mr-2 rounded-full" />
                      <span>{bank.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className="block text-foreground text-sm font-medium mb-3">Definir como padrão?</Label>
          <RadioGroup value={isDefault} onValueChange={(value) => setIsDefault(value as any)} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="sim" />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="não" id="não" />
              <Label htmlFor="não">Não</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-4">
          <Button type="submit" disabled={!isFormValid() || loading} className="w-[200px] h-[50px] rounded-[15px]">
            {loading ? 'Criando...' : 'Criar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
