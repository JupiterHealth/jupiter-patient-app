import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const addPaymentMethodAPI = (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/creditcard",
        method: "POST",
        data: payload,
    });
};

export const deleteCardAPI = (cardId?: string): Promise<any> => {
    return fetch({
        url: `/patient/creditcard/${cardId}/delete`,
        method: "DELETE",
    });
};

export const fetchCreditCardListApi = (apiParam: any): Promise<any> => {
    return fetch({
        url: `/patient/creditcard`,
        method: "GET",
        params: apiParam,
    });
};

export const makeDefaultCardApi = (cardId?: string): Promise<any> => {
    return fetch({
        url: `/patient/creditcard/${cardId}/default`,
        method: "POST",
    });
};

export const updateCreditCardAPI = async ({
    payload,
    cardId,
}: {
    payload: any;
    cardId: string;
}): Promise<any> => {
    return fetch({
        url: `/patient/creditcard/${cardId}`,
        method: "PATCH",
        data: payload,
    });
};
