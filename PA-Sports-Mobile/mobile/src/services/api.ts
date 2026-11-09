import { Trial, sports } from "../data/catalog";

/** No celular físico use o IP da máquina que roda a API, nunca localhost. */
export const API_BASE = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/$/, "");
export const apiEnabled = !!API_BASE;

export async function apiRequest(path: string, init?: RequestInit): Promise<any> {
  if (!apiEnabled) throw new Error("Configure EXPO_PUBLIC_API_URL no arquivo .env");
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
    if (error instanceof Error && error.name === "AbortError") throw new Error("Tempo de conexão esgotado. Confira o endereço da API.");
    throw error;
  } finally { clearTimeout(timeout); }
}

export function normalizeSport(s: string) {
  const text = (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sports.find(x => x.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === text)?.id || text;
}

export async function fetchTrials(): Promise<Trial[]> {
  const rows = await apiRequest("/peneiras");
  if (!Array.isArray(rows)) throw new Error("Resposta inválida da API de peneiras.");
  return rows.map((p: any) => ({
    id: String(p.id_peneira ?? p.id), sport: normalizeSport(p.nome_esporte || p.esporte || ""),
    title: String(p.titulo || "Peneira esportiva"), club: String(p.nome_instituicao || "Instituição não informada"),
    city: String(p.localizacao || "Local não informado"), date: String(p.data_peneira || "").slice(0,10),
    time: String(p.hora || "Horário a confirmar"), age: String(p.faixa_etaria || "Consultar organização"),
    capacity: Number(p.vagas || 0), status: (["aberta", "breve", "encerrada"].includes(p.status) ? p.status : "aberta") as Trial["status"],
    requirements: String(p.descricao || "Consulte a organização sobre documentação e requisitos."),
    price: String(p.valor || "Gratuito"),
  }));
}
