// ─── DADOS DOS ESPORTES ───
const SPORTS = [
  {
    id: 'futebol',
    nome: 'Futebol',
    icon: '⚽',
    desc: 'O esporte mais popular do Brasil. Peneiras para todos os níveis e categorias.',
    categorias: ['Sub-13', 'Sub-15', 'Sub-17', 'Sub-20', 'Profissional'],
    requisitos: ['Atestado médico', 'RG ou Certidão de nascimento', 'Foto 3x4', 'Autorização dos pais (menores)'],
    sobre: 'O futebol brasileiro é reconhecido mundialmente pela qualidade técnica e pela paixão dos atletas. Nossas peneiras conectam jovens talentos com os melhores clubes do país.'
  },
  {
    id: 'basquete',
    nome: 'Basquete',
    icon: '🏀',
    desc: 'Esporte de alto nível com crescimento acelerado no Brasil. Vagas em equipes da NBA G League.',
    categorias: ['Sub-14', 'Sub-16', 'Sub-18', 'Sub-21', 'Adulto'],
    requisitos: ['Atestado médico', 'Documentos pessoais', 'Laudo técnico de treinador'],
    sobre: 'O basquete brasileiro vive uma fase de ouro. Com times competindo em nível internacional, a busca por novos talentos é constante e as oportunidades nunca foram tão grandes.'
  },
  {
    id: 'volei',
    nome: 'Vôlei',
    icon: '🏐',
    desc: 'Modalidade com grande tradição olímpica brasileira. Clubes de alto rendimento buscando atletas.',
    categorias: ['Infantil', 'Infanto', 'Juvenil', 'Junior', 'Adulto'],
    requisitos: ['Atestado médico', 'Ficha de inscrição', 'Documentos pessoais'],
    sobre: 'O Brasil é uma potência mundial no vôlei. Clubes como Minas, Sesi e Cruzeiro realizam peneiras periodicamente para revelar novos talentos para o esporte.'
  },
  {
    id: 'natacao',
    nome: 'Natação',
    icon: '🏊',
    desc: 'Esporte individual com foco em performance e tempos. Peneiras para equipes de alto rendimento.',
    categorias: ['Infantil A', 'Infantil B', 'Juvenil', 'Junior', 'Sênior'],
    requisitos: ['Registro CBN', 'Atestado médico', 'Tempos de referência'],
    sobre: 'A natação brasileira tem tradição olímpica e forma grandes campeões. Nosso portal conecta nadadores promissores às melhores equipes e projetos esportivos do país.'
  },
  {
    id: 'tenis',
    nome: 'Tênis',
    icon: '🎾',
    desc: 'Esporte individual com circuito nacional e internacional. Academias de alto nível.',
    categorias: ['Mirim', 'Infantil', 'Juvenil', 'Adulto'],
    requisitos: ['Registro CBT', 'Ranking atual', 'Atestado médico'],
    sobre: 'O tênis é um dos esportes que mais crescem no Brasil. Com academias de ponta e treinadores de nível internacional, as oportunidades para jovens talentos são enormes.'
  },
  {
    id: 'atletismo',
    nome: 'Atletismo',
    icon: '🏃',
    desc: 'A base de todos os esportes. Provas de pista e campo para atletas de todas as idades.',
    categorias: ['Sub-16', 'Sub-18', 'Sub-20', 'Sub-23', 'Adulto'],
    requisitos: ['Atestado médico', 'Marcas de referência', 'Documentos pessoais'],
    sobre: 'O atletismo brasileiro vive um momento histórico, com atletas disputando medalhas em Olimpíadas e Mundiais. Este é o momento ideal para iniciar sua jornada olímpica.'
  }
];

