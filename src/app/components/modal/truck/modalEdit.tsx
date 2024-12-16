// ModalEdit.tsx

"use client";

import React, { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { getTruckById, updateTruck } from "@/services/truck";
import { Truck } from "@/types/Truck";

const schema = z.object({
  modelField: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  licensePlatefield: z.string().length(7, {
    message: "A placa deve ter exatamente 7 dígitos sem traço",
  }),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalEdit({ isOpen, onSave, onClose, id }: Props) {
  const [modelField, setModelField] = useState("");
  const [licensePlatefield, setLicensePlatefield] = useState("");
  const [errors, setErrors] = useState({
    modelField: "",
    licensePlatefield: "",
  });
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchGetTruckById(id);
    }
  }, [isOpen, id]);

  const fetchGetTruckById = async (id: number) => {
    try {
      const truck = await getTruckById(id);
      if (truck) {
        setModelField(truck.model);
        setLicensePlatefield(truck.licensePlate);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ateção.",
        description: `${error?.message}`,
        duration: 4000,
      });
      onClose();
    }
  };

  const handleUpdate = async () => {
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
        await fetchUpdateTruck(id, {
          id,
          model: modelField,
          licensePlate: licensePlatefield,
        });
        setErrors({ modelField: "", licensePlatefield: "" });
        setApiError(false);
        toast({
          title: "Ateção.",
          description: "Veículo atualizado com sucesso!",
          duration: 4000,
        });
        onSave();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ateção.",
          description: `${error}`,
          duration: 4000,
        });
      }
    }
  };

  const fetchUpdateTruck = async (id: number, truck: Truck) => {
    setLoading(true);
    const response = await updateTruck(id, truck);
    setLoading(false);
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Editar Veículo</DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="mt-4 space-y-4">
          <div className="rounded-md border border-input border-gray-300 focus-visible:outline-none">
            <Input
              value={modelField}
              placeholder="Digite o nome do modelo"
              onChange={(e) => setModelField(e.target.value)}
              aria-label="Modelo do veículo"
            />
            {errors.modelField && (
              <p className="text-red-500 text-sm mt-1">{errors.modelField}</p>
            )}
          </div>

          <div className="rounded-md border border-input border-gray-300 focus-visible:outline-none">
            <Input
              value={licensePlatefield}
              placeholder="Digite a placa do veículo"
              onChange={(e) => setLicensePlatefield(e.target.value)}
              aria-label="Placa do veículo"
            />
            {errors.licensePlatefield && (
              <p className="text-red-500 text-sm mt-1">
                {errors.licensePlatefield}
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
