import { ReactNode } from "react";
import Menu from "../components/ui/menu";
type Props = {
    children: ReactNode
}

export default function Layouit({ children }: Props) {

    return (
        <main className="flex min-h-screen bg-gray-100">
            <aside className="bg-white w-64 p-6 border-r border-gray-200">
                {/* Logo e título */}
                <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 py-6">                    
                    <span className="text-lg font-semibold">Dashboard</span>                    
                </div>

                {/* Links do menu */}
                <Menu />
            </aside>

            {/* Seção de conteúdo principal */}
            <section className="flex-1 p-8 bg-white mt-4 ml-4 mb-4 rounded-lg shadow-md border border-gray-200">
                {children}
            </section>
        </main >

    );
}