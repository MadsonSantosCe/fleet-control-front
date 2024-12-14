"use client";

import { useEffect, useState } from "react";
import { getDrivers } from "@/services/driver";
import { Driver } from "@/types/Driver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ModalAdd from "@/app/components/modal/driver/modalAdd";
import ModalEdit from "@/app/components/modal/driver/modalEdit";
import ModalDelete from "@/app/components/modal/driver/modelDelete";
import { formatCpf } from "@/utils/stringUtils";

export default function Trucks() {
  const [popupType, setPopupType] = useState<null | "add" | "edit" | "delete">(
    null
  );
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchApi();
    setLoading(false);
  }, []);

  const fetchApi = async () => {
    const response = await getDrivers();
    setDrivers(response);
  };

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
        <h2 className="text-2xl font-semibold mb-8">Motoristas</h2>
        <button
          onClick={openAddPopup}
          className="bg-black text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Cadastrar Motorista
        </button>
      </div>
      <hr className="border-gray-200 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {drivers.length > 0 &&
          drivers.map((driver) => (
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
                <h3 className="text-sm font-semibold text-center">
                  {driver.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  CPF: {formatCpf(driver.license)}
                </p>
              </div>

              <div className="flex space-x-8 my-8">
                <button
                  onClick={() => openEditPopup(driver.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faEdit} className="size-4" />
                </button>

                <button
                  onClick={() => openDeletePopup(driver.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="size-4" />
                </button>
              </div>
            </div>
          ))}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div>
        {drivers.length === 0 && (
          <h3 className="h-full text-center justify-center items-center py4 font-semibold">
            Nada por aqui, cadastre um novo motorista
          </h3>
        )}
      </div>
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
