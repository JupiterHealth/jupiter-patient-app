import { createSlice } from "@reduxjs/toolkit";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";

export interface paymentMethodCardsListCreditedBy {
    id: string;
    fNm: string;
    lNm: string;
    usrNm: string;
}

export interface paymentMethodListCards {
    createdBy: paymentMethodCardsListCreditedBy;
    updatedBy: string | null;
    id: string;
    usrId: string;
    last4: string;
    expMnth: number;
    expYr: number;
    tp: string;
    holderNm: string;
    brand: string;
    stripeTkn: string;
    fingerPrint: string;
    isPrimary: boolean;
    sts: string;
    createdAt: string;
    updatedAt: string;
}

export interface paymentMethodCardsListResponse {
    total: number;
    count: number;
    hasMany: boolean;
    list: paymentMethodListCards[];
}

export interface paymentMethodCardsListState {
    data?: paymentMethodCardsListResponse | any;
    isLoading?: boolean;
    error?: string | null;
    statusCode?: number;
    message?: string | null;
}

const paymentMethodCardsInitialState: paymentMethodCardsListState = {
    data: {},
    statusCode: 0,
    error: null,
    isLoading: false,
};

export const paymentMethodCardsSlice = createSlice({
    name: "paymentMethodCards",
    initialState: paymentMethodCardsInitialState,
    reducers: {
        paymentMethodCardsStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        paymentMethodCardsSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        paymentMethodCardsFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        paymentMethodCardsReset: () => {
            return deepClone(paymentMethodCardsInitialState);
        },
    },
});
