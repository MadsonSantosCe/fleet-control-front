// ModalAdd.tsx

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Driver } from "@/types/Driver";
import { createDriver } from "@/services/driver";
import { toast } from "react-hot-toast";

const schema = z.object({
  nameField: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  licenseField: z.string().length(11, {
    message: "A CNH deve ter exatamente 11 dígitos e apenas números",
  }),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function ModalAdd({ isOpen, onSave, onClose }: Props) {
  const [nameField, setNameField] = useState("");
  const [licenseField, setLicenseField] = useState("");
  const [errors, setErrors] = useState({ nameField: "", licenseField: "" });
  const [apiError, setApierror] = useState(false);

  const handleSave = async () => {
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
        const result = await fetchCreateDriver({
          id: 1,
          name: nameField,
          license: licenseField,
        });
        setErrors({ nameField: "", licenseField: "" });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error: any) {
        toast.error(`${error.message || "Erro ao criar motorista"}`, {
          duration: 4000,
        });
      }
    }
  };

  const fetchCreateDriver = async (driver: Driver) => {
    const response = await createDriver(driver);
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Novo Motorista</DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="mt-4 space-y-4">
          <div>
            <Input
              value={nameField}
              placeholder="Digite o nome do motorista"
              onChange={(e) => setNameField(e.target.value)}
              aria-label="Nome do motorista"
            />
            {errors.nameField && (
              <p className="text-red-500 text-sm mt-1">{errors.nameField}</p>
            )}
          </div>

          <div>
            <Input
              value={licenseField}
              placeholder="Digite a CNH do motorista"
              onChange={(e) => setLicenseField(e.target.value)}
              aria-label="CNH do motorista"
            />
            {errors.licenseField && (
              <p className="text-red-500 text-sm mt-1">{errors.licenseField}</p>
            )}
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
