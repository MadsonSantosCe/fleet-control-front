"use client";

import { Delivery, DeliveryType, Destinations } from "@/types/delivery";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDeliveries } from '@/services/delivery';
import { formatDate } from "@/utils/stringUtils";
import { getDrivers } from "@/services/driver";
import { getTrucks } from "@/services/truck";
import { Truck } from "@/types/truck";
import { Driver } from "@/types/driver";


export default function Deliveries() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [trucks, setTrucks] = useState<Truck[] | null>([]);
    const [drivers, setDrivers] = useState<Driver[] | null>([]);
    const [driversFetched, setDriversFetched] = useState(false);
    const [trucksFetched, setTrucksFetched] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDeliveries();
            setDeliveries(response);
        };

        fetchApi();
        fetchDrivers();
        fetchTrucks();
    }, []);

    useEffect(() => {
        fetchDrivers();
        fetchTrucks();
    }, []);

    const fetchDrivers = async () => {
        if (!driversFetched) {
            const driverData = await getDrivers();
            setDrivers(driverData);
            setDriversFetched(true);
        }
    };

    const fetchTrucks = async () => {
        if (!trucksFetched) {
            const truckData = await getTrucks();
            setTrucks(truckData);
            setTrucksFetched(true);
        }
    };

    const truckExist = trucks && trucks.length > 0;
    const driverExist = drivers && drivers.length > 0;
    

    return (
        <div className="min-h-full flex-1 p-8 bg-white mx-8 sm:mx-8 md:mx-12 my-4 rounded-lg">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Entregas</h2>
                {truckExist && driverExist && (
                    <Link href="/delivery/create" className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
                        Cadastrar Entrega
                    </Link>
                )}

            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm mt-6">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="p-4 border-b border-gray-200">Data prevista</th>
                            <th className="p-4 border-b border-gray-200">Tipo</th>
                            <th className="p-4 border-b border-gray-200">Destino</th>
                            <th className="p-4 border-b border-gray-200">Valor</th>
                            <th className="p-4 border-b border-gray-200">Status</th>
                            <th className="p-4 border-b border-gray-200">Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.length > 0 ? (
                            deliveries.map((delivery) => (
                                <tr key={delivery.id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="p-4 border-b border-gray-200">
                                        {formatDate(delivery.deliveryTime)}
                                    </td>
                                    <td className="p-4 border-b border-gray-200">{DeliveryType[delivery.type]}</td>
                                    <td className="p-4 border-b border-gray-200">{Destinations[delivery.destination]}</td>
                                    <td className="p-4 border-b border-gray-200">R$ {delivery.value.toLocaleString()}</td>
                                    <td className="p-4 border-b border-gray-200">
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
                                    </td>

                                    <td className="p-4 border-b pl-8 border-gray-200 flex">
                                        <Link
                                            href={`/delivery/${delivery.id}`}
                                            className="text-gray-500 hover:text-gray-900"
                                            aria-label="Ver detalhes">
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="h-full text-center justify-center items-center py-4 font-semibold">

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>{deliveries.length === 0 && <h3 className="h-full text-center justify-center items-center  font-semibold">Nada por aqui, cadastre um novo motorista e um caminhão</h3>}</div>
        </div>
    );
}
