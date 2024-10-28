import { faCalendarAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function DeliveryDetails() {
    const delivery = {
        id: 2,
        type: "Eletronico",
        value: 36000,
        destination: "Nordeste",
        deliveryTime: "2024-10-23T10:00:00.000Z",
        truckId: 1,
        driverId: 1,
        insurance: true,
        dangerous: false,
        valuable: false,
        driver: {
            id: 1,
            name: "Emanuel Aline Laura da Cruz",
            license: "35327982203",
        },
        truck: {
            id: 1,
            licensePlate: "ODO1142",
            model: "Ford",
        },
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">
                    Entrega
                </h1>
                <div className="flex space-x-4">
                    <button
                        className="px-2 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-100"
                    >
                        Editar
                    </button>
                    <button
                        className="px-2 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                        Apagar
                    </button>
                </div>
            </div>

            <div className="text-gray-600 flex items-center space-x-4 mb-10">
                <p className="flex items-center space-x-2 text-lg ">
                    <FontAwesomeIcon icon={faCalendarAlt} className="size-4 text-gray-500" />
                    <span>{delivery.deliveryTime}</span>
                </p>
            </div>

            <h2 className="text-lg font-semibold mt-4">Detalhes</h2>
            <div className='border-t border-gray-200 py-8'>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Valor</span>
                    <span className="font-medium w-2/3 text-left">R$ {delivery.value}</span>
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
                    <span className="text-gray-600 w-1/3">Seguro</span>
                    <span className="font-medium w-2/3 text-left">{delivery.insurance ? "Sim" : "Não"}</span>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Motorista</h2>
            <div className='border-t border-gray-200 py-8'>
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Nome</span>
                    <span className="font-medium w-2/3 text-left">{delivery.driver.name}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">CNH</span>
                    <span className="font-medium w-2/3 text-left">{delivery.driver.license}</span>
                </div>
            </div>

            {/* Seção de Caminhão */}
            <h2 className="text-lg font-semibold mb-4">Caminhão</h2>
            <div className='border-t border-gray-200 py-8'>
                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Placa</span>
                    <span className="font-medium w-2/3 text-left">{delivery.truck.licensePlate}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                    <span className="text-gray-600 w-1/3">Modelo</span>
                    <span className="font-medium w-2/3 text-left">{delivery.truck.model}</span>
                </div>
            </div>
        </div>
    );
}
