import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const PrescribeInjectables = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);

    const { register, formState } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Have you ever been prescribed injectables for ED?
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
            <div className="mt-9">
                <FormGroup className="!mb-4 w-4/5 mx-auto">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "textarea",
                            label: "Please enter details below",
                            placeholder: "Enter here",
                            className: "w-full",
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default PrescribeInjectables;
