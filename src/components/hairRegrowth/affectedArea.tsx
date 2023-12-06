import React from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const AffectedArea = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Have you experienced any of the following in the affected areas?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mb-5 mt-5">
                <Col span={10} className="text-start"></Col>
                <Col span={14} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Itching",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Itching",
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
                                id: "two",
                                label: "Burning",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Pain",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Pain",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "none",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "None",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AffectedArea;
