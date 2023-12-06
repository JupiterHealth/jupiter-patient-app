import React from "react";
import { Checkbox } from "antd";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import { optionType, questionObj } from "@redux/slices/assessment";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";

export interface FollowingMedicationsProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    setAssessmentFlag: (d?: any) => void;
}
const FollowingMedications = (props: FollowingMedicationsProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        setAssessmentFlag,
    } = props;

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                {currentQuestionObj?.question}
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <div className="flex justify-center mb-5 mt-3">
                <div className="flex flex-col justify-start">
                    {currentQuestionObj &&
                        currentQuestionObj.options.map(
                            (option: optionType, i: any) => (
                                <div
                                    className={`mt-7 mr-5 ${PainQuestionsStyle.customeCheckboxMadication}`}
                                >
                                    <Checkbox
                                        {...{
                                            value: `${option.key}`,
                                            type: "Checkbox",
                                            className: "mt-1",
                                        }}
                                        checked={currentQuestionObj?.answers?.includes(
                                            option.key,
                                        )}
                                        onClick={(e: any) => {
                                            if (
                                                option.key ===
                                                `${
                                                    currentQuestionObj
                                                        ?.options?.[
                                                        currentQuestionObj
                                                            ?.options.length - 1
                                                    ].key
                                                }`
                                            ) {
                                                setCurrentQuestionObj(
                                                    (d: any) => {
                                                        return {
                                                            ...d,
                                                            answers: [
                                                                option.key,
                                                            ],
                                                        };
                                                    },
                                                );
                                            } else {
                                                if (option.flag === "Red") {
                                                    setAssessmentFlag(
                                                        (d: any) => {
                                                            return {
                                                                status: true,
                                                                option: option,
                                                            };
                                                        },
                                                    );
                                                } else {
                                                    setCurrentQuestionObj(
                                                        (d: any) => {
                                                            const temp = deepClone(
                                                                d,
                                                            );
                                                            const tempAns = temp.answers.filter(
                                                                (answer: any) =>
                                                                    answer !==
                                                                    `${
                                                                        currentQuestionObj
                                                                            ?.options?.[
                                                                            currentQuestionObj
                                                                                ?.options
                                                                                .length -
                                                                                1
                                                                        ].key
                                                                    }`,
                                                            );
                                                            temp[
                                                                "answers"
                                                            ] = tempAns;
                                                            const index = temp.answers.findIndex(
                                                                (answer: any) =>
                                                                    answer ===
                                                                    e?.target
                                                                        ?.value,
                                                            );
                                                            if (index > -1) {
                                                                temp.answers.splice(
                                                                    index,
                                                                    1,
                                                                );
                                                            } else {
                                                                temp.answers.push(
                                                                    e?.target
                                                                        ?.value,
                                                                );
                                                            }
                                                            return temp;
                                                        },
                                                    );
                                                }
                                            }
                                        }}
                                    >
                                        {option.label}
                                    </Checkbox>
                                </div>
                            ),
                        )}
                </div>
            </div>
        </>
    );
};

export default FollowingMedications;
