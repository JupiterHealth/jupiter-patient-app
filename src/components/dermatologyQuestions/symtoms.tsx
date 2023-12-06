import React, { useState } from "react";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";

const Symtoms = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const [checkMethod1, setCheckMethod1] = useState(RADIO_BUTTON.One);
    const [checkMethod2, setCheckMethod2] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                How long have you been experiencing symptoms for the following?
            </h1>
            <div className="flex justify-center items-center mt-8">
                <div className="bg-[#3979C3] h-2 w-2 rounded mr-3"></div>
                <p className="text-lg font-bold">
                    Anti-aging
                    <span className="text-lg font-medium ml-2">
                        (skin firmness/wrinkles)
                    </span>
                </p>
            </div>
            <div className="flex justify-center mt-5">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "anti",
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
                                name: "anti",
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
                                name: "anti",
                                value: RADIO_BUTTON.Three,
                                label: "More than 12 months",
                                checked: checkMethod === RADIO_BUTTON.Three,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Three)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-8 ml-[-60px]">
                <div className="bg-[#3979C3] h-2 w-2 rounded mr-3"></div>
                <p className="text-lg font-bold">Sweaty palms, hands or feet</p>
            </div>
            <div className="flex justify-center mt-5">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "four",
                                name: "feet",
                                value: RADIO_BUTTON.Four,
                                label: "Less than 3 months",
                                checked: checkMethod1 === RADIO_BUTTON.Four,
                            }}
                            onClick={() => setCheckMethod1(RADIO_BUTTON.Four)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "five",
                                name: "feet",
                                value: RADIO_BUTTON.Five,
                                label: "3 to 12 months",
                                checked: checkMethod1 === RADIO_BUTTON.Five,
                            }}
                            onClick={() => setCheckMethod1(RADIO_BUTTON.Five)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "six",
                                name: "feet",
                                value: RADIO_BUTTON.Six,
                                label: "More than 12 months",
                                checked: checkMethod1 === RADIO_BUTTON.Six,
                            }}
                            onClick={() => setCheckMethod1(RADIO_BUTTON.Six)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-8 ml-[-246px]">
                <div className="bg-[#3979C3] h-2 w-2 rounded mr-3"></div>
                <p className="text-lg font-bold">Hair loss</p>
            </div>
            <div className="flex justify-center mt-5">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "seven",
                                name: "hairLoss",
                                value: RADIO_BUTTON.Seven,
                                label: "Less than 3 months",
                                checked: checkMethod2 === RADIO_BUTTON.Seven,
                            }}
                            onClick={() => setCheckMethod2(RADIO_BUTTON.Seven)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "eight",
                                name: "hairLoss",
                                value: RADIO_BUTTON.Eight,
                                label: "3 to 12 months",
                                checked: checkMethod2 === RADIO_BUTTON.Eight,
                            }}
                            onClick={() => setCheckMethod2(RADIO_BUTTON.Eight)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "nine",
                                name: "hairLoss",
                                value: RADIO_BUTTON.Nine,
                                label: "More than 12 months",
                                checked: checkMethod2 === RADIO_BUTTON.Nine,
                            }}
                            onClick={() => setCheckMethod2(RADIO_BUTTON.Nine)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Symtoms;
