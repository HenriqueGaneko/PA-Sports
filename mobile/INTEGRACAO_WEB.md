# PA-Sports: Web + Mobile com um único servidor e banco

A pasta `PA-Sports/Back-End` é o **único back-end**. O back-end duplicado que existia em `PA-Sports-Mobile/Back-End` foi excluído.

## Como executar

1. Configure `Back-End/.env` com as credenciais do **mesmo banco utilizado pelo site** (não incluí credenciais no ZIP).
2. Execute `cd Back-End && npm install && npm run dev` na raiz PA-Sports.
3. Descubra o IP local do computador que executa o servidor (por exemplo, `192.168.1.100`).
4. Crie `PA-Sports-Mobile/mobile/.env` com `EXPO_PUBLIC_API_URL=http://SEU_IP:3600`.
5. Entre em `PA-Sports-Mobile/mobile`, execute `npm install`, `npm run check` e `npx expo start -c`.
6. Teste `http://SEU_IP:3600/test`, `/peneiras`, `/esportes`, `/instituicoes` e `/estatisticas` no navegador.

**Observações:** o celular precisa acessar o endereço do servidor; `localhost` no celular não aponta para o PC. Emulador Android usa geralmente `http://10.0.2.2:3600`. O aplicativo não cria banco separado nem mantém cadastros de demonstração. As telas de esportes, instituições, peneiras e estatísticas agora consultam a API.

**Segurança:** o back-end preexistente ainda compara senhas sem hash, devolve informações pessoais em endpoints públicos e permite operações sem autenticação/autorização. Não publique como produção nem use dados pessoais reais antes de implementar autenticação com sessão/token, hash de senhas, autorização por usuário, HTTPS, validação e proteção das rotas. O armazenamento local de sessão no mobile é apenas conveniência de interface, não prova de autenticação.

**Limitação dos dados:** a tabela `peneiras` não tem campos de horário, faixa etária, preço ou status explícito; por isso, o aplicativo apresenta "A confirmar" / "Consultar organização" e deduz encerramento pela data e número de vagas. A tela de parceiros mostra instituições cadastradas e não afirma que são parcerias oficiais.
