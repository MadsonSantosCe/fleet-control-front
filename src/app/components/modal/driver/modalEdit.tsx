"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/app/components/ui/input";
import { z } from "zod";
import { Driver } from "@/types/Driver";
import { getDriverById, updateDriver } from "@/services/driver";
import { toast } from "react-hot-toast";

const schema = z.object({
  nameField: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  licenseField: z.string().length(11, {
    message: "O CPF deve ter exatamente 11 dígitos e apenas números",
  }),
});

type Props = {
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalEdit({ onSave, onClose, id }: Props) {
  const [nameField, setNameField] = useState("");
  const [licenseField, setLicenseField] = useState("");
  const [errors, setErrors] = useState({ nameField: "", licenseField: "" });
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGetDriverById(id);
  }, []);

  const fetchGetDriverById = async (id: number) => {
    const driver = await getDriverById(id);
    if (driver) {
      setNameField(driver.name);
      setLicenseField(driver.license);
    }
  };

  const handleUpdate = async () => {
    const resultZod = schema.safeParse({ nameField, licenseField });

    if (!resultZod.success) {
      const fieldErrors = resultZod.error.flatten().fieldErrors;
      setErrors({
        nameField: fieldErrors.nameField ? fieldErrors.nameField[0] : "",
        licenseField: fieldErrors.licenseField
          ? fieldErrors.licenseField[0]
          : "",
      });
    } else {
      try {
        await fetchUpdateDriver(id, {
          id,
          name: nameField,
          license: licenseField,
        });
        setErrors({ nameField: "", licenseField: "" });
        setApiError(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error(`${error}`, { duration: 4000 });
      }
    }
  };

  const fetchUpdateDriver = async (id: number, driver: Driver) => {
    const response = await updateDriver(id, driver);
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
          <h2 className="text-xl font-semibold mb-10">Editar motorista</h2>

          <div className="mb-4">
            <Input
              value={nameField}
              placeholder="Digite o nome do colaborador"
              onChange={(e) => setNameField(e.target.value)}
              errorMessage={errors.nameField}
            />
          </div>

          <div className="mb-4">
            <Input
              value={licenseField}
              placeholder="Digite a CNH do colaborador"
              onChange={(e) => setLicenseField(e.target.value)}
              errorMessage={errors.licenseField}
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
              onClick={handleUpdate}
              className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
              disabled={loading}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
