import React, { useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import router from "next/router";
import { treatmentAPI } from "@redux/services/assessment.api";
import SendPrescriptionToLocalStyles from "./SendPrescriptionToLocalStyles.module.scss";

interface SendPrescriptionToLocalModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    setSendToLocalPharmacyModal: (d: boolean) => void;
    setSendPrescriptionModal: (d: boolean) => void;
    setCurrent: (d: any) => void;
    assessmentId: string;
}

const SendPrescriptionToLocalModal = (
    props: SendPrescriptionToLocalModalProps,
) => {
    const {
        isOpen,
        onClose,
        setSendToLocalPharmacyModal,
        setSendPrescriptionModal,
        setCurrent,
        assessmentId,
    } = props;
    const [loading, setLoading] = useState(false);

    const onClickProceedWithJupiterhandler = async () => {
        try {
            setLoading(true);
            const treatmentResponse = await treatmentAPI(
                {
                    deliveryFrequency: "1",
                    hasLocalPharmacy: false,
                },
                assessmentId,
            );
            setLoading(false);
            setSendPrescriptionModal(false);
            router.query.activeQuestionId = "delivery-address";
            router.push(router);
            setCurrent(4);
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };
    return (
        <Modal
            title={
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                    Send prescription to local pharmacy
                </h1>
            }
            width={1050}
            open={isOpen}
            footer={
                <div className="text-center flex !flex-col md:!flex-row items-center justify-center mt-8 mb-8">
                    <Button
                        className={`btn-primary md:mt-0 order-1 md:order-2 !ml-0 md:!ml-5 !min-w-[235px] min-btn-height rounded-[10px] antLoaderButton  ${SendPrescriptionToLocalStyles.disableButton}`}
                        loading={loading}
                        onClick={() => {
                            onClickProceedWithJupiterhandler();
                        }}
                    >
                        Proceed with Jupiter
                    </Button>
                    <Button
                        className="font-bold mt-5 md:mt-0 order-2 md:order-1 !ml-0 md:!ml-5 text-base rounded-[10px] border-light-black min-btn-width min-btn-height antLoaderButton"
                        disabled={loading}
                        onClick={() => {
                            setSendToLocalPharmacyModal(true);
                            setSendPrescriptionModal(false);
                        }}
                    >
                        Send to Local Pharmacy
                    </Button>
                </div>
            }
            onCancel={onClose}
            centered
        >
            <div>
                <p className="font-medium text-sm md:text-base pt-4">
                    Please be advised that compounded medications can only be
                    filled by a licensed compounding pharmacy (with the
                    appropriate licensing required to prepare the specific
                    medication prescribed). Not all pharmacies are capable of
                    dispensing compounded medications.
                </p>
                <p className="text-base font-bold text-left lg:text-center my-9">
                    By choosing Jupiter’s partner pharmacy you benefit from:
                </p>
            </div>
            <div>
                <Row className="flex flex-col md:flex-row justify-center md:justify-evenly">
                    <Col span={24} md={5}>
                        <div
                            className={`flex items-start md:block ${SendPrescriptionToLocalStyles.landscapeView}`}
                        >
                            <img
                                src="/images/ingredients.png"
                                className="mx-auto w-[80px] h-[80px] lg:w-auto lg:h-auto"
                            />
                            <p className="text-left md:text-center text-base font-semibold lg:mt-2 md:mt-4 ml-3 lg:ml-[-18px]">
                                Tested formulas using high quality ingredients
                            </p>
                        </div>
                    </Col>
                    <Col span={24} md={5} className={`mt-8 md:mt-0`}>
                        <div
                            className={`flex items-start md:block ${SendPrescriptionToLocalStyles.landscapeView}`}
                        >
                            <img
                                src="/images/service.png"
                                className="mx-auto w-[80px] h-[80px] lg:w-auto lg:h-auto"
                            />
                            <p className="text-left md:text-center text-base font-semibold lg:mt-2 md:mt-4 ml-3 lg:ml-[-18px]">
                                End to end service with competitive pricing
                            </p>
                        </div>
                    </Col>
                    <Col span={24} md={5} className={`mt-8 md:mt-0`}>
                        <div
                            className={`flex items-start md:block ${SendPrescriptionToLocalStyles.landscapeView}`}
                        >
                            <img
                                src="/images/shipping-refills.png"
                                className="mx-auto w-[80px] h-[80px] lg:w-auto lg:h-auto"
                            />
                            <p className="text-left md:text-center text-base font-semibold lg:mt-2 md:mt-4 ml-3 lg:ml-[-18px]">
                                Free shipping with automated refills
                            </p>
                        </div>
                    </Col>
                    <Col span={24} md={5} className={`mt-8 md:mt-0`}>
                        <div
                            className={`flex items-start md:block ${SendPrescriptionToLocalStyles.landscapeView}`}
                        >
                            <img
                                src="/images/products.png"
                                className="mx-auto w-[80px] h-[80px] lg:w-auto lg:h-auto"
                            />
                            <p className="text-left md:text-center text-base font-semibold lg:mt-2 md:mt-4 ml-3 lg:ml-[-18px]">
                                Access to complimentary products and services
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
            <p className="text-left text-sm md:text-base font-medium mt-7">
                If you choose to send your prescription to your local pharmacy,
                we will fax them your prescription.
            </p>
            <p className="text-left text-sm md:text-base font-medium mt-2">
                It’s important to note that medication pricing and availability
                depend on the pharmacy you choose. The pricing shown is specific
                to Jupiter affiliated pharmacies.
            </p>
        </Modal>
    );
};

export default SendPrescriptionToLocalModal;
