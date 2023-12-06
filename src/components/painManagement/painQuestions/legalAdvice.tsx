import React, { useState } from "react";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import { useForm } from "react-hook-form";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { optionType, questionObj } from "@redux/slices/assessment";

export interface LegalAdviceProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    setAssessmentFlag: (d?: any) => void;
}

const LegalAdvice = (props: LegalAdviceProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        setAssessmentFlag,
    } = props;

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary mx-32">
                {currentQuestionObj?.question}
            </h1>
            <div className="flex justify-center mt-8">
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
                                            if (option.flag === "Red") {
                                                setAssessmentFlag((d: any) => {
                                                    return {
                                                        status: true,
                                                        option: option,
                                                    };
                                                });
                                            } else {
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
                                            }
                                        }}
                                    />
                                </div>
                            ),
                        )}
                </div>
            </div>
        </>
    );
};

export default LegalAdvice;
