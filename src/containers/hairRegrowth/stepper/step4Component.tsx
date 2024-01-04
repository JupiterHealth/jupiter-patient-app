import HairRegrowthComplimentingSupplements from "@components/treatmentOption/hairRegrowthComplimentingSupplements";
import HairRegrowthTreatmentOptions from "@components/treatmentOption/hairRegrowthTreatmentOptions";
import TreatmentFrequency from "@components/treatmentOption/treatmentFrequency";
import { treatmentType } from "@redux/slices/assessment";

export interface Step4ComponentProps {
    activeQuestionId?: string;
    medicines: any;
    setMedicines: (d: any) => void;
    setSendPrescriptionModal: (d?: any) => void;
    selectedTreatment: treatmentType;
    setSelectedTreatment: (d: any) => any;
    register: (d: any) => any;
    formState: any;
    assessMentDetails: any;
    assessmentId: string;
    setValue?: any;
    setProduct: (d: any) => any;
    setSelectedProduct?: any;
    selectedProduct?: any;
}

const Step4Component = (props: Step4ComponentProps) => {
    const {
        activeQuestionId,
        medicines,
        setMedicines,
        setSendPrescriptionModal,
        selectedTreatment,
        setSelectedTreatment,
        register,
        formState,
        assessMentDetails,
        assessmentId,
        setValue,
        setProduct,
        setSelectedProduct,
        selectedProduct,
    } = props;

    return (
        <div>
            {activeQuestionId === "treatment-options" && (
                <HairRegrowthTreatmentOptions
                    {...{
                        selectedTreatment,
                        setSelectedTreatment,
                        formState,
                        register,
                        assessmentId,
                        setValue,
                        setProduct,
                        setSelectedProduct,
                        selectedProduct,
                        assessMentDetails,
                    }}
                />
            )}
            {activeQuestionId === "complementing-suppliments" && (
                <HairRegrowthComplimentingSupplements
                    {...{
                        selectedTreatment,
                        setSelectedTreatment,
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
    );
};

export default Step4Component;
