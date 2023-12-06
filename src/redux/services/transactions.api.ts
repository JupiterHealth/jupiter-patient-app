import { QueryParams } from "./types";
import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const allTransactionListAPI = async (
    queryParams?: any,
): Promise<any> => {
    return fetch({
        url: `patient/assessment/transaction/list`,
        params: queryParams,
        method: "GET",
    });
};

export const downloadInvoiceAPI = async (queryParams: any): Promise<any> => {
    return fetch({
        url: `/patient/assessment/invoice-generate/${queryParams?.assessmentId}/${queryParams?.orderId}/${queryParams?.isPatient}`,
        method: "POST",
        params: queryParams,
    });
};
