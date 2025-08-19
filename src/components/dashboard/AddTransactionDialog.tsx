import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "O tipo de transação é obrigatório.",
  }),
  name: z.string().min(1, "O nome da transação é obrigatório."),
  amount: z.coerce.number().positive("O valor deve ser um número positivo."),
  date: z.date({ required_error: "A data é obrigatória." }),
  category: z.string().min(1, "A categoria é obrigatória."),
  payment_method: z.string().min(1, "A forma de pagamento é obrigatória."),
  user_bank_id: z.string().min(1, "A conta é obrigatória."),
});

import { Transaction, UserBank } from "./types";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incomeCategories: string[];
  expenseCategories: string[];
  userBanks: UserBank[];
  onTransactionAdded: () => void;
  transactionToEdit?: Transaction | null;
}

export function AddTransactionDialog({
  open,
  onOpenChange,
  incomeCategories,
  expenseCategories,
  userBanks,
  onTransactionAdded,
  transactionToEdit,
}: AddTransactionDialogProps) {
  const { toast } = useToast();
  const isEditMode = !!transactionToEdit;

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      name: "",
      amount: 0,
      category: "",
      payment_method: "",
      user_bank_id: "",
    },
  });

  useEffect(() => {
    if (isEditMode && transactionToEdit) {
      form.reset({
        type: transactionToEdit.type === 'entrada' ? 'income' : 'expense',
        name: transactionToEdit.description,
        amount: transactionToEdit.amount,
        date: new Date(transactionToEdit.date),
        category: transactionToEdit.category || "",
        payment_method: transactionToEdit.specificType || "",
        user_bank_id: transactionToEdit.bank_id || "",
      });
    } else {
      form.reset({
        type: "expense",
        name: "",
        amount: 0,
        category: "",
        payment_method: "",
        user_bank_id: "",
        date: new Date(),
      });
    }
  }, [transactionToEdit, isEditMode, form]);

  const transactionType = form.watch("type");

  const categories =
    transactionType === "income" ? incomeCategories : expenseCategories;

  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      const tableName = values.type === 'income' ? 'entradas' : 'gastos';
      const dateColumnName = values.type === 'income' ? 'data_entrada' : 'data_gasto';

      const dataToUpsert = {
        user_id: user.id,
        nome: values.name,
        valor: values.amount,
        [dateColumnName]: values.date.toISOString(),
        categoria: values.category,
        forma_pagamento: values.payment_method,
        user_bank_id: values.user_bank_id,
      };

      if (isEditMode && transactionToEdit) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToUpsert)
          .eq('id', Number(transactionToEdit.id));
        if (error) throw error;
        toast({ title: "Sucesso!", description: "Transação atualizada com sucesso." });
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert(dataToUpsert);
        if (error) throw error;
        toast({ title: "Sucesso!", description: "Transação adicionada com sucesso." });
      }

      onTransactionAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Erro ao ${isEditMode ? 'atualizar' : 'adicionar'} transação`,
        description: error.message || "Ocorreu um erro inesperado.",
      });
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !transactionToEdit) return;

    if (window.confirm('Tem certeza que deseja apagar esta transação?')) {
      const tableName = transactionToEdit.type === 'entrada' ? 'entradas' : 'gastos';
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', Number(transactionToEdit.id));

      if (error) {
        toast({ variant: "destructive", title: "Erro ao excluir transação", description: error.message });
      } else {
        toast({ title: "Sucesso!", description: "Transação excluída." });
        onTransactionAdded();
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Transação' : 'Adicionar Transação'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere os campos abaixo para editar a transação.' : 'Preencha os campos abaixo para adicionar uma nova transação.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Transação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">Gasto</SelectItem>
                      <SelectItem value="income">Entrada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Transação</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Salário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="R$ 0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do Registro</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Débito">Débito</SelectItem>
                      <SelectItem value="Crédito">Crédito</SelectItem>
                      <SelectItem value="Pix">Pix</SelectItem>
                      <SelectItem value="Cédula">Cédula</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_bank_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta Usada</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a conta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.accountName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {isEditMode && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="mr-auto"
                >
                  Excluir
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Fechar
              </Button>
              <Button type="submit" disabled={!form.formState.isDirty && isEditMode || !form.formState.isValid}>
                {isEditMode ? 'Salvar Alterações' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
