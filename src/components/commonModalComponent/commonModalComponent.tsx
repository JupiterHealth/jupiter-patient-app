import React from "react";
import { Button, Modal } from "antd";
import { flaggedAssessmentAPI } from "@redux/services/assessment.api";
import router from "next/router";

export interface CommonModalComponentProps {
    isOpen?: boolean;
    onClose: (data?: any) => void;
    footer?: boolean;
    title: any;
    description: any;
    setLoadingState: (data?: any) => void;
    loadingState: any;
    assessmentId: string;
    currentQuestionObj?: any;
    activeQuestionId?: any;
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
        currentQuestionObj,
        activeQuestionId,
    } = props;

    const handleFlaggedAssessment = async () => {
        try {
            setLoadingState((d: any) => ({
                ...d,
                assessMentFlagLoading: true,
            }));

            const flagAssessMentRes = await flaggedAssessmentAPI(assessmentId);

            if (flagAssessMentRes) {
                router.push("/dashboard");
                onClose();
            }

            setLoadingState((d: any) => ({
                ...d,
                assessMentFlagLoading: false,
            }));
        } catch (error) {
            console.log(error);

            setLoadingState((d: any) => ({
                ...d,
                assessMentFlagLoading: false,
            }));
        }
    };

    const handlePurpleFlag = () => {
        if (currentQuestionObj?.qId === "QUE_13") {
            router.query.activeQuestionId = "QUE_14";
        }
    };

    const handleNextQue = () => {
        if (currentQuestionObj?.qId === "QUE_9") {
            router.query.activeQuestionId = "QUE_10";
            router.push(router);
        }

        if (currentQuestionObj?.qId === "QUE_14") {
            router.query.activeQuestionId = "QUE_15";
            router.push(router);
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
                    <div
                        className={`text-center mt-2 mb-4 align-center flex gap-5 ${
                            (router?.pathname !==
                                "/dermatology/[assessmentId]" &&
                                activeQuestionId !== "QUE_9") ||
                            (activeQuestionId !== "QUE_14"
                                ? "flex-wrap justify-center"
                                : "")
                        }`}
                    >
                        {(router?.pathname === "/dermatology/[assessmentId]" &&
                            currentQuestionObj?.options?.some(
                                (flag: any) => flag?.flag === "Purple",
                            ) &&
                            activeQuestionId === "QUE_9") ||
                        activeQuestionId === "QUE_14" ? (
                            <Button
                                className="btn-outline !bg-transparent hover:border-primary hover:text-primary hover:bg-transparent min-btn-width min-btn-height antLoaderButton"
                                onClick={
                                    currentQuestionObj?.options?.some(
                                        (flag: any) => flag?.flag === "Purple",
                                    )
                                        ? handlePurpleFlag
                                        : handleNextQue
                                }
                                disabled={loadingState?.assessMentFlagLoading}
                            >
                                Acknowledge & Proceed
                            </Button>
                        ) : (
                            <Button
                                className="btn-outline !bg-transparent hover:border-primary hover:text-primary hover:bg-transparent min-btn-width min-btn-height antLoaderButton"
                                onClick={onClose}
                                disabled={loadingState?.assessMentFlagLoading}
                            >
                                Go Back
                            </Button>
                        )}
                        <Button
                            className="btn-primary min-btn-width min-btn-height antLoaderButton"
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
