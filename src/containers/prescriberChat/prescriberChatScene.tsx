import { RootState } from "@redux/reducers";
import { LoginUserState } from "@redux/slices/auth";
import { PrescriberObject } from "@redux/slices/prescriber";
import ChatMessageComponent from "jupiter-commons/src/components/chatComponent/chatMessageComponent";
import ChatMessageFormComponent from "jupiter-commons/src/components/chatComponent/chatMessageFormComponent";
import { AvatarComponent } from "jupiter-commons/src/components/libs/avatarComponent";
import { DOMAIN } from "jupiter-commons/src/components/libs/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { handleGetNotificationTrigger } from "src/libs/userHelper";
export interface PrescriberSceneProps {
    prescriberDetails: PrescriberObject;
}

const PrescriberChatScene = (props: PrescriberSceneProps) => {
    const { prescriberDetails } = props;
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );

    // NOTE: combinedId is always a combination of senderId and receiverId.
    const combinedId = `${prescriberDetails?.id}${loginUserState?.user?.id}`;

    return (
        <div className="pt-3 md:pt-0">
            <div className="px-3 pb-3 md:py-5 flex gap-3 md:gap-5 items-center top-0 sticky border-b md:rounded-r-[30px] !rounded-b-none bg-white">
                <AvatarComponent className="w-10 h-10 md:w-12 md:h-12 flex items-center">
                    <span className="font-medium text-xl md:text-[28px] ">
                        {prescriberDetails?.firstName?.charAt(0).toUpperCase()}
                    </span>
                </AvatarComponent>
                <div>
                    <p className="text-xs md:text-sm lg:text-base font-semibold">
                        {`${prescriberDetails?.firstName} ${prescriberDetails?.lastName} (License No: ${prescriberDetails?.cpsoNumber})`}
                    </p>
                </div>
            </div>

            <div className="relative">
                <ChatMessageComponent
                    {...{
                        combinedId,
                        isFileUploading,
                        senderId: loginUserState?.user?.id,
                        isFrom: DOMAIN.patientApp.prescriber,
                    }}
                />
                <ChatMessageFormComponent
                    {...{
                        combinedId,
                        senderId: loginUserState?.user?.id,
                        senderName: `${loginUserState?.user?.firstName} ${loginUserState?.user?.lastName}`,
                        senderIdKey: "patientId",
                        senderNameKey: "patientName",
                        receiverIdKey: "prescriberId",
                        receiverNameKey: "prescriberName",
                        receiverId: prescriberDetails?.id,
                        receiverName: `${prescriberDetails?.firstName} ${prescriberDetails?.lastName}`,
                        setIsFileUploading,
                        isFileUploading,
                        isFrom: DOMAIN.patientApp.prescriber,
                        handleGetNotificationTrigger: () =>
                            handleGetNotificationTrigger({
                                subscriberIds: prescriberDetails?.id,
                                name: loginUserState?.user?.firstName,
                                type: "prescriber",
                                userId: loginUserState?.user?.id,
                            }),
                    }}
                />
            </div>
        </div>
    );
};

export default PrescriberChatScene;
