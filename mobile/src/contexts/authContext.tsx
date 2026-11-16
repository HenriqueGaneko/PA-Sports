import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trial, Sport, Institution } from "../data/catalog";
import { apiRequest, fetchTrials, fetchSports, fetchInstitutions, fetchAthleteCount } from "../services/api";
import { validateRegistration, enrollmentError } from "../services/rules.mjs";

export type User = { id: string; name: string; email: string; birth: string; city: string; phone: string; sport: string };
export type Registration = Omit<User,"id"> & { password: string; confirm: string };
type Session = { user: User | null };
const KEY = "@pa-sports/remote-session-v2";
type Context = {
  isLoggedIn: boolean; isReading: boolean; user: User | null; enrolled: string[]; ready: boolean;
  error: string | null; busy: boolean; trials: Trial[]; sports: Sport[]; institutions: Institution[];
  athleteCount: number | null; trialsLoading: boolean; trialsError: string | null;
  refreshTrials: () => Promise<void>;
  register: (v: Registration) => Promise<void>; login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>; enroll: (id: string) => Promise<void>; cancel: (id: string) => Promise<void>;
};
const AuthContext = createContext<Context | null>(null);
const mapAthlete = (a: any): User => ({
  id: String(a.id_atleta), name: String(a.nome || ""), email: String(a.email || ""),
  birth: String(a.data_nascimento || "").slice(0,10).split("-").reverse().join("/"),
  city: String(a.cidade || ""), phone: String(a.telefone || ""), sport: String(a.esporte || ""),
});
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false); const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false); const lock = useRef(false);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [athleteCount, setAthleteCount] = useState<number | null>(null);
  const [trialsLoading, setTrialsLoading] = useState(true);
  const [trialsError, setTrialsError] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Record<string,string>>({});
  const refreshTrials = async () => {
    setTrialsLoading(true);
    const results = await Promise.allSettled([fetchTrials(), fetchSports(), fetchInstitutions(), fetchAthleteCount()]);
    const [t,s,i,a] = results;
    if (t.status === "fulfilled") { setTrials(t.value); setTrialsError(null); }
    else { setTrialsError(t.reason instanceof Error ? t.reason.message : "Falha ao carregar peneiras."); setTrials([]); }
    if (s.status === "fulfilled") setSports(s.value);
    if (i.status === "fulfilled") setInstitutions(i.value);
    if (a.status === "fulfilled") setAthleteCount(a.value);
    setTrialsLoading(false);
  };
  useEffect(() => { void refreshTrials(); AsyncStorage.getItem(KEY).then(raw => {
    if (raw) { const value = JSON.parse(raw) as Session; setUser(value.user || null); }
  }).catch(() => setError("Não foi possível recuperar a sessão.")).finally(() => setReady(true)); }, []);
  const persistUser = async (value: User | null) => { await AsyncStorage.setItem(KEY, JSON.stringify({user:value})); setUser(value); };
  const operation = async (fn: () => Promise<void>) => {
    if (lock.current) throw new Error("Aguarde a operação atual.");
    lock.current = true; setBusy(true);
    try { await fn(); } finally { lock.current = false; setBusy(false); }
  };
  async function register(v: Registration) {
    await operation(async () => {
      const validation = validateRegistration(v); if (validation) throw new Error(validation);
      await apiRequest("/atletas", { method:"POST", body: JSON.stringify({
        nome:v.name.trim(), email:v.email.trim().toLowerCase(), senha:v.password,
        data_nascimento:v.birth.split("/").reverse().join("-"), cidade:v.city.trim(),
        telefone:v.phone.replace(/\D/g,""), esporte:v.sport,
      }) });
      const athletes = await apiRequest("/atletas/login", { method:"POST", body:JSON.stringify({email:v.email.trim().toLowerCase(),senha:v.password}) });
      if (!Array.isArray(athletes) || !athletes[0]?.id_atleta) throw new Error("Cadastro realizado. Faça login para continuar.");
      await persistUser(mapAthlete(athletes[0]));
    });
  }
  async function login(email: string, password: string) {
    await operation(async () => {
      const athletes = await apiRequest("/atletas/login", { method:"POST", body:JSON.stringify({email:email.trim().toLowerCase(),senha:password}) });
      if (!Array.isArray(athletes) || !athletes[0]?.id_atleta) throw new Error("E-mail ou senha incorretos.");
      await persistUser(mapAthlete(athletes[0]));
    });
  }
  async function logout() { await operation(async () => { await persistUser(null); setRegistrations({}); }); }
  async function reloadRegistrations(id: string) {
    const data = await apiRequest(`/inscricoes/atleta/${encodeURIComponent(id)}`);
    const result: Record<string,string> = {};
    if (Array.isArray(data)) data.forEach((row:any) => { if(row.id_peneira != null) result[String(row.id_peneira)] = String(row.id_inscricao); });
    setRegistrations(result);
  }
  useEffect(() => { setRegistrations({}); if (user?.id) void reloadRegistrations(user.id).catch(e => setError(e instanceof Error ? e.message : "Falha ao buscar inscrições.")); }, [user?.id]);
  async function enroll(id: string) {
    await operation(async () => {
      if (!user) throw new Error("Entre na sua conta para se inscrever.");
      const validation = enrollmentError(trials.find(t=>t.id===id),Object.keys(registrations));
      if(validation) throw new Error(validation);
      await apiRequest("/inscricoes",{method:"POST",body:JSON.stringify({id_atleta:Number(user.id),id_peneira:Number(id),data_inscricao:new Date().toISOString().slice(0,10)})});
      await reloadRegistrations(user.id);
    });
  }
  async function cancel(id: string) {
    await operation(async () => {
      if (!user) throw new Error("Entre na sua conta.");
      const registration = registrations[id]; if(!registration) throw new Error("Inscrição não encontrada.");
      await apiRequest(`/inscricoes/${encodeURIComponent(registration)}`, {method:"DELETE"});
      await reloadRegistrations(user.id);
    });
  }
  return <AuthContext.Provider value={{ isLoggedIn:!!user,isReading:!ready,user,enrolled:Object.keys(registrations),ready,error,busy,trials,sports,institutions,athleteCount,trialsLoading,trialsError,refreshTrials,register,login,logout,enroll,cancel }}>{children}</AuthContext.Provider>;
}
export function useApp() { const context=useContext(AuthContext); if(!context) throw new Error("AuthProvider ausente."); return context; }
export const useAuth=useApp;
