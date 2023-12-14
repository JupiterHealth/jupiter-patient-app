import { optionType, questionObj } from "@redux/slices/assessment";
import {
    AssessmentTextAreaField,
    FormGroup,
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";

export interface CommonRadioForAssessmentProps {
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
}
const CommonRadioForAssessment = (props: CommonRadioForAssessmentProps) => {
    const {
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
        setValue,
    } = props;

    const onClickRadioHandler = (option: any) => {
        if (option.flag === "Red") {
            setAssessmentFlag((d: any) => {
                return {
                    status: true,
                    option: option,
                };
            });
        } else {
            setCurrentQuestionObj((d: any) => {
                return {
                    ...d,
                    answers: [option.key],
                };
            });
        }
    };
    return (
        <>
            <h1
                className={
                    activeQuestionId === "QUE_11"
                        ? "text-lg md:text-xl lg:text-2xl font-bold text-secondary !mx-auto w-full xl:w-[72%]"
                        : "text-lg md:text-xl lg:text-2xl font-bold text-secondary" &&
                          activeQuestionId === "QUE_10"
                        ? "text-lg md:text-xl lg:text-2xl font-bold text-secondary !mx-auto w-full xl:w-[75%]"
                        : "text-lg md:text-xl lg:text-2xl font-bold text-secondary w-full md:!w-[665px] mx-auto"
                }
            >
                {currentQuestionObj?.question}
            </h1>
            <div className="flex justify-center mt-5 md:mt-9">
                <div className="flex flex-col">
                    {currentQuestionObj &&
                        currentQuestionObj?.options.map(
                            (option: optionType) => (
                                <div className="flex mb-6 last:mb-0 radioLabel">
                                    <InputRadioField
                                        {...{
                                            register,
                                            formState,
                                            id: option.key,
                                            name: "callMethod",
                                            value: option.key,
                                            label: option.label,
                                            checked: currentQuestionObj?.answers?.includes(
                                                option.key,
                                            ),
                                        }}
                                        onClick={() => {
                                            onClickRadioHandler(option);
                                        }}
                                    />
                                </div>
                            ),
                        )}
                </div>
            </div>
            <div
                className={`${
                    activeQuestionId === "QUE_2" && "!w-full"
                } 2xl:w-[65%] xl:w-[70%] mx-auto`}
            >
                {other &&
                    currentQuestionObj?.answers &&
                    currentQuestionObj?.answers?.some(
                        (a: any) =>
                            a ===
                            `${
                                currentQuestionObj?.options?.[
                                    currentQuestionObj?.options.length -
                                        optionForOtherTextbox
                                ].key
                            }`,
                    ) && (
                        <div className="mt-10">
                            <div className="flex mb-2">
                                <p className="text-sm md:text-base text-left">
                                    {otherLabel ?? "Please enter details below"}
                                    {["QUE_1", "QUE_2"].includes(
                                        currentQuestionObj?.qId,
                                    ) && <span className="text-danger">*</span>}
                                </p>
                            </div>
                            <FormGroup
                                className={`!mb-4 ${PainQuestionsStyle.textareaPainQuestions}`}
                            >
                                <AssessmentTextAreaField
                                    {...{
                                        register,
                                        formState,
                                        id: "otherText",
                                        label: "",
                                        className: "w-full",
                                        maxLength: 9999,
                                        defaultValue: currentQuestionObj?.answers.find(
                                            (answer) => answer?.Other,
                                        )?.Other,
                                        placeholder: "Enter here",
                                        setValue,
                                        onChange: (e: any) => {
                                            handleTextareaChange(e);
                                        },
                                        autoFocus: true,
                                    }}
                                />
                            </FormGroup>
                        </div>
                    )}
            </div>
        </>
    );
};

export default CommonRadioForAssessment;
