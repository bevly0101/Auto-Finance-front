import React, { useEffect, useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardLayout from '@/layouts/DashboardLayout';

const MyPlanPage: React.FC = () => {
  const { profile, loading: profileLoading } = useProfile();
  const [planDetails, setPlanDetails] = useState<any>(null);
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!profile) return;

      setLoading(true);
      const { plano_id, id } = profile;

      try {
        if (plano_id === 1) { // Premium
          const { data, error } = await supabase
            .from('premium_plans')
            .select('expire_data')
            .eq('user_id', id)
            .single();
          if (error && error.code !== 'PGRST116') throw error;
          if (data) {
            setPlanDetails({ name: 'Premium', ...data });
          } else {
            setPlanDetails({ name: 'Premium' });
          }
        } else if (plano_id === 2) { // Admin do Família
          const { data: familyPlan, error: familyError } = await supabase
            .from('planos_familiares')
            .select('id, expire_data')
            .eq('admin_id', id)
            .single();
          if (familyError && familyError.code !== 'PGRST116') throw familyError;

          if (familyPlan) {
            setPlanDetails({ name: 'Administrador Família', expire_data: familyPlan.expire_data });
            const { data: members, error: membersError } = await supabase
              .from('membros_plano_familiar')
              .select('membro_id')
              .eq('plano_familiar_id', familyPlan.id);
            if (membersError) throw membersError;


            if (members && members.length > 0) {
              const memberIds = members.map(m => m.membro_id);
              const { data: memberDetails, error: usersError } = await supabase
                .from('users')
                .select('nome')
                .in('id', memberIds);
              if (usersError) throw usersError;
              setFamilyMembers(memberDetails || []);
            } else {
              setFamilyMembers([]);
            }
          }
        } else if (plano_id === 3) { // Membro do Família
          setPlanDetails({ name: 'Membro Família' });
        } else if (plano_id === 4) { // Período Gratuito
          setPlanDetails({ name: 'Período Gratuito' });
        }
      } catch (error) {
        console.error('Error fetching plan details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!profileLoading) {
      fetchPlanDetails();
    }
  }, [profile, profileLoading]);

  const renderPlanDetails = () => {
    if (loading || profileLoading) {
      return <Skeleton className="h-32 w-full" />;
    }

    if (!planDetails) {
      return <p>Não foi possível carregar os detalhes do seu plano.</p>;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{planDetails.name}</span>
            <Badge>{profile?.plano_id}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {planDetails.expire_data && (
            <p>Expira em: {new Date(planDetails.expire_data).toLocaleDateString()}</p>
          )}
          {profile?.plano_id === 2 && (
            <div>
              <h3 className="font-bold mt-4">Membros da Família:</h3>
              <ul>
                {familyMembers.length > 0 ? (
                  familyMembers.map((member, index) => (
                    <li key={index}>{member.nome}</li>
                  ))
                ) : (
                  <li>Nenhum membro encontrado.</li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Meu Plano</h1>
        {renderPlanDetails()}
      </div>
    </DashboardLayout>
  );
};

export default MyPlanPage;