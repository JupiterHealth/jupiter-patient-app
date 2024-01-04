import React from "react";
import TreatmentFrequency from "@components/treatmentOption/treatmentFrequency";
import { treatmentType } from "@redux/slices/assessment";
import DermatologyTreatmentOption from "@components/treatmentOption/dermatologyTreatmentOption";
import DermatologyComplementingSupplements from "@components/treatmentOption/dermatologyComplementingSupplements";

export interface Step4ComponentProps {
    activeQuestionId?: string;
    setSendPrescriptionModal: (d?: any) => void;
    selectedTreatment: treatmentType;
    setSelectedTreatment: (d: any) => any;
    register: (d: any) => any;
    formState: any;
    assessMentDetails: any;
    assessmentId: string;
    setValue?: any;
    setProduct: (d: any) => any;
    setSelectedProduct: (d: any) => void;
    selectedProduct: treatmentType;
}

const Step4Component = (props: Step4ComponentProps) => {
    const {
        activeQuestionId,
        setSelectedProduct,
        setSendPrescriptionModal,
        selectedTreatment,
        setSelectedTreatment,
        register,
        formState,
        assessMentDetails,
        assessmentId,
        setValue,
        setProduct,
        selectedProduct,
    } = props;

    return (
        <>
            <div>
                {activeQuestionId === "treatment-options" && (
                    <DermatologyTreatmentOption
                        {...{
                            selectedTreatment,
                            setSelectedTreatment,
                            assessMentDetails,
                            formState,
                            register,
                            assessmentId,
                            setValue,
                            setProduct,
                            setSelectedProduct,
                            selectedProduct,
                        }}
                    />
                )}
                {activeQuestionId === "complementing-suppliments" && (
                    <DermatologyComplementingSupplements
                        {...{
                            selectedTreatment,
                            setSelectedTreatment,
                            assessMentDetails,
                            assessmentId,
                        }}
                    />
                )}
                {activeQuestionId === "treatment-frequency" && (
                    <TreatmentFrequency
                        {...{
                            setSendPrescriptionModal,
                            register,
                            formState,
                            assessMentDetails,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Step4Component;
