import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const SymtomsExperience = () => {
    const { register, formState } = useForm();
    const [isEyeSymptomsModal, isSetEyeSymptomsModal] = useState(false);

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Which of the following symptoms do you experience?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row className="mb-5 mt-5">
                <Col span={1}></Col>
                <Col span={13} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "redness",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "one",
                                label: "Flushness and/or redness",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "veins",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "two",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Visible broken blood vessels
                                        <span className="font-medium">
                                            (spider veins)
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
                                name: "swelling",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: "Swelling",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "skin",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "four",
                                label: " Thickening skin",
                            }}
                        />
                    </div>
                    <div className="mt-12">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "other",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "five",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
                <Col span={10} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "burning",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "six",
                                label: "Burning or stinging",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Dryness",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "seven",
                                label: "Dryness, roughness or scaling",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Sensitive skin",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "eight",
                                label: "Sensitive skin",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Eye symptoms",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "nine",
                                label: (
                                    <span className="text-lg font-semibold">
                                        Eye symptoms
                                        <span className="font-medium ml-1">
                                            (itchy, dry, burning,
                                        </span>
                                        <p className="font-medium">
                                            bloodshot,blurry/impaired vision)
                                        </p>
                                    </span>
                                ),
                            }}
                            onClick={() => {
                                isSetEyeSymptomsModal(true);
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "None",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "ten",
                                label: "None",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            {/* {isEyeSymptomsModal && (
                <CommonModalComponent
                    isOpen={isEyeSymptomsModal}
                    title="Eye Symptoms"
                    description=" We apologize for the inconvenience, but we are unable to
                    process your request at this moment. We recommend that you
                    to speak directly with your doctor or specialist to address
                    your specific needs and receive the necessary guidance and
                    care. If you have any questions or need further assistance,
                    our support team is here to help. We appreciate your
                    understanding and look forward to assisting you in the
                    future."
                    onClose={() => {
                        isSetEyeSymptomsModal(false);
                    }}
                />
            )} */}
        </>
    );
};

export default SymtomsExperience;
