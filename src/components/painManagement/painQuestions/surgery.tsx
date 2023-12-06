import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const Surgery = (props: any) => {
    const [isSurgeryImplantModal, isSetSurgeryImplantModal] = useState(false);

    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
    } = props;
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Within the past 2 months, have you undergone any of the
                following surgeries or implants?
            </h1>
            <p className="text-lg pt-2 font-medium">(select all that apply)</p>
            <Row>
                <Col span={3}></Col>
                <Col span={21}>
                    <div className="mx-auto">
                        <div className="mb-5 mt-10 text-start">
                            <div className="mt-7">
                                <CheckBoxField
                                    {...{
                                        register,
                                        formState,
                                        name: "therapy",
                                        type: "Checkbox",
                                        className: "mt-1 w-8",
                                        id: "one",
                                        label: (
                                            <span className="text-lg font-semibold ml-2">
                                                Cardiac devices such as
                                                pacemakers, implantable
                                                cardioverter <br />
                                                <span className="ml-2">
                                                    defibrillators (ICDs), and
                                                    cardiac resynchronization
                                                    therapy (CRT) devices
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
                                        name: "replacement",
                                        type: "Checkbox",
                                        className: "mt-1 mr-2",
                                        id: "two",
                                        label: "Hip or knee replacement",
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
                                        label:
                                            "Implantable drug pumps such as intrathecal pumps and insulin pumps",
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
                                            "Retinal implants and other ocular devices",
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
                                        label: "Other",
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
                                        label: (
                                            <span
                                                className="text-lg font-semibold cursor-pointer"
                                                onClick={() =>
                                                    isSetSurgeryImplantModal(
                                                        true,
                                                    )
                                                }
                                            >
                                                None of the above
                                            </span>
                                        ),
                                    }}
                                />
                            </div>
                            {/* {isSurgeryImplantModal && (
                                <CommonModalComponent
                                    isOpen={isSurgeryImplantModal}
                                    title="Undergone selected surgeries or implants"
                                    description=" We apologize for the inconvenience, but we are unable to process your request at this moment. We recommend that you
                            to speak directly with your doctor or specialist to address
                            your specific needs and receive the necessary guidance and
                            care. If you have any questions or need further assistance,
                            our support team is here to help. We appreciate your
                            understanding and look forward to assisting you in the
                            future."
                                    onClose={() => {
                                        isSetSurgeryImplantModal(false);
                                    }}
                                />
                            )} */}
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="mt-10 mx-14">
                <div className="flex mb-2">
                    <p className="text-lg">
                        If any other please enter details below
                    </p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4 mr-auto">
                    <TextArea
                        placeholder="Enter here"
                        className="text-lg rounded-[10px]"
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default Surgery;
