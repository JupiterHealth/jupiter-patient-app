import ComplimentingSupplements from "@components/treatmentOption/complimentingSupplements";
import TreatmentFrequency from "@components/treatmentOption/treatmentFrequency";
import TreatmentOption from "@components/treatmentOption/treatmentOption";
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
    } = props;
    return (
        <div>
            {activeQuestionId === "treatment-options" && (
                <TreatmentOption
                    {...{
                        selectedTreatment,
                        setSelectedTreatment,
                        assessMentDetails,
                        formState,
                        register,
                        assessmentId,
                        setValue,
                        setProduct,
                    }}
                />
            )}
            {activeQuestionId === "complementing-suppliments" && (
                <ComplimentingSupplements
                    {...{
                        selectedTreatment,
                        setSelectedTreatment,
                        assessMentDetails,
                        assessmentId,
                    }}
                />
            )}
            {/* <AcneTreatmentOption /> */}
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
