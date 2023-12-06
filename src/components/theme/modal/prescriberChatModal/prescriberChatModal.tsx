import { RootState } from "@redux/reducers";
import { LoginUserState } from "@redux/slices/auth";
import { Modal } from "antd";
import ChatMessageComponent from "jupiter-commons/src/components/chatComponent/chatMessageComponent";
import ChatMessageFormComponent from "jupiter-commons/src/components/chatComponent/chatMessageFormComponent";
import { DOMAIN } from "jupiter-commons/src/components/libs/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AvatarComponent } from "jupiter-commons/src/components/libs/avatarComponent";
import { handleGetNotificationTrigger } from "src/libs/userHelper";
import PatientChatStyles from "./prescriberChatStyles.module.scss";

interface AddNoteModalModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    selectedAssessment: any;
    setSelectedAssessment: (d?: any) => void;
}

const PrescriberChatModal = (props: AddNoteModalModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setSelectedAssessment,
    } = props;
    const { prescriberUser: prescriberDetails } = selectedAssessment;

    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );

    // NOTE: combinedId is always a combination of senderId and receiverId.
    const combinedId = `${prescriberDetails?.id}${loginUserState?.user?.id}`;
    return (
        <Modal
            title={
                <div className="flex items-center">
                    <div>
                        <AvatarComponent className="w-12 h-12 flex items-center">
                            <span className="font-medium text-[28px] ">
                                {prescriberDetails?.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </span>
                        </AvatarComponent>
                    </div>
                    <div className="flex flex-wrap ml-2">
                        <p className="text-base font-semibold">
                            {`${prescriberDetails?.firstName} ${prescriberDetails?.lastName}`}
                        </p>
                        <p className="text-base font-semibold">
                            {`(License No: ${prescriberDetails?.cpsoNumber})`}
                        </p>
                    </div>
                </div>
            }
            width={800}
            className={`${PatientChatStyles.messages}`}
            centered
            maskClosable={false}
            open={isOpen}
            footer={false}
            onCancel={onClose}
        >
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
        </Modal>
    );
};

export default PrescriberChatModal;
