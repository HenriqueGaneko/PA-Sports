# PA-Sports — React Native para Android

Conversão da proposta PA-Sports para um aplicativo com cinco telas: Início, Esportes, Peneiras, Login/Cadastro e Perfil. Interface em português, preto e verde, componentes nativos e navegação inferior.

## Comece aqui — Windows e Android Studio

Este projeto segue Expo Router e a estrutura `src/app` do modelo DSM. Inicie no login; após entrar, as quatro abas de conteúdo ficam disponíveis.

1. Instale Node.js 22 LTS (22.13 ou superior) e Android Studio. No SDK Manager, instale Android SDK Platform 36, Build Tools 36.0.0, Platform Tools e o emulador. Use Java/JDK 17. Se o Gradle solicitar uma versão específica de SDK/NDK, instale-a pelo SDK Manager.
2. Extraia este ZIP. Abra o terminal dentro da pasta que contém `package.json`.
3. Execute `npm ci` para instalar as dependências fixadas no arquivo de lock.
4. Abra o Android Studio, crie um dispositivo virtual no Device Manager e inicie o emulador. A virtualização do processador deve estar ativada.
5. No terminal do projeto, execute `npm run android:build`. O comando compila, instala e abre o aplicativo no emulador; mantenha o terminal do Metro aberto.

A pasta `android` já foi gerada e está incluída. Para abrir o projeto nativo, escolha **Open** no Android Studio e selecione essa pasta. O código das telas fica em `src/app` e `src/screens`; edite-o no VS Code. Se iniciar o aplicativo diretamente pelo Android Studio, mantenha `npm start` rodando na raiz e, se necessário, use `adb reverse tcp:8081 tcp:8081`.

Se `adb` não for encontrado no Windows, configure `ANDROID_HOME` para `%LOCALAPPDATA%\Android\Sdk` e acrescente `%ANDROID_HOME%\platform-tools` ao PATH. Feche e abra o terminal após configurar.

## O que funciona

- Início: apresentação, modalidades e seletivas em destaque.
- Esportes: seis modalidades e acesso à listagem filtrada.
- Peneiras: filtro por esporte, busca por cidade/nome, requisitos e inscrição.
- Login/Cadastro: validação dos campos, conta local, login e sessão persistente.
- Perfil: dados do atleta, inscrições, cancelamento com confirmação e logout.
- Histórico de navegação e botão Voltar do Android gerenciados pelo Expo Router.
- Logout remove o acesso à área autenticada.
- Contas e inscrições persistem após fechar o aplicativo.
- Inscrições duplicadas, vencidas, encerradas ou sem vagas são bloqueadas.

### Teste rápido

Abra **Entrar → Cadastrar**. Use um nome fictício, `atleta@example.com`, nascimento `15/05/2005`, cidade `Jaboticabal / SP`, telefone `16999999999` e senha `teste1234`. Escolha um esporte e crie a conta. Abra Peneiras, inscreva-se e veja a inscrição no Perfil. Cancele, saia e faça login novamente. Reinicie o aplicativo para conferir a persistência.

## Escopo desta entrega

Esta é uma demonstração local, sem conexão com a API antiga. As seletivas são fictícias e identificadas como demonstração; os nomes de clubes e parcerias do site antigo não foram apresentados como fatos. Não existe sincronização entre dispositivos, recuperação de senha, cadastro de instituições ou painel administrativo.

O número de vagas representa a capacidade ilustrativa da seletiva, não uma contagem global em tempo real. Não há servidor coordenando concorrência entre atletas. O login local usa um hash SHA-256 com salt para evitar guardar a senha literal, mas isso NÃO equivale à autenticação de produção; AsyncStorage não é um cofre e o hash não é uma função apropriada para senhas reais. Use dados de teste. Na integração futura, substituir por autenticação no servidor, hash adequado e tokens guardados em armazenamento seguro.

## Estrutura

- `src/app/_layout.tsx`: Stack raiz, provider e proteção de rotas.
- `src/app/(auth)/_layout.tsx`: navegação por abas.
- `src/app/login.tsx` e `register.tsx`: rotas de autenticação.
- `src/app/(auth)/`: rotas de Início, Esportes, Peneiras e Perfil.
- `src/screens/`: as cinco telas.
- `src/components/`: elementos visuais e card de seletiva.
- `src/contexts/authContext.tsx`: sessão e persistência local.
- `src/data/catalog.ts`: esportes e seletivas de demonstração.
- `src/services/rules.mjs`: validação e regras de inscrição.
- `tests/`: testes das regras.
- `android/`: projeto nativo para Android Studio.

## Comandos

```sh
npm run android
npm run android:build
npm start
npm run check
npm test
npm run web
```

Para validar o bundle Android sem compilar um APK: `npx expo export --platform android`.
Para gerar APK de debug na sua máquina, com SDK configurado: abra `android` no terminal e execute `gradlew.bat assembleDebug`; o APK fica em `android/app/build/outputs/apk/debug/app-debug.apk` e depende do Metro. Uma versão independente para distribuição exige configuração de release e assinatura, fora desta entrega.

## Base técnica

Expo SDK 57, React 19.2.3 e React Native 0.86.3. O patch de React Native foi alinhado à recomendação do Expo instalado; a referência usa 0.86.2. Dependências fixadas em `package-lock.json`. A pasta Android foi criada com Expo Prebuild. Consulte https://docs.expo.dev/guides/local-app-development/ para o fluxo de compilação local.

## Organização do código

O código segue o estilo do modelo da disciplina: dois espaços de indentação, aspas duplas, ponto e vírgula, imports externos separados dos internos, condicionais com blocos explícitos e JSX distribuído em linhas legíveis.

Para aplicar ou conferir esse padrão:

```sh
npm run format
npm run format:check
```

As orientações recebidas estão registradas em `../ORIENTACOES_DO_PROJETO.md`. Consulte esse arquivo antes de alterar requisitos, estrutura ou comportamento.
