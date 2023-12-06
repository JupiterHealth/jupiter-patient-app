import React from "react";
import painManagementStyles from "./painManagementStyles.module.scss";
import { Button } from "jupiter-commons/src/components/theme/button/button";

export interface AssessmentButtonComponentProps {
    loadingState: any;
    activeQuestionId: any;
    handleOnPrevButton: (d?: any) => void;
    handleOnNextButton: (d?: any) => void;
    handleDisabled: (d?: any) => any;
}

const AssessmentButtonComponent = (props: AssessmentButtonComponentProps) => {
    const {
        loadingState,
        activeQuestionId,
        handleOnPrevButton,
        handleOnNextButton,
        handleDisabled,
    } = props;
    return (
        <div
            className={`${
                loadingState?.checkAssessMent ? "mt-0" : "mt-4 md:mt-9"
            } md:bg-white flex items-center justify-center ${
                [
                    "my-profile",
                    "begin_assessment",
                    "QUE_1",
                    "QUE_2",
                    "QUE_3",
                    "QUE_3_A",
                    "QUE_4",
                    "QUE_5",
                    "QUE_6",
                    "QUE_7",
                    "QUE_8",
                    "QUE_G_1",
                    "QUE_10",
                    "QUE_11",
                    "QUE_12",
                    "QUE_13",
                    "QUE_14",
                    "QUE_G_3",
                    "QUE_P_1",
                    "QUE_P_2",
                    "QUE_G_2",
                    "QUE_19",
                    "ME_QUE_1",
                    "ME_QUE_2",
                    "ME_QUE_3",
                    "ME_QUE_4",
                    "ME_QUE_5",
                    "treatment-options",
                    "complementing-suppliments",
                    "treatment-frequency",
                    "delivery-address",
                    "upload-identification",
                    "upload-insurance",
                    "checkout",
                ].includes(activeQuestionId) && !loadingState?.checkAssessMent
                    ? painManagementStyles.buttonContainerCustom
                    : painManagementStyles.buttonContainer
            } ${
                ["QUE_3_A", "QUE_10", "QUE_11", "QUE_19"].includes(
                    activeQuestionId,
                ) && "!mt-6"
            } ${["QUE_P_1", "QUE_G_2"].includes(activeQuestionId) && "!mt-0"} `}
        >
            <Button
                type="primary"
                onClick={() => handleOnPrevButton()}
                disabled={loadingState?.isSubmittingQuestion}
                className="!hidden lg:!flex goBackLandscape !border-light-black !text-light-black hover:!text-primary hover:!border-primary hover:!bg-white !bg-white rounded-[10px] mr-5 !font-semibold text-base min-btn-width min-btn-height antLoaderButton"
            >
                Go Back
            </Button>
            <Button
                type="primary"
                htmlType="submit"
                form={
                    activeQuestionId === "my-profile"
                        ? "assessmentProfileForm"
                        : "deliveryAddressForm"
                }
                value="Submit"
                onClick={() => handleOnNextButton()}
                disabled={handleDisabled()}
                loading={loadingState?.isSubmittingQuestion}
                className="btn-primary antLoaderButton !font-semibold"
            >
                {activeQuestionId === "checkout" ? "Submit Assessment" : "Next"}
            </Button>
        </div>
    );
};

export default AssessmentButtonComponent;
