import React from "react";
import { Col, Row } from "antd";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";

const TriggerSkinsymtoms = () => {
    const { register, formState } = useForm();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do any of the following trigger your skin symptoms?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mt-5">
                <Col span={6} className="text-center"></Col>
                <Col span={6} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Shaving",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "one",
                                label: "Shaving",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Alcohol",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "two",
                                label: "Alcohol",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "exercise",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: "Sweat/exercise",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Unsure",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "four",
                                label: "Unsure",
                            }}
                        />
                    </div>
                </Col>
                <Col span={1} className="text-center"></Col>
                <Col span={11} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Diet",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "five",
                                label: "Diet",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Stress",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "six",
                                label: "Stress",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "sunlight",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "seven",
                                label: "Heat/sunlight",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TriggerSkinsymtoms;
