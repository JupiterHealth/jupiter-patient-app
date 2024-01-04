import React from "react";
import ProfileComponent from "@components/profileComponent/profileComponent";
import AssessmentComponent from "@components/profileComponent/assessmentComponent";

export interface Step1ComponentProps {
    activeQuestionId?: string;
    formState: any;
    register: (d: any) => void;
    handleSubmit: (d: any) => void;
    control: any;
    setSelectedOption: (d: any) => any;
    onSubmit: (d: any) => any;
    selectedOption: string;
    watchFields: any;
    assessMentDetails: any;
}

const Step1Component = (props: Step1ComponentProps) => {
    const {
        activeQuestionId,
        formState,
        register,
        handleSubmit,
        control,
        setSelectedOption,
        onSubmit,
        selectedOption,
        watchFields,
        assessMentDetails,
    } = props;

    return (
        <>
            {activeQuestionId === "my-profile" && (
                <ProfileComponent
                    {...{
                        formState,
                        register,
                        handleSubmit,
                        control,
                        setSelectedOption,
                        onSubmit,
                        selectedOption,
                        watchFields,
                        assessMentDetails,
                    }}
                />
            )}
            {activeQuestionId === "begin_assessment" && <AssessmentComponent />}
        </>
    );
};

export default Step1Component;
