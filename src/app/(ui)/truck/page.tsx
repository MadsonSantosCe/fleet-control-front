"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTrucks } from '@/services/truck';
import { Truck } from "@/types/truck";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "@/app/components/modal/truck/modalAdd";
import ModalEdit from "@/app/components/modal/truck/modalEdit";
import ModalDelete from "@/app/components/modal/truck/modelDelete";


export default function Drivers() {
    const [popupType, setPopupType] = useState<null | 'add' | 'edit' | 'delete'>(null);    
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [trucks, setTrucks] = useState<Truck[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTrucks();
            setTrucks(response);
        }

        fetchApi();
    }, []);

    

    const handleSave = () => {
        setPopupType(null);
    };

    const handleCancel = () => {
        setPopupType(null);
    };

    const openAddPopup = () => {
        setPopupType('add');
    };

    const openEditPopup = (id: number) => {
        setIsSelected(id);
        setPopupType('edit');
    };

    const openDeletePopup = (id: number) => {
        setIsSelected(id);
        setPopupType('delete');
    };

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold mb-8">Caminhões</h2>
                </div>
                <button
                    onClick={openAddPopup}
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
                                <h3 className="text-lg font-semibold mb-4">{truck.model}</h3>
                                <p className="text-gray-500">Placa: {truck.licensePlate}</p>
                            </div>
                        </div>
                        <div className="flex space-x-8 px-8">
                            <button 
                            onClick={() => openEditPopup(truck.id)}
                            className="text-gray-500 hover:text-gray-700">
                                <FontAwesomeIcon icon={faEdit} className="size-4" />
                            </button>

                            <button 
                            onClick={() => openDeletePopup(truck.id)}
                            className="text-red-500 hover:text-red-700">
                                <FontAwesomeIcon icon={faTrash} className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
                
            </div>

            <div>{trucks.length === 0 && <h3 className="h-full text-center justify-center items-center py-4 font-semibold">Nada por aqui, cadastre um novo caminhão</h3>}</div>
            {popupType === 'add' && (
                <ModalAdd onClose={handleCancel} onSave={handleSave} />
            )}
            {popupType === 'edit' && isSelected !== null && (
                <ModalEdit onClose={handleCancel} onSave={handleSave} id={isSelected} />
            )}
            {popupType === 'delete' && isSelected !== null && (
                <ModalDelete onClose={handleCancel} onSave={handleSave} id={isSelected} />
            )};
        </div>
    );
}