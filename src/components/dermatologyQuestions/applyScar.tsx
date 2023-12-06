import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const ApplyScar = () => {
    const { register, formState } = useForm();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do any of the following apply to your scar?{" "}
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mt-5">
                <Col span={4}></Col>
                <Col span={20}>
                    <div className="mt-5 text-start">
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "redness",
                                    type: "Checkbox",
                                    className: "mt-1",
                                    id: "one",
                                    label: (
                                        <span className="text-lg font-semibold">
                                            Darkening of skin{" "}
                                            <span className="font-medium">
                                                {" "}
                                                (hyperpigmentation
                                            </span>
                                            )
                                        </span>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "thickened skin",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "two",
                                label: "Raised or thickened skin",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "None",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: "None",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default ApplyScar;
