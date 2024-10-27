import api from "@/services/api";
import { Truck } from "@/types/truck";

const TRUCK_API = '/truck';

class TruckService {
    async getAllTrucks(): Promise<Truck[]> {
        const response = await api.get<Truck[]>('/trucks');
        return response.data;
    }

    async getTruckById(id: number): Promise<Truck> {
        const response = await api.get<Truck>(`${TRUCK_API}/${id}`);
        return response.data;
    }

    async createTruck(truck: Omit<Truck, 'id'>): Promise<Truck> {
        const response = await api.post<Truck>(TRUCK_API, truck);
        return response.data;
    }

    async updateTruck(id: number, updatedTruck: Partial<Truck>): Promise<Truck> {
        const response = await api.put<Truck>(`${TRUCK_API}/${id}`, updatedTruck);
        return response.data;
    }

    async deleteTruck(id: number): Promise<void> {
        await api.delete(`${TRUCK_API}/${id}`);
    }
}

export default new TruckService();
