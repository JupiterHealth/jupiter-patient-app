import { Checkbox, Modal, message } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import {
    SelectField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PainQuestionsStyle from "../../../painManagement/painQuestionsStyle.module.scss";
import CancelRXConfirmModal from "../cancelRXConfirmModal/cancelRXConfirmModal";
import { modifyMedicationAPI } from "@redux/services/assessment.api";
import {
    CancleMedicationFormInputs,
    CancleMedicationValidationSchema,
} from "src/schemas/modifyMedicationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import CancleRXStyles from "./cancelRXModalStyles.module.scss";

export interface CancelRXModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    selectedAssessment?: any;
    setIsCancelRXModalOpen: (d?: any) => void;
}

const CancelRXModal = (props: CancelRXModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setIsCancelRXModalOpen,
    } = props;
    const {
        formState,
        register,
        control,
        watch,
        setValue,
        handleSubmit,
    } = useForm<CancleMedicationFormInputs>({
        defaultValues: {
            medicines: [],
        },
        resolver: yupResolver(CancleMedicationValidationSchema),
    });
    const watchFields = watch();
    const [
        isCancelRXConfirmModalOpen,
        setIsCancelRXConfirmModalOpen,
    ] = useState(false);
    const [
        isLoadingCancleMedication,
        setIsLoadingCancleMedication,
    ] = useState<boolean>(false);

    const [medicationOptions, setMedicationOptions] = useState<any>([]);
    const [preSubmit, setPreSubmit] = useState(false);

    const submitHandler = async (values: any) => {
        setPreSubmit(true);
        try {
            if (values?.medicines?.length > 0) {
                const payload: any = {
                    type: "CANCLE",
                    productIds: values?.medicines,
                };
                let response: any = {};
                if (values?.reasonForCancel) {
                    if (values?.reasonForCancel?.value !== "Other") {
                        response = {
                            ...response,
                            reason: values?.reasonForCancel?.value,
                        };
                    } else {
                        response = {
                            ...response,
                            reason: values?.otherReasonText,
                        };
                    }
                }
                setIsLoadingCancleMedication(true);

                const chaneMedicationRes: any = await modifyMedicationAPI({
                    payload: { ...payload, response: [response] },
                });
                if (chaneMedicationRes) {
                    message.success(
                        "Cancel medication requested successfully.",
                    );
                }
                setIsLoadingCancleMedication(false);
                setIsCancelRXModalOpen(false);
                onClose;
            }
        } catch (error) {
            console.log("Error");
            setIsLoadingCancleMedication(false);
            onClose;
        }
    };

    useEffect(() => {
        if (selectedAssessment) {
            const updatedMedications = [selectedAssessment["drg"]]?.map(
                (product: any) => {
                    return {
                        label: product?.brName,
                        value: {
                            productId: product?.id,
                            productName: product?.brName,
                        },
                    };
                },
            );
            setMedicationOptions(updatedMedications);
        }
    }, [selectedAssessment]);

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
                <p className="text-lg md:text-2xl text-secondary font-bold">
                    Cancel Medication
                </p>
            }
            width={650}
            centered
            maskClosable={false}
            open={isOpen}
            onCancel={onClose}
            footer={
                <div className="flex flex-col md:flex-row justify-center mt-5 mb-8">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            !watchFields?.medicines[0]?.productName ||
                            !watchFields["reasonForCancel"] ||
                            (watchFields["reasonForCancel"]?.value ===
                                "Other" &&
                                (!watchFields["otherReasonText"] ||
                                    watchFields["otherReasonText"].trim() ===
                                        ""))
                        }
                        className={`!ml-0 md:!ml-5 mt-5 md:mt-0 btn-primary antLoaderButton ${CancleRXStyles.disableButton}`}
                        onClick={() => {
                            setIsCancelRXConfirmModalOpen(true);
                        }}
                    >
                        Cancel Medication
                    </Button>
                </div>
            }
        >
            <form id="cancleRxForm" onSubmit={handleSubmit(submitHandler)}>
                {" "}
                <div className="p-3">
                    <p className="font-bold text-start text-[16px]">
                        Select Medication to Cancle
                        <span className="text-danger">*</span>
                    </p>
                    <div className="pt-6 flex flex-col justify-start">
                        <Checkbox.Group
                            className={`flex flex-col ${PainQuestionsStyle.customeCheckbox} ${CancleRXStyles.cancelCheckbox}`}
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
                        Select reason for cancellation
                        <span className="text-danger pl-[1px]">*</span>
                    </p>
                    <div className="pt-4 pb-6">
                        <SelectField
                            {...{
                                register,
                                formState,
                                id: "reasonForCancel",
                                name: "reasonForCancel",
                                control,
                                options: CHANGE_REASON_OPTIONS,
                                placeholder: "Enter here",
                                className: "rounded-[10px] ",
                            }}
                        />
                    </div>
                    {watchFields["reasonForCancel"]?.value === "Other" && (
                        <>
                            {" "}
                            <p className="font-bold text-start text-[16px]">
                                Please enter reason below
                                <span className="text-danger pl-[1px]">*</span>
                            </p>
                            <div className="pt-4">
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
                {isCancelRXConfirmModalOpen && (
                    <CancelRXConfirmModal
                        isOpen={isCancelRXConfirmModalOpen}
                        onClose={() => {
                            setIsCancelRXConfirmModalOpen(false);
                        }}
                        isLoadingCancleMedication={isLoadingCancleMedication}
                    />
                )}
            </form>
        </Modal>
    );
};

export default CancelRXModal;
