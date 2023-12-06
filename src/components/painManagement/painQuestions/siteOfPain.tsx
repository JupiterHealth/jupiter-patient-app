import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { optionType, questionObj } from "@redux/slices/assessment";

export interface SiteOfPainProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    setAssessmentFlag: (d?: any) => void;
}
const SiteOfPain = (props: SiteOfPainProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        setAssessmentFlag,
    } = props;

    return (
        <>
            {" "}
            <h1 className="text-2xl font-bold text-secondary">
                Do you have any cracked or open skin at the site of pain?
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
            {/* {isSkinModal && (
                <CommonModalComponent
                    isOpen={isSkinModal}
                    title="Cracked or open skin"
                    description=" We apologize for the inconvenience, but we are unable to
                            process your request at this moment. We recommend that you
                            to speak directly with your doctor or specialist to address
                            your specific needs and receive the necessary guidance and
                            care. If you have any questions or need further assistance,
                            our support team is here to help. We appreciate your
                            understanding and look forward to assisting you in the
                            future."
                    onClose={() => {
                        isSetSkinModal(false);
                    }}
                />
            )} */}
        </>
    );
};

export default SiteOfPain;
