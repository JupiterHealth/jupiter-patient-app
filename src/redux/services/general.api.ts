import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const deleteFileAPI = async ({
    payload,
}: {
    payload: any;
}): Promise<any> => {
    return fetch({
        url: "/upload/deleteFile",
        method: "POST",
        data: payload,
    });
};

export interface NotificationTriggerPayload {
    type: string;
    subscriberIds: string;
    name: string;
    userId: string;
    module: string;
}

export const getNotificationTriggerApi = ({
    payload,
}: {
    payload: NotificationTriggerPayload;
}): Promise<any> => {
    return fetch({
        url: `/patient/auth/chat-notification/trigger`,
        method: "POST",
        data: payload,
    });
};
