import api from "@/services/api";
import { Truck } from "@/types/truck";

const TRUCK_API = '/truck';

export const getTrucks = async ()  => {
    const response = await api.get<Truck[]>('/trucks');
    return response.data;
}

export const getTruckById = async (id: number) => {
    const response = await api.get<Truck>(`${TRUCK_API}/${id}`);
    return response.data;
}

export const createTruck = async (truck: Truck) => {
    const response = await api.post<Truck>(TRUCK_API, truck);
    return response.data;
}

export const updateTruck = async (id: number, updatedTruck: Truck)  => {
    const response = await api.put<Truck>(`${TRUCK_API}/${id}`, updatedTruck);
    return response.data;
}

export const deleteTruck = async (id: number)  => {
    await api.delete(`${TRUCK_API}/${id}`);
}