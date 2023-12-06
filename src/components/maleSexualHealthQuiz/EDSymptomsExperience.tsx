import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const EDSymptomsExperience = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you only experience ED symptoms during sex?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={3} className="text-start"></Col>
                <Col span={21} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "everytime",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label:
                                    "Yes, but I am able maintain an erection on my own",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "everytime",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label:
                                    "I have difficulty maintaining erection alone and with a partner",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "everytime",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Unsure",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default EDSymptomsExperience;
