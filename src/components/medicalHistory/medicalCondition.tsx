import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import { useForm } from "react-hook-form";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const MedicalCondition = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const { register, formState } = useForm<RadioButtonSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you have any medical conditions?
            </h1>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "callMethod",
                                value: RADIO_BUTTON.One,
                                label: "Yes",
                                checked: checkMethod === RADIO_BUTTON.One,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.One)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "two",
                                name: "callMethod",
                                value: RADIO_BUTTON.Two,
                                label: "No",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                        />
                    </div>
                </div>
            </div>
            <Row className="mt-5">
                <div className="flex">
                    <p className="text-start text-lg font-medium mb-2">
                        Please enter medical conditions below
                    </p>
                    <span className="text-danger">*</span>
                </div>
                <Col span={19}>
                    <div className="relative">
                        //TODO: While implement uncomment below line
                        {/* <SearchInputComponent placeholder="Search or add medical conditions" /> */}
                    </div>
                </Col>

                <Col span={5}>
                    <Button className="h-10 w-36 bg-primary text-white text-lg rounded-[10px] ">
                        Add
                    </Button>
                </Col>
            </Row>
            <Row className="mt-7 flex flex-col">
                <div className="text-start text-lg font-bold">
                    <p>Medical conditions name</p>
                </div>
                <div className="flex items-center mt-3">
                    <div className="bg-[#3979C3] w-2 h-2 rounded"></div>
                    <p className="ml-3 text-lg font-medium">
                        Medical condition 1
                    </p>
                </div>
                <div className="flex items-center mt-3">
                    <div className="bg-[#3979C3] w-2 h-2 rounded"></div>
                    <p className="ml-3 text-lg font-medium">
                        Medical condition 2
                    </p>
                </div>
                <div className="flex items-center mt-3">
                    <div className="bg-[#3979C3] w-2 h-2 rounded"></div>
                    <p className="ml-3 text-lg font-medium">
                        Medical condition 3
                    </p>
                </div>
                <div className="flex items-center mt-3">
                    <div className="bg-[#3979C3] w-2 h-2 rounded"></div>
                    <p className="ml-3 text-lg font-medium">
                        Medical condition 4
                    </p>
                </div>
            </Row>
        </>
    );
};

export default MedicalCondition;
