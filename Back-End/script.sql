
CREATE DATABASE bancoSports;

USE bancoSports;

CREATE TABLE atletas (
    id_atleta INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    data_nascimento DATE,
    telefone VARCHAR(20),
    cidade VARCHAR(100),
    esporte VARCHAR(50)
);

CREATE TABLE esportes (
    id_esporte   INT PRIMARY KEY AUTO_INCREMENT,
    nome_esporte VARCHAR(50)
);

CREATE TABLE instituicoes (
    id_instituicao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    telefone VARCHAR(20),
    cidade VARCHAR(100)
);

CREATE TABLE peneiras (
    id_peneira INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao TEXT,
    data_peneira DATE,
    localizacao VARCHAR(150),
    vagas INT,
    id_esporte INT,
    id_instituicao INT,
    FOREIGN KEY (id_esporte) REFERENCES esportes(id_esporte), FOREIGN KEY (id_instituicao) REFERENCES instituicoes(id_instituicao)
);

CREATE TABLE inscricoes (
    id_inscricao   INT PRIMARY KEY AUTO_INCREMENT,
    id_atleta INT,
    id_peneira INT,
    data_inscricao DATE,
    FOREIGN KEY (id_atleta)  REFERENCES atletas(id_atleta), FOREIGN KEY (id_peneira) REFERENCES peneiras(id_peneira), UNIQUE (id_atleta, id_peneira)
);


INSERT INTO esportes (nome_esporte) VALUES ('Futebol'), ('Vôlei'), ('Basquete'), ('Natacao'), ('Tenis'), ('Atletismo');

INSERT INTO atletas (nome, email, senha, data_nascimento, telefone, cidade, esporte)
VALUES
  ('Henrique', 'henrique@email.com', '123456', '2000-05-10', '13999999999', 'Santos', 'Futebol'),
  ('Bruno',    'bruno@email.com',    '12345678', '2001-03-22', '13999997777', 'São Paulo', 'Basquete'),
  ('teste',    'teste@email.com',    'teste01', '2000-02-12', '11999997777', 'Taquaritinga - SP', 'Natação');

INSERT INTO instituicoes (nome, email, senha, telefone, cidade)
VALUES
  ('Palmeiras', 'palmeiras@email.com', '12345678', '13999992222', 'São Paulo'),
  ('Santos FC', 'santos@email.com',    '123456',   '13988888888', 'Santos'),
  ('Minas Tênis Clube', 'minasClube@email.com', 'minassenha01', '00 88888 2222', 'Belo Horizonte'),
  ('SESI Franca-Basquete', 'sesifranca@email.com', 'senhaFranca', '11 33333 4444', 'Franca'),
  ('Flamengo', 'flamengo@email.com', 'flamenSenha', '21 88888 0000', 'Rio de Janeiro'),
  ('Cruzeiro', 'cruzeiro@email.com', 'cruzeiroSenha', '00 92929 0101', 'Belo Horizonte'),
  ('Grêmio Náutico União', 'gremioNautico@email.com', 'nauticoSenha', '51 00000 1111', 'Porto Alegre');


INSERT INTO peneiras (titulo, descricao, data_peneira, localizacao, vagas, id_esporte, id_instituicao)
VALUES
  ('Peneira Sub 17', 'Seleção de novos atletas', '2026-06-10', 'Vila Belmiro',  50, 1, 2),
  ('Peneira Sub 19', 'Seleção de novos atletas', '2026-06-11', 'CT Palmeiras',  30, 1, 1),
  ('Peneira Sub 16', 'Seleção de novos atletas', '2026-07-02', 'Ginásio Poliesportivo Pedro Morilla Fuentes', 20, 3, 5),
  ('Peneira Sub 18', 'Seleção de novos atletas', '2026-10-01', 'Maracanãzinho', 10, 3, 6),
  ('Peneira Sub 16', 'Seleção de novos atletas', '2026-11-16', 'Arena UniBH', 30, 2, 7),
  ('Peneira Sub 14', 'Seleção de novos atletas', '2026-12-15', 'Ginásio Poliesportivo do Riacho', 50, 2, 7);

INSERT INTO inscricoes (id_atleta, id_peneira, data_inscricao)
VALUES
  (1, 1, '2026-05-26'),
  (1, 2, '2026-05-12');
