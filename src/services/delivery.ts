import api from "@/services/api";
import { Delivery, DeliveryRequest } from "@/types/Delivery";

const DELIVERY_API = "/delivery";

export const getDeliveries = async () => {
  const response = await api.get<Delivery[]>("/deliveries");
  return response.data;
};

export const getDeliveryById = async (id: number) => {
  const response = await api.get<Delivery>(`${DELIVERY_API}/${id}`);
  return response.data;
};

export const createDelivery = async (createDelivery: DeliveryRequest) => {
  const response = await api.post<Delivery>(`${DELIVERY_API}/`, createDelivery);
  return response.data;
};

export const UpdateDelivery = async (
  id: number,
  updatedDelivery: DeliveryRequest
) => {
  const response = await api.put<Delivery>(
    `${DELIVERY_API}/${id}`,
    updatedDelivery
  );
  return response.data;
};

export const deleteDelivery = async (id: number) => {
  await api.delete(`${DELIVERY_API}/${id}`);
};
