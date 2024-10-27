import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { Input } from '../../ui/Input';

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function Popup({ onClose, onSave }: Props) {

  const [modelField, setModelField] = useState('');
  const [licensePlateField, setLicensePlateField] = useState('');

  const handleSave = () => {
    onSave()
    redirect('/truck');;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg">
        <h2 className="text-xl font-semibold mb-10">Novo Veículo</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"></label>
          <Input
            value={modelField}
            placeholder="Modelo do veículo"
            onChange={e => setModelField(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"></label>
          <Input
            value={licensePlateField}
            placeholder="Placa do veículo"
            onChange={e => setLicensePlateField(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-10">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
