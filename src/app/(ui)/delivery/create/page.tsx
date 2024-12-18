"use client";

import React, { useEffect, useState } from "react";
import { createDelivery } from "@/services/delivery";
import { DeliveryRequest, DeliveryType, Destinations } from "@/types/Delivery";
import { useRouter } from "next/navigation";
import { getDrivers } from "@/services/driver";
import { getTrucks } from "@/services/truck";
import { Truck } from "@/types/Truck";
import { Driver } from "@/types/Driver";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { inputDate } from "@/utils/stringUtils";
import { DliverySchema } from "@/schemas/deliverySchema";
import CurrencyInput from "react-currency-input-field";
import InputField from "@/app/components/forms/InputField";
import SelectField from "@/app/components/forms/SelectField";

export default function CreateDelivery() {
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
  const [deliveryTime, setDeliveryTime] = useState<string>(
    inputDate(new Date())
  );
  const [driversFetched, setDriversFetched] = useState(false);
  const [trucksFetched, setTrucksFetched] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [errors, setErrors] = useState({
    value: "",
    deliveryTime: "",
    destination: "",
    type: "",
    truckId: "",
    driverId: "",
  });

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

  const handleDelivery = () => {
    router.push(`/delivery`);
  };

  const handleDriverChange = (value: string) => {
    const selectedDriverId = Number(value);
    const selectedDriver = drivers?.find(
      (driver) => driver.id === selectedDriverId
    );

    if (selectedDriver) {
      setDriverId(selectedDriver.id);
      setDriverName(selectedDriver.name);
      setDriverLicense(selectedDriver.license);
    }
  };

  const handleTruckChange = (value: string) => {
    const selectedTruckId = Number(value);
    const selectedTruck = trucks?.find((truck) => truck.id === selectedTruckId);

    if (selectedTruck) {
      setTruckId(selectedTruck.id);
      setTruckLicensePlate(selectedTruck.licensePlate);
      setTruckModel(selectedTruck.model);
    }
  };

  useEffect(() => {
    if (type === DeliveryType.Combustivel) {
      setInsurance(false);
    }

    if (type === DeliveryType.Eletronico) {
      setDangerous(false);
    }
  }, [type]);

  const dataFormatada = new Date(deliveryTime);

  const handleSubmit = async (): Promise<void> => {
    try {
      const resultZod = DliverySchema.safeParse({
        value: value ? parseFloat(value) : 0,
        deliveryTime: new Date(deliveryTime),
        destination: destination as Destinations,
        type: type as DeliveryType,
        truckId: truckId ? (truckId as number) : 0,
        driverId: driverId ? (driverId as number) : 0,
      });

      if (!resultZod.success) {
        const fieldErrors = resultZod.error.flatten().fieldErrors;

        setErrors({
          value: fieldErrors.value?.[0] ?? "",
          deliveryTime: fieldErrors.deliveryTime?.[0] ?? "",
          destination: fieldErrors.destination?.[0] ?? "",
          type: fieldErrors.type?.[0] ?? "",
          truckId: fieldErrors.truckId?.[0] ?? "",
          driverId: fieldErrors.driverId?.[0] ?? "",
        });
        return;
      }

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
        toast({
          variant: "success",
          title: "Aviso",
          description: "Entrega criada com sucesso",
          duration: 4000,
        });

        handleDelivery();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Atenção.",
        description: `${error}`,
        duration: 6000,
      });
    }
  };

  const fetchCreateDelivery = async (deliveryRequest: DeliveryRequest) => {
    try {
      const response = await createDelivery(deliveryRequest);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Entrega</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleDelivery}
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

      <h2 className="text-lg font-semibold mt-6">Detalhes</h2>
      <form>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="block text-gray-700">Data da Entrega</span>
            <span className="font-medium w-2/3 text-left">
              <div className="relative">
                <input
                  type="datetime-local"
                  value={deliveryTime.toLocaleString()}
                  min={inputDate(new Date())}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="text-sm border-2 rounded-sm text-gray-700 border-gray-200 p-2 w-full"
                  required
                />
              </div>
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <span className="block text-gray-700">Valor</span>
            <span className="font-medium w-2/3 text-left">
              <CurrencyInput
                value={value}
                onValueChange={(val) => {
                  setValue(val ?? "");
                  setErrors((prevErrors) => ({ ...prevErrors, value: "" }));
                }}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                className="!w-full p-2 border-2 rounded-sm text-gray-700 border-gray-200 text-sm"
                placeholder="R$ 0.00"
              />
              {errors.value && (
                <p className="text-red-500 text-sm mt-1">{errors.value}</p>
              )}
            </span>
          </div>

          <SelectField
            label="Destino"
            value={destination}
            onChange={(value) => {
              setDestination(value as Destinations);
              setErrors((prevErrors) => ({
                ...prevErrors,
                destination: "",
              }));
            }}
            options={Object.values(Destinations).map((dest) => ({
              label: dest,
              value: dest,
            }))}
            placeholder="Selecione um destino"
            error={errors.destination}
          />

          <SelectField
            label="Tipo"
            value={type}
            onChange={(value) => {
              setType(value as DeliveryType);
              setErrors((prevErrors) => ({ ...prevErrors, type: "" }));
            }}
            options={Object.values(DeliveryType).map((dest) => ({
              label: dest,
              value: dest,
            }))}
            placeholder="Selecione um tipo entrega"
            error={errors.type}
          />

          {type === DeliveryType.Eletronico && (
            <div className="flex items-center mt-6">
              <span className="text-gray-600 w-1/3">Status</span>
              <span className="font-medium w-2/3 flex items-center">
                <label className="flex items-center text-green-600 font-semibold">
                  <Checkbox
                    checked={insurance}
                    onCheckedChange={(checked) => setInsurance(!!checked)}
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
          <SelectField
            label="Placa"
            value={truckId?.toString() || ""}
            onChange={(value) => {
              handleTruckChange(value);
              setErrors((prevErrors) => ({ ...prevErrors, truckId: "" }));
            }}
            options={
              trucks
                ? trucks.map((truck) => ({
                    label: truck.licensePlate,
                    value: truck.id.toString(),
                  }))
                : []
            }
            placeholder="Escolha um veículo"
            error={errors.truckId}
          />

          <InputField
            label="Modelo"
            value={truckModel}
            onChange={() => {}}
            readOnly
            error=""
            className="my-4"
          />
        </div>

        <h2 className="text-lg font-semibold mt-2">Motorista</h2>
        <div className="border-t border-gray-200 py-4">
          <SelectField
            label="Nome"
            value={driverId?.toString() || ""}
            onChange={(value) => {
              handleDriverChange(value);
              setErrors((prevErrors) => ({ ...prevErrors, driverId: "" }));
            }}
            options={
              drivers
                ? drivers.map((driver) => ({
                    label: driver.name,
                    value: driver.id.toString(),
                  }))
                : []
            }
            placeholder="Escolha um motorista"
            error={errors.driverId}
          />

          <InputField
            label="CNH"
            value={driverLicense}
            onChange={() => {}}
            readOnly
            error=""
            className="my-4"
          />
        </div>
      </form>
    </div>
  );
}
