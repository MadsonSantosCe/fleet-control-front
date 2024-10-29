"use client";

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils/stringUtils';
import { getDeliveryById } from '@/services/delivery';
import { Delivery } from '@/types/delivery';
import { useRouter } from 'next/navigation';
import ModalDelete from '@/app/components/modal/delivery/modelDelete';

interface DeliveryDetailsProps {
    params: Promise<{ id: string }>; // Marca params como uma Promise
}

export default function Details({ params }: DeliveryDetailsProps) {
    const [delivery, setDelivery] = useState<Delivery | null>(null);    
    const [popupType, setPopupType] = useState<null |'delete'>(null);
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDelivery = async () => {
            const id = Number((await params).id);
            setIsSelected(id);

            if (!isNaN(id)) {
                const deliveryData = await getDeliveryById(id);
                setDelivery(deliveryData);
            }
        };

        fetchDelivery();
    }, [params]);

    const handleEdit = () => {
        if (delivery?.id) {
            router.push(`/delivery/${delivery?.id}/edit`);
        }
    };

    if (!delivery) return <p>Carregando...</p>;

    const formattedDate = formatDate(delivery.deliveryTime);

    const handleConfitm = () => {
        setPopupType('delete');
    };

    const handleCancel = () => {
        setPopupType(null);
    };
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Entrega</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-100"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleConfitm}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                        Apagar
                    </button>
                </div>
            </div>

            <div className="text-gray-600 flex items-center space-x-4 mb-10">
                <p className="flex items-center space-x-2 text-lg">
                    <FontAwesomeIcon icon={faCalendarAlt} className="size-4 text-gray-500" />
                    <span>{formattedDate}</span>
                </p>
            </div>

            <h2 className="text-lg font-semibold mt-4">Detalhes</h2>
            <div className="border-t border-gray-200 py-4">
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Valor</span>
                    <span className="font-medium w-2/3 text-left">R$ {delivery.value.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Destino</span>
                    <span className="font-medium w-2/3 text-left">{delivery.destination}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Tipo</span>
                    <span className="font-medium w-2/3 text-left">{delivery.type}</span>
                </div>
                
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Status</span>
                    <span className="font-medium w-2/3 text-left">
                        {delivery.insurance && (
                            <span className="text-green-600 font-semibold mr-2">Com seguro</span>
                        )}
                        {delivery.dangerous && (
                            <span className="text-red-600 font-semibold mr-2">Perigosa</span>
                        )}
                        {delivery.valuable && (
                            <span className="text-yellow-600 font-semibold">Valioso</span>
                        )}
                        {!delivery.insurance && !delivery.dangerous && !delivery.valuable && (
                            <span className="text-gray-500">Padrão</span>
                        )}
                    </span>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Caminhão</h2>
            <div className="border-t border-gray-200 py-8">
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Placa</span>
                    <span className="font-medium w-2/3 text-left">{delivery.truck.licensePlate}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Modelo</span>
                    <span className="font-medium w-2/3 text-left">{delivery.truck.model}</span>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Motorista</h2>
            <div className="border-t border-gray-200 py-6">
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Nome</span>
                    <span className="font-medium w-2/3 text-left">{delivery.driver.name}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">CNH</span>
                    <span className="font-medium w-2/3 text-left">{delivery.driver.license}</span>
                </div>
            </div>

            {popupType === 'delete' && isSelected !== null && (
                <ModalDelete onClose={handleCancel} onSave={handleConfitm} id={isSelected} />
            )};
        </div>
    );
}
