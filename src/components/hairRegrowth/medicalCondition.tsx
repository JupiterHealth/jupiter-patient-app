import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import {
    ProfileFormInputs,
    ProfileFormValidateSchema,
} from "src/schemas/profileSchema";
import {
    CheckBoxField,
    FormGroup,
    InputField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { PlusIcon } from "jupiter-commons/src/components/theme/icons/plusIcon";

const MedicalCondition = () => {
    const { register, formState } = useForm<ProfileFormInputs>({
        resolver: yupResolver(ProfileFormValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you have any of the following underlying medical conditions
                that may be contributing to your hair loss?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={5} className="text-start"></Col>
                <Col span={7} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Cancer",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Cancer",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Autoimmune",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Autoimmune disorders",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Kidney Disease",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Kidney Disease",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Other",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
                <Col span={2} className="text-start"></Col>
                <Col span={10} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Thyroid disease",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "five",
                                label: "Thyroid disease",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Enlarged Prostate",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "six",
                                label: "Enlarged Prostate",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Liver Disease",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "seven",
                                label: "Liver Disease",
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
                                id: "eight",
                                label: "None",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-7">
                <FormGroup className="!mb-4">
                    <div className="flex">
                        <p className="text-lg font-medium text-start">
                            Medical Conditions
                        </p>
                        <span className="text-danger">*</span>
                    </div>
                    <InputField
                        {...{
                            register,
                            formState,
                            id: "Product Name",
                            placeholder: "Enter medical conditions",
                        }}
                    />
                </FormGroup>
            </div>
            <div className="text-start flex items-center">
                <PlusIcon className="text-secondary cursor-pointer" />
                <p className="border-none border-b text-secondary font-semibold pl-2 cursor-pointer">
                    Add Another
                </p>
            </div>
        </>
    );
};

export default MedicalCondition;
