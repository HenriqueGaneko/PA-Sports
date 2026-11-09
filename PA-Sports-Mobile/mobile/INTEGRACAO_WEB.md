# PA-Sports — Mobile alinhado ao Web

## Estrutura
- Abas: Início, Esportes, Peneiras, Parceiros, Sobre e Perfil.
- Login e cadastro de atletas, inscrições e listagem de peneiras usam a API existente do projeto web quando configurada.
- Sem `EXPO_PUBLIC_API_URL`, continua disponível o modo demonstrativo local original, identificado no cabeçalho.

## Como iniciar
1. Na pasta `Back-End` do projeto web, configure o `.env` conforme `.env.example` e inicie a API (`npm install` e `npm start`, ou script indicado no package.json).
2. No diretório `mobile`, copie `.env.example` para `.env` e substitua `192.168.1.100` pelo **IP local do computador** que roda a API. Celular e computador precisam estar na mesma rede.
3. Execute `npm install` e `npx expo start -c` no diretório `mobile`.
4. Para emulador Android local, normalmente use `http://10.0.2.2:3600`; no iOS Simulator, `http://localhost:3600` pode funcionar.

## Atenção
- A API web fornecida **não tem autenticação segura em produção**: verifica senhas em texto simples, não usa token de sessão e expõe operações sem autorização. Esta integração replica o contrato existente para uso de demonstração acadêmica, não para publicação com dados reais.
- Para uso público, implemente no servidor senhas com hash, autenticação por tokens, autorização por atleta, HTTPS e controles de acesso; não confie no `id_atleta` enviado pelo aplicativo.
- Se não houver API configurada, contas e inscrições são apenas locais ao dispositivo.
- A lista de parceiros no site original usa conteúdo ilustrativo; o mobile mostra categorias institucionais sem afirmar parcerias reais.
- Não foi possível validar uma conexão ao banco de dados do usuário neste ambiente. Os testes estáticos podem ser rodados com `npm run check` e `npm test`.
