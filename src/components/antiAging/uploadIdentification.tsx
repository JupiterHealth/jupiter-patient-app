import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import {
    FormGroup,
    InputDateField,
    InputField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";

const UploadIdentification = () => {
    const { register, formState, control } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Upload Identification
            </h1>
            <p className="text-lg font-bold mt-3">
                Please enter details and upload your ID/Health Card.
            </p>
            <Row className="mt-7">
                <Col span={12}>
                    <FormGroup className="!mb-4 ml-4">
                        <div className="flex">
                            <p className="text-lg font-medium text-start">
                                Health Card Number
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                id: "Health Card Number",
                                placeholder: "Enter Health Card Number",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={12}>
                    <FormGroup className="!mb-4 ml-7">
                        <FormGroup className="antdDataPicker">
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "Expiry Date",
                                    label: "Expiry Date",
                                    placeholder: "DD/MM/YYYY",
                                    isDisableFuture: true,
                                }}
                            />
                        </FormGroup>
                    </FormGroup>
                </Col>
            </Row>
            <div className="flex text-lg font-medium mb-2 ml-4">
                <p>Upload Front & Back Photo of your ID/Health Card</p>
                <span className="text-danger">*</span>
            </div>
            <div className="border-dashed  ml-4 border-2 rounded-[20px]">
                <div className="my-7">
                    <span className="flex justify-center cursor-pointer">
                        <UploadPhotoIcon className="text-secondary" />
                    </span>
                    <span className="text-secondary cursor-pointer underline text-lg font-semibold">
                        Upload Photos
                    </span>
                    <p className="px-7 mt-2 text-lg font-medium">
                        or drag and drop your photo(s) to this area. We accept
                        JPEG, PNG, GIF, BMP, PDF or HEIC at 10mb or less.
                    </p>
                </div>
            </div>
        </>
    );
};

export default UploadIdentification;
