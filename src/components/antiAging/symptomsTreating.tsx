import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { checkboxSchema } from "src/schemas/checkboxSchema";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const SymptomsTreating = () => {
    const { register, formState } = useForm<checkboxSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Which symptoms are you interested in treating?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={8}></Col>
                <Col span={16} className="text-start">
                    <CheckBoxField
                        {...{
                            register,
                            formState,
                            name: "one",
                            id: "one",
                            label: "Skin firmness/wrinkles",
                            type: "Checkbox",
                        }}
                    />
                    <div className="mt-8">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "one",
                                id: "two",
                                label: "Dark circles under eyes",
                                type: "Checkbox",
                            }}
                        />
                    </div>
                    <div className="mt-8">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "one",
                                id: "three",
                                label: "Fine lines",
                                type: "Checkbox",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="bg-[#eef5ff] flex w-[600px] mx-auto rounded-[10px] mt-14">
                <div className="bg-[#3979C3] h-2 w-4 rounded ml-3 mt-5"></div>
                <p className="p-3 text-start">
                    A Pharmacist will review your request. You will receive an
                    email once reviewed and if approved your treatment will be
                    prepared and shipped.
                </p>
            </div>
        </>
    );
};

export default SymptomsTreating;
