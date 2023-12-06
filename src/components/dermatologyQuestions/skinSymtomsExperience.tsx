import React, { useState } from "react";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";

const SkinSymtomsExperience = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                How long have you been experiencing these skin symptoms?
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
                                label: "Less than 3 months",
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
                                label: "3 to 12 months",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "three",
                                name: "three",
                                value: RADIO_BUTTON.Three,
                                label: "More than 12 months",
                                checked: checkMethod === RADIO_BUTTON.Three,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Three)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkinSymtomsExperience;
