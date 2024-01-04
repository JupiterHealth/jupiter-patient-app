import React from "react";
import CommonRadioForAssessment from "@components/painManagement/painQuestions/commonRadioForAssessment";
import { questionObj } from "@redux/slices/assessment";

export interface SymtomsProps {
    assessMentDetails: any;
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    other: boolean;
    handleTextareaChange: (d?: any) => void;
    activeQuestionId: any;
    otherLabel?: any;
    setAssessmentFlag: (d?: any) => void;
    optionForOtherTextbox?: any;
    setValue: any;
    router: any;
}

const Symtoms = (props: SymtomsProps) => {
    const {
        assessMentDetails,
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        other,
        handleTextareaChange,
        activeQuestionId,
        otherLabel,
        setAssessmentFlag,
        optionForOtherTextbox,
        watch,
        setValue,
        router,
    } = props;

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                How long have you been experiencing symptoms for the following?
            </h1>
            <div className="flex justify-center items-center">
                <p className="text-lg font-bold">
                    {assessMentDetails?.questions[0]?.answers &&
                        assessMentDetails?.questions[0]?.options?.map(
                            (ans: any, index: number) => (
                                <div key={ans?.Key}>
                                    <p className="items-center pt-6 circleSecondaryTop">
                                        {ans?.label}
                                    </p>
                                    <CommonRadioForAssessment
                                        {...{
                                            currentQuestionObj,
                                            setCurrentQuestionObj,
                                            register,
                                            formState,
                                            setValue,
                                            watch,
                                            other: false,
                                            handleTextareaChange,
                                            setAssessmentFlag,
                                            activeQuestionId,
                                            router,
                                        }}
                                    />
                                </div>
                            ),
                        )}
                </p>
            </div>
        </>
    );
};

export default Symtoms;
