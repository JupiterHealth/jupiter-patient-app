import React, { useState } from "react";
import { deleteCardAPI } from "@redux/services/patient-payment-method.api";
import { Button, Modal, message } from "antd";
import { SUCCESS_MESSAGES } from "jupiter-commons/src/components/libs/constants";
import DeleteCreditCardStyle from "./deleteCardStyle.module.scss";

export interface DeleteCreditCardModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    deleteItemId?: string;
}

const DeleteCreditCardModal = (props: DeleteCreditCardModalProps) => {
    const { isOpen, onClose, deleteItemId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteCard = async () => {
        try {
            setIsLoading(true);
            const res = await deleteCardAPI(deleteItemId);
            if (res) {
                setIsLoading(false);
                message.success(SUCCESS_MESSAGES.deleteCard);
                if (typeof onClose !== "undefined") onClose(res);
            }
        } catch (error) {
            setIsLoading(false);
            message.error(SUCCESS_MESSAGES.errorMessage);
        }
    };

    return (
        <Modal
            title={"Delete Credit Card"}
            width={600}
            open={isOpen}
            onCancel={onClose}
            className={DeleteCreditCardStyle.permissionModal}
            footer={
                <div className="flex justify-center mt-9 mb-8">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        NO
                    </Button>
                    <Button
                        htmlType="submit"
                        form="addNewCreditForm"
                        className="!ml-5 btn-danger rounded-[10px] !font-bold text-base min-btn-width min-btn-height antLoaderButton"
                        loading={isLoading}
                        onClick={() => {
                            handleDeleteCard();
                        }}
                    >
                        YES
                    </Button>
                </div>
            }
            centered
        >
            <div>
                <p className="font-bold text-center pt-10 text-base md:text-lg">
                    Are you sure you want to remove this card?
                </p>
            </div>
        </Modal>
    );
};
export default DeleteCreditCardModal;
