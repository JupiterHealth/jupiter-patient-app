import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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

const SkinCareProducts = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);

    const { register, formState } = useForm<ProfileFormInputs>({
        resolver: yupResolver(ProfileFormValidateSchema),
    });
    return (
        <>
            <h1 className="text-[28px] font-bold text-secondary">
                Have you used any over-the-counter or prescription skincare
                products in the past? If so, which ones and how effective were
                they?
            </h1>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "one",
                                value: RADIO_BUTTON.One,
                                label: "Yes",
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
                                name: "two",
                                value: RADIO_BUTTON.Two,
                                label: "No",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex mt-7">
                <FormGroup className="mr-5 w-9/12">
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
                    <div className="flex justify-between mt-1">
                        <div className="mr-14">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "three",
                                    name: "three",
                                    value: RADIO_BUTTON.One,
                                    label: "Yes",
                                    checked: checkMethod === RADIO_BUTTON.One,
                                }}
                                onClick={() => setCheckMethod(RADIO_BUTTON.One)}
                            />
                        </div>
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "four",
                                name: "four",
                                value: RADIO_BUTTON.Two,
                                label: "No",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
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

export default SkinCareProducts;
