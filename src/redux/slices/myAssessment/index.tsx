import { getMyAssessmentListAPI } from "@redux/services/my-assessment.api";
import { QueryParams } from "@redux/services/types";
import { createSlice } from "@reduxjs/toolkit";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";

export interface MyAssessmentList {
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

export interface MyAssessmentResponseObject {
    total: number;
    count: number;
    hasMany: boolean;
    list: MyAssessmentList[];
}

export interface MyAssessmentResponse {
    data: MyAssessmentResponseObject;
    message: string;
    statusCode: number;
}

export interface MyAssessmentListState {
    data?: MyAssessmentResponse | any;
    isLoading?: boolean;
    error?: string | null;
}

const myAssessmentInitialState: MyAssessmentListState = {
    data: {},
    error: null,
    isLoading: false,
};

export const myAssessmentSlice = createSlice({
    name: "myAssessment",
    initialState: deepClone(myAssessmentInitialState),
    reducers: {
        myAssessmentStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        myAssessmentSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        myAssessmentFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        myAssessmentReset: () => {
            return deepClone(myAssessmentInitialState);
        },
    },
});

export const {
    myAssessmentStarted,
    myAssessmentSuccess,
    myAssessmentFail,
    myAssessmentReset,
} = myAssessmentSlice.actions;

export const fetchMyAssessment = (queryParams: any) => async (
    dispatch: any,
) => {
    dispatch(myAssessmentStarted());
    try {
        console.log("🚀 -----------------------------🚀");
        console.log("🚀 ~ queryParams:", queryParams);
        console.log("🚀 -----------------------------🚀");
        const myAssessment: MyAssessmentResponse = await getMyAssessmentListAPI(
            queryParams,
        );
        if (myAssessment) {
            dispatch(myAssessmentSuccess(myAssessment));
        }
    } catch (e: any) {
        dispatch(myAssessmentFail(e.message));
    }
};
