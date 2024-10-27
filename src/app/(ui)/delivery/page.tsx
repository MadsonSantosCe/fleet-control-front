"use client"

import { Delivery } from "@/types/delivery";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeliveryService from '@/features/delivery/services/deliveryService';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Deliveries() {
    
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);

    useEffect(() => {
        const getDeliveries = async () => {
            const response = await DeliveryService.getAllDeliveries();
            setDeliveries(response);
        }

        getDeliveries();
    }, []);

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-8 sm:mx-8 md:mx-12 my-4 rounded-lg">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Entregas</h2>
                <button
                    className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Cadastrar Entrega
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm mt-6">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="p-4 border-b border-gray-200">Delivery Date</th>
                            <th className="p-4 border-b border-gray-200">Type</th>
                            <th className="p-4 border-b border-gray-200">Destination</th>
                            <th className="p-4 border-b border-gray-200">Value</th>
                            <th className="p-4 border-b border-gray-200">Status</th>
                            <th className="p-4 border-b border-gray-200">Ediitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery.id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 border-b border-gray-200">US${delivery.value.toLocaleString()}</td>
                                <td className="p-4 border-b border-gray-200">{delivery.type}</td>
                                <td className="p-4 border-b border-gray-200">{delivery.destination}</td>
                                <td className="p-4 border-b border-gray-200">{delivery.value}</td>
                                <td className="p-4 border-b border-gray-200">
                                    {delivery.insurance && <span className="text-green-600 font-semibold">Insured</span>}
                                </td>
                                <td className="p-4 border-b pl-8 border-gray-200 flex">
                                    <Link
                                        href={'/delivery-details'}
                                        className="text-gray-500 hover:text-gray-900"
                                        aria-label="Ver detalhes"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}