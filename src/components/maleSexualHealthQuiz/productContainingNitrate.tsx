import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const ProductContainingNitrate = () => {
    const { register, formState } = useForm();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Are you currently taking any nitrate medications for chest pain
                or products containing nitrates?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={4} className="text-start"></Col>
                <Col span={20} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Nitroglycerin",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Nitroglycerin",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Isosorbide",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Isosorbide mononitrate",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "dinitrate",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Isosorbide dinitrate",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "nitrate",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Isobutyl nitrate, Amyl nitra",
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
                                name: "kidney",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "six",
                                label: "Liver or kidney disease",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "G6PD",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "seven",
                                label: (
                                    <span className="text-lg font-semibold">
                                        G6PD deficiency
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
                                name: "HIV",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "eight",
                                label: "HIV",
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
                                id: "nine",
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
                                id: "ten",
                                label: "Other",
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
                                id: "eleven",
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

export default ProductContainingNitrate;
