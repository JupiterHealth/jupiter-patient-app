import React from "react";
import { Button, Modal } from "antd";
import router from "next/router";

export interface ExitAssessmentModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
}

const ExitAssessmentModal = (props: ExitAssessmentModalProps) => {
    const { isOpen, onClose } = props;

    return (
        <>
            <Modal
                width={800}
                title={
                    <p>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                            Exit Assessment
                        </h1>
                    </p>
                }
                open={isOpen}
                onCancel={onClose}
                maskClosable={false}
                footer={
                    <div className="text-center mt-2 mb-4 flex align-center">
                        <Button
                            className="btn-outline !bg-transparent !text-base md:!text-lg hover:border-primary hover:text-primary hover:bg-transparent min-btn-width min-btn-height antLoaderButton"
                            onClick={onClose}
                        >
                            Go Back
                        </Button>
                        <Button
                            className="font-medium !ml-6 text-base md:text-lg rounded-[10px] btn-primary min-btn-width min-btn-height antLoaderButton"
                            onClick={() => {
                                onClose;
                                router.push("/dashboard");
                            }}
                        >
                            Yes, Exit
                        </Button>
                    </div>
                }
                centered
            >
                <p className="text-base md:text-lg font-bold mx-7 text-center">
                    Would you like to exit your assessment? You can pick up
                    where you left off from your dashboard.
                </p>
            </Modal>
        </>
    );
};

export default ExitAssessmentModal;
