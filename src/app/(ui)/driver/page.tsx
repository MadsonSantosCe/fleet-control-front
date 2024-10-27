import { fakeDrivers } from "@/data/driver";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                        <option>Ordenar por licença</option>
                    </select>
                </div>
                <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                >
                    Criar Motorista
                </button>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="space-y-4 text-sm">
                {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between p-4 px-16 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://media.istockphoto.com/id/1459664492/pt/vetorial/default-avatar-profile-user-profile-icon-profile-picture-portrait-symbol-user-member.jpg?s=612x612&w=0&k=20&c=GwrCj9HQNpWn7Zs2fxzdwfGeevpk2Yvww_licXu2NSA="
                                alt="Avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{driver.name}</h3>
                                <p className="text-gray-500">Licença: {driver.license}</p>
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