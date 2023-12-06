import React, { useState } from "react";
import { Col, Row } from "antd";
import { CheckBox } from "jupiter-commons/src/components/libs/constants";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const Symptoms = (props: any) => {
    const [isSymptomsModal, isSetSymptomsModal] = useState(false);
    const [checkMethod, setCheckMethod] = useState(CheckBox.One);

    const { register, formState } = props;

    return (
        <div>
            <h1 className="text-2xl font-bold text-secondary">
                Are you currently experiencing any of the following symptoms?
            </h1>
            <Row>
                <Col span={3}></Col>
                <Col span={21}>
                    <div className="container mx-auto mb-5 mt-7 text-start">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "replacement",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Unexplained weight loss",
                                checked: true,
                            }}
                            onClick={() => setCheckMethod(CheckBox.One)}
                        />
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "two",
                                    label:
                                        "Complete loss of bowel or bladder function",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "three",
                                    label: "Thoughts of suicide or self-harm",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "four",
                                    label:
                                        "Progressive paralysis or weakness of muscles",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "five",
                                    label: "New onset of severe headache",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "six",
                                    label:
                                        " Joint stiffness that lasts longer than 1 hour every morning",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "seven",
                                    label:
                                        "Symmetrically swollen painful joints in hands or fingers",
                                }}
                            />
                        </div>
                        <div className="mt-7">
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "replacement",
                                    type: "Checkbox",
                                    className: "mt-1 mr-2",
                                    id: "eight",
                                    label: (
                                        <span
                                            className="text-lg font-semibold cursor-pointer"
                                            onClick={() =>
                                                isSetSymptomsModal(true)
                                            }
                                        >
                                            None of the above
                                        </span>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {/* {isSymptomsModal && (
                <CommonModalComponent
                    isOpen={isSymptomsModal}
                    title="Experiencing the selected symptoms"
                    description=" We apologize for the inconvenience, but we are unable to
                                    process your request at this moment. We recommend that you
                                    to speak directly with your doctor or specialist to address
                                    your specific needs and receive the necessary guidance and
                                    care. If you have any questions or need further assistance,
                                    our support team is here to help. We appreciate your
                                    understanding and look forward to assisting you in the
                                    future."
                    onClose={() => {
                        isSetSymptomsModal(false);
                    }}
                />
            )} */}
        </div>
    );
};

export default Symptoms;
