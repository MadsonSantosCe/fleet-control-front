import { DeliveryType, Destinations } from "@/types/Delivery";
import { z } from "zod";

export const  DliverySchema = z.object({
  value: z.number().positive({ message: "Valor não pode ser negativo" }).int(),
  deliveryTime: z.date({ message: "A data é obrigatória" }),
  destination: z.nativeEnum(Destinations, {
    errorMap: () => ({ message: "O destino é obrigatório" }),
  }),
  type: z.nativeEnum(DeliveryType, {
    errorMap: () => ({ message: "O tipo é obrigatório" }),
  }),
  truckId: z.number().positive({ message: "O Veículo é obrigatório" }).int(),
  driverId: z.number().positive({ message: "O motorista é obrigatório" }).int(),
});