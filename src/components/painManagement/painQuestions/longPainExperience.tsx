import React, { useState } from "react";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import { useForm } from "react-hook-form";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";

const LongPainExperience = (props: any) => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);

    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
    } = props;
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                How long have you been experiencing pain?
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
                                label: "Less than a month",
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
                                label: "1 to 6 months",
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
                                label: "Over 6 months",
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

export default LongPainExperience;
