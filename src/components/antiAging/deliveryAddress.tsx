import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import {
    FormGroup,
    InputField,
    SelectField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";

const DeliveryAddress = () => {
    const { register, formState, control } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Delivery Address
            </h1>
            <p className="text-lg font-bold mt-3">
                Please enter delivery address for your medication.
            </p>
            <FormGroup className="!mb-4 ml-4 mt-7">
                <div className="flex">
                    <p className="text-lg font-medium text-start">
                        Address Line 1
                    </p>
                    <span className="text-danger">*</span>
                </div>
                <InputField
                    {...{
                        register,
                        formState,
                        id: "Product Name",
                        placeholder: "Enter Address Line 1",
                    }}
                />
            </FormGroup>
            <FormGroup className="!mb-4 ml-4">
                <div className="flex">
                    <p className="text-lg font-medium text-start">
                        Address Line 2
                    </p>
                    <span className="text-danger">*</span>
                </div>
                <InputField
                    {...{
                        register,
                        formState,
                        id: "Product Name",
                        placeholder: "Enter Address Line 2",
                    }}
                />
            </FormGroup>
            <Row className="mt-6">
                <Col span={12} className="">
                    <FormGroup className="!mb-4 ml-4">
                        <div className="flex">
                            <p className="text-lg font-medium text-start">
                                Select City
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "state",
                                isClearable: false,
                                placeholder: "Select City",
                                name: "state",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={12} className="">
                    <FormGroup className="!mb-4  ml-4">
                        <div className="flex">
                            <p className="text-lg font-medium text-start">
                                Select Province
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "state",
                                isClearable: false,
                                placeholder: "Select Province",
                                name: "state",
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col span={12} className="">
                    <FormGroup className="!mb-4 ml-4">
                        <div className="flex">
                            <p className="text-lg font-medium text-start">
                                Postal Code
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                id: "postalcode",
                                placeholder: "Enter Postal Code",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={12} className="">
                    <FormGroup className="!mb-4 ml-4">
                        <div className="flex">
                            <p className="text-lg font-medium text-start">
                                Contact Number
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                id: "contact number",
                                placeholder: "+1 | Enter Phone Number",
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
};

export default DeliveryAddress;
