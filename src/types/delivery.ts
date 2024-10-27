
export interface Truck {
    id: number;
    licensePlate: string;
    model: string;
  }
  
  export interface Driver {
    id: number;
    name: string;
    license: string;
  }
  
  export interface Delivery {
    id: number;
    type: string;
    value: number;
    destination: string;
    deliveryTime: string;
    truckId: number;
    driverId: number;
    insurance: boolean;
    dangerous: boolean;
    valuable: boolean;
    truck: Truck;
    driver: Driver;
  }
  
  export interface DeliveryRequest {
    type: string;
    value: number;
    destination: string;
    deliveryTime: string;
    truckId: number;
    driverId: number;
    insurance: boolean;
    dangerous: boolean;
    valuable: boolean;
}