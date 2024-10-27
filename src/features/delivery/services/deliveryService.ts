import api from "@/services/api";
import { Delivery, DeliveryRequest } from "@/types/delivery";

const DELIVERY_API = '/delivery';

class DeliveryService {
    async getAllDeliveries(): Promise<Delivery[]> {
        const response = await api.get<Delivery[]>('/deliveries');
        return response.data;
    }

    async getDeliveryById(id: number): Promise<Delivery> {
        const response = await api.get<Delivery>(`${DELIVERY_API}/${id}`);
        return response.data;
    }

    async createDelivery(delivery: DeliveryRequest): Promise<Delivery> {
        const response = await api.post<Delivery>(DELIVERY_API, delivery);
        return response.data;
    }

    async updateDelivery(id: number, updatedDelivery: Partial<DeliveryRequest>): Promise<Delivery> {
        const response = await api.put<Delivery>(`${DELIVERY_API}/${id}`, updatedDelivery);
        return response.data;
    }

    async deleteDelivery(id: number): Promise<void> {
        await api.delete(`${DELIVERY_API}/${id}`);
    }
}

export default new DeliveryService();
