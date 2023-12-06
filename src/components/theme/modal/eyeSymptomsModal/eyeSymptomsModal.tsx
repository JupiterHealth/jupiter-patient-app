import React from "react";
import { Button, Modal } from "antd";

export interface BodyModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    footer?: boolean;
}

const EyeSymptomsModal = (props: BodyModalProps) => {
    const { isOpen, onClose, footer } = props;
    return (
        <>
            <Modal width={800} open={isOpen} onCancel={onClose} footer={false}>
                <h1 className="text-2xl font-bold text-secondary">
                    Covers more than half of the body
                </h1>
                <hr className="my-7" />
                <p className="text-lg font-bold mx-7 text-center">
                    We apologize for the inconvenience, but we are unable to
                    process your request at this moment. We recommend that you
                    to speak directly with your doctor or specialist to address
                    your specific needs and receive the necessary guidance and
                    care. If you have any questions or need further assistance,
                    our support team is here to help. We appreciate your
                    understanding and look forward to assisting you in the
                    future.
                </p>
                <Button className="font-medium flex mt-10 mb-5 mx-auto bg-primary text-white text-lg h-10 rounded-[10px]">
                    Okay, Thanks
                </Button>
            </Modal>
        </>
    );
};

export default EyeSymptomsModal;
