"use client";

import { useEffect, useState } from "react";
import { getDrivers } from "@/services/driver";
import { Driver } from "@/types/Driver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "@/app/components/modal/driver/modalAdd";
import ModalEdit from "@/app/components/modal/driver/modalEdit";
import ModalDelete from "@/app/components/modal/driver/modelDelete";
import { Loader } from "@/app/components/ui/loader";

export default function DriverPage() {
  const [popupType, setPopupType] = useState<null | "add" | "edit" | "delete">(null);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await getDrivers();
      setDrivers(response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => setPopupType(null);
  const handleModalOpen = (type: "add" | "edit" | "delete", driverId?: number) => {
    setPopupType(type);
    if (driverId) setSelectedDriverId(driverId);
  };

  const renderDriverCard = (driver: Driver) => (
    <div
      key={driver.id}
      className="flex flex-col items-center text-center space-y-4"
    >
      <div className="flex flex-col items-center space-y-2">
        <button className="focus:outline-none">
          <img
            src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            alt={`Avatar de ${driver.name}`}
            className="w-32 h-32 rounded-full object-cover object-center transition-transform duration-200 hover:scale-105"
          />
        </button>
        <h3 className="text-sm font-semibold text-center">{driver.name}</h3>
        <p className="text-sm text-gray-500 text-center">
          CNH: {driver.license}
        </p>
      </div>

      <div className="flex space-x-8 my-8">
        <button
          onClick={() => handleModalOpen("edit", driver.id)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faEdit} className="size-4" />
        </button>
        <button
          onClick={() => handleModalOpen("delete", driver.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} className="size-4" />
        </button>
      </div>
    </div>
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
        <ModalAdd onClose={handleModalClose} onSave={handleModalClose} />
      )}
      {popupType === "edit" && selectedDriverId && (
        <ModalEdit onClose={handleModalClose} onSave={handleModalClose} id={selectedDriverId} />
      )}
      {popupType === "delete" && selectedDriverId && (
        <ModalDelete onClose={handleModalClose} onSave={handleModalClose} id={selectedDriverId} />
      )}
    </>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-xl font-bold">Loading...</h1>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold mb-8">Motoristas</h2>
        <button
          onClick={() => handleModalOpen("add")}
          className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Cadastrar Motorista
        </button>
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
