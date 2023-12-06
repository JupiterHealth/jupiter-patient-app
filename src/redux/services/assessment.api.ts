import { fetch } from "jupiter-commons/src/components/libs/helpers";
import { QueryParams } from "./types";
import { treatmentType } from "@redux/slices/assessment";

export const getCommonDataAPI = async (
    queryParams: QueryParams,
): Promise<any> => {
    return fetch({
        url: `/common-data/state`,
        params: queryParams,
        method: "GET",
    });
};

export const assessmentQuestionSendAPI = async (
    fieldObject: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/question`,
        method: "POST",
        data: fieldObject,
    });
};

export const checkAssessmentAPI = async (
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/check`,
        method: "GET",
    });
};

export const flaggedAssessmentAPI = async (
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/exit-assessment`,
        method: "POST",
    });
};

export const medicalHistoryAPI = async (
    fieldObject: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/medical-history`,
        method: "POST",
        data: fieldObject,
    });
};

export const fetchTreatmentAPI = async (
    apiParams: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/products`,
        method: "GET",
        params: apiParams,
    });
};

export const updateAssessmentProfileAPI = async (
    payload: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/profile`,
        method: "POST",
        data: payload,
    });
};

export const treatmentAPI = async (
    treatmentObject: treatmentType,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/treatment`,
        method: "POST",
        data: treatmentObject,
    });
};

export const checkoutAPI = async (
    payload: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/pre-checkout`,
        method: "POST",
        data: payload,
    });
};

export const validatePromoCodeAPI = async (
    payload: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/validate-coupon`,
        method: "POST",
        data: payload,
    });
};

export const makePaymentAPI = async (
    payload: any,
    assessmentId: string,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/checkout`,
        method: "POST",
        data: payload,
    });
};

export const createNewAssessmentAPI = async (serviceKey: any): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${serviceKey}`,
        method: "POST",
    });
};

export const fetchServiceForDashboard = async (): Promise<any> => {
    return fetch({
        url: `/patient/auth/service/list`,
        method: "GET",
    });
};

export const changeMedicationAPI = async (
    assessmentId: any,
    payload: any,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/change-medication`,
        method: "POST",
        data: payload,
    });
};

export const renewMedicationAPI = async (
    assessmentId: any,
    payload: any,
): Promise<any> => {
    return fetch({
        url: `/patient/assessment/${assessmentId}/renew-medication`,
        method: "POST",
        data: payload,
    });
};

export const modifyMedicationAPI = async ({
    type,
    payload,
}: any): Promise<any> => {
    return fetch({
        url: `/patient/assessment/assessment/update/medication`,
        method: "POST",
        data: payload,
    });
};
