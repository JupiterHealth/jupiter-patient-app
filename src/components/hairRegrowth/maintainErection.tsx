import React, { useState } from "react";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";

const MaintainErection = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you experience any problems maintaining an erection during
                sexual intercourse?
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
                                label: "I don't have any problems",
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
                                label: "Rarely",
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
                                name: "callMethod",
                                value: RADIO_BUTTON.Three,
                                label: "More than I would like",
                                checked: checkMethod === RADIO_BUTTON.Three,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Three)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "four",
                                name: "callMethod",
                                value: RADIO_BUTTON.Four,
                                label: "Most of the time",
                                checked: checkMethod === RADIO_BUTTON.Four,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Four)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MaintainErection;
