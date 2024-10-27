import { fakeDrivers } from "@/data/driver";
import Image from "next/image";

const drivers = fakeDrivers

export default function Trucks() {
    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-8">Motoristas</h2>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Buscar motoristas..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <select className="border border-gray-300 rounded-md p-2 text-gray-700">
                        <option>Ordenar por nome</option>
                        <option>Ordenar por CPF</option>
                    </select>
                </div>
                <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                >
                    Criar Motorista
                </button>
            </div>

            <hr className="border-gray-200 mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {fakeDrivers.map((driver) => (
                    <div key={driver.id} className="flex flex-col items-center text-center space-y-2">
                        <button className="focus:outline-none">
                            <img
                                src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
                                alt="avatar"
                                className="w-32 h-32 rounded-full object-cover object-center transition-transform duration-200 hover:scale-105"
                            />
                        </button>
                        <h3 className="text-sm font-semibold">{driver.name}</h3>
                        <p className="text-sm text-gray-500">Licença: {driver.license}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}