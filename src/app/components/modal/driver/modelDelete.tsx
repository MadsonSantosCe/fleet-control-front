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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteDriver, getDriverById } from "@/services/driver";
import { useToast } from "@/hooks/use-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalDelete({ isOpen, onSave, onClose, id }: Props) {
  const [nameField, setNameField] = useState("");
  const [licenseField, setLicenseField] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchGetDriverById(id);
    }
  }, [isOpen, id]);

  const fetchGetDriverById = async (id: number) => {
    try {
      const driver = await getDriverById(id);
      if (driver) {
        setNameField(driver.name);
        setLicenseField(driver.license);
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

  const handleDelete = async () => {
    try {
      await fetchDeleteDriver(id);
      toast({
        title: "Ateção.",
        description: "Motorista deletado com sucesso!",
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
  };

  const fetchDeleteDriver = async (id: number) => {
    const response = await deleteDriver(id);
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Deseja deletar o motorista?</DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="w-24 h-24 flex-shrink-0">
            <AvatarImage
              src={
                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
              }
              alt={`Avatar de ${nameField}`}
              className="w-24 h-24 rounded-full object-cover object-center transition-transform duration-200 hover:scale-105"
            />
            <AvatarFallback>{nameField ? nameField : "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">{nameField}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              CNH: {licenseField}
            </CardDescription>
          </div>
        </CardHeader>

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
