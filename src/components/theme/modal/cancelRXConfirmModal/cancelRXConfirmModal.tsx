import { Modal } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import React from "react";

export interface CancelRXConfirmModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    isLoadingCancleMedication?: boolean;
}

const CancelRXConfirmModal = (props: CancelRXConfirmModalProps) => {
    const { isOpen, onClose, isLoadingCancleMedication } = props;

    return (
        <Modal
            title={
                <p className="text-lg md:text-2xl text-secondary font-bold">
                    Cancel Medication
                </p>
            }
            width={650}
            centered
            maskClosable={false}
            open={isOpen}
            onCancel={onClose}
            footer={
                <div className="flex flex-col md:flex-row justify-center mt-5 mb-8">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        No, Do Not Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        loading={isLoadingCancleMedication}
                        form="cancleRxForm"
                        className="mt-5 md:mt-0 !ml-0 md:!ml-5 btn-danger rounded-[10px] !font-bold text-base min-btn-width min-btn-height antLoaderButton"
                    >
                        Yes, Cancel Medication
                    </Button>
                </div>
            }
        >
            <div className="p-3">
                <p className="font-bold text-center text-[20px]">
                    Are you sure you want to
                    <br />
                    cancel the Medication?
                </p>
            </div>
        </Modal>
    );
};

export default CancelRXConfirmModal;
