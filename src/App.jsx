import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const BRAND = {
  name: "Flash Consórcios",
  whatsappE164: "5564999968757",
  whatsappDisplay: "(64) 99996-8757",
  instagram: "consorciosflash",
};

const WHATSAPP_LINK = `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(
  "Olá! Quero consultar cartas de crédito contempladas (Auto/Imóvel)."
)}`;

const formatBRL = (n) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(n || 0));

const CARDS = [
  {
    id: "IM-250",
    tipo: "Imóvel",
    valorCarta: 250000,
    entrada: 35000,
    parcelaAprox: 1950,
    prazoMeses: 160,
  },
  {
    id: "IM-400",
    tipo: "Imóvel",
    valorCarta: 400000,
    entrada: 55000,
    parcelaAprox: 2900,
    prazoMeses: 180,
  },
  {
    id: "AU-90",
    tipo: "Auto",
    valorCarta: 90000,
    entrada: 12000,
    parcelaAprox: 850,
    prazoMeses: 80,
  },
  {
    id: "AU-150",
    tipo: "Auto",
    valorCarta: 150000,
    entrada: 20000,
    parcelaAprox: 1350,
    prazoMeses: 90,
  },
];

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Header() {
  const linkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-white hover:shadow"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Flash Consórcios" className="h-10 w-auto" />
          <div>
            <div className="text-base font-extrabold">
              Flash <span className="text-emerald-600">Consórcios</span>
            </div>
            <div className="text-xs text-slate-500">Sua conquista, agora.</div>
          </div>
        </div>

        <nav className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClass}>
            Início
          </NavLink>
          <NavLink to="/cartas" className={linkClass}>
            Cartas
          </NavLink>
          <NavLink to="/simulador" className={linkClass}>
            Simulador
          </NavLink>
          <NavLink to="/contato" className={linkClass}>
            Contato
          </NavLink>
        </nav>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
        © {new Date().getFullYear()} Flash Consórcios • Atendimento via WhatsApp
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      className="fixed bottom-5 right-5 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg"
    >
      WhatsApp
    </a>
  );
}

function Home() {
  return (
    <Layout>
      <section className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-extrabold">
          Pague <span className="text-emerald-600">menos juros</span> e compre{" "}
          <span className="text-emerald-600">sem esperar</span>
        </h1>
        <p className="mt-3 text-slate-600">
          Cartas de crédito já contempladas para Auto e Imóvel.
        </p>
        <a
          href="/cartas"
          className="mt-5 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Ver cartas disponíveis
        </a>
      </section>
    </Layout>
  );
}

function Cartas() {
  return (
    <Layout>
      <h1 className="text-2xl font-extrabold mb-6">
        Cartas Contempladas Disponíveis
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <div key={c.id} className="rounded-3xl bg-slate-900 p-6 text-white">
            <div className="text-lg font-extrabold">{c.id}</div>
            <div className="text-sm text-white/70">{c.tipo}</div>
            <div className="mt-3 text-sm">
              Valor: {formatBRL(c.valorCarta)}
            </div>
            <div className="text-sm">Entrada: {formatBRL(c.entrada)}</div>
            <div className="text-sm">
              Parcela aprox: {formatBRL(c.parcelaAprox)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function Simulador() {
  const [valor, setValor] = useState(250000);
  const [entrada, setEntrada] = useState(35000);

  const restante = useMemo(() => valor - entrada, [valor, entrada]);

  return (
    <Layout>
      <h1 className="text-2xl font-extrabold mb-6">Simulador</h1>
      <input
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        className="border p-3 rounded-xl w-full mb-3"
        placeholder="Valor da carta"
      />
      <input
        value={entrada}
        onChange={(e) => setEntrada(Number(e.target.value))}
        className="border p-3 rounded-xl w-full"
        placeholder="Entrada"
      />
      <div className="mt-4 text-sm">
        Crédito restante: {formatBRL(restante)}
      </div>
    </Layout>
  );
}

function Contato() {
  return (
    <Layout>
      <h1 className="text-2xl font-extrabold">Contato</h1>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        className="mt-4 inline-block rounded-2xl bg-emerald-600 px-5 py-3 text-white font-bold"
      >
        Falar no WhatsApp
      </a>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}

