import TreatmentInPast from "@components/hairRegrowth/treatmentInPast";
import CommonCheckBoxForAssessment from "@components/painManagement/painQuestions/commonCheckboxForAssessment";
import CommonRadioForAssessment from "@components/painManagement/painQuestions/commonRadioForAssessment";
import ShareInformation from "@components/painManagement/painQuestions/shareInformation";
import { questionObj } from "@redux/slices/assessment";
import React from "react";

export interface Step2ComponentProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    activeQuestionId?: string;
    setAssessmentFlag: (d?: any) => void;
    handleTextareaChange: (d?: any) => void;
    unregister: (d?: any) => void;
    setValue?: any;
    router: any;
    watchFields?: any;
    hairProduct?: any;
    control: any;
    fields?: any;
    append?: any;
    setSelectedOptions: (d?: any) => void;
    selectedOptions?: any;
}

const Step2Component = (props: Step2ComponentProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        watch,
        activeQuestionId,
        setAssessmentFlag,
        handleTextareaChange,
        unregister,
        setValue,
        router,
        watchFields,
        control,
        hairProduct,
        fields,
        append,
        selectedOptions,
        setSelectedOptions,
    } = props;

    return (
        <>
            <div>
                {activeQuestionId === "QUE_1" && (
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
                {activeQuestionId === "QUE_2" && (
                    <CommonCheckBoxForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: false,
                            router,
                            setAssessmentFlag,
                            handleTextareaChange,
                            unregister,
                            colSpan: 12,
                            mobilecolSpan: 24,
                            noneOftheAbove: true,
                        }}
                    />
                )}
                {activeQuestionId === "QUE_3" && (
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
                {activeQuestionId === "QUE_4" && (
                    <CommonCheckBoxForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: false,
                            router,
                            setAssessmentFlag,
                            handleTextareaChange,
                            unregister,
                            colSpan: 12,
                            mobilecolSpan: 24,
                            noneOftheAbove: false,
                        }}
                    />
                )}
                {activeQuestionId === "QUE_5" && (
                    <div className="w-auto md:w-[655px] mx-auto">
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
                {activeQuestionId === "QUE_6" && (
                    <CommonCheckBoxForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: false,
                            router,
                            setAssessmentFlag,
                            handleTextareaChange,
                            unregister,
                            colSpan: 12,
                            mobilecolSpan: 24,
                            noneOftheAbove: false,
                        }}
                    />
                )}
                {activeQuestionId === "QUE_7" && (
                    <div className="w-auto md:w-[630px] mx-auto">
                        <TreatmentInPast
                            {...{
                                watchFields,
                                currentQuestionObj,
                                setCurrentQuestionObj,
                                setAssessmentFlag,
                                register,
                                formState,
                                control,
                                hairProduct,
                                fields,
                                append,
                                setSelectedOptions,
                                selectedOptions,
                            }}
                        />
                    </div>
                )}
                {activeQuestionId === "QUE_8" && (
                    <CommonCheckBoxForAssessment
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            register,
                            formState,
                            setValue,
                            watch,
                            other: false,
                            router,
                            setAssessmentFlag,
                            handleTextareaChange,
                            unregister,
                            colSpan: 12,
                            mobilecolSpan: 24,
                            noneOftheAbove: false,
                        }}
                    />
                )}
                {activeQuestionId === "QUE_9" && (
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
                                otherLabel: "Please enter details below",
                                router,
                            }}
                        />
                    </div>
                )}
                {activeQuestionId === "QUE_10" && (
                    <div className="w-auto md:w-[700px] mx-auto">
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
                                otherLabel: "Please enter details below",
                                router,
                            }}
                        />
                    </div>
                )}
                {activeQuestionId === "QUE_11" && (
                    <div className="w-auto md:w-[630px] mx-auto">
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
                                otherLabel: "Please enter details below",
                                router,
                            }}
                        />
                    </div>
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
                                router,
                            }}
                        />
                    </div>
                )}
                {activeQuestionId === "QUE_13" && (
                    <div className="w-auto md:w-[655px] mx-auto">
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
                {activeQuestionId === "QUE_14" && (
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
            </div>
        </>
    );
};

export default Step2Component;
