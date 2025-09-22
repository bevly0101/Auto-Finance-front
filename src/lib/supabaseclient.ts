import { supabase } from '@/integrations/supabase/client';

export { supabase };

export async function uploadProfileImage(file: File, userId: string): Promise<string | null> {
  const fileName = `${userId}-${Date.now()}.png`;
  const { data, error } = await supabase.storage.from('avatars').upload(fileName, file);

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return null;
  }

  return data.path;
}

export async function getProfileImageURL(path: string): Promise<string | null> {
  const { data } = supabase.storage.from('avatars').getPublicUrl(path);

  return data.publicUrl;
}

export async function removeProfileImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage.from('avatars').remove([path]);

  if (error) {
    console.error('Erro ao remover a imagem:', error);
    return false;
  }

  return true;
}

export interface Reminder {
  id: string;
  titulo: string;
  valor?: number;
  descricao: string;
  data_vencimento: string;
  val_time?: string;
  recorrente: boolean;
}

export async function getReminders(): Promise<Reminder[]> {
  const { data, error } = await supabase.from("lembretes_pagamentos").select("id, titulo, valor, descricao, data_vencimento, val_time, recorrente");
  if (error) {
    console.error("Erro ao buscar lembretes:", error);
    return [];
  }
  return data as Reminder[];
}

export async function addReminder(reminder: Omit<Reminder, "id">): Promise<Reminder | null> {
  const { data, error } = await supabase.from("lembretes_pagamentos").insert(reminder).select();
  if (error) {
    console.error("Erro ao adicionar lembrete:", error);
    return null;
  }
  return data ? (data[0] as Reminder) : null;
}

export async function updateReminder(id: string, updates: Partial<Omit<Reminder, "id">>): Promise<Reminder | null> {
  const { data, error } = await supabase.from("lembretes_pagamentos").update(updates).eq("id", id).select();
  if (error) {
    console.error("Erro ao atualizar lembrete:", error);
    return null;
  }
  return data ? (data[0] as Reminder) : null;
}

export async function deleteReminder(id: string): Promise<boolean> {
  const { error } = await supabase.from("lembretes_pagamentos").delete().eq("id", id);
  if (error) {
    console.error("Erro ao deletar lembrete:", error);
    return false;
  }
  return true;
}
