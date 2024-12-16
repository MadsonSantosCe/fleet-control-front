"use client";
import { useEffect, useState } from "react";
import { getDeliveryById } from "@/services/delivery";
import { Delivery } from "@/types/Delivery";
import Link from "next/link";
import { formatDate } from "@/utils/stringUtils";
import ModalDelete from "@/app/components/modal/delivery/modelDelete";
import { Loader } from "@/app/components/ui/loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeliveryDetailsProps {
  params: Promise<{ id: string }>;
}

export default function DeliveryDetailsPage({ params }: DeliveryDetailsProps) {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDeliveryDetails();
  }, [params]);

  const fetchDeliveryDetails = async () => {
    try {
      const id = Number((await params).id);
      if (!isNaN(id)) {
        const deliveryData = await getDeliveryById(id);
        setDelivery(deliveryData);
      }
    } catch (error) {
      toast.error(`Erro ao buscar detalhes: ${error}`, { duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => setShowDeleteModal(false);
  const handleModalOpen = () => setShowDeleteModal(true);
  const handleSave = () => {
    router.push(`/delivery`);
  };

  const renderDeliveryStatus = () => {
    if (!delivery) return null;

    return (
      <>
        {delivery.insurance && (
          <span className="text-green-600 font-semibold mr-2">Com seguro</span>
        )}
        {delivery.dangerous && (
          <span className="text-red-600 font-semibold mr-2">Perigosa</span>
        )}
        {delivery.valuable && (
          <span className="text-yellow-600 font-semibold">Valioso</span>
        )}
        {!delivery.insurance && !delivery.dangerous && !delivery.valuable && (
          <span className="text-gray-500">Padrão</span>
        )}
      </>
    );
  };

  const renderTruckInfo = () => (
    <div className="border-t border-gray-200 py-8">
      <div className="flex items-center justify-between my-4">
        <span className="text-gray-600 w-1/3">Placa</span>
        <span className="font-medium w-2/3 text-left">
          {delivery?.truck.licensePlate}
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <span className="text-gray-600 w-1/3">Modelo</span>
        <span className="font-medium w-2/3 text-left">
          {delivery?.truck.model}
        </span>
      </div>
    </div>
  );

  const renderDriverInfo = () => (
    <div className="border-t border-gray-200 py-6">
      <div className="flex items-center justify-between my-4">
        <span className="text-gray-600 w-1/3">Nome</span>
        <span className="font-medium w-2/3 text-left">
          {delivery?.driver.name}
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <span className="text-gray-600 w-1/3">CNH</span>
        <span className="font-medium w-2/3 text-left">
          {delivery?.driver.license}
        </span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-xl font-bold">Loading...</h1>
        <Loader />
      </div>
    );
  }

  if (!delivery) return null;

  const formattedDate = delivery.deliveryTime
    ? formatDate(delivery.deliveryTime)
    : "";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Entrega</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleModalOpen}
            className="px-2 py-2 border border-gray-300 text-sm rounded-lg text-red-600 hover:bg-red-50"
          >
            Excluir
          </button>
          <Link
            href={`/delivery/${delivery.id}/edit`}
            className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Editar
          </Link>
        </div>
      </div>

      <h2 className="text-lg font-semibold">Detalhes</h2>
      <div className="border-t border-gray-200 py-6">
        <div className="flex items-center justify-between my-4">
          <span className="text-gray-600 w-1/3">Data</span>
          <span className="font-medium w-2/3 text-left">{formattedDate}</span>
        </div>

        <div className="flex items-center justify-between my-4">
          <span className="text-gray-600 w-1/3">Valor</span>
          <span className="font-medium w-2/3 text-left">
            R$ {delivery.value.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between my-4">
          <span className="text-gray-600 w-1/3">Destino</span>
          <span className="font-medium w-2/3 text-left">
            {delivery.destination}
          </span>
        </div>

        <div className="flex items-center justify-between my-4">
          <span className="text-gray-600 w-1/3">Tipo</span>
          <span className="font-medium w-2/3 text-left">{delivery.type}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-600 w-1/3">Status</span>
          <span className="font-medium w-2/3 text-left">
            {renderDeliveryStatus()}
          </span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-4">Caminhão</h2>
      {renderTruckInfo()}

      <h2 className="text-lg font-semibold mt-4">Motorista</h2>
      {renderDriverInfo()}

      {showDeleteModal && delivery && (
        <ModalDelete
          isOpen={showDeleteModal}
          onClose={handleModalClose}
          onSave={handleSave}
          id={delivery.id}
        />
      )}
    </div>
  );
}
