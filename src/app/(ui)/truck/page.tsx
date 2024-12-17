"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTrucks } from "@/services/truck";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Truck } from "@/types/Truck";
import { Loader } from "@/app/components/ui/loader";
import { Button } from "@/components/ui/button";
import ModalAdd from "@/app/components/modal/truck/modalAdd";
import ModalEdit from "@/app/components/modal/truck/modalEdit";
import ModalDelete from "@/app/components/modal/truck/modelDelete";
import { useToast } from "@/hooks/use-toast";

export default function TruckPage() {
  const [popupType, setPopupType] = useState<null | "add" | "edit" | "delete">(null);
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    setIsLoading(true);
    try {
      const response = await getTrucks();
      setTrucks(response);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ateção.",
        description: "Erro ao buscar os caminhões.",
        duration: 4000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => setPopupType(null);
  const handleModalOpen = (type: "add" | "edit" | "delete", truckId?: number) => {
    setPopupType(type);
    if (truckId) setSelectedTruckId(truckId);
  };

  const handleSave = () => {
    fetchTrucks();
    handleModalClose();
  };

  const renderTruckCard = (truck: Truck) => (
    <div
      key={truck.id}
      className="flex items-center justify-between p-4 px-16 border-b border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{truck.model}</h3>
          <p className="text-gray-500">Placa: {truck.licensePlate}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="ghost"
          onClick={() => handleModalOpen("edit", truck.id)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Editar caminhão"
        >
          <FontAwesomeIcon icon={faEdit} className="size-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleModalOpen("delete", truck.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Deletar caminhão"
        >
          <FontAwesomeIcon icon={faTrash} className="size-4" />
        </Button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="text-gray-500 text-lg">Nada por aqui, cadastre um novo veículo</p>
    </div>
  );

  const renderModals = () => (
    <>
      {popupType === "add" && (
        <ModalAdd onClose={handleModalClose} onSave={handleSave} isOpen={true} />
      )}
      {popupType === "edit" && selectedTruckId && (
        <ModalEdit
          onClose={handleModalClose}
          onSave={handleSave}
          id={selectedTruckId}
          isOpen={true}
        />
      )}
      {popupType === "delete" && selectedTruckId && (
        <ModalDelete
          onClose={handleModalClose}
          onSave={handleSave}
          id={selectedTruckId}          
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
    <div className="min-h-full flex-1 p-8 mx-4 sm:mx-8 md:mx-12 my-4 rounded-lg ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Caminhões</h2>
        <Button
          onClick={() => handleModalOpen("add")}
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Cadastrar Veículo
        </Button>
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="space-y-4">
        {trucks.length === 0 ? renderEmptyState() : trucks.map(renderTruckCard)}
      </div>

      {renderModals()}
    </div>
  );
}
