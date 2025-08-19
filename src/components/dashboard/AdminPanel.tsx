
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, AlertTriangle, Settings, Database, Bell, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface User {
  id: string;
  email: string;
  nome: string;
  username: string;
  telefone_whatsapp: string;
  created_at: string;
  plan: number;
  especificar_tipo: boolean;
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  user_id?: string;
}

interface Notification {
  id: string;
  title: string;
  message?: string;
  type: string;
  created_at: string;
  expires_at?: string;
  is_global: boolean;
  is_active: boolean;
}

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [adminEmail, setAdminEmail] = useState('hills@gmail.com');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  
  // Estados para nova notificação
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    expires_at: '',
    is_global: true
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar usuários:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os usuários.",
          variant: "destructive"
        });
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao carregar os dados.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(updatedData)
        .eq('id', userId);

      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o usuário.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });

      setEditingUser(null);
      setEditData({});
      await fetchUsers();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao atualizar o usuário.",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase.rpc('delete_user_completely', { user_id: userId });

      if (error) {
        console.error('Erro ao excluir usuário:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o usuário.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso.",
      });

      await fetchUsers();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao excluir o usuário.",
        variant: "destructive"
      });
    }
  };

  const startEditing = (user: User) => {
    setEditingUser(user.id);
    setEditData(user);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditData({});
  };

  const handleEditChange = (field: keyof User, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveEdit = () => {
    if (editingUser && editData) {
      updateUser(editingUser, editData);
    }
  };

  const updateAdminEmail = () => {
    if (newAdminEmail.trim()) {
      setAdminEmail(newAdminEmail.trim());
      setNewAdminEmail('');
      toast({
        title: "Sucesso",
        description: "Email de admin atualizado com sucesso.",
      });
    }
  };

  // Funções para notificações
  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar notificações:', error);
        return;
      }

      setNotifications(data || []);
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  const createNotification = async () => {
    if (!newNotification.title.trim()) {
      toast({
        title: "Erro",
        description: "Título é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    try {
      const notificationData: any = {
        title: newNotification.title.trim(),
        message: newNotification.message.trim() || null,
        type: newNotification.type,
        is_global: newNotification.is_global,
        expires_at: newNotification.expires_at ? new Date(newNotification.expires_at).toISOString() : null
      };

      const { error } = await supabase
        .from('notifications')
        .insert([notificationData]);

      if (error) {
        console.error('Erro ao criar notificação:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar a notificação.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Notificação criada com sucesso.",
      });

      // Limpar formulário
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        expires_at: '',
        is_global: true
      });

      // Atualizar lista
      await fetchNotifications();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao criar a notificação.",
        variant: "destructive"
      });
    }
  };

  const deleteNotification = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notificação?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir notificação:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir a notificação.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Notificação excluída com sucesso.",
      });

      await fetchNotifications();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao excluir a notificação.",
        variant: "destructive"
      });
    }
  };

  const toggleNotificationStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Erro ao atualizar notificação:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a notificação.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: `Notificação ${!currentStatus ? 'ativada' : 'desativada'} com sucesso.`,
      });

      await fetchNotifications();
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchNotifications();

    // Simular logs de erro (em produção, isso viria de um sistema de logging real)
    const sampleLogs: LogEntry[] = [
      {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message: 'Falha no cadastro de usuário - telefone_whatsapp obrigatório',
        user_id: 'user_123'
      },
      {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'WARNING',
        message: 'Tentativa de login com credenciais inválidas',
      },
      {
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: 'ERROR',
        message: 'Erro 500 na função handle_new_user',
        user_id: 'user_456'
      }
    ];
    setLogs(sampleLogs);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Painel de Administração
          </CardTitle>
          <CardDescription>
            Painel exclusivo para administradores do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Base de Dados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Gerenciar Usuários ({users.length})</h3>
                  <Button onClick={fetchUsers} disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Atualizar'}
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {editingUser === user.id ? (
                              <Input
                                value={editData.email || ''}
                                onChange={(e) => handleEditChange('email', e.target.value)}
                                className="w-full"
                              />
                            ) : (
                              user.email
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser === user.id ? (
                              <Input
                                value={editData.nome || ''}
                                onChange={(e) => handleEditChange('nome', e.target.value)}
                                className="w-full"
                              />
                            ) : (
                              user.nome
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser === user.id ? (
                              <Input
                                value={editData.username || ''}
                                onChange={(e) => handleEditChange('username', e.target.value)}
                                className="w-full"
                              />
                            ) : (
                              user.username
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser === user.id ? (
                              <Input
                                value={editData.telefone_whatsapp || ''}
                                onChange={(e) => handleEditChange('telefone_whatsapp', e.target.value)}
                                className="w-full"
                              />
                            ) : (
                              user.telefone_whatsapp
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.plan > 0 ? "default" : "secondary"}>
                              {user.plan === 0 ? 'Gratuito' : `Plano ${user.plan}`}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {editingUser === user.id ? (
                                <>
                                  <Button size="sm" onClick={saveEdit}>
                                    Salvar
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={cancelEditing}>
                                    Cancelar
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => startEditing(user)}>
                                    Editar
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                                    Excluir
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Gerenciar Notificações</h3>
                  <Button onClick={fetchNotifications}>
                    Atualizar
                  </Button>
                </div>

                {/* Formulário para criar nova notificação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nova Notificação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Título *</label>
                      <Input
                        placeholder="Título da notificação"
                        value={newNotification.title}
                        onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Mensagem</label>
                      <Textarea
                        placeholder="Conteúdo da notificação (opcional)"
                        value={newNotification.message}
                        onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Tipo</label>
                        <Select 
                          value={newNotification.type} 
                          onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="success">Sucesso</SelectItem>
                            <SelectItem value="warning">Aviso</SelectItem>
                            <SelectItem value="error">Erro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Expira em</label>
                        <Input
                          type="datetime-local"
                          value={newNotification.expires_at}
                          onChange={(e) => setNewNotification(prev => ({ ...prev, expires_at: e.target.value }))}
                        />
                      </div>

                      <div className="flex items-end">
                        <Button onClick={createNotification} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Criar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de notificações existentes */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Criada em</TableHead>
                        <TableHead>Expira em</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              {notification.message && (
                                <p className="text-sm text-muted-foreground truncate max-w-xs">
                                  {notification.message}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              notification.type === 'error' ? 'destructive' :
                              notification.type === 'warning' ? 'secondary' :
                              notification.type === 'success' ? 'default' : 'outline'
                            }>
                              {notification.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(notification.created_at).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-sm">
                            {notification.expires_at ? 
                              new Date(notification.expires_at).toLocaleDateString('pt-BR') : 
                              'Nunca'
                            }
                          </TableCell>
                          <TableCell>
                            <Badge variant={notification.is_active ? 'default' : 'secondary'}>
                              {notification.is_active ? 'Ativa' : 'Inativa'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toggleNotificationStatus(notification.id, notification.is_active)}
                              >
                                {notification.is_active ? 'Desativar' : 'Ativar'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Logs de Erro do Sistema</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant={log.level === 'ERROR' ? 'destructive' : 'secondary'}>
                          {log.level}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm">{log.message}</p>
                      {log.user_id && (
                        <p className="text-xs text-gray-400 mt-1">User ID: {log.user_id}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Configurações de Admin</h3>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Email de Admin Atual:</p>
                    <p className="text-sm text-gray-600">{adminEmail}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Novo Email de Admin:</label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="novo-admin@email.com"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={updateAdminEmail} disabled={!newAdminEmail.trim()}>
                        Atualizar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Status da Base de Dados</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Estatísticas</h4>
                    <div className="space-y-2 text-sm">
                      <p>Total de usuários: {users.length}</p>
                      <p>Usuários ativos: {users.filter(u => u.plan >= 0).length}</p>
                      <p>Usuários premium: {users.filter(u => u.plan > 0).length}</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Sistema</h4>
                    <div className="space-y-2 text-sm">
                      <p>Status: <Badge variant="default">Online</Badge></p>
                      <p>Última atualização: {new Date().toLocaleString('pt-BR')}</p>
                      <p>Versão: 1.0.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
