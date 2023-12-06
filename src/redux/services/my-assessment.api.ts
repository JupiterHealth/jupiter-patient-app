import { QueryParams } from "./types";
import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const getMyAssessmentListAPI = (queryParams: any): Promise<any> => {
    return fetch({
        url: "/patient/assessment/assessment/list",
        method: "GET",
        params: queryParams,
    });
};
// patient/assessment/assessmentList/{id}
