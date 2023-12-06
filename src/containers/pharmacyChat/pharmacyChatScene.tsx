import { RootState } from "@redux/reducers";
import { LoginUserState } from "@redux/slices/auth";
import { pharmacyListObject } from "@redux/slices/pharmacy";
import ChatMessageComponent from "jupiter-commons/src/components/chatComponent/chatMessageComponent";
import ChatMessageFormComponent from "jupiter-commons/src/components/chatComponent/chatMessageFormComponent";
import { AvatarComponent } from "jupiter-commons/src/components/libs/avatarComponent";
import { DOMAIN } from "jupiter-commons/src/components/libs/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { handleGetNotificationTrigger } from "src/libs/userHelper";

export interface PharmacyChatSceneProps {
    pharmacyDetails: pharmacyListObject;
    combinedId: string;
}

const PharmacyChatScene = (props: PharmacyChatSceneProps) => {
    const { pharmacyDetails, combinedId } = props;
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );

    return (
        <div className="pt-3 md:pt-0">
            <div className="px-3 pb-3 md:py-5 flex gap-3 md:gap-5 items-center top-0 sticky border-b md:rounded-r-[30px] !rounded-b-none bg-white">
                <AvatarComponent className="w-10 h-10 md:w-12 md:h-12 flex items-center">
                    <span className="font-medium text-xl md:text-[28px] ">
                        {pharmacyDetails?.name?.charAt(0).toUpperCase()}
                    </span>
                </AvatarComponent>
                <div>
                    <p className="text-xs md:text-sm lg:text-base font-semibold">
                        {pharmacyDetails?.name}
                    </p>
                    {/* <p className="text-base font-medium">
                        {`${prescriberDetails?.phoneNumber} | ${prescriberDetails?.email}`}
                    </p> */}
                </div>
            </div>
            <div className="relative">
                <ChatMessageComponent
                    {...{
                        combinedId,
                        isFileUploading,
                        senderId: loginUserState?.user?.id,
                        isFrom: DOMAIN.patientApp.pharmacy,
                    }}
                />
                <ChatMessageFormComponent
                    {...{
                        combinedId,
                        senderId: loginUserState?.user?.id,
                        senderName: `${loginUserState?.user?.firstName} ${loginUserState?.user?.lastName}`,
                        senderIdKey: "patientId",
                        senderNameKey: "patientName",
                        receiverIdKey: "pharmacyId",
                        receiverNameKey: "pharmacyName",
                        receiverId: pharmacyDetails?.id,
                        receiverName: pharmacyDetails?.name,
                        setIsFileUploading,
                        isFileUploading,
                        isFrom: DOMAIN.patientApp.pharmacy,
                        handleGetNotificationTrigger: () =>
                            handleGetNotificationTrigger({
                                subscriberIds:
                                    pharmacyDetails?.pharmacyUser[0]?.id,
                                name: loginUserState?.user?.firstName,
                                type: "pharmacy",
                                userId: loginUserState?.user?.id,
                            }),
                    }}
                />
            </div>
        </div>
    );
};

export default PharmacyChatScene;
