import api from "@/services/api";
import { Driver } from "@/types/driver";
import axios, { AxiosError } from 'axios';

const DRIVER_API = '/driver';

export const getDrivers = async () => {
    const response = await api.get<Driver[]>('/drivers');
    return response.data;
};

export const getDriverById = async (id: number) => {
    const response = await api.get<Driver>(`${DRIVER_API}/${id}`);
    return response.data;
}

export const createDriver = async (driver: Driver) => {
    const response = await api.post<Driver>(DRIVER_API, driver);
    return response.data;
}

export const updateDriver = async (id: number, updatedDriver: Driver) => {
    const response = await api.put<Driver>(`${DRIVER_API}/${id}`, updatedDriver);
    return response.data;
}

export const deleteDriver = async (id: number) => {
    await api.delete(`${DRIVER_API}/${id}`);
}