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
            photo: "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
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
                    <FontAwesomeIcon icon={faMoneyBill} className="size-4 text-gray-500" />
                    <span>R$: {delivery.value}</span>
                </p>
                <p className="flex items-center space-x-2 text-lg ">
                    <FontAwesomeIcon icon={faCalendarAlt} className="size-4 text-gray-500" />
                    <span>{delivery.deliveryTime}</span>
                </p>
            </div>

            <h2 className="text-lg font-semibold mt-4">Detalhes</h2>
            <div className='border-t border-gray-200 py-8'>
                <div className="flex justify-between py-2">
                    <p className="text-gray-500">Destino</p>
                    <p className="text-gray-900">{delivery.destination}</p>
                </div>

                <div className="flex justify-between py-2">
                    <p className="text-gray-500">Tipo</p>
                    <p className="text-gray-900">{delivery.type}</p>
                </div>

                <div className="flex justify-between py-2">
                    <p className="text-gray-500">Seguro</p>
                    <p className="text-gray-900">{delivery.insurance ? "Sim" : "Não"}</p>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Motorista</h2>
            <div className="border-t border-gray-200 py-8">
                <div className="flex items-center mb-4">
                    <img
                        src={delivery.driver.photo}
                        alt="Motorista"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">{delivery.driver.name}</h3>
                        <p className="text-gray-500">Licença: {delivery.driver.license}</p>
                    </div>
                </div>
            </div>

            {/* Seção de Caminhão */}
            <h2 className="text-lg font-semibold mb-4">Caminhão</h2>
            <div className="border-t border-gray-200 pt-4">
                <div className="mb-2">
                    <p className="text-gray-500">ID do Caminhão</p>
                    <p className="text-gray-900">{delivery.truck.id}</p>
                </div>
                <div className="mb-2">
                    <p className="text-gray-500">Placa</p>
                    <p className="text-gray-900">{delivery.truck.licensePlate}</p>
                </div>
                <div>
                    <p className="text-gray-500">Modelo</p>
                    <p className="text-gray-900">{delivery.truck.model}</p>
                </div>
            </div>
        </div>
    );
}
