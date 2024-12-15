import { ReactNode } from "react";
import NavItem from "../components/ui/nav-item";
import { faBox, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function Layouit({ children }: Props) {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <aside className="bg-white w-64 p-6 border-r border-gray-200">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 py-6">
          <Link href={"/driver"}>
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

      <section className="flex-1 p-8 bg-white mt-4 ml-4 mb-4 rounded-lg shadow-md border border-gray-200">
        {children}
      </section>
    </main>
  );
}
