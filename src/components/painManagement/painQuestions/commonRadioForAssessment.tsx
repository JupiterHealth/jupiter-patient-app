import { optionType, questionObj } from "@redux/slices/assessment";
import {
    FormGroup,
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";
import DermatologyStyle from "../../../containers/dermatology/dermatologyStyles.module.scss";
import { OpenEyeIcon } from "jupiter-commons/src/components/theme/icons/openEyeIcon";
import { useState } from "react";
import ImageModal from "@components/theme/modal/imageModal/imageModal";

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
    router: any;
    assessMentDetails?: any;
    getTriggeredOptions?: (d: any) => any;
    triggeredOptionsArray?: any;
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
        router,
        assessMentDetails,
        getTriggeredOptions,
        triggeredOptionsArray,
    } = props;

    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const [images, setImages] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [selectedImage, setSelectedImages] = useState("");

    const onClickRadioHandler = (option: any) => {
        if (option.flag === "Red" || option.flag === "Purple") {
            setAssessmentFlag((d: any) => {
                return {
                    status: true,
                    option: option,
                    answerKeys: option.key,
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

    const onClickRadioHandlers = (
        option: any,
        triggeredOption: string,
        index: number,
    ) => {
        setCurrentQuestionObj((d: any) => {
            const updatedAnswers = [...(d.answers || [])];
            const selectedOption = { key: option?.key, triggeredOption, index };

            // Find the index of the existing selection
            const existingIndex = updatedAnswers.findIndex(
                (ans: any) => ans.triggeredOption === triggeredOption,
            );

            if (existingIndex !== -1) {
                // Replace the existing selection with the new one
                updatedAnswers.splice(existingIndex, 1, selectedOption);
            } else {
                // If no existing selection, add the new one
                updatedAnswers.push(selectedOption);
            }

            return {
                ...d,
                answers: updatedAnswers,
            };
        });
    };

    return (
        <>
            <h1
                className={
                    activeQuestionId === "QUE_11" &&
                    router?.pathname !== "/hair-regrowth/[assessmentId]"
                        ? "text-lg md:text-xl lg:text-2xl font-bold text-secondary !mx-auto w-full xl:w-[72%]"
                        : "text-lg md:text-xl lg:text-2xl font-bold text-secondary" &&
                          activeQuestionId === "QUE_10" &&
                          router?.pathname !== "/hair-regrowth/[assessmentId]"
                        ? "text-lg md:text-xl lg:text-2xl font-bold text-secondary !mx-auto w-full xl:w-[75%]"
                        : "text-lg md:text-xl lg:text-2xl font-bold text-secondary w-full md:!w-[665px] mx-auto"
                }
            >
                {currentQuestionObj?.question}
            </h1>
            {router?.pathname === "/hair-regrowth/[assessmentId]" &&
                activeQuestionId === "QUE_11" && (
                    <h2 className="text-lg md:text-base lg:text-base font-bold text-secondary !mx-auto w-[90%] xl:w-[100%]">
                        (Certain ingredients in hair loss treatments can
                        increase the liklihood of suicidal thoughts)
                    </h2>
                )}
            {activeQuestionId !== "QUE_15" && (
                <div className="flex justify-center mt-5 md:mt-9">
                    <div className="flex flex-col">
                        {router?.pathname === "/dermatology/[assessmentId]" &&
                        activeQuestionId === "QUE_7" &&
                        triggeredOptionsArray ? (
                            <>
                                {triggeredOptionsArray?.map(
                                    (
                                        triggeredOption: string,
                                        index: number,
                                    ) => (
                                        <div key={index}>
                                            <p className="text-xl font-bold mb-3 mt-8 text-primary">
                                                {triggeredOption}
                                            </p>
                                            {currentQuestionObj?.options.map(
                                                (
                                                    option: optionType,
                                                    optionIndex: number,
                                                ) => (
                                                    <div
                                                        key={`${option.key}.${triggeredOption}.${optionIndex}`}
                                                        className={`flex mb-6 last:mb-0 radioLabel`}
                                                    >
                                                        <InputRadioField
                                                            {...{
                                                                register,
                                                                formState,
                                                                id: `${triggeredOption}.${index}.${option.key}.${optionIndex}`,
                                                                name: `${triggeredOption}.${index}`,
                                                                value: `${option.key}.${optionIndex}`,
                                                                label:
                                                                    option.label,
                                                                defaultChecked: currentQuestionObj?.answers?.some(
                                                                    (
                                                                        ans: any,
                                                                    ) =>
                                                                        ans.key ===
                                                                            option.key &&
                                                                        ans.triggeredOption ===
                                                                            triggeredOption &&
                                                                        ans.index ===
                                                                            optionIndex,
                                                                ),
                                                            }}
                                                            onClick={() => {
                                                                onClickRadioHandlers(
                                                                    option,
                                                                    triggeredOption,
                                                                    optionIndex,
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ),
                                )}
                            </>
                        ) : (
                            currentQuestionObj?.options.map(
                                (option: optionType) => (
                                    <div
                                        key={option.key}
                                        className={`flex mb-6 last:mb-0 radioLabel ${DermatologyStyle.radioFieldText}`}
                                    >
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
                            )
                        )}
                    </div>
                </div>
            )}
            {router?.pathname === "/dermatology/[assessmentId]" &&
                activeQuestionId === "QUE_15" && (
                    <div className="flex justify-center mt-5 md:mt-9">
                        <div className="flex flex-col">
                            {currentQuestionObj?.options.map(
                                (option: optionType) => (
                                    <div
                                        key={option.key}
                                        className={`flex mb-6 justify-between last:mb-0 radioLabel ${DermatologyStyle.customRadioFieldText}`}
                                    >
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
                                        {option.key !== "QUE_15_ANS_4" ? (
                                            <OpenEyeIcon
                                                className="mt-1 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImages(
                                                        option.key,
                                                    );
                                                    setIsImageModalOpen(true);
                                                    setImageTitle(option.label);
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                )}
            <div
                className={`${
                    router?.pathname === "/dermatology/[assessmentId]" &&
                    activeQuestionId === "QUE_3"
                }${
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
                                <p className="text-sm md:text-base text-left font-medium">
                                    {otherLabel ?? "Please enter details below"}
                                    {router?.pathname !==
                                        "/dermatology/[assessmentId]" &&
                                        router?.pathname !==
                                            "/hair-regrowth/[assessmentId]" &&
                                        ["QUE_1", "QUE_2"].includes(
                                            currentQuestionObj?.qId,
                                        ) && (
                                            <span className="text-danger">
                                                *
                                            </span>
                                        )}
                                    {router?.pathname ===
                                        "/dermatology/[assessmentId]" &&
                                        ["QUE_2", "QUE_3", "QUE_5"].includes(
                                            currentQuestionObj?.qId,
                                        ) && (
                                            <span className="text-danger">
                                                *
                                            </span>
                                        )}
                                    {router?.pathname ===
                                        "/hair-regrowth/[assessmentId]" &&
                                        ["QUE_9", "QUE_10", "QUE_11"].includes(
                                            currentQuestionObj?.qId,
                                        ) && (
                                            <span className="text-danger">
                                                *
                                            </span>
                                        )}
                                </p>
                            </div>
                            <FormGroup
                                className={`!mb-4 ${PainQuestionsStyle.textareaPainQuestions}`}
                            >
                                <TextAreaField
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
            {isImageModalOpen && (
                <ImageModal
                    images={images}
                    imageTitle={imageTitle}
                    isOpen={isImageModalOpen}
                    onClose={() => {
                        setIsImageModalOpen(false);
                    }}
                    conditionKey={selectedImage}
                />
            )}
        </>
    );
};

export default CommonRadioForAssessment;
