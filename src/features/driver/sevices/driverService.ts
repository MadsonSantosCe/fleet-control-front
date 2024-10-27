import api from "@/services/api";
import { Driver } from "@/types/driver";

const DRIVER_API = '/driver';

class DriverService {
    async getAllDrivers(): Promise<Driver[]> {
        const response = await api.get<Driver[]>('/drivers');
        return response.data;
    }

    async getDriverById(id: number): Promise<Driver> {
        const response = await api.get<Driver>(`${DRIVER_API}/${id}`);
        return response.data;
    }

    async createDriver(driver: Omit<Driver, 'id'>): Promise<Driver> {
        const response = await api.post<Driver>(DRIVER_API, driver);
        return response.data;
    }

    async updateDriver(id: number, updatedDriver: Partial<Driver>): Promise<Driver> {
        const response = await api.put<Driver>(`${DRIVER_API}/${id}`, updatedDriver);
        return response.data;
    }

    async deleteDriver(id: number): Promise<void> {
        await api.delete(`${DRIVER_API}/${id}`);
    }
}

export default new DriverService();
