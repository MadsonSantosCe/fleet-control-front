"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTrucks } from "@/services/truck";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "@/app/components/modal/truck/modalAdd";
import ModalEdit from "@/app/components/modal/truck/modalEdit";
import ModalDelete from "@/app/components/modal/truck/modelDelete";
import { Truck } from "@/types/Truck";
import { Loader } from "@/app/components/ui/loader";

export default function Trucks() {
  const [popupType, setPopupType] = useState<null | "add" | "edit" | "delete">(
    null
  );
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getTrucks();
        setTrucks(response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-xl font-bold">Loading...</h1>
        <Loader />
      </div>
    );
  }

  const handleSave = () => {
    setPopupType(null);
  };

  const handleCancel = () => {
    setPopupType(null);
  };

  const openAddPopup = () => {
    setPopupType("add");
  };

  const openEditPopup = (id: number) => {
    setIsSelected(id);
    setPopupType("edit");
  };

  const openDeletePopup = (id: number) => {
    setIsSelected(id);
    setPopupType("delete");
  };

  return (
    <div className="min-h-full flex-1 p-8 bg-white mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold mb-8">Caminhões</h2>
        </div>
        <button
          onClick={openAddPopup}
          className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Cadastrar Veículo
        </button>
      </div>
      <hr className="border-gray-200 mb-6" />

      {trucks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 text-lg">
            Nada por aqui, cadastre um novo veículo
          </p>
        </div>
      ) : (
        <div className="space-y-4 text-sm">
          {trucks.map((truck) => (
            <div
              key={truck.id}
              className="flex items-center justify-between p-4 px-16 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{truck.model}</h3>
                  <p className="text-gray-500">Placa: {truck.licensePlate}</p>
                </div>
              </div>
              <div className="flex space-x-8 px-8">
                <button
                  onClick={() => openEditPopup(truck.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faEdit} className="size-4" />
                </button>

                <button
                  onClick={() => openDeletePopup(truck.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {popupType === "add" && (
        <ModalAdd onClose={handleCancel} onSave={handleSave} />
      )}
      {popupType === "edit" && isSelected !== null && (
        <ModalEdit onClose={handleCancel} onSave={handleSave} id={isSelected} />
      )}
      {popupType === "delete" && isSelected !== null && (
        <ModalDelete
          onClose={handleCancel}
          onSave={handleSave}
          id={isSelected}
        />
      )}
      ;
    </div>
  );
}
