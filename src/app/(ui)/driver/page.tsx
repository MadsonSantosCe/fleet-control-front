"use client"

import { useEffect, useState } from "react";
import { getDrivers } from '@/services/driver';
import { Driver } from "@/types/driver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/app/components/popup/driver/modal";
import { useRouter } from 'next/navigation';

export default function Trucks() {

    const [isPopupAddOpen, setIsPopupOpen] = useState(false);
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const response = await getDrivers()
        setDrivers(response);
    }

    const handleSave = () => {
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        router.refresh();
    };

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold mb-8">Motoristas</h2>
                </div>
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Cadastrar Motorista
                </button>
            </div>

            <hr className="border-gray-200 mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {drivers.length > 0 && drivers.map((driver) => (
                    <div key={driver.id} className="flex flex-col items-center text-center space-y-4">
                        <button
                            className="focus:outline-none">
                            <img
                                src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
                                alt="avatar"
                                className="w-32 h-32 rounded-full object-cover object-center transition-transform duration-200 hover:scale-105"
                            />
                        </button>
                        <h3 className="text-sm font-semibold">{driver.name}</h3>
                        <p className="text-sm text-gray-500">Licença: {driver.license}</p>

                        <div className="flex space-x-8 my-8">
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="text-gray-500 hover:text-gray-700">
                                <FontAwesomeIcon icon={faEdit} className="size-4" />
                            </button>

                            <button className="text-red-500 hover:text-red-700">
                                <FontAwesomeIcon icon={faTrash} className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
                <div>{drivers.length === 0 && <h3 className="text-center justify-center items-center py4 font-semibold">Nada por aqui, cadastre um nofo motorista</h3>}</div>
            </div>

            {isPopupAddOpen && (
                <Modal onClose={handleCancel} onSave={handleSave} />
            )}
        </div>
    );
}