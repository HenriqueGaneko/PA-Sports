import type { Trial, Sport, Institution } from "../data/catalog";

// Configure a URL do servidor COMPARTILHADO entre site e aplicativo.
const API_BASE = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");
export const apiEnabled = !!API_BASE;

export async function apiRequest(path: string, init?: RequestInit): Promise<any> {
  if (!API_BASE) throw new Error("Configure EXPO_PUBLIC_API_URL para o back-end do website.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init, signal: controller.signal,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
    const json = await response.json();
    if (!response.ok || json?.message === "Error") {
      throw new Error(typeof json?.data === "string" ? json.data : json?.message || `Erro HTTP ${response.status}`);
    }
    return json?.data ?? json;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw new Error("Tempo de conexão esgotado. Confira o IP do servidor e a rede.");
    throw error;
  } finally { clearTimeout(timeout); }
}

export async function fetchSports(): Promise<Sport[]> {
  const data = await apiRequest("/esportes");
  if (!Array.isArray(data)) throw new Error("Resposta inválida ao consultar esportes.");
  return data.map((s: any) => ({ id: String(s.nome_esporte || ""), name: String(s.nome_esporte || "") })).filter(s => s.id);
}
export async function fetchInstitutions(): Promise<Institution[]> {
  const data = await apiRequest("/instituicoes");
  if (!Array.isArray(data)) throw new Error("Resposta inválida ao consultar instituições.");
  return data.map((s: any) => ({ id: String(s.id_instituicao), name: String(s.nome || ""), city: String(s.cidade || "") }));
}
export async function fetchAthleteCount(): Promise<number> {
  const data = await apiRequest("/estatisticas");
  return Number(data.atletas || 0);
}
export async function fetchTrials(): Promise<Trial[]> {
  const rows = await apiRequest("/peneiras");
  if (!Array.isArray(rows)) throw new Error("Resposta inválida da API de peneiras.");
  const today = new Date(); const todayLabel = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  return rows.map((p: any) => {
    const date = String(p.data_peneira || "").slice(0, 10);
    return {
      id: String(p.id_peneira), sport: String(p.nome_esporte || ""),
      title: String(p.titulo || "Peneira esportiva"), club: String(p.nome_instituicao || "Instituição não informada"),
      city: String(p.localizacao || "Local não informado"), date, time: "A confirmar",
      age: "Consultar organização", capacity: Number(p.vagas || 0),
      status: date && date < todayLabel || Number(p.vagas || 0) <= 0 ? "encerrada" : "aberta",
      requirements: String(p.descricao || "Consulte a organização para obter os requisitos."),
      price: "Consultar organização",
    } as Trial;
  });
}
