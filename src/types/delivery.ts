import { Driver } from "./Driver";
import { Truck } from "./Truck";

export enum Destinations {
  Nordeste = "Nordeste",
  Sul = "Sul",
  Amazonia = "Amazonia",
  Brasilia = "Brasilia",
  Argentina = "Argentina",
  Colombia = "Colombia"
}

export enum DeliveryType {
  Combustivel = "Combustivel",
  Eletronico = "Eletronico",
  Quimico = "Quimico"
}

export interface Delivery {
  id: number;
  type: DeliveryType;
  value: number;
  destination: Destinations;
  deliveryTime: Date; 
  truckId: number;
  driverId: number;
  insurance: boolean;
  dangerous: boolean;
  valuable: boolean;
  truck: Truck;
  driver: Driver;
}

export interface DeliveryRequest {
  type: DeliveryType;
  value: number;
  destination: Destinations;
  deliveryTime: Date;
  truckId: number;
  driverId: number;
  insurance: boolean;
  dangerous: boolean;
  valuable: boolean;
}
