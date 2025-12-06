import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, ShieldCheck, Wifi, Triangle } from 'lucide-react';
import { supabase } from "@/lib/supabaseclient";
import { useToast } from "@/components/ui/use-toast";

interface SixteenthScreenProps {
    onNext: () => void;
}

const SixteenthScreen: React.FC<SixteenthScreenProps> = ({ onNext }) => {
    const { toast } = useToast();
    const [bankName, setBankName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!bankName || !initialBalance) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("Usuário não autenticado.");
            }

            // 1. Create User Bank
            const { data: bankData, error: bankError } = await supabase
                .from('user_banks')
                .insert({
                    user_id: user.id,
                    bank_id: 999,
                    custom_name: bankName,
                    is_default: isDefault
                })
                .select()
                .single();

            if (bankError) throw bankError;

            // 2. Create Initial Balance Entry
            const numericBalance = parseFloat(initialBalance.replace('R$', '').replace('.', '').replace(',', '.'));

            const { error: entryError } = await supabase
                .from('entradas')
                .insert({
                    user_id: user.id,
                    nome: 'saldo inicial',
                    valor: isNaN(numericBalance) ? 0 : numericBalance,
                    forma_pagamento: 'Outros',
                    data_entrada: new Date().toISOString(),
                    user_bank_id: bankData.id,
                    category_id: 'e4fa00e6-8d13-4828-b422-036d241cd9d7'
                });

            if (entryError) throw entryError;

            toast({
                title: "Sucesso!",
                description: "Banco cadastrado com sucesso.",
            });

            onNext();

        } catch (error: any) {
            console.error("Error registering bank:", error);
            toast({
                title: "Erro",
                description: error.message || "Ocorreu um erro ao cadastrar o banco.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">

                {/* Credit Card Visualization */}
                <div className="w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-[#2d1b4e] via-[#1a1f3c] to-[#004e64] p-6 relative shadow-2xl mb-8 overflow-hidden border border-white/10">
                    {/* Glossy effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <div className="flex justify-between items-start mb-8">
                        <Triangle className="fill-white text-white w-8 h-8 rotate-90" />
                        <Wifi className="text-white/80 w-8 h-8 rotate-90" />
                    </div>

                    <div className="mt-8 mb-4">
                        <div className="flex justify-between items-center text-white text-xl md:text-2xl font-mono tracking-widest">
                            <span>4716</span>
                            <span>8039</span>
                            <span>02••</span>
                            <span>••••</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                        <span className="text-gray-400 text-sm">{bankName || ""}</span>
                        <span className="text-gray-400 text-sm">•• / ••</span>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center space-x-2 mb-8">
                    <ShieldCheck className="text-[#4ade80] w-5 h-5" />
                    <span className="text-gray-300 text-sm">Seus dados estão seguros</span>
                </div>

                {/* Form */}
                <div className="w-full space-y-6 mb-10">
                    <div className="space-y-2">
                        <Label className="text-white font-medium">Nome do Banco / Conta</Label>
                        <Input
                            placeholder="Ex: Inter, PicPay, Conta Comércio..."
                            className="bg-[#1a1b26] border-[#7c3aed] text-white placeholder:text-gray-500 h-12 rounded-lg focus-visible:ring-[#7c3aed]"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end space-x-4">
                        <div className="space-y-2 flex-1">
                            <Label className="text-white font-medium">Saldo Inicial</Label>
                            <Input
                                placeholder="R$00,00"
                                className="bg-[#1a1b26] border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg"
                                value={initialBalance}
                                onChange={(e) => setInitialBalance(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2 pb-3">
                            <Switch
                                id="default-account"
                                className="data-[state=checked]:bg-[#00aaff]"
                                checked={isDefault}
                                onCheckedChange={setIsDefault}
                            />
                            <Label htmlFor="default-account" className="text-white cursor-pointer">Conta Padrão</Label>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <Button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="group relative bg-[#00aaff] hover:bg-[#008ecc] text-white text-xl font-bold py-6 px-10 rounded-xl shadow-[0_0_20px_rgba(0,170,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.6)] w-full"
                >
                    {isLoading ? "Cadastrando..." : "Cadastrar Banco"}
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>

            </div>
        </div>
    );
};

export default SixteenthScreen;
