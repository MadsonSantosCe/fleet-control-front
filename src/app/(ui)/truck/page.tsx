"use client"

import Popup from "@/app/components/popup/truck/popup";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTrucks } from '@/services/truck';
import { Truck } from "@/types/truck";


export default function Drivers() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [trucks, setTrucks] = useState<Truck[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTrucks();
            setTrucks(response);
        }

        fetchApi();
    }, []);

    const handleSave = () => {
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold mb-8">Caminhões</h2>
                </div>
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Cadastrar Veículo
                </button>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="space-y-4 text-sm">
                {trucks.length > 0 && trucks.map((truck) => (
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
                <div>{trucks.length === 0 && <h3 className="text-center justify-center items-center py4 font-semibold">Nada por aqui, cadastre um novo caminhão</h3>}</div>
            </div>

            {isPopupOpen && (
                <Popup onClose={handleCancel} onSave={handleSave} />
            )}
        </div>
    );
}