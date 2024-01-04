export interface questionObj {
    qId: string;
    question: string;
    qKey: string;
    answers: any[];
    options: optionType[];
    flagText?: string;
    flagTitle?: string;
    trigger?: any[];
    triggerName?: any[];
}

export interface optionType {
    label: string;
    key: string;
    flag?: string;
}

export interface treatmentType {
    productId?: string[];
    supplementIds?: string[];
    letPrescriberChoose?: boolean;
    deliveryFrequency?: string;
    hasLocalPharmacy?: boolean;
    pharmacy?: pharmacyType;
    commentForPrescriber?: string;
}

export interface pharmacyType {
    pharmacyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    faxNumber: string;
}

export interface checkoutPayload {
    shippingAddress?: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        province: string;
        country: string;
        postalCode: string;
        contactNumber: string;
    };
    useShippingAsBilling?: false;
    billingAddress?: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        province: string;
        country: string;
        postalCode: string;
        contactNumber: string;
    };
    identification?: [
        {
            key: string;
            name: string;
            description: string;
        },
    ];
    applyInsurance?: boolean;
    insurance?: [
        {
            key: string;
            name: string;
            description: string;
        },
    ];
    insuranceAdditionalDetails?: string;
}
