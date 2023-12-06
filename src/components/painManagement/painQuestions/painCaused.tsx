import React from "react";
import { Col, Row, Checkbox } from "antd";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import { optionType, questionObj } from "@redux/slices/assessment/index.js";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";
export interface PainCausedProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
}
const PainCaused = (props: PainCausedProps) => {
    const { currentQuestionObj, setCurrentQuestionObj } = props;

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                {currentQuestionObj?.question}
            </h1>
            <p className="selectAllText">(select all that apply)</p>
            <div className="mb-5 mt-3 2xl:w-[54%] xl:w-[60%] mx-auto">
                <Row>
                    {currentQuestionObj &&
                        currentQuestionObj.options.map(
                            (option: optionType, i: any) => (
                                <Col span={12}>
                                    <div
                                        className={`mt-7 mr-5 ${PainQuestionsStyle.customeCheckbox}`}
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
                                                                ?.options
                                                                .length - 1
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
                                            }}
                                        >
                                            {option.label}
                                        </Checkbox>
                                    </div>
                                </Col>
                            ),
                        )}
                </Row>
            </div>
        </>
    );
};
export default PainCaused;
