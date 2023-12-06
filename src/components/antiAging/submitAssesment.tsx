import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Col, Collapse, Row } from "antd";
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
import { QuestionCircleIconIcon } from "jupiter-commons/src/components/theme/icons/questionCircleIcon";
import { EditIcon } from "jupiter-commons/src/components/theme/icons/editIcon";
import { InformationIcon } from "jupiter-commons/src/components/theme/icons/informationIcon";

const SubmitAssesment = () => {
    const { register, formState, control } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    const { Panel } = Collapse;
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Submit your Assessment
            </h1>
            <p className="text-lg font-bold mt-3">
                Treatment Summary and Payment Information
            </p>
            <Row className="mt-7" gutter={15}>
                <Col span={11}>
                    <div className="flex bg-[#e4ffec] justify-between px-3 h-16 rounded-[10px]  items-center">
                        <p className="font-bold text-lg">
                            Total Amount to Be Paid
                        </p>
                        <p className="font-semibold text-lg">$ 50.00</p>
                    </div>
                    <div className="border-input border mt-3 px-4 rounded-[20px]">
                        <p className="text-start font-medium my-3 text-lg">
                            Enter Credit Card Details
                        </p>
                        <hr />
                        <FormGroup className="!mb-4 mt-4">
                            <div className="flex mb-2">
                                <p className="text-lg font-medium text-start">
                                    Cardholder's Name
                                </p>
                                <span className="text-danger">*</span>
                            </div>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "Health Card Number",
                                    placeholder: "Enter Cardholder's Name",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className=" !mb-4">
                            <div className="flex">
                                <p className="text-lg font-medium text-start">
                                    Expiry Date
                                </p>
                                <span className="text-danger">*</span>
                            </div>
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "Expiry Date",
                                    placeholder: "MM/YY",
                                    isDisableFuture: true,
                                    className: "pt-2 pb-0 !h-[38px]",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="!mb-4 mt-4">
                            <div className="flex">
                                <p className="text-lg font-medium text-start">
                                    CVV
                                </p>
                                <span className="text-danger">*</span>
                            </div>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "CVV",
                                    placeholder: "Enter CVV",
                                }}
                            />
                        </FormGroup>
                    </div>
                    <div className="flex items-center mt-3">
                        <Checkbox />
                        <p className="text-base text-start ml-3 font-medium">
                            Use shipping address as billing address
                        </p>
                    </div>
                </Col>
                <Col span={13}>
                    <div className="border-input border border-b-0 px-4 rounded-[20px]">
                        <div className="flex items-center ">
                            <p className="text-start font-bold my-3 mr-2 text-lg">
                                Assessment Fee
                            </p>
                            <QuestionCircleIconIcon />
                        </div>
                        <hr />
                        <div className="flex justify-between my-3">
                            <p className="font-bold text-lg">
                                Assessment Fee(payable now)
                            </p>
                            <p className="font-medium text-lg">$ 40.00</p>
                        </div>
                    </div>
                    {/* <div className="my-7">
                        <Space direction="vertical">
                            <Collapse
                                collapsible="header"
                                defaultActiveKey={["1"]}
                            >
                                <Panel header="Apply Promo Code" key="1">
                                    <FormGroup className="!mb-4 mt-4">
                                        <InputField
                                            {...{
                                                register,
                                                formState,
                                                id: "CVV",
                                                placeholder: "Enter promo code",
                                            }}
                                        />
                                    </FormGroup>
                                </Panel>
                            </Collapse>
                        </Space>
                    </div> */}
                    <div className="border-input border px-4 rounded-[20px] mt-7">
                        <div className="flex justify-between mt-6">
                            <p className="text-start  font-bold text-lg">
                                Treatment Summary
                            </p>
                            <div className="flex items-center cursor-pointer">
                                <EditIcon />
                                <p className="text-secondary ml-1 text-lg">
                                    Edit
                                </p>
                            </div>
                        </div>
                        <p className="font-medium text-start my-3 text-lg">
                            (Shipped every 3 months)
                        </p>
                        <hr />
                        <Row className="mt-5">
                            <Col span={4}>
                                <div className="border-input border rounded-[10px]">
                                    <img
                                        src="/images/bottle.png"
                                        height={48}
                                        width={15}
                                        className="mx-auto my-2"
                                    />
                                </div>
                            </Col>
                            <Col span={20}>
                                <div className="flex justify-between">
                                    <p className="font-medium ml-3 text-lg">
                                        Pain Formula 1
                                    </p>
                                    <p className="font-medium text-lg">
                                        $ 120.00
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col span={4}>
                                <div className="border-input border rounded-[10px]">
                                    <img
                                        src="/images/bottle.png"
                                        height={48}
                                        width={15}
                                        className="mx-auto my-2"
                                    />
                                </div>
                            </Col>
                            <Col span={20}>
                                <div className="flex justify-between">
                                    <p className="font-medium ml-3 text-lg">
                                        Pain Supplement
                                    </p>
                                    <p className="font-medium text-lg">
                                        $ 45.00
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col span={2}>
                                <InformationIcon />
                            </Col>
                            <Col span={22}>
                                <p className="text-xs text-start font-medium">
                                    1. Subject to an approved prescription. If
                                    you are prescribed a different medication
                                    for any reason, you will be notified.
                                </p>
                                <p className="text-xs text-start mt-3 font-medium">
                                    2. Any insurance or benefits coverage will
                                    be applied to the cost of your medication.
                                </p>
                            </Col>
                        </Row>
                    </div>
                    <div className="border-input border px-4 rounded-[20px] mt-6">
                        <div className="flex justify-between mt-6">
                            <p className="text-start font-bold text-lg">
                                Shipping Details
                            </p>
                            <div className="flex items-center cursor-pointer">
                                <EditIcon />
                                <p className="text-secondary ml-1 text-lg">
                                    Edit
                                </p>
                            </div>
                        </div>
                        <p className="font-medium text-start my-3 text-lg">
                            (Shipped every 3 months)
                        </p>
                        <hr />
                        <Row className="mt-4">
                            <Col span={12}>
                                <p className="font-bold text-lg text-start">
                                    Shipping Address
                                </p>
                            </Col>
                            <Col span={12} className="text-end">
                                <p className="font-medium text-lg">
                                    953 Craven Place Medicine Hat, Alberta T1A
                                    0N1
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={12}>
                                <p className="font-bold text-lg text-start">
                                    Contact Number
                                </p>
                            </Col>
                            <Col span={12} className="text-end">
                                <p className="font-medium text-lg">
                                    +1 403-581-8177
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={12}>
                                <p className="font-bold text-lg text-start">
                                    Shipping Charges
                                </p>
                            </Col>
                            <Col span={12} className="text-end">
                                <p className="font-medium text-lg">$ 25.00</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={2}>
                                <InformationIcon />
                            </Col>
                            <Col span={22}>
                                <p className="text-danger font-medium text-xs text-start">
                                    Details about what synchronizing entails.
                                    Content pending.
                                </p>
                                <p className="text-danger font-medium text-xs text-start mt-4">
                                    1. Subject to an approved prescription. If
                                    you are prescribed a different medication
                                    for any reason, you will be notified.
                                </p>
                                <p className="text-danger font-medium text-xs text-start mt-4">
                                    2. Any insurance or benefits coverage will
                                    be applied to the cost of your medication.
                                </p>
                            </Col>
                        </Row>
                    </div>
                    <div className="flex items-center mt-3">
                        <Checkbox className="mb-4" />
                        <p className="text-lg font-medium text-start ml-3">
                            Synchronize with current subscription to eliminate
                            shipping fee.
                        </p>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default SubmitAssesment;
