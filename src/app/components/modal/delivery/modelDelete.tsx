"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { deleteDelivery } from '@/services/delivery';
import { redirect, useRouter } from 'next/navigation';

type Props = {
    onClose: () => void;
    onSave: () => void;
    id: number;
};

export default function ModalDelete({ onSave, onClose, id }: Props) {
    const [apiError, setApiError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await fetchDeleteDelivery(id,);
            setApiError(false);

            setTimeout(() => {
                redirect('/delivery');
            }, 2000);

        } catch (error) {
            toast.error(`Erro: ${error}`, { duration: 6000 });
        }
    };

    const fetchDeleteDelivery = async (id: number) => {
        const response = await deleteDelivery(id);
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
                    <h2 className="text-xl font-semibold mb-10">Deseja deletar a entrega?</h2>

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
