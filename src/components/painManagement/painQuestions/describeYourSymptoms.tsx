import React from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const DescribeYourSymptoms = (props: any) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
    } = props;

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Which of the following words best describes your symptoms or
                sensations?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mb-5 mt-5">
                <Col span={2} className="text-start"></Col>
                <Col span={11} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Pain",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Dull or Aching Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Swelling",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Swelling or Inflammation",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Tenderness",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Tenderness",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Burning",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Burning or Electrical Shock-like Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Burning",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "five",
                                label: "Pricking or Stabbing Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Burning",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "six",
                                label: "Numbness/tingling, Cold Sensation",
                            }}
                        />
                    </div>
                </Col>
                <Col span={10} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Throbbing Pain",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "seven",
                                label: "Throbbing Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Cramps",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eight",
                                label: "Muscle Cramps or Spasms",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Tightness",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "nine",
                                label: "Muscle Tightness",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Shooting",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "ten",
                                label: "Sharp, Shooting or Stinging Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Pins",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eleven",
                                label: "Pins & Needles",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default DescribeYourSymptoms;
