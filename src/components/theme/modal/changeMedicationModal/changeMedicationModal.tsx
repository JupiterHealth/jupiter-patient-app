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
import { changeMedicationAPI } from "@redux/services/assessment.api";
import {
    ChangeMedicationForminputs,
    ChangeMedicationValidationSchema,
} from "src/schemas/changeMedicationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import changeMedicationStyle from "./changeMedicationModalStyle.module.scss";

export interface ChangeMedicationModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    control: any;
    selectedAssessment?: any;
    watchFields?: any;
    setIsChangeMedicationModalOpen: (data?: any) => void;
}
const ChangeMedicationModal = (props: ChangeMedicationModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setIsChangeMedicationModalOpen,
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
        unregister,
    } = useForm<ChangeMedicationForminputs>({
        resolver: yupResolver(ChangeMedicationValidationSchema),
        defaultValues: {
            medicines: [],
        },
    });
    const [
        isLoadingChangeMedication,
        setIsLoadingChangeMedication,
    ] = useState<boolean>(false);
    const watchFields = watch();

    const [preSubmit, setPreSubmit] = useState(false);

    const submitHandler = async (values: any) => {
        setPreSubmit(true);

        try {
            if (values?.medicines?.length > 0) {
                setIsLoadingChangeMedication(true);
                let payload: any = {
                    productIds: values?.medicines,
                    changesToAssessment:
                        values?.isChangesToAssessment === "No" ? false : true,
                };
                if (values?.isChangesToAssessment === "Yes") {
                    payload = {
                        ...payload,
                        assessmentChangesDetails:
                            values?.otherDetailForAssessment,
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
                const chaneMedicationRes: any = await changeMedicationAPI(
                    selectedAssessment?.id,
                    payload,
                );
                if (chaneMedicationRes) {
                    message.success(
                        "Change medication requested successfully.",
                    );
                }
                setIsLoadingChangeMedication(false);
                setIsChangeMedicationModalOpen(false);
                onClose;
            }
            window.location.reload();
        } catch (error) {
            console.log("Error");
            setIsLoadingChangeMedication(false);
            setIsChangeMedicationModalOpen(false);
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
                <div className="text-lg md:text-2xl font-bold text-secondary m-3">
                    Change Medication
                </div>
            }
            width={700}
            open={isOpen}
            onCancel={onClose}
            className={`${changeMedicationStyle.modalContent}`}
            footer={
                <div className="flex flex-col md:flex-row justify-center mt-5 mb-8">
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
                        className="mt-5 md:mt-0 !ml-0 md:!ml-5 btn-primary rounded-[10px] !font-bold text-base min-btn-width min-btn-height antLoaderButton"
                    >
                        Change Medications
                    </Button>
                </div>
            }
            centered
        >
            <form
                id="changeMedicationForm"
                onSubmit={handleSubmit(submitHandler)}
            >
                <div
                    className={`px-6 py-5 ${changeMedicationStyle.modalScroll}`}
                >
                    <p className="font-bold text-start text-[16px]">
                        Select Medication to change
                    </p>
                    <div className="pt-6 flex flex-col justify-start">
                        <Checkbox.Group
                            className={`flex flex-col ${PainQuestionsStyle.customeCheckbox}`}
                            {...(register("medicines"), formState)}
                            options={medicationOptions}
                            onChange={(e: any) => {
                                setValue(`medicines`, e);
                            }}
                        />
                        {preSubmit &&
                            watchFields?.medicines &&
                            watchFields?.medicines?.length === 0 && (
                                <p className="text-danger text-sm">
                                    Please select atleast one medication.
                                </p>
                            )}
                    </div>

                    <p className="font-bold text-start text-[16px] pt-8">
                        Have there been any changes to the information provided
                        in the assessment regarding your condition, new medical
                        conditions, diagnosis or medications that have been
                        started?
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
                                        setValue,
                                    }}
                                />
                            </div>
                        </>
                    )}

                    <p className="font-bold text-start text-[16px] pt-6">
                        Select reason for change
                        <span className="text-danger pl-[1px]">*</span>
                    </p>
                    <div className="pt-3">
                        <SelectField
                            {...{
                                register,
                                formState,
                                id: "reasonForChange",
                                name: "reasonForChange",
                                control,
                                options: CHANGE_REASON_OPTIONS,
                                placeholder: "Enter here",
                                className: "rounded-[10px]",
                            }}
                        />
                    </div>
                    {watchFields["reasonForChange"]?.value === "Other" && (
                        <>
                            <p className="font-bold text-start text-[16px] pt-6">
                                Please enter reason below
                                <span className="text-danger pl-[1px]">*</span>
                            </p>
                            <div className="pt-3">
                                <TextAreaField
                                    {...{
                                        register,
                                        formState,
                                        id: "otherReasonText",
                                        placeholder: "Enter here",
                                        className: "w-full",
                                        setValue,
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

export default ChangeMedicationModal;
