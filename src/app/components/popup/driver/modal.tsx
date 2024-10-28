import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { Input } from '../../ui/Input';

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function Modal({onSave, onClose}: Props) {  

  const [nameField, setNameField] = useState('');
  const [licenseField, setLicenseField] = useState('');

  const handleSave = () => {
      redirect('/driver');;
  }
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-7 w-2 h-2 p-3 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-700">
          <FontAwesomeIcon icon={faTimes} className="size-4" />
        </button>
        <div>
            <h2 className="text-xl font-semibold mb-10">Novo Motorista</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700"></label>
                <Input
                    value={nameField}
                    placeholder="Digite o nome do colaborador"
                    onChange={e => setNameField(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700"></label>
                <Input
                    value={licenseField}
                    placeholder="Digite o CPF do colaborador"
                    onChange={e => setLicenseField(e.target.value)}
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
                    onClick={onSave}
                    className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900"
                >
                    Salvar
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
