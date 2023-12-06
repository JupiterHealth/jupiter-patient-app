import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import TextArea from "antd/lib/input/TextArea";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const SelfHarm = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you have any thoughts of self harm?
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
                                name: "callMethod",
                                value: RADIO_BUTTON.Two,
                                label: "No",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-lg">Please enter details below</p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4">
                    <TextArea
                        placeholder="Enter here"
                        className="text-lg rounded-[10px]"
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default SelfHarm;
