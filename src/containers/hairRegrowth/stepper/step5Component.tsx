import DeliveryAddress from "@components/checkout/deliveryAddress";
import SubmitAssesment from "@components/checkout/submitAssesment";
import UploadIdentification from "@components/checkout/uploadIdentification";
import UploadInsurer from "@components/checkout/uploadInsurer";
import React from "react";

const Step5Component = () => {
    return (
        <div className="container">
            {/* <DeliveryAddress /> */}
            {/* <UploadIdentification /> */}
            {/* <UploadInsurer /> */}
            <SubmitAssesment />
        </div>
    );
};

export default Step5Component;
