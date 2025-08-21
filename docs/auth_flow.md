# Diagrama de Sequência do Fluxo de Autenticação

Este diagrama ilustra o processo de login, desde a interação do usuário até a renderização de uma rota protegida.

```mermaid
sequenceDiagram
    actor User
    participant LoginPage as LoginPage (React)
    participant AuthContext as AuthContext (React)
    participant SupabaseClient as Supabase Client
    participant SupabaseAPI as Supabase API
    participant ProtectedRoute as ProtectedRoute (React)
    participant DashboardPage as DashboardPage (React)

    User->>LoginPage: 1. Preenche e-mail e senha
    User->>LoginPage: 2. Clica em "Entrar"
    LoginPage->>AuthContext: 3. Chama signIn(email, password)
    
    AuthContext->>SupabaseClient: 4. Chama supabase.auth.signInWithPassword()
    SupabaseClient->>SupabaseAPI: 5. Envia credenciais (POST /token)
    SupabaseAPI-->>SupabaseClient: 6. Retorna Session (Access & Refresh Tokens)
    
    Note over SupabaseClient, AuthContext: O onAuthStateChange é acionado
    SupabaseClient->>AuthContext: 7. Notifica evento 'SIGNED_IN' com a sessão
    AuthContext->>AuthContext: 8. Atualiza estado (session, user)
    AuthContext->>ProtectedRoute: 9. Redireciona para /dashboard
    
    ProtectedRoute->>AuthContext: 10. Acessa o estado (user != null)
    ProtectedRoute->>DashboardPage: 11. Renderiza a página do Dashboard
    DashboardPage-->>User: 12. Exibe o Dashboard