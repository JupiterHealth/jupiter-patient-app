import { getNotificationTriggerApi } from "@redux/services/general.api";

const handleGetNotificationTrigger = async ({
    subscriberIds,
    name,
    type,
    module = "patient",
    userId,
}: {
    subscriberIds: string;
    name: string;
    type: string;
    module?: string;
    userId: string;
}) => {
    try {
        await getNotificationTriggerApi({
            payload: {
                subscriberIds,
                name,
                type,
                module,
                userId,
            },
        });
    } catch (error) {
        console.log("error: ", error);
    }
};

export { handleGetNotificationTrigger };
