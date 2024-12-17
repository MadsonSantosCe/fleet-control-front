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
import { Button } from "@/components/ui/button";
import { deleteDelivery, getDeliveryById } from "@/services/delivery";
import { useToast } from "@/hooks/use-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalDelete({ isOpen, onSave, onClose, id }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await fetchDeleteDelivery(id);
      
      toast({
        variant: "success",
        title: "Aviso",
        description: "Entrega deletada com sucesso!",
        duration: 4000,
      });
      
      onSave()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ateção.",
        description: `${error}`,
        duration: 4000,
      });
    }
  };

  const fetchDeleteDelivery = async (id: number) => {
    const response = await deleteDelivery(id);
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Deseja deletar a entrega?</DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <DialogDescription></DialogDescription>
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
