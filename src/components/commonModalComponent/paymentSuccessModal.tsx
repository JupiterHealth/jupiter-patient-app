import { Button, Modal } from "antd";
import { CheckCircleIcon } from "jupiter-commons/src/components/theme/icons/checkCircleIcon";
import React from "react";
import paymentSuccessModal from "../checkout/checkoutStyle.module.scss";

export interface DiagnosisModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    footer?: boolean;
}
const PaymentSuccessModal = (props: DiagnosisModalProps) => {
    const { isOpen, onClose, footer } = props;
    return (
        <>
            <Modal
                width={800}
                title={
                    <h1
                        className={`text-lg md:text-xl lg:text-2xl font-bold text-secondary md:w-full w-[300px] ${paymentSuccessModal.landscapeView}`}
                    >
                        Assessment Submitted
                    </h1>
                }
                centered
                open={isOpen}
                onCancel={onClose}
                footer={false}
            >
                <div className="flex flex-col items-center justify-center">
                    <CheckCircleIcon className="w-10 h-10 mb-4" />
                    <p className="text-xl font-bold text-center">
                        Payment Successful
                    </p>
                    <p className="text-base font-medium text-center pt-4">
                        Thank you for submitting your assessment, a healthcare
                        provider will review your assessment shortly.
                    </p>
                    <p className="text-base font-medium text-center pt-6">
                        If a prescription is issued, you will receive an email
                        with a link to schedule counselling with the pharmacy.
                    </p>
                    <Button
                        className="btn-primary mt-10 w-[192px] antLoaderButton"
                        onClick={onClose}
                    >
                        Okay, Thanks
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default PaymentSuccessModal;
