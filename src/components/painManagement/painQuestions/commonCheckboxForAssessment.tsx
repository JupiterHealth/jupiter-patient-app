import { optionType, questionObj } from "@redux/slices/assessment/index.js";
import { Checkbox, Col, Row } from "antd";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import {
    AssessmentTextAreaField,
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";

export interface CommonCheckBoxForAssessmentProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    other?: boolean;
    setAssessmentFlag: (d?: any) => void;
    handleTextareaChange: (d?: any) => void;
    unregister: (d?: any) => void;
    noneOftheAbove?: boolean;
    optionForOtherTextbox?: any;
    colSpan: number;
    mobilecolSpan?: number;
    setValue?: any;
}

const CommonCheckBoxForAssessment = (
    props: CommonCheckBoxForAssessmentProps,
) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        other,
        setAssessmentFlag,
        handleTextareaChange,
        noneOftheAbove,
        optionForOtherTextbox,
        colSpan,
        mobilecolSpan,
        setValue,
    } = props;

    const onClickCheckBoxHandler = (e: any, option: any) => {
        if (
            option.key ===
                `${
                    currentQuestionObj?.options?.[
                        currentQuestionObj?.options.length - 1
                    ].key
                }` &&
            !noneOftheAbove
        ) {
            setCurrentQuestionObj((d: any) => {
                return {
                    ...d,
                    answers: [option.key],
                };
            });
        } else {
            if (option.flag === "Red") {
                setAssessmentFlag((d: any) => {
                    return {
                        status: true,
                        option: option,
                    };
                });
            } else {
                setCurrentQuestionObj((d: any) => {
                    const temp = deepClone(d);
                    const tempAns = temp.answers.filter(
                        (answer: any) =>
                            answer !==
                            `${
                                currentQuestionObj?.options?.[
                                    currentQuestionObj?.options.length - 1
                                ].key
                            }`,
                    );
                    temp["answers"] = !noneOftheAbove ? tempAns : temp?.answers;
                    const index = temp.answers.findIndex(
                        (answer: any) => answer === e?.target?.value,
                    );
                    if (index > -1) {
                        temp.answers.splice(index, 1);
                    } else {
                        temp.answers.push(e?.target?.value);
                    }
                    return temp;
                });
            }
        }
    };

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary md:!w-[680px] mx-auto">
                {currentQuestionObj?.question}
            </h1>
            <p
                className={`selectAllText ${
                    currentQuestionObj.qId === "QUE_14"
                        ? "hidden"
                        : currentQuestionObj.qId === "QUE_5"
                        ? "hidden"
                        : currentQuestionObj.qId === "QUE_G_3"
                        ? "hidden "
                        : ""
                }`}
            >
                (select all that apply)
            </p>
            <div
                className={`mb-5 mt-5 md:mt-3 w-full md:w-[60%] 2xl:w-[54%] mx-auto ${
                    currentQuestionObj.qId === "QUE_G_3" &&
                    "2xl:w-[20%] md:w-[21%] w-auto flex flex-col items-center"
                }
                ${
                    currentQuestionObj.qId === "QUE_G_3" &&
                    "2xl:w-[20%] md:w-[21%] w-auto"
                }
                ${
                    currentQuestionObj.qId === "QUE_5" &&
                    "2xl:w-[37%] md:w-[36%] w-[225px] questionFive "
                } ${
                    currentQuestionObj.qId === "QUE_6" &&
                    "2xl:w-[40%] md:w-[40%] w-auto"
                } ${currentQuestionObj.qId === "QUE_7" && "questionSeven"} ${
                    currentQuestionObj.qId === "QUE_14" &&
                    "2xl:w-[50%] lg:w-[43%] md:w-[52%] w-auto questionFourteen"
                }`}
            >
                <Row
                    className={`${
                        currentQuestionObj.qId === "QUE_G_3" &&
                        "flex flex-col items-start mx-auto justify-center"
                    } ${
                        currentQuestionObj.qId === "QUE_P_2" &&
                        PainQuestionsStyle.responsiveDesign
                    }`}
                >
                    {currentQuestionObj &&
                        currentQuestionObj.options.map(
                            (option: optionType, i: any) => (
                                <Col span={mobilecolSpan} md={colSpan}>
                                    <div
                                        className={`mt-6 mr-5 ${
                                            PainQuestionsStyle.customeCheckbox
                                        }
                                        ${
                                            currentQuestionObj.qId ===
                                                "QUE_G_3" && "!text-left"
                                        }`}
                                    >
                                        <Checkbox
                                            {...{
                                                value: `${option.key}`,
                                                type: "Checkbox",
                                            }}
                                            checked={currentQuestionObj?.answers?.includes(
                                                option.key,
                                            )}
                                            onClick={(e: any) => {
                                                onClickCheckBoxHandler(
                                                    e,
                                                    option,
                                                );
                                            }}
                                        >
                                            {option.label}
                                        </Checkbox>
                                    </div>
                                </Col>
                            ),
                        )}
                </Row>
                {/* </div> */}
            </div>

            <div className="2xl:w-[65%] xl:w-[70%] w-auto mx-auto">
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
                                <p className="text-base font-medium">
                                    Please enter details below
                                </p>
                                {["QUE_1", "QUE_2", "QUE_6"].includes(
                                    currentQuestionObj?.qId,
                                ) && <span className="text-danger">*</span>}
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
                                        maxLength: 300,
                                        className: "w-full",
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

                {currentQuestionObj?.qId === "QUE_14" && (
                    <div className="mt-10">
                        <div className="flex mb-2">
                            <p className="text-base font-medium">
                                Please provide any relevant details
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
                                    maxLength: 9999,
                                    className: "w-full",
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

export default CommonCheckBoxForAssessment;
