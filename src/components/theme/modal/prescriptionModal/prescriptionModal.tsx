import { Button, Col, Modal, Row } from "antd";
import React from "react";

export interface PrescriptionModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    hasFooter?: boolean;
    setSendPrescriptionModal: (d: boolean) => void;
}
const PrescriptionModal = (props: PrescriptionModalProps) => {
    const { isOpen, onClose, setSendPrescriptionModal } = props;

    return (
        <>
            <Modal
                title={
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                        Send prescription to local pharmacy
                    </h1>
                }
                width={1050}
                open={isOpen}
                footer={
                    <div className="text-center mt-14 mb-8">
                        <Button className="font-bold text-lg h-10 rounded-[10px]">
                            Send to Local Pharmacy
                        </Button>
                        <Button
                            className="font-bold !ml-5 bg-primary text-white text-lg h-10 rounded-[10px]"
                            onClick={() => setSendPrescriptionModal(true)}
                        >
                            Proceed with Jupiter
                        </Button>
                    </div>
                }
                onCancel={onClose}
            >
                <div>
                    <p className="font-medium text-lg ">
                        Please be advised that compounded medications can only
                        be filled by a licensed compounding pharmacy (with the
                        appropriate licensing required to prepare the specific
                        medication prescribed). Not all pharmacies are capable
                        of dispensing compounded medications.
                    </p>
                    <p className="text-lg font-bold text-center my-5">
                        By choosing Jupiter’s partner pharmacy you benefit from:
                    </p>
                </div>
                <Row className="flex justify-evenly">
                    <Col span={5}>
                        <div>
                            <img
                                src="/images/ingredients.png"
                                className="mx-auto"
                            />
                            <p className="text-center text-lg font-semibold mt-4">
                                Tailored/tested formulas using high quality
                                ingredients.
                            </p>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div>
                            <img
                                src="/images/service.png"
                                className="mx-auto"
                            />
                            <p className="text-center text-lg font-semibold mt-4">
                                End to end service
                            </p>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div>
                            <img
                                src="/images/shipping-refills.png"
                                className="mx-auto"
                            />
                            <p className="text-center text-lg font-semibold mt-4">
                                Shipping with automated refills
                            </p>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div>
                            <img
                                src="/images/products.png"
                                className="mx-auto"
                            />
                            <p className="text-center text-lg font-semibold mt-4">
                                Access to complimentary products and services.
                            </p>
                        </div>
                    </Col>
                </Row>
                <p className="text-center text-lg font-medium mt-7">
                    If you choose to send your prescription to your local
                    pharmacy, we will fax them your prescription.
                </p>
            </Modal>
        </>
    );
};

export default PrescriptionModal;
