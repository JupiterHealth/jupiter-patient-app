import React from "react";
import {
    FormGroup,
    InputField,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { PlusIcon } from "jupiter-commons/src/components/theme/icons/plusIcon";
import { optionType, questionObj } from "@redux/slices/assessment";
import TreastmentStyle from "../../containers/dermatology/dermatologyStyles.module.scss";
import { Col, Row } from "antd";

export interface TreatmentInPastProps {
    watchFields?: any;
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    setAssessmentFlag: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    hairProduct: any;
    control: any;
    fields?: any;
    append?: any;
    setSelectedOptions: (d?: any) => void;
    selectedOptions?: any;
}

const TreatmentInPast = (props: TreatmentInPastProps) => {
    const {
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
    } = props;

    const onClickRadioHandler = (option: any) => {
        setCurrentQuestionObj((d: any) => {
            return {
                ...d,
                answers: [option.key],
            };
        });
    };

    const handleAddAnother = () => {
        append({}); // Assuming `append` is a function from react-hook-form to add a new field
        setSelectedOptions((prev: any) => [...prev, null]); // Update selectedOptions state
    };

    return (
        <>
            <h1 className="md:text-2xl text-lg font-bold text-secondary">
                Have you ever received any hair loss treatments or medications
                in the past?
            </h1>
            <div className="flex justify-center mt-5 md:mt-9">
                <div className="flex flex-col">
                    {currentQuestionObj?.options.map((option: optionType) => (
                        <div
                            key={option.key}
                            className={`flex mb-6 last:mb-0 radioLabel ${TreastmentStyle.customRadioField}`}
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
                    ))}
                </div>
            </div>

            {currentQuestionObj?.answers?.includes("QUE_7_ANS_1") && (
                <form>
                    <div className="flex justify-between pt-10">
                        <div className="flex pb-2 w-[75%]">
                            <p className="md:text-base font-semibold text-start text-sm">
                                Medication Name
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <p className="text-sm font-semibold flex text-left break-words">
                            Side effects/effectiveness
                        </p>
                    </div>
                    {fields?.map((item: any, index: any) => (
                        <>
                            <div className="flex justify-between pt-5">
                                <FormGroup className="w-11/12 md:mr-12 mr-6">
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            id: `test.${index}.name`,
                                            placeholder: "Enter product name",
                                        }}
                                    />
                                </FormGroup>
                                <div className="text-start text-lg font-medium">
                                    <div className="flex mt-1">
                                        <div className="flex md:mr-14 mr-2">
                                            <InputRadioField
                                                {...{
                                                    register,
                                                    formState,
                                                    id: `${index}yes`,
                                                    name: `test.${index}.sideEffect`,
                                                    value: true,
                                                    label: `Yes`,
                                                    // defaultChecked:
                                                    //     formState.isDirty, // Replace this with your default condition for "Yes"
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <InputRadioField
                                                {...{
                                                    register,
                                                    formState,
                                                    id: `${index}no`,
                                                    name: `test.${index}.sideEffect`,
                                                    value: false,
                                                    label: `No`,
                                                    // defaultChecked: !formState.isDirty, // Replace this with your default condition for "No"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                    <div
                        className="text-start flex items-center"
                        onClick={handleAddAnother}
                    >
                        <PlusIcon className="text-secondary cursor-pointer" />
                        <p className="border-none border-b text-secondary font-semibold pl-2 cursor-pointer">
                            Add Another
                        </p>
                    </div>
                </form>
            )}
        </>
    );
};

export default TreatmentInPast;
