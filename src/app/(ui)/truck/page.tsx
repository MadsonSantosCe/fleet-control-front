import { fakeTrucks } from "@/data/truck";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const trucks = fakeTrucks;

export default function Drivers() {
    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-8">Caminhões</h2>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Buscar motoristas..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <select className="border border-gray-300 rounded-md p-2 text-gray-700">
                        <option>Ordenar por modelo</option>
                        <option>Ordenar por placa</option>
                    </select>
                </div>
                <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                >
                    Criar Caminhão
                </button>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="space-y-4 text-sm">
                {trucks.map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between p-4 px-16 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h3 className="text-lg font-semibold">{truck.model}</h3>
                                <p className="text-gray-500">Placa: {truck.licensePlate}</p>
                            </div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700 ml-auto">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}