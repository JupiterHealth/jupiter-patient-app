import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import {
    CheckBoxField,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const PrescriptionForED = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Have you received a prescription for ED in the past?
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
            <Row className="mb-5 mt-8">
                <Col span={4} className="text-start"></Col>
                <Col span={20} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Viagra",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Viagra/Sildenafil",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Tadalafil",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Cialis/Tadalafil",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Levitra",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "five",
                                label: "Levitra/Vardenafil",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Muse",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "six",
                                label: "Muse/Alprostadil",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "G6PD",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "seven",
                                label: "Bimix: Papaverine, Phentolamine",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "HIV",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eight",
                                label:
                                    "Trimix: Alprostadil, Papaverine, Phentolamine",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "HIV",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "nine",
                                label:
                                    "Quadmix: Alprostadil, Papaverine, Phentolamine, Atropine",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "HIV",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "ten",
                                label: "Other injectable",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default PrescriptionForED;
