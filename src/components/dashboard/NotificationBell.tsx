
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message?: string;
  type: string;
  created_at: string;
  expires_at?: string;
}

export const NotificationBell: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar notificações e contagem de não lidas
  const fetchNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Buscar notificações ativas
      const { data: notificationsData, error: notifError } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (notifError) {
        console.error('Erro ao buscar notificações:', notifError);
        return;
      }

      setNotifications(notificationsData || []);

      // Buscar contagem de não lidas usando a função do banco
      const { data: countData, error: countError } = await supabase.rpc(
        'get_unread_notifications_count',
        { user_uuid: user.id }
      );

      if (countError) {
        console.error('Erro ao buscar contagem:', countError);
        return;
      }

      setUnreadCount(countData || 0);
    } catch (error) {
      console.error('Erro inesperado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Marcar notificação como vista
  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notification_views')
        .upsert({
          notification_id: notificationId,
          user_id: user.id,
          viewed_at: new Date().toISOString()
        });

      if (!error) {
        // Atualizar contagem local
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Bell className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs bg-red-500 text-white border-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-3 border-b">
          <h3 className="font-semibold">Notificações ({unreadCount})</h3>
        </div>
        {isLoading ? (
          <DropdownMenuItem disabled className="p-3">
            <p className="text-sm text-muted-foreground">Carregando...</p>
          </DropdownMenuItem>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id} 
              className="p-3 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {notification.title}
                  </p>
                  {notification.message && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled className="p-3">
            <p className="text-sm text-muted-foreground">Nenhuma notificação</p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
