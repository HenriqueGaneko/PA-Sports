# 🏆 PA-Sports – Plataforma de Oportunidades Esportivas

![PA-Sports](docs/Página%20Home.png)

O **PA-Sports** é um projeto desenvolvido com o objetivo de conectar atletas amadores a oportunidades no esporte profissional. A plataforma permite visualizar e pesquisar peneiras esportivas disponíveis, utilizando filtros por modalidade e faixa etária.

Além disso, conta com um sistema de cadastro e perfil de atletas, permitindo que instituições esportivas consultem informações dos jogadores e identifiquem novos talentos. Dessa forma, o projeto busca facilitar a divulgação de oportunidades e aproximar atletas de instituições esportivas.

![PA-Sports](docs/Página%20Login.png)
![Pa-Sports](docs/Página%20Cadastrar.png)

## 🚀 Tecnologias

### Mobile
- React Native
- JavaScript

### Back-end
- Node.js
- API REST

### Banco de Dados
- MySQL
- XAMPP

## 📦 Como Utilizar

### Configurações Iniciais

Antes de executar o projeto, é necessário instalar e configurar:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/pt_br/index.html)
- [Android Studio](https://developer.android.com/studio) (para execução do emulador Android)

### 📱 Rodando o Aplicativo Mobile

1. Clone o repositório:

   ```sh
   git clone https://github.com/HenriqueGaneko/PA-Sports.git
   ```

2. Acesse o diretório do projeto:

   ```sh
   cd PA-Sports
   ```

3. Instale as dependências na pasta do mobile do projeto:

   ```sh
   cd mobile
   npm install expo
   ```

4. Inicie o servidor:

   ```sh
   npm run android
   ```

5. Execute o aplicativo no emulador ou dispositivo configurado.

### ⚙️ Rodando a API

1. Acesse o diretório do Mobile em outro terminal:

   ```sh
   cd Back-End
   ```

2. Instale as dependências:

   ```sh
   npm install 
   ```

3. Configure as variáveis de ambiente necessárias para a conexão com o banco de dados.

4. Inicie o servidor:

   ```sh
   npm run dev
   ```

5. A API estará disponível no endereço local configurado no projeto.

### 🗄️ Configurando o Banco de Dados

1. Instale e abra o XAMPP.
2. Inicie os serviços **Apache** e **MySQL**, conforme a configuração do projeto.
3. Acesse o phpMyAdmin:

   ```text
   http://localhost/phpmyadmin
   ```

4. Crie o banco de dados utilizado pelo PA-Sports.
5. Importe o arquivo SQL disponibilizado no projeto.
6. Configure as credenciais de acesso ao banco de dados na API.

Após essas etapas, o aplicativo poderá realizar as requisições à API e acessar as informações armazenadas no banco de dados.

## 🏆 Integrantes

- **Henrique Ganeko Ligeiro** – [GitHub](https://github.com/HenriqueGaneko)
- **Bruno Sérgio Mendes de Oliveira**

## 📚 Referências

- [React Native Documentation](https://reactnative.dev/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [XAMPP](https://www.apachefriends.org/)

---

<p align="center"><strong>PA-Sports – Conectando talentos a oportunidades!</strong></p>

<p align="center">Projeto desenvolvido como parte de um trabalho acadêmico.</p>