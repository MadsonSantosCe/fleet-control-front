import api from "@/services/api";
import { Driver } from "@/types/Driver";
import axios from "axios";

const DRIVER_API = "/driver";

export const getDrivers = async () => {
  try {
    const response = await api.get<Driver[]>("/drivers");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error fetching drivers: ${error.response?.data.message || error.message}`
      );
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const getDriverById = async (id: number) => {
  try {
    const response = await api.get<Driver>(`${DRIVER_API}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const createDriver = async (driver: Driver) => {
  try {
    const response = await api.post<Driver>(DRIVER_API, driver);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const updateDriver = async (id: number, updatedDriver: Driver) => {
  try {
    const response = await api.put<Driver>(
      `${DRIVER_API}/${id}`,
      updatedDriver
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

export const deleteDriver = async (id: number) => {
  try {
    await api.delete(`${DRIVER_API}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data.message || error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};
