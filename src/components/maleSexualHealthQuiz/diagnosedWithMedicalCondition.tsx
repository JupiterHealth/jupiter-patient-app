import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const DiagnosedWithMedicalCondition = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Have you been diagnosed with any of the following medical
                conditions?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={4} className="text-start"></Col>
                <Col span={20} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Diabetes",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Diabetes",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "blood pressure",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "High blood pressure",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "disease",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label:
                                    "Cardiovascular disease/ heart condition",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "cancer",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Prostate cancer",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "testosterone",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "five",
                                label: "Low testosterone",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Peyronie",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "six",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Peyronie's disease{" "}
                                        <span className="text-lg font-medium">
                                            (abnormal curvature of the penis)
                                        </span>
                                    </span>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "anemia",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "seven",
                                label: "Sickle-cell anemia",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Priapism",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eight",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Priapism
                                        <span className="text-lg font-medium">
                                            (erections lasting longer than 2
                                            hours)
                                        </span>
                                    </span>
                                ),
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
                                label: "HIV",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "HIG6PDV",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "ten",
                                label: (
                                    <span className="text-lg font-semibold">
                                        G6PD deficiency{" "}
                                        <span className="text-lg font-medium">
                                            (glucose-6-phosphate dehydrogenase)
                                        </span>
                                    </span>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "kidney",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eleven",
                                label: "Liver or kidney disease",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Neuropathy",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "twelve",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Non-Arteritic Anterior Ischaemic Optic
                                        Neuropathy
                                        <span className="text-lg font-medium">
                                            (Vision problems)
                                        </span>
                                    </span>
                                ),
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
                                id: "thirteen",
                                label: "Other",
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
                                className: "mt-1 mr-2",
                                id: "fourteen",
                                label: "None of the above",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-lg">
                        What do you experience these symptoms? Please mention
                        here
                    </p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4">
                    <TextArea
                        placeholder="Enter here"
                        className="text-lg rounded-[10px]"
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default DiagnosedWithMedicalCondition;
