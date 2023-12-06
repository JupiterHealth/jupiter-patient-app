import React from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const PatternOfHairLoss = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                What pattern of hair loss are you experiencing?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={9} className="text-start"></Col>
                <Col span={15} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Thinning",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Thinning",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "patches",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Bald spot/patches",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Receding hairline",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Receding hairline",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default PatternOfHairLoss;
