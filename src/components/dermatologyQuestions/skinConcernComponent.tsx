import React from "react";
import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import { checkboxSchema } from "src/schemas/checkboxSchema";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const SkinConcernComponent = () => {
    const { register, formState } = useForm<checkboxSchema>();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                What are your main skin concerns or conditions?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mb-5 mt-5">
                <Col span={2}></Col>
                <Col span={12} className="text-start">
                    <div className="mt-5 flex cursor-pointer">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "skin",
                                type: "Checkbox",
                                id: "one",
                                className: "mt-1",
                                label: (
                                    <span className="text-lg  font-semibold">
                                        Anti-aging
                                        <span className="font-medium">
                                            (skin firmness/wrinkles, <br />
                                            <span>
                                                dark circles under eyes and fine
                                                lines)
                                            </span>
                                        </span>
                                    </span>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Scar/s",
                                id: "two",
                                label: "Scar/s",
                                type: "Checkbox",
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Rosacea",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Rosacea
                                        <span className="font-medium">
                                            (redness)
                                        </span>
                                    </span>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Hair",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "four",
                                label: "Hair Loss",
                            }}
                        />
                    </div>
                </Col>
                <Col span={10} className="text-start">
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Rosacea",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "five",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Dark or sun spots
                                        <span className="font-medium">
                                            (Melasma)
                                        </span>
                                    </span>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-11">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Hair",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "six",
                                label: "Acne/ breakouts",
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Hair",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "seven",
                                label: "Sweaty palms, hands or feet",
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Hair",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "eight",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-14 mx-10">
                <div className="flex mb-2">
                    <p className="text-lg">
                        What are your other skin concerns or conditions?
                    </p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4 ">
                    <TextArea
                        placeholder="Enter here"
                        className="text-lg rounded-[10px]"
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default SkinConcernComponent;
