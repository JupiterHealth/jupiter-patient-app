import CommonCheckBoxForAssessment from "@components/painManagement/painQuestions/commonCheckboxForAssessment";
import CommonRadioForAssessment from "@components/painManagement/painQuestions/commonRadioForAssessment";
import Diagram from "@components/painManagement/painQuestions/diagram";
import ExperiencePainInWeek from "@components/painManagement/painQuestions/experiencePainInWeek";
import ScaleOfPain from "@components/painManagement/painQuestions/scaleOfPain";
import ShareInformation from "@components/painManagement/painQuestions/shareInformation";
import { questionObj } from "@redux/slices/assessment";

export interface Step2ComponentProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    activeQuestionId?: string;
    setAssessmentFlag: (d?: any) => void;
    scale?: number;
    setScale: (d?: any) => void;
    handleTextareaChange: (d?: any) => void;
    unregister: (d?: any) => void;
    frontParts?: any;
    setFrontParts: (d?: any) => any;
    backParts?: any;
    setBackParts: (d?: any) => any;
    setValue?: any;
    router: any;
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
        scale,
        setScale,
        handleTextareaChange,
        unregister,
        frontParts,
        backParts,
        setFrontParts,
        setBackParts,
        setValue,
        router,
    } = props;

    return (
        <div>
            {activeQuestionId === "QUE_1" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        setValue,
                        watch,
                        other: true,
                        router,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 1,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: true,
                    }}
                />
            )}
            {activeQuestionId === "QUE_2" && (
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
                            otherLabel:
                                "Please provide diagnosis, treatment plan and date",
                            router,
                        }}
                    />
                </div>
            )}
            {activeQuestionId === "QUE_3" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: false,
                    }}
                />
            )}
            {activeQuestionId === "QUE_3_A" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: false,
                        handleTextareaChange,
                        setAssessmentFlag,
                        activeQuestionId,
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_4" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 12,
                        mobilecolSpan: 24,
                    }}
                />
            )}
            {activeQuestionId === "QUE_5" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 24,
                    }}
                />
            )}
            {activeQuestionId === "QUE_6" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: true,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 2,
                        colSpan: 24,
                        mobilecolSpan: 24,
                    }}
                />
            )}
            {activeQuestionId === "QUE_7" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: true,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 2,
                        colSpan: 24,
                    }}
                />
            )}
            {activeQuestionId === "QUE_8" && (
                <Diagram
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        frontParts,
                        backParts,
                        setFrontParts,
                        setBackParts,
                        handleTextareaChange,
                        setValue,
                    }}
                />
            )}
            {activeQuestionId === "QUE_G_1" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: false,
                        handleTextareaChange,
                        activeQuestionId,
                        setAssessmentFlag,
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_10" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: false,
                        handleTextareaChange,
                        activeQuestionId,
                        setAssessmentFlag,
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_11" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: true,
                        handleTextareaChange,
                        activeQuestionId,
                        setAssessmentFlag,
                        optionForOtherTextbox: 2,
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_12" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: true,
                        handleTextareaChange,
                        activeQuestionId,
                        setAssessmentFlag,
                        optionForOtherTextbox: 1,
                        otherLabel: "Provide further detail",
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_13" && (
                <CommonRadioForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        other: false,
                        handleTextareaChange,
                        activeQuestionId,
                        setAssessmentFlag,
                        optionForOtherTextbox: 1,
                        otherLabel: "Provide further detail",
                        setValue,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_14" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        other: true,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        optionForOtherTextbox: 2,
                        colSpan: 12,
                        mobilecolSpan: 24,
                        noneOftheAbove: true,
                        router,
                    }}
                />
            )}
            {activeQuestionId === "QUE_P_1" && (
                <ScaleOfPain
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        scale,
                        setScale,
                    }}
                />
            )}
            {activeQuestionId === "QUE_G_2" && (
                <ExperiencePainInWeek
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        scale,
                        setScale,
                    }}
                />
            )}
            {activeQuestionId === "QUE_G_3" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        router,
                        other: false,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 24,
                        mobilecolSpan: 24,
                        noneOftheAbove: false,
                    }}
                />
            )}
            {activeQuestionId === "QUE_P_2" && (
                <CommonCheckBoxForAssessment
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        watch,
                        setValue,
                        other: false,
                        router,
                        setAssessmentFlag,
                        handleTextareaChange,
                        unregister,
                        colSpan: 12,
                        noneOftheAbove: true,
                    }}
                />
            )}
            {activeQuestionId === "QUE_19" && (
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
    );
};

export default Step2Component;
