CREATE DATABASE bancoSports;

USE bancoSports;

CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    tipo_usuario VARCHAR(20), -- atleta ou instituicao
    telefone VARCHAR(20),
    cidade VARCHAR(100)
);

CREATE TABLE esportes (
    id_esporte INT PRIMARY KEY AUTO_INCREMENT,
    nome_esporte VARCHAR(50)
);

CREATE TABLE peneiras (
    id_peneira INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao TEXT,
    data_peneira DATE,
    localizacao VARCHAR(150),
    vagas INT,

    id_esporte INT,
    id_user INT,

    FOREIGN KEY (id_esporte) REFERENCES esportes(id_esporte),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE inscricoes (
    id_inscricao INT PRIMARY KEY AUTO_INCREMENT,

    id_user INT,
    id_peneira INT,

    data_inscricao DATE,

    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_peneira) REFERENCES peneiras(id_peneira),

    UNIQUE (id_user, id_peneira)
);

INSERT INTO esportes (nome_esporte)
VALUES
('Futebol'),
('Vôlei'),
('Basquete');

INSERT INTO users
(nome, email, senha, tipo_usuario, telefone, cidade)
VALUES
('Henrique', 'henrique@email.com', '123456', 'atleta', '13999999999', 'Santos');

INSERT INTO users
(nome, email, senha, tipo_usuario, telefone, cidade)
VALUES
('Bruno', 'bruno@email.com', '12345678', 'atleta', '13999997777', 'São Paulo');

INSERT INTO users
(nome, email, senha, tipo_usuario, telefone, cidade)
VALUES
('Palmeiras', 'palmeiras@email.com', '12345678', 'instituicao', '13999992222', 'São Paulo');

INSERT INTO users
(nome, email, senha, tipo_usuario, telefone, cidade)
VALUES
('Santos FC', 'santos@email.com', '123456', 'instituicao', '13988888888', 'Santos');

INSERT INTO peneiras
(titulo, descricao, data_peneira, localizacao, vagas, id_esporte, id_user)
VALUES
(
'Peneira Sub-17',
'Seleção de novos atletas',
'2026-06-10',
'Vila Belmiro',
50,
1,
2
);

INSERT INTO peneiras
(titulo, descricao, data_peneira, localizacao, vagas, id_esporte, id_user)
VALUES
(
'Peneira Sub-19',
'Seleção de novos atletas',
'2026-06-11',
'CT Palmeiras',
30,
1,
9
);


INSERT INTO inscricoes
(id_user, id_peneira, data_inscricao)
VALUES
(1, 3, '2026-05-26');

INSERT INTO inscricoes
(id_user, id_peneira, data_inscricao)
VALUES
(1, 4, '2026-05-12');