// ─── DADOS DAS PENEIRAS ───
const PENEIRAS = [
  {
    id: 1,
    sport: 'futebol',
    icon: '⚽',
    titulo: 'Flamengo — Categorias de Base',
    local: 'Ninho do Urubu, Rio de Janeiro - RJ',
    data: '15 Jun 2025',
    hora: '08:00 - 12:00',
    idade: '13 a 17 anos',
    vagas: 30,
    inscritos: 187,
    status: 'aberta',
    valor: 'Gratuito'
  },
  {
    id: 2,
    sport: 'futebol',
    icon: '⚽',
    titulo: 'Corinthians — Sub-15 e Sub-17',
    local: 'CT Dr. Joaquim Grava, São Paulo - SP',
    data: '22 Jun 2025',
    hora: '09:00 - 13:00',
    idade: '14 a 16 anos',
    vagas: 25,
    inscritos: 143,
    status: 'aberta',
    valor: 'Gratuito'
  },
  {
    id: 3,
    sport: 'basquete',
    icon: '🏀',
    titulo: 'Basquete Brasília — Equipe Sub-18',
    local: 'Arena BsB, Brasília - DF',
    data: '18 Jun 2025',
    hora: '10:00 - 14:00',
    idade: '15 a 18 anos',
    vagas: 12,
    inscritos: 68,
    status: 'aberta',
    valor: 'R$ 50,00'
  },
  {
    id: 4,
    sport: 'volei',
    icon: '🏐',
    titulo: 'Minas Tênis Clube — Vôlei Feminino',
    local: 'Mineirinho, Belo Horizonte - MG',
    data: '10 Jun 2025',
    hora: '14:00 - 17:00',
    idade: '14 a 19 anos',
    vagas: 8,
    inscritos: 91,
    status: 'encerrada',
    valor: 'Gratuito'
  },
  {
    id: 5,
    sport: 'natacao',
    icon: '🏊',
    titulo: 'SESI-SP — Núcleo de Natação',
    local: 'SESI Água Branca, São Paulo - SP',
    data: '28 Jun 2025',
    hora: '08:00 - 11:00',
    idade: '10 a 16 anos',
    vagas: 20,
    inscritos: 55,
    status: 'aberta',
    valor: 'Gratuito'
  },
  {
    id: 6,
    sport: 'tenis',
    icon: '🎾',
    titulo: 'Tênis Clube Paulistano — Formação',
    local: 'Club Athletico Paulistano, São Paulo - SP',
    data: '05 Jul 2025',
    hora: '08:00 - 12:00',
    idade: '8 a 14 anos',
    vagas: 15,
    inscritos: 40,
    status: 'breve',
    valor: 'R$ 80,00'
  },
  {
    id: 7,
    sport: 'atletismo',
    icon: '🏃',
    titulo: 'Centro Olímpico de Treinamento — Sprint',
    local: 'COT, Brasília - DF',
    data: '20 Jun 2025',
    hora: '07:00 - 10:00',
    idade: '15 a 22 anos',
    vagas: 10,
    inscritos: 34,
    status: 'aberta',
    valor: 'Gratuito'
  },
  {
    id: 8,
    sport: 'futebol',
    icon: '⚽',
    titulo: 'Grêmio — Projeto Revelação Gaúcho',
    local: 'CT Luiz Carvalho, Porto Alegre - RS',
    data: '25 Jun 2025',
    hora: '09:00 - 13:00',
    idade: '12 a 16 anos',
    vagas: 20,
    inscritos: 98,
    status: 'aberta',
    valor: 'Gratuito'
  },
  {
    id: 9,
    sport: 'basquete',
    icon: '🏀',
    titulo: 'Flamengo Basketball — Masculino',
    local: 'Maracanãzinho, Rio de Janeiro - RJ',
    data: '12 Jun 2025',
    hora: '10:00 - 13:00',
    idade: '13 a 17 anos',
    vagas: 15,
    inscritos: 76,
    status: 'aberta',
    valor: 'Gratuito'
  }
];

// ─── PARCEIROS ───
const PARCEIROS = [
  { nome: 'Flamengo', icon: '⚽', tipo: 'Clube Parceiro', desc: 'Maior torcida do Brasil. Parceria para peneiras nas categorias de base.' },
  { nome: 'SESI-SP', icon: '🏊', tipo: 'Instituto Parceiro', desc: 'Programa de natação e esportes aquáticos para jovens talentos.' },
  { nome: 'CBF Academy', icon: '📋', tipo: 'Federação', desc: 'Confederação Brasileira de Futebol. Certificação e validação das peneiras.' },
  { nome: 'Nike Brasil', icon: '👟', tipo: 'Patrocinador', desc: 'Fornecimento de materiais esportivos e apoio aos atletas selecionados.' },
  { nome: 'Basquete Brasília', icon: '🏀', tipo: 'Clube Parceiro', desc: 'Equipe da NBB com forte trabalho de base na capital federal.' },
  { nome: 'Minas Tênis', icon: '🏐', tipo: 'Clube Parceiro', desc: 'Um dos maiores clubes de vôlei do mundo. Parceria para revelação de talentos.' },
  { nome: 'Gatorade', icon: '💧', tipo: 'Patrocinador', desc: 'Hidratação oficial dos atletas em todas as peneiras do portal.' },
  { nome: 'FPF', icon: '🏆', tipo: 'Federação', desc: 'Federação Paulista de Futebol. Credenciamento e organização das seletivas.' }
];
