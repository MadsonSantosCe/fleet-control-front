"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteDriver, getDriverById, updateDriver } from "@/services/driver";
import { toast } from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
  id: number;
};

export default function ModalDelete({ onSave, onClose, id }: Props) {
  const [nameField, setNameField] = useState("");
  const [licenseField, setLicenseField] = useState("");
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGetDriverById(id);
  }, []);

  const fetchGetDriverById = async (id: number) => {
    const driver = await getDriverById(id);
    if (driver) {
      setNameField(driver.name);
      setLicenseField(driver.license);
    }
  };

  const handleDelete = async () => {
    try {
      await fetchDeleteDriver(id);
      setApiError(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(`${error}`, { duration: 6000 });
    }
  };

  const fetchDeleteDriver = async (id: number) => {
    const response = await deleteDriver(id);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-7 w-2 h-2 p-3 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} className="size-4" />
        </button>

        <div>
          <h2 className="text-xl font-semibold mb-10">
            Deseja deletar o morista
          </h2>

          <div className="flex justify-left items-center mb-6 ">
            <img
              src={
                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
              }
              alt="Driver Profile"
              className="w-24 h-24 rounded-full mr-6 p-2"
            />
            <div>
              <h3 className="text-lg font-semibold">{nameField}</h3>
              <p className="text-gray-600">Licença: {licenseField}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              disabled={loading}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
