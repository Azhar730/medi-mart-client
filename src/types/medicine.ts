export interface IMedicine  {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    orderQuantity: number;
    requiredPrescription: boolean;
    manufacturer: string;
    expiryDate: Date;
    inStock: boolean;
    isDeleted: boolean;
    image?: string;
  };
  