import { Button, Checkbox, Modal, message } from "antd";
import {
    InputRadioField,
    SelectField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import PainQuestionsStyle from "../../../painManagement/painQuestionsStyle.module.scss";
import { useEffect, useState } from "react";
import {
    convertToTitleCase,
    convertToTitleCaseAndRemoveUnderscore,
} from "jupiter-commons/src/components/libs/helpers";
import {
    changeMedicationAPI,
    renewMedicationAPI,
} from "@redux/services/assessment.api";
export interface ChangeMedicationModalProps {
    isOpen?: boolean;
    register: any;
    formState: any;
    onClose?: (data?: any) => void;
    control: any;
    selectedAssessment?: any;
    setIsRenewPrescriptionModalOpen: (data?: any) => void;
}
const RenewPrescriptionModal = (props: ChangeMedicationModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setIsRenewPrescriptionModalOpen,
    } = props;

    const [medicationOptions, setMedicationOptions] = useState([]);

    const { assessmentHasTreatmentProduct: medications } = selectedAssessment;

    useEffect(() => {
        if (selectedAssessment && medications) {
            const updatedMedications = medications
                ?.filter((a: any) => !a?.isLinkSupplements)
                .map((product: any) => {
                    return {
                        label: `${product?.name}-${
                            product?.activeIngredients[0] ?? ""
                        }${" "}${convertToTitleCase(
                            product?.form,
                        )} (${convertToTitleCaseAndRemoveUnderscore(
                            product?.selectAvailability,
                        )})`,
                        value: {
                            productId: product?.productId,
                            productName: `${product?.name}-${
                                product?.activeIngredients[0] ?? ""
                            }${" "}${convertToTitleCase(
                                product?.form,
                            )} (${convertToTitleCaseAndRemoveUnderscore(
                                product?.selectAvailability,
                            )})`,
                        },
                    };
                });
            setMedicationOptions(updatedMedications);
        }
    }, [selectedAssessment]);

    const {
        formState,
        register,
        control,
        watch,
        setValue,
        handleSubmit,
    } = useForm<any>({
        defaultValues: {
            medicines: [],
        },
    });
    const [
        isLoadingChangeMedication,
        setIsLoadingChangeMedication,
    ] = useState<boolean>(false);
    const watchFields = watch();

    const submitHandler = async (values: any) => {
        try {
            setIsLoadingChangeMedication(true);
            let payload: any = {
                productIds: values?.medicines,
                changesToAssessment:
                    values?.isChangesToAssessment === "No" ? false : true,
            };
            if (values?.isChangesToAssessment === "Yes") {
                payload = {
                    ...payload,
                    assessmentChangesDetails: values?.otherDetailForAssessment,
                };
            }
            if (values?.reasonForChange) {
                if (values?.reasonForChange?.value !== "Other") {
                    payload = {
                        ...payload,
                        reason: values?.reasonForChange?.value,
                    };
                } else {
                    payload = {
                        ...payload,
                        reason: values?.otherReasonText,
                    };
                }
            }
            const chaneMedicationRes: any = await renewMedicationAPI(
                selectedAssessment?.id,
                payload,
            );
            if (chaneMedicationRes) {
                message.success("Renew prescription requested successfully.");
            }
            setIsLoadingChangeMedication(false);
            setIsRenewPrescriptionModalOpen(false);
            onClose;
        } catch (error) {
            console.log("Error");
            setIsLoadingChangeMedication(false);
            setIsRenewPrescriptionModalOpen(false);
            onClose;
        }
    };

    const CHANGE_REASON_OPTIONS = [
        {
            label: "Treatment is not as effective as I would like",
            value: "Treatment is not as effective as I would like",
        },
        {
            label: "Treatment is causing side effects",
            value: "Treatment is causing side effects",
        },
        {
            label: "My condition has improved",
            value: "My condition has improved",
        },
        {
            label: "The medication is too expensive",
            value: "The medication is too expensive",
        },
        {
            label: "Other",
            value: "Other",
        },
    ];

    return (
        <Modal
            title={
                <div className="text-2xl font-bold text-secondary m-3">
                    Renew Prescription
                </div>
            }
            width={700}
            open={isOpen}
            onCancel={onClose}
            footer={
                <div className="flex justify-center mt-5 mb-8">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        loading={isLoadingChangeMedication}
                        form="changeMedicationForm"
                        className="!ml-5 btn-primary rounded-[10px] !font-bold text-base min-btn-width min-btn-height"
                    >
                        Renew Prescription
                    </Button>
                </div>
            }
            centered
        >
            <form
                id="changeMedicationForm"
                onSubmit={handleSubmit(submitHandler)}
            >
                <div className="p-3">
                    <p className="font-bold text-start text-[16px]">
                        Select Medication eligible for renewal
                    </p>
                    <div className="pt-6 flex flex-col justify-start">
                        <Checkbox.Group
                            className={`flex flex-col ${PainQuestionsStyle.customeCheckbox}`}
                            {...(register("medicines"), formState)}
                            options={medicationOptions}
                            onChange={(e: any) => {
                                setValue(`medicines`, e);
                            }}
                            // defaultValue={["med1", "med2"]}
                        />
                        {/* {watchFields?.medicines &&
                            watchFields?.medicines.length === 0 && (
                                <p className="text-danger text-sm">
                                    Please select atleast one medication.
                                </p>
                            )} */}
                    </div>

                    <p className="font-bold text-start text-[16px] pt-8">
                        Are there any changes to assessment information, medical
                        condition, new diagnosis or new medications that have
                        been started?
                    </p>
                    <div className="flex mx-[7px]">
                        <div className="pt-4 flex justify-start">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "Yes",
                                    name: "isChangesToAssessment",
                                    value: "Yes",
                                    label: "Yes",
                                    className: "w-[18px] h-[18px]",
                                }}
                            />
                        </div>
                        <div className=" mx-6 pt-4 flex justify-start">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "No",
                                    label: "No",
                                    name: "isChangesToAssessment",
                                    value: "No",
                                    className: "w-[18px] h-[18px]",
                                }}
                            />
                        </div>
                    </div>
                    {watchFields["isChangesToAssessment"] === "Yes" && (
                        <>
                            <p className="font-bold text-start text-[16px] pt-10">
                                Please enter details below
                                <span className="text-danger">*</span>
                            </p>
                            <div className="pt-4">
                                <TextAreaField
                                    {...{
                                        register,
                                        formState,
                                        id: "otherDetailForAssessment",
                                        placeholder: "Enter here",
                                        className: "w-full",
                                    }}
                                />
                            </div>
                        </>
                    )}

                    <p className="font-bold text-start text-[16px] pt-8">
                        Select reason for change
                    </p>
                    <div className="pt-4">
                        <SelectField
                            {...{
                                register,
                                formState,
                                id: "reasonForChange",
                                name: "reasonForChange",
                                control,
                                options: CHANGE_REASON_OPTIONS,
                                placeholder: "Enter here",
                                className: "rounded-[10px] pb-10",
                            }}
                        />
                    </div>
                    {watchFields["reasonForChange"]?.value === "Other" && (
                        <>
                            {" "}
                            <p className="font-bold text-start text-[16px]">
                                Please enter reason below
                            </p>
                            <div className="pt-4">
                                <TextAreaField
                                    {...{
                                        register,
                                        formState,
                                        id: "otherReasonText",
                                        placeholder: "Enter here",
                                        className: "w-full",
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default RenewPrescriptionModal;
