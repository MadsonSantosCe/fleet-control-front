"use client";

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useEffect, useState } from 'react';
import { formatDate } from '@/utils/stringUtils';
import { getDeliveryById } from '@/services/delivery';
import { Delivery } from '@/types/delivery';
import { useRouter } from 'next/navigation';

interface DeliveryDetailsProps {
    params: Promise<{ id: string }>;
}

export default function EditDelivery({ params }: DeliveryDetailsProps) {
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [value, setValue] = useState('');
    const [destination, setDestination] = useState('');
    const [type, setType] = useState('');
    const [insurance, setInsurance] = useState(false);
    const [dangerous, setDangerous] = useState(false);
    const [valuable, setValuable] = useState(false);
    const [truckLicensePlate, setTruckLicensePlate] = useState('');
    const [truckModel, setTruckModel] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchDelivery = async () => {
            const id = Number((await params).id);

            if (!isNaN(id)) {
                const deliveryData = await getDeliveryById(id);
                setDelivery(deliveryData);

                // Inicializa os estados com os valores de delivery para edição
                setValue(deliveryData.value.toString());
                setDestination(deliveryData.destination);
                setType(deliveryData.type);
                setInsurance(deliveryData.insurance);
                setDangerous(deliveryData.dangerous);
                setValuable(deliveryData.valuable);
                setTruckLicensePlate(deliveryData.truck.licensePlate);
                setTruckModel(deliveryData.truck.model);
                setDriverName(deliveryData.driver.name);
                setDriverLicense(deliveryData.driver.license);
            }
        };

        fetchDelivery();
    }, [params]);

    const handleDetails = () => {
        if (delivery?.id) {
            router.push(`/delivery/${delivery?.id}`);
        }
    };

    if (!delivery) return <p></p>;

    const formattedDate = formatDate(delivery.deliveryTime);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        // Função de submissão
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Entrega</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleDetails}
                        className="px-2 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
                    >
                        Salvar
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
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-t border-gray-200 py-4">
                    <div className="flex items-center justify-between my-4">
                        <span className="block text-gray-700">Valor</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">Destino</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">Tipo</span>
                        <span className="font-medium w-2/3 text-left">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            >
                                <option value="Combustível">Combustível</option>
                                <option value="Eletrônico">Eletrônico</option>
                                {/* Adicione outros tipos conforme necessário */}
                            </select>
                        </span>
                    </div>

                    <div className="flex items-center justify-between my-6">
                        <span className="text-gray-600 w-1/3">Status</span>
                        <span className="font-medium w-2/3 text-left">
                            <label className="text-green-600 font-semibold mr-2">
                                <input
                                    type="checkbox"
                                    checked={insurance}
                                    onChange={(e) => setInsurance(e.target.checked)}
                                />
                                <span className="mx-4">Com Seguro</span>
                            </label>

                            {delivery.dangerous && (
                                <label className="text-red-600 font-semibold mr-2">
                                    <input
                                        type="checkbox"
                                        checked={dangerous}
                                        onChange={(e) => setDangerous(e.target.checked)}
                                    />
                                    <span className="mx-4">Perigosa</span>
                                </label>
                            )}

                            {delivery.valuable && (
                                <label className="text-yellow-600 font-semibold">
                                    <input
                                        type="checkbox"
                                        checked={valuable}
                                        onChange={(e) => setValuable(e.target.checked)}
                                    />
                                    <span className="mx-4">Valiosa</span>
                                </label>
                            )}
                        </span>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Caminhão</h2>
                <div className="border-t border-gray-200 py-8">
                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">Placa</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="text"
                                value={truckLicensePlate}
                                onChange={(e) => setTruckLicensePlate(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">Modelo</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="text"
                                value={truckModel}
                                onChange={(e) => setTruckModel(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Motorista</h2>
                <div className="border-t border-gray-200 py-6">
                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">Nome</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="text"
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <span className="text-gray-600 w-1/3">CNH</span>
                        <span className="font-medium w-2/3 text-left">
                            <input
                                type="text"
                                value={driverLicense}
                                onChange={(e) => setDriverLicense(e.target.value)}
                                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                                required
                            />
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}
