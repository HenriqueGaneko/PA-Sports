export const sports = [
  {
    id: "futebol",
    name: "Futebol",
    mark: "01",
    description: "Técnica, trabalho em equipe e novas oportunidades.",
    categories: "Sub-13 · Sub-15 · Sub-17 · Sub-20",
  },
  {
    id: "basquete",
    name: "Basquete",
    mark: "02",
    description: "Encontre seu espaço dentro e fora da quadra.",
    categories: "Sub-14 · Sub-16 · Sub-18 · Adulto",
  },
  {
    id: "volei",
    name: "Vôlei",
    mark: "03",
    description: "Prepare seu próximo salto no esporte.",
    categories: "Infantil · Juvenil · Adulto",
  },
  {
    id: "natacao",
    name: "Natação",
    mark: "04",
    description: "Cada segundo conta. Descubra novas equipes.",
    categories: "Infantil · Juvenil · Sênior",
  },
  {
    id: "tenis",
    name: "Tênis",
    mark: "05",
    description: "O próximo ponto pode abrir uma nova história.",
    categories: "Mirim · Juvenil · Adulto",
  },
  {
    id: "atletismo",
    name: "Atletismo",
    mark: "06",
    description: "Vá além das suas marcas em pista e campo.",
    categories: "Sub-16 · Sub-18 · Sub-20 · Adulto",
  },
];
export type Trial = {
  id: string;
  sport: string;
  title: string;
  club: string;
  city: string;
  date: string;
  time: string;
  age: string;
  capacity: number;
  status: "aberta" | "breve" | "encerrada";
  requirements: string;
  price: string;
};
export const trials: Trial[] = [
  {
    id: "demo-1",
    sport: "futebol",
    title: "Seletiva de categorias de base",
    club: "Centro Esportivo • demonstração",
    city: "São Paulo — SP",
    date: "2027-06-15",
    time: "08h00",
    age: "13 a 17 anos",
    capacity: 30,
    status: "aberta",
    requirements:
      "Documento de identificação, atestado médico e autorização do responsável para menores.",
    price: "Gratuito",
  },
  {
    id: "demo-2",
    sport: "basquete",
    title: "Novos talentos da quadra",
    club: "Projeto Basquete • demonstração",
    city: "Ribeirão Preto — SP",
    date: "2027-06-20",
    time: "09h00",
    age: "15 a 18 anos",
    capacity: 12,
    status: "aberta",
    requirements: "Documento de identificação e roupa esportiva.",
    price: "Gratuito",
  },
  {
    id: "demo-3",
    sport: "volei",
    title: "Seleção juvenil de vôlei",
    club: "Núcleo de Vôlei • demonstração",
    city: "Jaboticabal — SP",
    date: "2027-06-22",
    time: "14h00",
    age: "14 a 19 anos",
    capacity: 18,
    status: "aberta",
    requirements:
      "Documento de identificação e autorização do responsável para menores.",
    price: "Gratuito",
  },
  {
    id: "demo-4",
    sport: "natacao",
    title: "Equipe de desenvolvimento",
    club: "Centro Aquático • demonstração",
    city: "Araraquara — SP",
    date: "2027-07-02",
    time: "08h00",
    age: "12 a 17 anos",
    capacity: 20,
    status: "breve",
    requirements: "Atestado médico e tempos de referência.",
    price: "Gratuito",
  },
  {
    id: "demo-5",
    sport: "tenis",
    title: "Formação de jovens atletas",
    club: "Academia de Tênis • demonstração",
    city: "São Carlos — SP",
    date: "2025-07-05",
    time: "10h00",
    age: "10 a 16 anos",
    capacity: 15,
    status: "encerrada",
    requirements: "Documento de identificação e raquete.",
    price: "Gratuito",
  },
  {
    id: "demo-6",
    sport: "atletismo",
    title: "Velocidade e provas de pista",
    club: "Projeto Atletismo • demonstração",
    city: "Taquaritinga — SP",
    date: "2027-07-10",
    time: "07h00",
    age: "15 a 22 anos",
    capacity: 24,
    status: "aberta",
    requirements: "Documento de identificação e marcas de referência.",
    price: "Gratuito",
  },
];
export const sportName = (id: string) =>
  sports.find((s) => s.id === id)?.name || id;
export const dateLabel = (date: string) => date ? date.slice(0,10).split("-").reverse().join("/") : "A confirmar";
