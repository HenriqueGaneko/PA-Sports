import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

import { trials as demoTrials, Trial, sports } from "../data/catalog";
import { apiEnabled, apiRequest, fetchTrials } from "../services/api";
import { validateRegistration, enrollmentError } from "../services/rules.mjs";

export type User = {
  id: string;
  name: string;
  email: string;
  birth: string;
  city: string;
  phone: string;
  sport: string;
};
type Account = User & { salt: string; hash: string };
export type Registration = Omit<User, "id"> & {
  password: string;
  confirm: string;
};
type Store = {
  accounts: Account[];
  session: string | null;
  enrollments: Record<string, string[]>;
  remoteUser?: User | null;
  remoteInscricoes?: Record<string, string>;
};
const empty: Store = { accounts: [], session: null, enrollments: {} };
const KEY = "@pa-sports/demo-v1";
type Context = {
  isLoggedIn: boolean;
  isReading: boolean;
  user: User | null;
  enrolled: string[];
  ready: boolean;
  error: string | null;
  busy: boolean;
  trials: Trial[];
  trialsLoading: boolean;
  trialsError: string | null;
  refreshTrials: () => Promise<void>;
  register: (v: Registration) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  enroll: (id: string) => Promise<void>;
  cancel: (id: string) => Promise<void>;
};
export const AuthContext = createContext<Context | null>(null);
const passwordHash = (salt: string, password: string) =>
  Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`,
  );
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<Store>(empty);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const operationLock = useRef(false);
  const [trials, setTrials] = useState<Trial[]>(apiEnabled ? [] : demoTrials);
  const [trialsLoading, setTrialsLoading] = useState(apiEnabled);
  const [trialsError, setTrialsError] = useState<string | null>(null);
  async function refreshTrials() {
    if (!apiEnabled) return;
    setTrialsLoading(true);
    try {
      setTrials(await fetchTrials());
      setTrialsError(null);
    } catch (e) {
      setTrialsError(e instanceof Error ? e.message : "Falha ao carregar peneiras.");
    } finally { setTrialsLoading(false); }
  }
  useEffect(() => { void refreshTrials(); }, []);
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw);
          if (
            !Array.isArray(saved.accounts) ||
            typeof saved.enrollments !== "object" ||
            !saved.enrollments
          ) {
            throw new Error("Dados locais inválidos.");
          }
          setStore(saved);
        }
      })
      .catch(() =>
        setError(
          "Não foi possível recuperar os dados locais. Reinicie o aplicativo.",
        ),
      )
      .finally(() => setReady(true));
  }, []);
  async function persist(next: Store) {
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    setStore(next);
  }
  async function operation(fn: () => Promise<void>) {
    if (operationLock.current) {
      throw new Error("Aguarde a operação atual.");
    }
    operationLock.current = true;
    setBusy(true);
    try {
      await fn();
    } finally {
      operationLock.current = false;
      setBusy(false);
    }
  }
  const account = store.accounts.find((a) => a.id === store.session);
  const localUser: User | null = account
    ? {
        id: account.id,
        name: account.name,
        email: account.email,
        birth: account.birth,
        city: account.city,
        phone: account.phone,
        sport: account.sport,
      }
    : null;
  const user: User | null = apiEnabled ? store.remoteUser || null : localUser;
  async function register(v: Registration) {
    await operation(async () => {
      if (apiEnabled) {
        const message = validateRegistration(v);
        if (message) throw new Error(message);
        const birth = v.birth.split("/").reverse().join("-");
        await apiRequest("/atletas", { method: "POST", body: JSON.stringify({
          nome: v.name.trim(), email: v.email.trim().toLowerCase(), senha: v.password,
          data_nascimento: birth, cidade: v.city.trim(), telefone: v.phone.replace(/\D/g, ""),
          esporte: sports.find(s => s.id === v.sport)?.name || v.sport,
        }) });
        const result = await apiRequest("/atletas/login", { method: "POST", body: JSON.stringify({email:v.email.trim().toLowerCase(), senha:v.password}) });
        const athlete = Array.isArray(result) ? result[0] : null;
        if (!athlete?.id_atleta) throw new Error("Cadastro criado. Faça login para continuar.");
        await persist({ ...store, remoteUser: mapAthlete(athlete), remoteInscricoes: {} });
        return;
      }
      const message = validateRegistration(v);
      if (message) {
        throw new Error(message);
      }
      const email = v.email.trim().toLowerCase();
      if (store.accounts.some((a) => a.email === email)) {
        throw new Error("Este e-mail já está cadastrado neste dispositivo.");
      }
      const salt = Crypto.randomUUID();
      const id = Crypto.randomUUID();
      const newAccount: Account = {
        id,
        name: v.name.trim(),
        email,
        birth: v.birth,
        city: v.city.trim(),
        phone: v.phone.replace(/\D/g, ""),
        sport: v.sport,
        salt,
        hash: await passwordHash(salt, v.password),
      };
      await persist({
        ...store,
        accounts: [...store.accounts, newAccount],
        session: id,
      });
    });
  }
  async function login(email: string, password: string) {
    await operation(async () => {
      if (apiEnabled) {
        const result = await apiRequest("/atletas/login", {method:"POST", body:JSON.stringify({email:email.trim().toLowerCase(),senha:password})});
        const athlete = Array.isArray(result) ? result[0] : null;
        if (!athlete?.id_atleta) throw new Error("E-mail ou senha incorretos.");
        await persist({...store, remoteUser:mapAthlete(athlete), remoteInscricoes:{}});
        return;
      }
      const a = store.accounts.find(
        (a) => a.email === email.trim().toLowerCase(),
      );
      if (!a || (await passwordHash(a.salt, password)) !== a.hash) {
        throw new Error(
          "E-mail ou senha incorretos. Cadastre-se primeiro neste dispositivo.",
        );
      }
      await persist({ ...store, session: a.id });
    });
  }
  async function logout() {
    await operation(() => persist(apiEnabled ? {...store,remoteUser:null,remoteInscricoes:{}} : {...store,session:null}));
  }
  async function enroll(id: string) {
    await operation(async () => {
      if (!user) {
        throw new Error("Entre na sua conta para se inscrever.");
      }
      if (apiEnabled) {
        if (!trials.some(t => t.id === id && t.status === "aberta")) throw new Error("Peneira indisponível.");
        await apiRequest("/inscricoes", {method:"POST", body:JSON.stringify({id_atleta:Number(user.id), id_peneira:Number(id),data_inscricao:new Date().toISOString().slice(0,10)})});
        await loadRemoteEnrollments(user.id);
        return;
      }
      const current = store.enrollments[user.id] || [];
      const message = enrollmentError(
        trials.find((t) => t.id === id),
        current,
      );
      if (message) {
        throw new Error(message);
      }
      await persist({
        ...store,
        enrollments: { ...store.enrollments, [user.id]: [...current, id] },
      });
    });
  }
  async function cancel(id: string) {
    await operation(async () => {
      if (!user) {
        throw new Error("Entre na sua conta.");
      }
      if (apiEnabled) {
        const registration = store.remoteInscricoes?.[id];
        if (!registration) throw new Error("Inscrição não encontrada. Atualize seu perfil.");
        await apiRequest(`/inscricoes/${registration}`, {method:"DELETE"});
        await loadRemoteEnrollments(user.id);
        return;
      }
      await persist({
        ...store,
        enrollments: {
          ...store.enrollments,
          [user.id]: (store.enrollments[user.id] || []).filter(
            (item) => item !== id,
          ),
        },
      });
    });
  }
  async function loadRemoteEnrollments(id: string) {
    const data = await apiRequest(`/inscricoes/atleta/${id}`);
    const next: Record<string, string> = {};
    if (Array.isArray(data)) for (const item of data) {
      if (item.id_peneira != null) next[String(item.id_peneira)] = String(item.id_inscricao);
    }
    // Endpoint do backend pode não retornar id_peneira em versões antigas.
    await persist({...store, remoteInscricoes:next});
  }
  useEffect(() => {
    if (apiEnabled && user?.id) void loadRemoteEnrollments(user.id).catch(() => {});
  }, [user?.id]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isReading: !ready,
        user,
        enrolled: user ? (apiEnabled ? Object.keys(store.remoteInscricoes || {}) : store.enrollments[user.id] || []) : [],
        trials, trialsLoading, trialsError, refreshTrials,
        ready,
        error,
        busy,
        register,
        login,
        logout,
        enroll,
        cancel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useApp() {
  const c = useContext(AuthContext);
  if (!c) {
    throw new Error("AuthProvider ausente.");
  }
  return c;
}

export const useAuth = useApp;

function mapAthlete(a: any): User {
  const sport = String(a.esporte || "futebol");
  return {
    id: String(a.id_atleta), name: String(a.nome || ""), email: String(a.email || ""),
    birth: String(a.data_nascimento || "").slice(0,10).split("-").reverse().join("/"),
    city: String(a.cidade || ""), phone: String(a.telefone || ""),
    sport: sports.find(s => s.name.toLowerCase() === sport.toLowerCase())?.id || sport,
  };
}
