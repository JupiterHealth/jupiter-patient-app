import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";

const PainEveryday = (props: any) => {
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
                Do you experience pain everyday?
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
                                label: "Yes, I experience pain everyday",
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
                                label: "No, I don't experience pain everyday",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PainEveryday;
