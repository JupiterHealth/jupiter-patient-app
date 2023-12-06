import { QueryParams } from "./types";
import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const getPrescriberListAPI = (
    queryParams: QueryParams,
): Promise<any> => {
    return fetch({
        url: "/patient/assessment/prescriberList",
        method: "GET",
        params: queryParams,
    });
};

export const getPrescriberInfoAPI = (
    id: string,
    queryParams?: any,
): Promise<any> => {
    return fetch({
        url: `/patient/prescriber-user/${id}`,
        method: "GET",
        params: queryParams,
    });
};
