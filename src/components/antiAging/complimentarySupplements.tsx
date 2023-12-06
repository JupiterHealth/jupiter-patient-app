import React from "react";
import { Button, Col, Row } from "antd";

const ComplimentarySupplements = () => {
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Add-on Treatments
            </h1>
            <p className="text-lg font-bold mt-3">
                The following supplements compliment your prescription hair
                treatment – option to add to your subscription. These products
                will be bundled and shipped with your prescription medication.
            </p>
            <h1 className="text-2xl mt-14 font-bold text-[#875CC8]">
                Complimentary supplements
            </h1>
            <div className="border mt-7 rounded-[10px]">
                <div className="flex items-center ml-4 my-2">
                    <h1 className="text-[22px] text-start font-semibold">
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
                            <div className="flex justify-between mt-5 text-lg text-danger font-bold">
                                <h1 className="text-success mr-4 font-bold text-2xl">
                                    <span className="text-secondary font-bold mr-2 text-2xl">
                                        $27
                                    </span>
                                    (10% OFF)
                                </h1>
                                <div className="flex items-center mx-4">
                                    <p className="underline mr-4 cursor-pointer">
                                        REMOVE
                                    </p>
                                    <Button className="bg-success items-center flex h-10 text-white text-lg font-semibold rounded-[10px]">
                                        Added to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="bg-[#e7f0fa] mx-4 rounded-[10px] my-4 p-3">
                    <div className="flex items-center">
                        <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                        <p className="font-medium text-xs opacity-100">
                            The following supplements compliment your
                            prescription hair treatment – option to add to your
                            subscription.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border mt-7 rounded-[10px]">
                <div className="flex items-center ml-4 my-2">
                    <h1 className="text-[22px] text-start font-semibold">
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
                            <div className="flex justify-between mt-5 text-lg text-danger font-bold">
                                <h1 className="text-success mr-4 font-bold text-2xl">
                                    <span className="text-secondary font-bold mr-2 text-2xl">
                                        $27
                                    </span>
                                    (10% OFF)
                                </h1>
                                <div className="flex items-center mx-4">
                                    <Button className="bg-primary items-center flex h-10 text-white text-lg font-semibold rounded-[10px]">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="bg-[#e7f0fa] mx-4 rounded-[10px] my-4 p-3">
                    <div className="flex items-center">
                        <div className="bg-secondary w-2 mr-4 h-2 rounded"></div>
                        <p className="font-medium text-xs opacity-100">
                            The following supplements compliment your
                            prescription hair treatment – option to add to your
                            subscription.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComplimentarySupplements;
