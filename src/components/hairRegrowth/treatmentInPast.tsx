import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    ProfileFormInputs,
    ProfileFormValidateSchema,
} from "src/schemas/profileSchema";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputField,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { PlusIcon } from "jupiter-commons/src/components/theme/icons/plusIcon";

const TreatmentInPast = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const [checkMethod1, setCheckMethod1] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<ProfileFormInputs>({
        resolver: yupResolver(ProfileFormValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Have you ever received any hair loss treatments or medications
                in the past?
            </h1>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "callMethod",
                                value: RADIO_BUTTON.One,
                                label: "Gradual",
                                checked: checkMethod === RADIO_BUTTON.One,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.One)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "two",
                                name: "callMethod",
                                value: RADIO_BUTTON.Two,
                                label: "Sudden",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <FormGroup className="w-11/12 mr-12">
                    <div className="flex">
                        <p className="text-lg font-medium text-start">
                            Product Name
                        </p>
                        <span className="text-danger">*</span>
                    </div>
                    <InputField
                        {...{
                            register,
                            formState,
                            id: "Product Name",
                            placeholder: "Enter product name",
                        }}
                    />
                </FormGroup>
                <div className="text-start text-lg font-medium">
                    <p className="text-lg font-medium">Was it effective?</p>
                    <div className="flex mt-1">
                        <div className="flex mr-14">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "three",
                                    name: "callMethod",
                                    value: RADIO_BUTTON.Three,
                                    label: "Yes",
                                    checked:
                                        checkMethod1 === RADIO_BUTTON.Three,
                                }}
                                onClick={() =>
                                    setCheckMethod1(RADIO_BUTTON.Three)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "four",
                                    name: "callMethod",
                                    value: RADIO_BUTTON.Four,
                                    label: "No",
                                    checked: checkMethod1 === RADIO_BUTTON.Four,
                                }}
                                onClick={() =>
                                    setCheckMethod1(RADIO_BUTTON.Four)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-start flex items-center">
                <PlusIcon className="text-secondary cursor-pointer" />
                <p className="border-none border-b text-secondary font-semibold pl-2 cursor-pointer">
                    Add Another
                </p>
            </div>
        </>
    );
};

export default TreatmentInPast;
