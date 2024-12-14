"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/app/components/ui/input";
import { z } from "zod";
import { Truck } from "@/types/Truck";
import { createTruck } from "@/services/truck";
import { toast } from "react-hot-toast";

const schema = z.object({
  modelField: z
    .string()
    .min(3, { message: "O modelo deve ter pelo menos 3 caracteres" }),
  licensePlatefield: z
    .string()
    .length(7, { message: "O Placa deve ter exatamente 7 dígitos sem traço" }),
});

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function ModalAdd({ onSave, onClose }: Props) {
  const [modelField, setModelField] = useState("");
  const [licensePlatefield, setLicensePlatefield] = useState("");
  const [errors, setErrors] = useState({
    modelField: "",
    licensePlatefield: "",
  });
  const [apiError, setApierror] = useState(false);

  const handleSave = async () => {
    const resultZod = schema.safeParse({ modelField, licensePlatefield });

    if (!resultZod.success) {
      const fieldErrors = resultZod.error.flatten().fieldErrors;
      setErrors({
        modelField: fieldErrors.modelField ? fieldErrors.modelField[0] : "",
        licensePlatefield: fieldErrors.licensePlatefield
          ? fieldErrors.licensePlatefield[0]
          : "",
      });
    } else {
      try {
        const result = await fetchCreateTruck({
          id: 1,
          model: modelField,
          licensePlate: licensePlatefield,
        });
        setErrors({ modelField: "", licensePlatefield: "" });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error(`${error}`, { duration: 4000 });
      }
    }
  };

  const fetchCreateTruck = async (truck: Truck) => {
    const response = await createTruck(truck);
    return response;
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-7 w-2 h-2 p-3 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} className="size-4" />
        </button>

        <div>
          <h2 className="text-xl font-semibold mb-10">Novo veículo</h2>

          <div className="mb-4">
            <Input
              value={modelField}
              placeholder="Digite o nome modelo"
              onChange={(e) => setModelField(e.target.value)}
              errorMessage={errors.modelField}
            />
          </div>

          <div className="mb-4">
            <Input
              value={licensePlatefield}
              placeholder="Digite a placa do viículo"
              onChange={(e) => setLicensePlatefield(e.target.value)}
              errorMessage={errors.licensePlatefield}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
