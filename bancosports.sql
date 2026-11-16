-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/11/2026 às 16:38
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bancosports`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `atletas`
--

CREATE TABLE `atletas` (
  `id_atleta` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `esporte` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `atletas`
--

INSERT INTO `atletas` (`id_atleta`, `nome`, `email`, `senha`, `data_nascimento`, `telefone`, `cidade`, `esporte`) VALUES
(1, 'Henrique', 'henrique@email.com', '123456', '2000-05-10', '13999999999', 'Santos', 'Futebol'),
(2, 'Bruno', 'bruno@email.com', '12345678', '2001-03-22', '13999997777', 'São Paulo', 'Basquete'),
(3, 'teste', 'teste@email.com', 'teste01', '2000-02-12', '11999997777', 'Taquaritinga - SP', 'Natação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `esportes`
--

CREATE TABLE `esportes` (
  `id_esporte` int(11) NOT NULL,
  `nome_esporte` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `esportes`
--

INSERT INTO `esportes` (`id_esporte`, `nome_esporte`) VALUES
(1, 'Futebol'),
(2, 'Vôlei'),
(3, 'Basquete'),
(4, 'Natacao'),
(5, 'Tenis'),
(6, 'Atletismo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `inscricoes`
--

CREATE TABLE `inscricoes` (
  `id_inscricao` int(11) NOT NULL,
  `id_atleta` int(11) DEFAULT NULL,
  `id_peneira` int(11) DEFAULT NULL,
  `data_inscricao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `inscricoes`
--

INSERT INTO `inscricoes` (`id_inscricao`, `id_atleta`, `id_peneira`, `data_inscricao`) VALUES
(1, 1, 1, '2026-05-26'),
(2, 1, 2, '2026-05-12');

-- --------------------------------------------------------

--
-- Estrutura para tabela `instituicoes`
--

CREATE TABLE `instituicoes` (
  `id_instituicao` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `instituicoes`
--

INSERT INTO `instituicoes` (`id_instituicao`, `nome`, `email`, `senha`, `telefone`, `cidade`) VALUES
(1, 'Palmeiras', 'palmeiras@email.com', '12345678', '13999992222', 'São Paulo'),
(2, 'Santos FC', 'santos@email.com', '123456', '13988888888', 'Santos'),
(3, 'Minas Tênis Clube', 'minasClube@email.com', 'minassenha01', '00 88888 2222', 'Belo Horizonte'),
(4, 'SESI Franca-Basquete', 'sesifranca@email.com', 'senhaFranca', '11 33333 4444', 'Franca'),
(5, 'Flamengo', 'flamengo@email.com', 'flamenSenha', '21 88888 0000', 'Rio de Janeiro'),
(6, 'Cruzeiro', 'cruzeiro@email.com', 'cruzeiroSenha', '00 92929 0101', 'Belo Horizonte'),
(7, 'Grêmio Náutico União', 'gremioNautico@email.com', 'nauticoSenha', '51 00000 1111', 'Porto Alegre');

-- --------------------------------------------------------

--
-- Estrutura para tabela `peneiras`
--

CREATE TABLE `peneiras` (
  `id_peneira` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `data_peneira` date DEFAULT NULL,
  `localizacao` varchar(150) DEFAULT NULL,
  `vagas` int(11) DEFAULT NULL,
  `id_esporte` int(11) DEFAULT NULL,
  `id_instituicao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `peneiras`
--

INSERT INTO `peneiras` (`id_peneira`, `titulo`, `descricao`, `data_peneira`, `localizacao`, `vagas`, `id_esporte`, `id_instituicao`) VALUES
(1, 'Peneira Sub 17', 'Seleção de novos atletas', '2026-06-10', 'Vila Belmiro', 50, 1, 2),
(2, 'Peneira Sub 19', 'Seleção de novos atletas', '2026-06-11', 'CT Palmeiras', 30, 1, 1),
(3, 'Peneira Sub 16', 'Seleção de novos atletas', '2026-07-02', 'Ginásio Poliesportivo Pedro Morilla Fuentes', 20, 3, 5),
(4, 'Peneira Sub 18', 'Seleção de novos atletas', '2026-10-01', 'Maracanãzinho', 10, 3, 6),
(5, 'Peneira Sub 16', 'Seleção de novos atletas', '2026-11-16', 'Arena UniBH', 30, 2, 7),
(6, 'Peneira Sub 14', 'Seleção de novos atletas', '2026-12-15', 'Ginásio Poliesportivo do Riacho', 50, 2, 7);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `atletas`
--
ALTER TABLE `atletas`
  ADD PRIMARY KEY (`id_atleta`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `esportes`
--
ALTER TABLE `esportes`
  ADD PRIMARY KEY (`id_esporte`);

--
-- Índices de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD PRIMARY KEY (`id_inscricao`),
  ADD UNIQUE KEY `id_atleta` (`id_atleta`,`id_peneira`),
  ADD KEY `id_peneira` (`id_peneira`);

--
-- Índices de tabela `instituicoes`
--
ALTER TABLE `instituicoes`
  ADD PRIMARY KEY (`id_instituicao`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `peneiras`
--
ALTER TABLE `peneiras`
  ADD PRIMARY KEY (`id_peneira`),
  ADD KEY `id_esporte` (`id_esporte`),
  ADD KEY `id_instituicao` (`id_instituicao`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atletas`
--
ALTER TABLE `atletas`
  MODIFY `id_atleta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `esportes`
--
ALTER TABLE `esportes`
  MODIFY `id_esporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  MODIFY `id_inscricao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `instituicoes`
--
ALTER TABLE `instituicoes`
  MODIFY `id_instituicao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `peneiras`
--
ALTER TABLE `peneiras`
  MODIFY `id_peneira` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD CONSTRAINT `inscricoes_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `atletas` (`id_atleta`),
  ADD CONSTRAINT `inscricoes_ibfk_2` FOREIGN KEY (`id_peneira`) REFERENCES `peneiras` (`id_peneira`);

--
-- Restrições para tabelas `peneiras`
--
ALTER TABLE `peneiras`
  ADD CONSTRAINT `peneiras_ibfk_1` FOREIGN KEY (`id_esporte`) REFERENCES `esportes` (`id_esporte`),
  ADD CONSTRAINT `peneiras_ibfk_2` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicoes` (`id_instituicao`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
