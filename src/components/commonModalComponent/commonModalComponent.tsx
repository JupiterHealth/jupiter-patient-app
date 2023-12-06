import React from "react";
import { Button, Modal } from "antd";
import { flaggedAssessmentAPI } from "@redux/services/assessment.api";
import router from "next/router";

export interface CommonModalComponentProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    footer?: boolean;
    title: string;
    description: string;
    setLoadingState: (data?: any) => void;
    loadingState: any;
    assessmentId: string;
}

const CommonModalComponent = (props: CommonModalComponentProps) => {
    const {
        isOpen,
        onClose,
        footer,
        title,
        description,
        setLoadingState,
        loadingState,
        assessmentId,
    } = props;

    const handleFlaggedAssessment = async () => {
        try {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    assessMentFlagLoading: true,
                };
            });
            const flagAssessMentRes = await flaggedAssessmentAPI(assessmentId);
            if (flagAssessMentRes) {
                router.push("/dashboard");
                onClose;
            }
            setLoadingState((d: any) => {
                return {
                    ...d,
                    assessMentFlagLoading: false,
                };
            });
        } catch (error) {
            console.log(error);
            setLoadingState((d: any) => {
                return {
                    ...d,
                    assessMentFlagLoading: false,
                };
            });
        }
    };
    return (
        <>
            <Modal
                title={
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                        {title}
                    </h1>
                }
                width={800}
                open={isOpen}
                onCancel={onClose}
                footer={
                    <div className="text-center mt-2 mb-4 flex align-center">
                        <Button
                            className="btn-outline !bg-transparent hover:border-primary hover:text-primary hover:bg-transparent min-btn-width min-btn-height antLoaderButton"
                            onClick={onClose}
                            disabled={loadingState?.assessMentFlagLoading}
                        >
                            Go Back
                        </Button>
                        <Button
                            className="btn-primary !ml-5 min-btn-width min-btn-height antLoaderButton"
                            onClick={() => {
                                handleFlaggedAssessment();
                            }}
                            loading={loadingState?.assessMentFlagLoading}
                        >
                            Ok, Exit
                        </Button>
                    </div>
                }
                centered
            >
                <p className="text-sm xl:text-base font-medium mx-7 text-center">
                    {description}
                </p>
            </Modal>
        </>
    );
};

export default CommonModalComponent;
