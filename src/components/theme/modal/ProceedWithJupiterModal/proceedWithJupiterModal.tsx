import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Row } from "antd";
import { useForm } from "react-hook-form";
import {
    FormGroup,
    InputField,
    InputGoogleAutoCompleteField,
    InputTypeField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import router from "next/router";
import {
    AddPharmacySchema,
    AddPharmacyValidateResolver,
} from "src/schemas/addPharmacySchema";
import {
    getPhoneNumberFormat,
    getPostalCodeFormat,
} from "jupiter-commons/src/components/libs/helpers";
import { treatmentAPI } from "@redux/services/assessment.api";

export interface ProceedWithJupiterModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    setCurrent: (d?: any) => void;
    setSendToLocalPharmacyModal: (d?: any) => void;
    setSendPrescriptionModal: (d?: any) => void;
    assessmentId: string;
    assessMentDetails?: any;
}

const ProceedWithJupiterModal = (props: ProceedWithJupiterModalProps) => {
    const {
        isOpen,
        onClose,
        setCurrent,
        setSendToLocalPharmacyModal,
        setSendPrescriptionModal,
        assessmentId,
        assessMentDetails,
    } = props;
    const {
        register,
        formState,
        control,
        setValue,
        handleSubmit,
        reset,
    } = useForm<AddPharmacySchema>({
        resolver: yupResolver(AddPharmacyValidateResolver),
    });
    const [formattedValue, setFormattedValue] = useState("");
    const [
        submittingPharmacyDetails,
        setSubmittingPharmacyDetails,
    ] = useState<boolean>(false);

    const onSubmit = async (values: any) => {
        try {
            const payload: any = {
                hasLocalPharmacy: true,
                deliveryFrequency: "1",
                pharmacy: {
                    pharmacyName: values?.pharmacyName,
                    addressLine1: values?.addressLine1,
                    addressLine2: values?.addressLine1,
                    city: values?.city,
                    province: values?.province,
                    postalCode: values?.postalCode,
                    faxNumber: `+1${values?.faxNumber}`,
                },
            };
            setSubmittingPharmacyDetails(true);

            const res = await treatmentAPI(payload, assessmentId);
            if (res) {
                setSendToLocalPharmacyModal(false);
                router.query.activeQuestionId = "upload-identification";
                router.push(router);
                setCurrent(4);
            }
            setSubmittingPharmacyDetails(false);
        } catch (error) {
            console.log("error", error);
            setSubmittingPharmacyDetails(false);
            setSendToLocalPharmacyModal(false);
            router.query.activeQuestionId = "upload-identification";
            router.push(router);
            setCurrent(4);
        }
    };

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        const formattedInput = inputValue
            .replace(/\s/g, "")
            .match(/.{1,3}/g)
            ?.join(" ");
        const capitalizedInput = formattedInput?.replace(
            /\b\w/g,
            (match: any) => match.toUpperCase(),
        );
        setFormattedValue(capitalizedInput || "");
    };

    useEffect(() => {
        if (assessMentDetails?.treatmentOption?.localPharmacy) {
            reset({
                pharmacyName:
                    assessMentDetails?.treatmentOption?.localPharmacy
                        ?.pharmacyName,
                addressLine1:
                    assessMentDetails?.treatmentOption?.localPharmacy
                        ?.addressLine1,
                addressLine2:
                    assessMentDetails?.treatmentOption?.localPharmacy
                        ?.addressLine1,
                city: assessMentDetails?.treatmentOption?.localPharmacy?.city,
                province:
                    assessMentDetails?.treatmentOption?.localPharmacy?.province,
                postalCode:
                    assessMentDetails?.treatmentOption?.localPharmacy
                        ?.postalCode,
                faxNumber: assessMentDetails?.treatmentOption?.localPharmacy?.faxNumber.substring(
                    2,
                ),
            });
        }
    }, [assessMentDetails]);
    return (
        <>
            <Modal
                title={
                    <h1 className="text-lg md:text-2xl font-bold text-secondary">
                        Send prescription to local pharmacy
                    </h1>
                }
                width={1050}
                open={isOpen}
                footer={
                    <div className="text-center mt-8 md:mt-14 mb-8 flex align-center">
                        <Button
                            className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height antLoaderButton"
                            onClick={() => {
                                setSendToLocalPharmacyModal(false);
                                setSendPrescriptionModal(true);
                            }}
                        >
                            Go Back
                        </Button>
                        <Button
                            className="font-bold !ml-5 text-lg rounded-[10px] btn-primary min-btn-width min-btn-height antLoaderButton"
                            htmlType="submit"
                            form="addPharmacyForm"
                            loading={submittingPharmacyDetails}
                        >
                            Next
                        </Button>
                    </div>
                }
                onCancel={onClose}
                centered
            >
                <form id="addPharmacyForm" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-base md:text-lg font-bold mb-6">
                        Enter your local pharmacy details below
                    </p>
                    <FormGroup className="!mb-4 md:ml-4">
                        <div className="flex">
                            <p className="text-base font-medium text-start">
                                Pharmacy Name
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                id: "pharmacyName",
                                maxLength: 60,
                                placeholder: "Enter Pharmacy name",
                                className: "capitalize",
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="!mb-4 md:ml-4">
                        <div className="flex">
                            <p className="text-base font-medium text-start">
                                Address Line 1
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputGoogleAutoCompleteField
                            {...{
                                register,
                                formState,
                                id: "addressLine1",
                                maxLength: 60,
                                placeholder: "Enter Address Line 1",
                                autoComplete: "off",
                                googleAutoCompleteConfig: {
                                    setValue,
                                    autoCompleteId: "addressLine1",
                                    autoPopulateFields: {
                                        addressLine1: "addressLine1",
                                        addressLine2: "addressLine2",
                                        city: "city",
                                        province: "province",
                                        zip: "postalCode",
                                        country: "country",
                                        className: "capitalize",
                                    },
                                },
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="!mb-4 md:ml-4">
                        <div className="flex">
                            <p className="text-base font-medium text-start">
                                Address Line 2
                            </p>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                maxLength: 60,
                                id: "addressLine2",
                                placeholder: "Enter Address Line 2",
                            }}
                        />
                    </FormGroup>
                    <Row className="mt-4">
                        <Col span={24} md={12}>
                            <FormGroup className="!mb-4 md:ml-4">
                                <div className="flex">
                                    <p className="text-base font-medium text-start">
                                        Select City
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        control,
                                        id: "city",
                                        isClearable: false,
                                        placeholder: "Select City",
                                        name: "citySelect",
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col span={24} md={12}>
                            <FormGroup className="!mb-4 md:ml-4">
                                <div className="flex">
                                    <p className="text-base font-medium text-start">
                                        Select province
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        control,
                                        id: "province",
                                        isClearable: false,
                                        placeholder: "Select Province",
                                        name: "provinceSelect",
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} md={12}>
                            <FormGroup className="!mb-4 md:ml-4">
                                <div className="flex">
                                    <p className="text-base font-medium text-start">
                                        Postal Code
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputField
                                    {...{
                                        id: "postalCode",
                                        placeholder: "Enter Postal Code",
                                        register,
                                        value: formattedValue,
                                        onChange: handleChange,
                                        formState,
                                        maxLength: 7,
                                        className: "capitalize",
                                        autoComplete: "off",
                                    }}
                                    onChange={(e: any) => {
                                        e.target.value.length === 6 &&
                                            setValue(
                                                "postalCode",
                                                getPostalCodeFormat(
                                                    e.target.value,
                                                ),
                                                {
                                                    shouldValidate: true,
                                                },
                                            );
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col span={24} md={12}>
                            <FormGroup className="!mb-4 md:ml-4">
                                <div className="flex">
                                    <p className="text-base font-medium text-start">
                                        Fax Number
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputTypeField
                                    {...{
                                        register,
                                        formState,
                                        id: "faxNumber",
                                        placeholder: " Enter Fax Number",
                                        maxLength: 10,
                                        prefix: "+1  |",
                                    }}
                                    onChange={(e: any) => {
                                        setValue(
                                            "faxNumber",
                                            getPhoneNumberFormat(
                                                e.target.value,
                                            ),
                                        );
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </Modal>
        </>
    );
};

export default ProceedWithJupiterModal;
