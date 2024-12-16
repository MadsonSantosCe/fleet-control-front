// ModalDelete.tsx

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
} from "@/components/ui/dialog"; // Ajuste o caminho conforme a estrutura do seu projeto
import { Button } from "@/components/ui/button"; // Importando Button do shadcn/ui
import { deleteTruck, getTruckById } from "@/services/truck";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalDelete({ isOpen, onSave, onClose, id }: Props) {
  const [modelField, setModelField] = useState("");
  const [licensePlatefield, setLicensePlatefield] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchGetTruckById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, id]);

  const fetchGetTruckById = async (id: number) => {
    try {
      const truck = await getTruckById(id);
      if (truck) {
        setModelField(truck.model);
        setLicensePlatefield(truck.licensePlate);
      }
    } catch (error: any) {
      toast.error(error?.message || "Erro ao buscar os detalhes do caminhão.", {
        duration: 4000,
      });
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      await fetchDeleteTruck(id);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(`${error}`, { duration: 4000 });
    }
  };

  const fetchDeleteTruck = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteTruck(id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Deseja deletar o veículo? </DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="pl-4">
              <h3 className="text-lg font-semibold">Modelo: {modelField}</h3>
              <p className="text-gray-600">Placa: {licensePlatefield}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
