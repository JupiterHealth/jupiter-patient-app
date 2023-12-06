import React from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    CheckBoxField,
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const ApplyAnyFollowing = () => {
    const { register, formState } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do any of the following apply to you:
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={5} className="text-start"></Col>
                <Col span={19} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Tadalafil",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label:
                                    "I smoke/use nicotine containing products regularly",
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
                                id: "two",
                                label:
                                    "I consume more than 2 alcoholic drinks per day",
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
                                id: "three",
                                label: "I use cannabis regularly",
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
                                label: "I use recreational drugs",
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
                                id: "five",
                                label: "None of the above",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-9">
                <FormGroup className="!mb-4 w-4/5 mx-auto">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "textarea",
                            label:
                                "Please enter details about recreational drugs",
                            placeholder: "Enter here",
                            className: "w-full",
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default ApplyAnyFollowing;
