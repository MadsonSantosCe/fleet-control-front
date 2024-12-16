"use client";

import React, { useEffect, useState } from "react";
import { createDelivery } from "@/services/delivery";
import {
  Delivery,
  DeliveryRequest,
  DeliveryType,
  Destinations,
} from "@/types/Delivery";
import { useRouter } from "next/navigation";
import { getDrivers } from "@/services/driver";
import { getTrucks } from "@/services/truck";
import { Truck } from "@/types/Truck";
import { Driver } from "@/types/Driver";
import toast from "react-hot-toast";
import { formatCpf } from "@/utils/stringUtils";

export default function EditDelivery() {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [trucks, setTrucks] = useState<Truck[] | null>([]);
  const [drivers, setDrivers] = useState<Driver[] | null>([]);
  const [value, setValue] = useState("");
  const [destination, setDestination] = useState<Destinations | "">("");
  const [type, setType] = useState<DeliveryType | "">("");
  const [insurance, setInsurance] = useState(false);
  const [dangerous, setDangerous] = useState(false);
  const [valuable, setValuable] = useState(false);
  const [truckId, setTruckId] = useState<number | null>(null);
  const [truckLicensePlate, setTruckLicensePlate] = useState("");
  const [truckModel, setTruckModel] = useState("");
  const [driverId, setDriverId] = useState<number | null>(null);
  const [driverName, setDriverName] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [driversFetched, setDriversFetched] = useState(false);
  const [trucksFetched, setTrucksFetched] = useState(false);

  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleDetails = () => {
    router.push(`/delivery`);
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDriverId = Number(e.target.value);
    const selectedDriver = drivers?.find(
      (driver) => driver.id === selectedDriverId
    );

    if (selectedDriver) {
      setDriverId(selectedDriver.id);
      setDriverName(selectedDriver.name);
      setDriverLicense(selectedDriver.license);
    }
  };

  const handleTruckChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTruckId = Number(e.target.value);
    const selectedTruck = trucks?.find((truck) => truck.id === selectedTruckId);

    if (selectedTruck) {
      setTruckId(selectedTruck.id);
      setTruckLicensePlate(selectedTruck.licensePlate);
      setTruckModel(selectedTruck.model);
    }
  };

  const dataFormatada = new Date(deliveryTime);

  async function handleSubmit(): Promise<void> {
    try {
      const deliveryRequest: DeliveryRequest = {
        value: parseFloat(value),
        destination: destination as Destinations,
        type: type as DeliveryType,
        insurance,
        dangerous,
        valuable,
        truckId: truckId as number,
        driverId: driverId as number,
        deliveryTime: dataFormatada,
      };

      const response = await fetchCreateDelivery(deliveryRequest);

      if (response) {
        toast.success("Entrega criada com sucesso!");
        setTimeout(() => {
          router.push(`/delivery`);
        }, 2000);
      }
    } catch (error) {
      toast.error(`${error}`, { duration: 6000 });
    }
  }

  const fetchCreateDelivery = async (deliveryRequest: DeliveryRequest) => {
    try {
      const response = await createDelivery(deliveryRequest);
      return response;
    } catch (error) {
      console.error("Erro ao fazer a requisição de criação:", error);
      throw error;
    }
  };

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
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Salvar
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-10">Detalhes</h2>
      <form>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="block text-gray-700">Data da Entrega</span>
            <span className="font-medium w-2/3 text-left">
              <input
                type="datetime-local"
                value={deliveryTime.toLocaleString()}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="border-2 rounded-sm border-gray-200 p-2 w-full"
              />
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="block text-gray-700">Valor</span>
            <span className="font-medium w-2/3 text-left">
              <input
                type="number"
                min="0"
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
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value as Destinations)}
                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                required
              >
                <option value="">Selecione um destino</option>
                {Object.values(Destinations).map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Tipo</span>
            <span className="font-medium w-2/3 text-left">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DeliveryType)}
                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                required
              >
                <option value="">Selecione um tipo</option>
                {Object.values(DeliveryType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </span>
          </div>

          {type === DeliveryType.Eletronico && (
            <div className="flex items-center justify-between mt-6">
              <span className="text-gray-600 w-1/3">Status</span>
              <span className="font-medium w-2/3 text-left">
                <label className="text-green-600 font-semibold mr-2">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Com seguro</span>
                </label>
              </span>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mt-4">Caminhão</h2>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Placa</span>
            <span className="font-medium w-2/3 text-left">
              <select
                value={truckId || ""}
                onChange={handleTruckChange}
                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                required
              >
                <option value={truckId || ""}>{truckLicensePlate}</option>
                {trucks &&
                  trucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.licensePlate}
                    </option>
                  ))}
              </select>
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Modelo</span>
            <span className="font-medium w-2/3 text-left">
              <input
                type="text"
                value={truckModel}
                readOnly
                className="border-2 rounded-sm border-gray-200 p-2 w-full bg-gray-100"
              />
            </span>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-4">Motorista</h2>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Nome</span>
            <span className="font-medium w-2/3 text-left">
              <select
                value={driverId || ""}
                onChange={handleDriverChange}
                className="border-2 rounded-sm border-gray-200 p-2 w-full"
                required
              >
                <option value={driverId || ""}>{driverName}</option>
                {drivers &&
                  drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
              </select>
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">CPF</span>
            <span className="font-medium w-2/3 text-left">
              <input
                type="text"
                value={driverLicense && formatCpf(driverLicense)}
                readOnly
                className="border-2 rounded-sm border-gray-200 p-2 w-full bg-gray-100"
              />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
