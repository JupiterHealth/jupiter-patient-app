export interface pharmacyListObject {
    id: string;
    uniqueId: string;
    name: string;
    email: string;
    code: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: number;
    timeZone: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    pharmacyUser: any[];
}

export interface pharmacyObject {
    total: number;
    count: number;
    hasMany: boolean;
    list: pharmacyListObject[];
}
