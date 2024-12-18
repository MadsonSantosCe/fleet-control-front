"use client";

import React, { useEffect, useState } from "react";
import { getDeliveryById, updateDelivery } from "@/services/delivery";
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
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { inputDate } from "@/utils/stringUtils";
import { Checkbox } from "@/components/ui/checkbox";
import CurrencyInput from "react-currency-input-field";
import InputField from "@/app/components/forms/InputField";
import SelectField from "@/app/components/forms/SelectField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryDetailsProps {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  value: z
    .number()
    .positive({ message: "O valor não pode ser negativo" })
    .int(),
});

export default function EditDelivery({ params }: DeliveryDetailsProps) {
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
  const [deliveryId, setDeliveryId] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [driversFetched, setDriversFetched] = useState(false);
  const [trucksFetched, setTrucksFetched] = useState(false);
  const { toast } = useToast();

  const [errors, setErrors] = useState({
    value: "",
    deliveryTime: "",
    destination: "",
    type: "",
    truckId: "",
    driverId: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchDelivery = async () => {
      const id = Number((await params).id);
      setDeliveryId(id);

      if (!isNaN(id)) {
        const deliveryData = await getDeliveryById(id);
        setDelivery(deliveryData);

        setDeliveryTime(inputDate(new Date(deliveryData.deliveryTime)));
        setValue(deliveryData.value.toString());
        setDestination(deliveryData.destination);
        setType(deliveryData.type);
        setInsurance(deliveryData.insurance);
        setDangerous(deliveryData.dangerous);
        setValuable(deliveryData.valuable);

        setTruckId(deliveryData.truck.id);
        setTruckLicensePlate(deliveryData.truck.licensePlate);
        setTruckModel(deliveryData.truck.model);

        setDriverId(deliveryData.driver.id);
        setDriverName(deliveryData.driver.name);
        setDriverLicense(deliveryData.driver.license);
      }
    };

    fetchDelivery();
  }, [params]);

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

  if (!delivery) return <p>Carregando...</p>;

  const handleSubmit = async (): Promise<void> => {
    try {
      const resultZod = schema.safeParse({
        value: value ? parseFloat(value) : 0,
      });

      if (!resultZod.success) {
        const fieldErrors = resultZod.error.flatten().fieldErrors;

        setErrors({
          value: fieldErrors.value?.[0] ?? "",
          deliveryTime: "",
          destination: "",
          type: "",
          truckId: "",
          driverId: "",
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
        deliveryTime: new Date(deliveryTime),
      };

      const response = await fetchUpdateDelivery(deliveryId, deliveryRequest);

      if (response) {
        toast({
          variant: "success",
          title: "Aviso",
          description: "Entrega atualizada com sucesso",
          duration: 4000,
        });

        setTimeout(() => {
          router.push(`/delivery/${delivery?.id}`);
        }, 2000);
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

  const fetchUpdateDelivery = async (
    id: number,
    deliveryRequest: DeliveryRequest
  ) => {
    try {
      const response = await updateDelivery(id, deliveryRequest);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const formattedDate = deliveryTime ? inputDate(new Date(deliveryTime)) : "";

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

      <h2 className="text-lg font-semibold mt-2">Detalhes</h2>
      <form>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="block text-gray-700">Data da Entrega</span>
            <span className="font-medium w-2/3 text-left">
              <div className="relative">
                <input
                  type="datetime-local"
                  value={formattedDate}
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

          <div className="flex items-center justify-between mt-6">
            <span className="text-gray-600 w-1/3">Status</span>
            <span className="font-medium w-2/3 text-left flex items-center space-x-2">
              {type === DeliveryType.Eletronico && (
                <label className="flex items-center text-green-600 font-semibold">
                  <Checkbox
                    checked={insurance}
                    onCheckedChange={(checked) => setInsurance(!!checked)}
                    className="mr-2"
                  />
                  <span>Com seguro</span>
                </label>
              )}

              {dangerous && (
                <span className="text-red-600 font-semibold mr-2">
                  Perigosa
                </span>
              )}
              {valuable && (
                <span className="text-yellow-600 font-semibold mr-2">
                  Valioso
                </span>
              )}
              {!insurance && !dangerous && !valuable && (
                <span className="text-gray-500">Padrão</span>
              )}
            </span>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-4">Caminhão</h2>
        <div className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Placa</span>
            <span className="font-medium w-2/3 text-left">
              <div onFocus={fetchTrucks}>
                <Select
                  value={truckId?.toString()}
                  onValueChange={handleTruckChange}
                >
                  <SelectTrigger className="w-full border-2 rounded-sm border-gray-200 text-gray-700 p-2">
                    <SelectValue>
                      {truckId ? truckLicensePlate : "Selecione um caminhão"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {trucks &&
                      trucks.map((truck) => (
                        <SelectItem key={truck.id} value={truck.id.toString()}>
                          {truck.licensePlate}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </span>
          </div>

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
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-600 w-1/3">Nome</span>
            <span className="font-medium w-2/3 text-left">
              <div onFocus={fetchDrivers}>
                <Select
                  value={driverId?.toString()}
                  onValueChange={handleDriverChange}
                >
                  <SelectTrigger className="w-full border-2 rounded-sm border-gray-200 text-gray-700 p-2">
                    <SelectValue>
                      {driverId ? driverName : "Selecione um motorista"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {drivers &&
                      drivers.map((driver) => (
                        <SelectItem
                          key={driver.id}
                          value={driver.id.toString()}
                        >
                          {driver.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </span>
          </div>

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
