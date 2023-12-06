import React from "react";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { optionType, questionObj } from "@redux/slices/assessment";

export interface PainExperienceProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    setAssessmentFlag: (d?: any) => void;
}

const PainExperience = (props: PainExperienceProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        setAssessmentFlag,
    } = props;
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary !mx-auto w-[72%]">
                Can you describe the size of the area where you're experiencing
                pain?
            </h1>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col">
                    {currentQuestionObj &&
                        currentQuestionObj?.options.map(
                            (option: optionType) => (
                                <div
                                    className={`flex mb-6 last:mb-0 radioLabel`}
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

export default PainExperience;
