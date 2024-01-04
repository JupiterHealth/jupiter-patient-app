import React from "react";
import PhotoRequirement from "@components/dermatologyQuestions/photoRequirement";
import { questionObj } from "@redux/slices/assessment";
import CommonCheckBoxForAssessment from "@components/painManagement/painQuestions/commonCheckboxForAssessment";
import CommonRadioForAssessment from "@components/painManagement/painQuestions/commonRadioForAssessment";
import ShareInformation from "@components/painManagement/painQuestions/shareInformation";

export interface Step2ComponentProps {
    currentQuestionObj: questionObj;
    formState: any;
    watch: any;
    activeQuestionId?: string;
    imageData: any;
    setValue?: any;
    assessMentDetails: any;
    router: any;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    setImageData: (d: any) => any;
    setAssessmentFlag: (d?: any) => void;
    handleTextareaChange: (d?: any) => void;
    unregister: (d?: any) => void;
    getTriggeredOptions: (d: any) => any;
    triggeredOptionsArray: any;
}

const Step2Component = (props: Step2ComponentProps) => {
    const {
        currentQuestionObj,
        formState,
        watch,
        activeQuestionId,
        imageData,
        setValue,
        assessMentDetails,
        router,
        setImageData,
        setCurrentQuestionObj,
        register,
        setAssessmentFlag,
        handleTextareaChange,
        unregister,
        getTriggeredOptions,
        triggeredOptionsArray,
    } = props;

    return (
        <>
            {activeQuestionId === "QUE_1" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 1,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: true,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_2" && (
                <div className="w-auto mx-auto">
                    <CommonRadioForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: true,
                            handleTextareaChange,
                            setAssessmentFlag,
                            activeQuestionId,
                            optionForOtherTextbox: 2,
                            otherLabel:
                                "Please provide details including diagnosis if applicable",
                            router,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_3" && (
                <div className="w-auto mx-auto">
                    <CommonRadioForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: true,
                            handleTextareaChange,
                            setAssessmentFlag,
                            activeQuestionId,
                            optionForOtherTextbox: 2,
                            otherLabel:
                                "Which medications, how effective were they and any other relevant details",
                            router,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_4" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
            )}
            {activeQuestionId === "QUE_5" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        other: true,
                        handleTextareaChange,
                        setAssessmentFlag,
                        activeQuestionId,
                        optionForOtherTextbox: 2,
                        otherLabel: "Please provide details",
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_6" && (
                <div className="md:w-[830px]">
                    <PhotoRequirement
                        {...{
                            imageData,
                            setImageData,
                            currentQuestionObj,
                            router,
                            activeQuestionId,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_7" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
                            optionForOtherTextbox: 2,
                            router,
                            assessMentDetails,
                            getTriggeredOptions,
                            triggeredOptionsArray,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_8" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
                            optionForOtherTextbox: 2,
                            router,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_9" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 1,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: false,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_10" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: false,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_11" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        router,
                        other: true,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 2,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: true,
                        otherLabel: "Specify color",
                    }}
                />
            )}
            {activeQuestionId === "QUE_12" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
                            optionForOtherTextbox: 2,
                            router,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_13" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        router,
                        watch,
                        other: true,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: true,
                        optionForOtherTextbox: 2,
                    }}
                />
            )}
            {activeQuestionId === "QUE_14" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
            )}
            {activeQuestionId === "QUE_15" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
            )}
            {activeQuestionId === "QUE_16" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
            )}
            {activeQuestionId === "QUE_17" && (
                <div className="w-auto md:w-[630px] mx-auto">
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
            )}
            {activeQuestionId === "QUE_18" && (
                <ShareInformation
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        handleTextareaChange,
                        setValue,
                    }}
                />
            )}
        </>
    );
};

export default Step2Component;
