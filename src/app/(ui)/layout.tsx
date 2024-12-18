"use client";

import { ReactNode, useState } from "react";
import NavItem from "../components/ui/nav-item";
import {
  faBox,
  faTruck,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="flex min-h-screen bg-gray-100 flex-col sm:flex-row relative">
      <header className="bg-white w-full p-4 border-b border-gray-200 flex items-center justify-between sm:hidden">
        <Link href={"/delivery"}>
          <span className="text-lg font-semibold">Dashboard</span>
        </Link>
        <button
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="h-6 w-6 text-gray-700"
          />
        </button>
      </header>

      <aside
        className={`bg-white w-64 p-6 border-r border-gray-200 flex-shrink-0 transform sm:transform-none transition-transform duration-300 z-50
        fixed top-0 left-0 h-full sm:h-auto sm:static sm:w-64
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 py-6">
          <Link href={"/delivery"}>
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 mt-6">
          <nav className="mt-11">
            <NavItem href="/delivery" icon={faBox} label="Entregas" />
            <NavItem href="/truck" icon={faTruck} label="Caminhôes" />
            <NavItem href="/driver" icon={faUser} label="Motoristas" />
          </nav>
        </div>
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <section className="flex-1 p-8 bg-white mt-4 mx-4 mb-4 rounded-lg shadow-md border border-gray-200">
        {children}
      </section>
    </main>
  );
}
