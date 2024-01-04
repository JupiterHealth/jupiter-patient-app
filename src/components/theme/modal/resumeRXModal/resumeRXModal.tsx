import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Modal, message } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import {
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ResumeMedicationFormInputs,
    ResumeMedicationValidationSchema,
} from "src/schemas/modifyMedicationSchema";
import PainQuestionsStyle from "../../../painManagement/painQuestionsStyle.module.scss";
import { modifyMedicationAPI } from "@redux/services/assessment.api";
import ResumeMedicationStyles from "../cancelRXModal/cancelRXModalStyles.module.scss";

export interface ResumeRXModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    selectedAssessment?: any;
    setIsResumeRXModalOpen: (data: any) => void;
}

const ResumeRXModal = (props: ResumeRXModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setIsResumeRXModalOpen,
    } = props;
    const {
        formState,
        register,
        setValue,
        watch,
        handleSubmit,
    } = useForm<ResumeMedicationFormInputs>({
        defaultValues: {
            medicines: [],
        },
        resolver: yupResolver(ResumeMedicationValidationSchema),
    });
    const [
        isLoadingResumeMedication,
        setIsLoadingResumeMedication,
    ] = useState<boolean>(false);
    const watchFields = watch();

    const [medicationOptions, setMedicationOptions] = useState<any>([]);
    const [preSubmit, setPreSubmit] = useState(false);

    const submitHandler = async (values: any) => {
        setPreSubmit(true);
        try {
            if (values?.medicines?.length > 0) {
                const payload: any = {
                    type: "RESUME",
                    productIds: values?.medicines,
                    response: [{ reason: values?.reason }],
                };
                setIsLoadingResumeMedication(true);

                const resumeMedicationRes: any = await modifyMedicationAPI({
                    payload,
                });
                if (resumeMedicationRes) {
                    message.success(
                        "Resume medication requested successfully.",
                    );
                }
                setIsLoadingResumeMedication(false);
                setIsResumeRXModalOpen(false);
                onClose;
            }
        } catch (error) {
            console.log("Error");
            setIsLoadingResumeMedication(false);
            onClose;
        }
    };

    useEffect(() => {
        if (selectedAssessment) {
            const medicationData: any =
                selectedAssessment["drg"] === null
                    ? selectedAssessment["drgMix"]
                    : selectedAssessment["drg"];
            const updatedMedications = [
                {
                    label: medicationData?.brName
                        ? medicationData?.brName
                        : medicationData?.description,
                    value: {
                        productId: medicationData?.id,
                        productName: medicationData?.brName
                            ? medicationData?.brName
                            : medicationData?.description,
                    },
                },
            ];
            setMedicationOptions(updatedMedications);
        }
    }, [selectedAssessment]);

    return (
        <Modal
            title={
                <p className="text-2xl text-secondary font-bold">
                    Resume Medication
                </p>
            }
            width={650}
            centered
            maskClosable={false}
            open={isOpen}
            onCancel={onClose}
            footer={
                <div className="flex flex-col md:flex-row justify-center mt-2 mb-4">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        loading={isLoadingResumeMedication}
                        disabled={!watchFields["isChangesToAssessment"]}
                        form="resumeMedicationForm"
                        className={`!ml-0 md:!ml-5 mt-5 md:mt-0 btn-primary antLoaderButton ${ResumeMedicationStyles.disableButton}`}
                    >
                        Submit for Reassessment
                    </Button>
                </div>
            }
        >
            <form
                id="resumeMedicationForm"
                onSubmit={handleSubmit(submitHandler)}
            >
                <div className="p-3">
                    <p className="font-bold text-start text-[16px]">
                        Select Medication to Resume
                        <span className="text-danger pl-[1px]">*</span>
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

                    <p className="font-bold text-start text-[16px] pt-5">
                        Are there any changes to assessment information, medical
                        condition, new diagnosis or new medications that have
                        been started? <span className="text-danger">*</span>
                    </p>
                    <div className="flex flex-wrap mx-[7px] pt-3 md:pt-5">
                        <div className="flex justify-start">
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
                        <div className="mx-6 flex justify-start">
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
                            <p className="font-bold text-start text-[16px] pt-5">
                                Please enter details below
                                <span className="text-danger pl-[1px]">*</span>
                            </p>
                            <div className="pt-2 md:pt-4">
                                <TextAreaField
                                    {...{
                                        register,
                                        formState,
                                        id: "reason",
                                        name: "reason",
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

export default ResumeRXModal;
