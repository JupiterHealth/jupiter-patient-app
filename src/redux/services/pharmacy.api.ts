import { pharmacyObject } from "@redux/slices/pharmacy";
import { fetch } from "jupiter-commons/src/components/libs/helpers";
import { QueryParams } from "jupiter-commons/src/components/libs/types";

export const getPharmacyListAPI = (
    queryParams: QueryParams,
): Promise<pharmacyObject> => {
    return fetch({
        url: "/patient/pharmacy",
        method: "GET",
        params: queryParams,
    });
};

export const checkPharmacyExistsAPI = (): Promise<pharmacyObject> => {
    return fetch({
        url: "/patient/assessment/assessment/exist",
        method: "GET",
    });
};
