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
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalDelete({ isOpen, onSave, onClose, id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetchDeleteDelivery(id);

      setTimeout(() => {
        redirect("/delivery");
      }, 2000);
    } catch (error) {
      toast.error(`Erro: ${error}`, { duration: 6000 });
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
