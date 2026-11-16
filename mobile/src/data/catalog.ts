export type Sport = { id: string; name: string };
export type Institution = { id: string; name: string; city: string };
export type Trial = {
  id: string; sport: string; title: string; club: string; city: string;
  date: string; time: string; age: string; capacity: number;
  status: "aberta" | "breve" | "encerrada";
  requirements: string; price: string;
};
export const sportName = (id: string) => id || "Esporte não informado";
export const dateLabel = (date: string) => date ? date.slice(0, 10).split("-").reverse().join("/") : "A confirmar";
