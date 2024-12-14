import api from "@/services/api";
import { Truck } from "@/types/Truck";
import axios from "axios";

const TRUCK_API = "/truck";

export const getTrucks = async () => {
  try {
    const response = await api.get<Truck[]>("/trucks");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const getTruckById = async (id: number) => {
  try {
    const response = await api.get<Truck>(`${TRUCK_API}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const createTruck = async (truck: Truck) => {
  try {
    const response = await api.post<Truck>(TRUCK_API, truck);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const updateTruck = async (id: number, updatedTruck: Truck) => {
  try {
    const response = await api.put<Truck>(`${TRUCK_API}/${id}`, updatedTruck);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const deleteTruck = async (id: number) => {
  try {
    await api.delete(`${TRUCK_API}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};