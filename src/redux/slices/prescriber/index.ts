import { getPrescriberListAPI } from "@redux/services/prescriber.api";
import { QueryParams } from "@redux/services/types";
import { createSlice } from "@reduxjs/toolkit";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";

export interface PrescriberObject {
    id: string;
    uniqueId: string;
    permissionGroupId?: string;
    firstName: string;
    lastName: string;
    email: string;
    tempEmail?: object;
    phoneNumber: string;
    code: string;
    cpsoNumber: string;
    designation?: string;
    college?: string;
    dob: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    timeZone?: string;
    status: string;
    image: string;
    role: string;
    isDeleted?: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface prescriberListObject {
    createdBy: createdByOrUpdatedByObject;
    updatedBy: createdByOrUpdatedByObject;
    id: string;
    uniqueId: string;
    firstName: string;
    lastName: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: number | string;
    postalCode: string;
    dob: string;
    status: number | string;
    img: null | string;
    role: null | string;
}
export interface createdByOrUpdatedByObject {
    id: string;
    firstName: string;
    lastName: string;
}

export interface prescriberResponseObject {
    total: number;
    count: number;
    hasMany: boolean;
    list: prescriberListObject[];
}

export interface prescriberResponse {
    data: prescriberResponseObject;
    message: string;
    statusCode: number;
}

export interface prescriberListState {
    data: prescriberResponse | any;
    isLoading: boolean;
    error?: string | null;
}

const prescriberInitialState: prescriberListState = {
    data: {},
    error: null,
    isLoading: false,
};

export const prescriberSlice = createSlice({
    name: "prescriber",
    initialState: deepClone(prescriberInitialState),
    reducers: {
        prescriberStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        prescriberSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        prescriberFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        prescriberReset: () => {
            return deepClone(prescriberInitialState);
        },
    },
});

export const {
    prescriberStarted,
    prescriberSuccess,
    prescriberFail,
    prescriberReset,
} = prescriberSlice.actions;

export const fetchPrescriber = (queryParams: any) => async (dispatch: any) => {
    dispatch(prescriberStarted());
    try {
        const prescriber: prescriberResponse = await getPrescriberListAPI(
            queryParams,
        );
        if (prescriber) {
            dispatch(prescriberSuccess(prescriber));
        } else {
            dispatch(prescriberFail(prescriber));
        }
    } catch (e: any) {
        dispatch(prescriberFail(e.message));
    }
};
