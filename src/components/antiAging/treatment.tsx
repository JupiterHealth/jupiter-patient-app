import React from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { checkboxSchema } from "src/schemas/checkboxSchema";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const Treatment = () => {
    const { register, formState } = useForm<checkboxSchema>();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Anti-aging treatments
            </h1>
            <div className="border mt-14 rounded-[10px]">
                <div className="flex items-center ml-4 my-4">
                    <CheckBoxField
                        {...{
                            register,
                            formState,
                            name: "one",
                            id: "one",
                            type: "Checkbox",
                        }}
                    />
                    <h1 className="text-[22px] text-start ml-3 font-semibold">
                        Product Name Comes Here
                    </h1>
                </div>
                <Row className="ml-4 mt-5">
                    <Col span={5}>
                        <div className="border flex justify-center rounded-[10px]">
                            <img src="/images/bottle.png" className="my-4" />
                        </div>
                    </Col>
                    <Col span={19}>
                        <div className="text-start ml-3">
                            <p className="font-medium text-lg">
                                <span className="font-semibold text-lg">
                                    250 ml
                                </span>
                                | Use weekly as needed or as described by the
                                physician.
                            </p>
                            <p className="font-bold text-lg mt-3">
                                Description of the Product
                            </p>
                            <div className="flex items-center mt-2">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    Good for receding hairlines, patches, and
                                    thinning.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    1 daily pill for finasteride.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    Apply minoxidil serum straight to skin for
                                    regrowth.
                                </p>
                            </div>
                            <h1 className="text-success mr-4 mt-5 font-bold text-2xl">
                                <span className="text-secondary font-bold mr-2 text-2xl">
                                    $27
                                </span>
                                (10% OFF)
                            </h1>
                        </div>
                    </Col>
                </Row>
                <div className="bg-[#e7f0fa] mx-4 rounded-[10px] my-4 p-3">
                    <div className="flex mt-2">
                        <div className="bg-secondary w-2 mr-4 mt-1 h-2 rounded"></div>
                        <p className="font-medium text-xs text-start">
                            Jupiter's Anti-aging treatments are custom
                            formulated using pharmaceutical grade ingredients
                            and are only available through Jupiter partner
                            pharmacy.
                        </p>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                        <p className="font-medium text-xs">
                            A Pharmacist will review your assessment and approve
                            your treatment if appropriate.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border mt-7 rounded-[10px]">
                <div className="flex items-center ml-4 my-2">
                    <CheckBoxField
                        {...{
                            register,
                            formState,
                            name: "one",
                            id: "one",
                            type: "Checkbox",
                        }}
                    />
                    <h1 className="text-[22px] text-start ml-3 font-semibold">
                        Product Name Comes Here
                    </h1>
                </div>
                <Row className="ml-4 mt-7">
                    <Col span={5}>
                        <div className="border flex justify-center rounded-[10px]">
                            <img src="/images/bottle.png" className="my-4" />
                        </div>
                    </Col>
                    <Col span={19}>
                        <div className="text-start ml-3">
                            <p className="font-medium text-lg">
                                <span className="font-semibold text-lg">
                                    250 ml
                                </span>
                                | Use weekly as needed or as described by the
                                physician.
                            </p>
                            <p className="font-bold text-lg mt-3">
                                Description of the Product
                            </p>
                            <div className="flex items-center mt-2">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    Good for receding hairlines, patches, and
                                    thinning.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    1 daily pill for finasteride.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                                <p className="font-medium text-lg">
                                    Apply minoxidil serum straight to skin for
                                    regrowth.
                                </p>
                            </div>
                            <h1 className="text-success mr-4 mt-5 font-bold text-2xl">
                                <span className="text-secondary font-bold mr-2 text-2xl">
                                    $27
                                </span>
                                (10% OFF)
                            </h1>
                        </div>
                    </Col>
                </Row>
                <div className="bg-[#e7f0fa] mx-4 rounded-[10px] my-4 p-3">
                    <div className="flex mt-2">
                        <div className="bg-secondary w-2 mr-4 mt-1 h-2 rounded"></div>
                        <p className="font-medium text-xs text-start">
                            Jupiter's Anti-aging treatments are custom
                            formulated using pharmaceutical grade ingredients
                            and are only available through Jupiter partner
                            pharmacy.
                        </p>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                        <p className="font-medium text-xs">
                            A Pharmacist will review your assessment and approve
                            your treatment if appropriate.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Treatment;
