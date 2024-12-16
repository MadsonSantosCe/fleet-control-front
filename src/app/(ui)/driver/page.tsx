"use client";

import React, { useEffect, useState } from "react";
import { getDrivers } from "@/services/driver";
import { Driver } from "@/types/Driver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@/app/components/ui/loader";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ModalAdd from "@/app/components/modal/driver/modalAdd";
import ModalEdit from "@/app/components/modal/driver/modalEdit";
import ModalDelete from "@/app/components/modal/driver/modelDelete";

export default function DriverPage() {
  const [popupType, setPopupType] = useState<null | "add" | "edit" | "delete">(
    null
  );
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const response = await getDrivers();
      setDrivers(response);
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Erro ao buscar os motoristas. Por favor, tente novamente.",
        { duration: 4000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => setPopupType(null);
  const handleModalOpen = (
    type: "add" | "edit" | "delete",
    driverId?: number
  ) => {
    setPopupType(type);
    if (driverId) setSelectedDriverId(driverId);
  };

  const handleSave = () => {
    fetchDrivers();
    handleModalClose();
  };

  const renderDriverCard = (driver: Driver) => (
    <Card
      key={driver.id}
      className="flex flex-col items-center text-center bg-gray-50 rounded-lg"
    >
      <CardHeader className="flex flex-col items-center space-y-2">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={
              "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            }
            alt={`Avatar de ${driver.name}`}
            className="w-32 h-32 rounded-full object-cover object-center transition-transform duration-200 hover:scale-105"
          />
          <AvatarFallback>
            {driver.name ? driver.name.charAt(0).toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-semibold">{driver.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          CNH: {driver.license}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex">
        <Button
          variant="ghost"
          onClick={() => handleModalOpen("edit", driver.id)}
          className="text-gray-500 hover:text-gray-700"
          aria-label={`Editar ${driver.name}`}
        >
          <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleModalOpen("delete", driver.id)}
          className="text-red-500 hover:text-red-700"
          aria-label={`Deletar ${driver.name}`}
        >
          <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="text-gray-500 text-lg">
        Nada por aqui, cadastre um novo motorista
      </p>
    </div>
  );

  const renderModals = () => (
    <>
      {popupType === "add" && (
        <ModalAdd
          onClose={handleModalClose}
          onSave={handleSave}
          isOpen={true}
        />
      )}
      {popupType === "edit" && selectedDriverId && (
        <ModalEdit
          onClose={handleModalClose}
          onSave={handleSave}
          id={selectedDriverId}
          isOpen={true}
        />
      )}
      {popupType === "delete" && selectedDriverId && (
        <ModalDelete
          onClose={handleModalClose}
          onSave={handleSave}
          id={selectedDriverId}
          isOpen={true}
        />
      )}
    </>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-xl font-bold">Carregando...</h1>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Motoristas</h2>
        <Button
          onClick={() => handleModalOpen("add")}
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Cadastrar Motorista
        </Button>
      </div>

      <hr className="border-gray-200 mb-6" />

      {drivers.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {drivers.map(renderDriverCard)}
        </div>
      )}

      {renderModals()}
    </div>
  );
}
