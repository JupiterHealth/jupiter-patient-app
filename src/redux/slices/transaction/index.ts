import { allTransactionListAPI } from "@redux/services/transactions.api";
import { createSlice } from "@reduxjs/toolkit";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";

export interface AllTransactionList {
    uniqueId: string;
    requestType?: string;
    service?: any[];
    updatedAt: string;
    createdAt: string;
    patientUser?: any[];
}
export interface createdByOrUpdatedByObject {
    id: string;
    firstName: string;
    lastName: string;
}

export interface AllTransactionResponseObject {
    total: number;
    count: number;
    hasMany: boolean;
    list: AllTransactionList[];
}

export interface AllTransactionResponse {
    data: AllTransactionResponseObject;
    message: string;
    statusCode: number;
}

export interface AllTransactionListState {
    data?: AllTransactionResponse | any;
    isLoading?: boolean;
    error?: string | null;
}

const allTransactionInitialState: AllTransactionListState = {
    data: {},
    error: null,
    isLoading: false,
};

export const allTransactionSlice = createSlice({
    name: "allTransaction",
    initialState: deepClone(allTransactionInitialState),
    reducers: {
        allTransactionStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        allTransactionSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        allTransactionFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        allTransactionReset: () => {
            return deepClone(allTransactionInitialState);
        },
    },
});

export const {
    allTransactionStarted,
    allTransactionSuccess,
    allTransactionFail,
    allTransactionReset,
} = allTransactionSlice.actions;

export const fetchAllTransaction = (queryParams: any) => async (
    dispatch: any,
) => {
    dispatch(allTransactionStarted());
    try {
        const allTransaction: AllTransactionResponse = await allTransactionListAPI(
            queryParams,
        );
        if (allTransaction) {
            dispatch(allTransactionSuccess(allTransaction));
        }
    } catch (e: any) {
        dispatch(allTransactionFail(e.message));
    }
};
