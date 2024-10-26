import Card from "@/app/components/ui/card";

export default function Home() {
    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-semibold">Boa tarde, Erica</h2>
                    <p className="text-gray-500 mt-1">Visão Geral</p>
                </div>

                <select className="border border-gray-300 rounded-md p-2 text-gray-700 bg-white mt-4 md:mt-0">
                    <option>Última semana</option>
                    <option>Último mês</option>
                    <option>Último ano</option>
                </select>
            </div>

            <hr className="border-gray-200 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                <Card
                    title="Valor Total de Pedidos"
                    value="$2.6M"
                    percentage="+4.5%"
                    period="durante essa semana"
                    percentageColor={1}
                />

                <Card
                    title="Valor Médio dos Pedidos"
                    value="$455"
                    percentage="-0.5%"
                    period="durante essa semana"
                    percentageColor={2}
                />

                <Card
                    title="Pedidos para Outros Países"
                    value="308"
                    percentage="+4.5%"
                    period="durante esse mês"
                    percentageColor={1}
                />
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Entregas Recentes</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="p-4 border-b border-gray-200">Delivery Date</th>
                                <th className="p-4 border-b border-gray-200">Type</th>
                                <th className="p-4 border-b border-gray-200">Destination</th>
                                <th className="p-4 border-b border-gray-200">Value</th>
                                <th className="p-4 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">10/10/2024</td>
                                <td className="p-4 border-b border-gray-200">Eletrônico</td>
                                <td className="p-4 border-b border-gray-200">Nordeste</td>
                                <td className="p-4 border-b border-gray-200">R$ 10.000,00</td>
                                <td className="p-4 border-b border-gray-200">
                                    <span className="text-green-600 font-semibold">Insured</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
