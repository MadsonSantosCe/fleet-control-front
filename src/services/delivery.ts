import api from "@/services/api";
import { Delivery, DeliveryRequest } from "@/types/Delivery";
import axios from "axios";

const DELIVERY_API = "/delivery";

export const getDeliveries = async () => {
  try {
    const response = await api.get<Delivery[]>("/deliveries");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const getDeliveryById = async (id: number) => {
  try {
    const response = await api.get<Delivery>(`${DELIVERY_API}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const createDelivery = async (createDelivery: DeliveryRequest) => {
  try {
    const response = await api.post<Delivery>(
      `${DELIVERY_API}/`,
      createDelivery
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const updateDelivery = async (
  id: number,
  updatedDelivery: DeliveryRequest
) => {
  try {
    const response = await api.put<Delivery>(
      `${DELIVERY_API}/${id}`,
      updatedDelivery
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const deleteDelivery = async (id: number) => {
  try {
    await api.delete(`${DELIVERY_API}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};
