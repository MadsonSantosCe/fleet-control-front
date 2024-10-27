"use client"

import PopupAdd from "@/app/components/popup/driver/popup";
import { fakeDrivers } from "@/data/driver";
import { useState } from "react";


export default function Trucks() {

    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const drivers = fakeDrivers

    const handleSave = () => {
        if(isPopupAddOpen){
            setIsPopupAddOpen(false);
        }
    };

    const handleCancel = () => {
        if(isPopupAddOpen){
            setIsPopupAddOpen(false);
        }
    };

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold mb-8">Motoristas</h2>
                </div>
                <button
                    onClick={() => setIsPopupAddOpen(true)}
                    className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Cadastrar Motorista
                </button>
            </div>

            <hr className="border-gray-200 mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {drivers.map((driver) => (
                    <div key={driver.id} className="flex flex-col items-center text-center space-y-2">
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
                    </div>
                ))}
            </div>

            {isPopupAddOpen && (
                <PopupAdd onClose={handleCancel} onSave={handleSave} />
            )}
        </div>
    );
}