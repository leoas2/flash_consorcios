import React, { useMemo, useState } from "react";
import { HashRouter, Routes, Route, NavLink, Link } from "react-router-dom";

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
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number(n || 0)
  );

const CARDS = [
  { id: "IM-250", tipo: "Imóvel", valorCarta: 250000, entrada: 35000, parcelaAprox: 1950 },
  { id: "IM-400", tipo: "Imóvel", valorCarta: 400000, entrada: 55000, parcelaAprox: 2900 },
  { id: "AU-90", tipo: "Auto", valorCarta: 90000, entrada: 12000, parcelaAprox: 850 },
  { id: "AU-150", tipo: "Auto", valorCarta: 150000, entrada: 20000, parcelaAprox: 1350 },
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
      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-white hover:shadow"
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

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>Início</NavLink>
          <NavLink to="/cartas" className={linkClass}>Cartas</NavLink>
          <NavLink to="/simulador" className={linkClass}>Simulador</NavLink>
          <NavLink to="/contato" className={linkClass}>Contato</NavLink>
        </nav>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
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
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
        © {new Date().getFullYear()} {BRAND.name}. Sujeito à análise de crédito simplificada e regras da administradora.
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
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
        <h1 className="text-3xl font-extrabold leading-tight">
          Pague <span className="text-emerald-600">menos juros</span> e conquiste{" "}
          <span className="text-emerald-600">sem esperar</span>
        </h1>
        <p className="mt-3 text-slate-600">
          Cartas de crédito já contempladas para Auto e Imóvel — entrada + transferência conforme análise simplificada.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <link
            to="/cartas"
            className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
          >
            Ver cartas disponíveis
          </link>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}

function Cartas() {
  return (
    <Layout>
      <h1 className="text-2xl font-extrabold mb-6">Cartas contempladas</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <div key={c.id} className="rounded-3xl bg-slate-900 p-6 text-white">
            <div className="text-xs text-white/70">{c.tipo}</div>
            <div className="text-lg font-extrabold mt-1">{c.id}</div>
            <div className="mt-4 text-sm">Valor: {formatBRL(c.valorCarta)}</div>
            <div className="text-sm">Entrada: {formatBRL(c.entrada)}</div>
            <div className="text-sm">Parcela aprox.: {formatBRL(c.parcelaAprox)}</div>

            <a
              className="mt-5 inline-block w-full rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-extrabold text-white"
              href={`https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(
                `Olá! Tenho interesse na carta ${c.id} (${c.tipo}). Valor ${formatBRL(c.valorCarta)} e entrada ${formatBRL(c.entrada)}.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Tenho interesse — WhatsApp
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function Simulador() {
  const [valor, setValor] = useState(250000);
  const [entrada, setEntrada] = useState(35000);
  const restante = useMemo(() => Math.max(0, Number(valor) - Number(entrada)), [valor, entrada]);

  return (
    <Layout>
      <h1 className="text-2xl font-extrabold mb-6">Simulador</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow">
          <label className="text-sm font-semibold">Valor da carta</label>
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
            inputMode="numeric"
          />

          <label className="mt-4 block text-sm font-semibold">Entrada</label>
          <input
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
            inputMode="numeric"
          />

          <a
            href={`https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(
              `Olá! Quero simular uma carta contemplada. Valor: ${formatBRL(valor)}. Entrada: ${formatBRL(entrada)}. Objetivo: Auto/Imóvel.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 block rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-extrabold text-white"
          >
            Pedir proposta no WhatsApp
          </a>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6 text-white shadow">
          <div className="text-sm text-white/70">Crédito restante</div>
          <div className="mt-2 text-2xl font-extrabold">{formatBRL(restante)}</div>
          <p className="mt-4 text-sm text-white/80">
            *Valores são estimativas. Confirmação final conforme análise simplificada e regras da administradora.
          </p>
        </div>
      </div>
    </Layout>
  );
}

function Contato() {
  return (
    <Layout>
      <h1 className="text-2xl font-extrabold">Contato</h1>
      <p className="mt-2 text-sm text-slate-600">Atendimento 100% via WhatsApp.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
        >
          Falar no WhatsApp
        </a>

        <a
          href={`https://instagram.com/${BRAND.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900 border border-slate-200"
        >
          Instagram @{BRAND.instagram}
        </a>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </HashRouter>
  );
}
