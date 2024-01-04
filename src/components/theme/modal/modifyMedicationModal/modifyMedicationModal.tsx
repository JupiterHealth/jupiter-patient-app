import { Checkbox, Modal, message } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import {
    CheckBoxField,
    InputDateField,
    InputRadioField,
    SelectField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ModifyMedicationFormInputs,
    ModifyeMedicationValidationSchema,
} from "src/schemas/modifyMedicationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyMedicationAPI } from "@redux/services/assessment.api";
import PainQuestionsStyle from "../../../painManagement/painQuestionsStyle.module.scss";
import ModifyMedicationStyles from "./modifyMedicationStyles.module.scss";

export interface ModifyMedicationModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    selectedAssessment?: any;
    setIsModifyModalOpen: (data: any) => void;
}

const ModifyMedicationModal = (props: ModifyMedicationModalProps) => {
    const { isOpen, onClose, selectedAssessment, setIsModifyModalOpen } = props;
    const {
        formState,
        register,
        control,
        watch,
        setValue,
        handleSubmit,
    } = useForm<ModifyMedicationFormInputs>({
        defaultValues: {
            medicines: [],
        },
        resolver: yupResolver(ModifyeMedicationValidationSchema),
    });
    const watchFields = watch();

    const [preSubmit, setPreSubmit] = useState(false);
    const [
        isLoadingModifyMedication,
        setIsLoadingChangeMedication,
    ] = useState<boolean>(false);

    const [medicationOptions, setMedicationOptions] = useState<any>([]);

    const submitHandler = async (values: any) => {
        setPreSubmit(true);
        try {
            if (values?.medicines?.length > 0) {
                setIsLoadingChangeMedication(true);
                const payload: any = {
                    type: "MODIFY",
                    productIds: values?.medicines,
                };
                let response: any = {
                    changesToAssessment:
                        values?.isChangesToAssessment === "No" ? false : true,
                };

                if (values?.isChangesToAssessment === "Yes") {
                    response = {
                        ...response,
                        assessmentChangesDetails:
                            values?.otherDetailForAssessment,
                    };
                }
                if (values?.isSelectEarlyRefill) {
                    response = {
                        ...response,
                        refillDate: values?.date,
                    };
                }
                if (values?.isSelectRefillFrequency) {
                    response = {
                        ...response,
                        refillFrequency: values?.frequency,
                    };
                }
                if (values?.isSelectRefillQuantity) {
                    response = {
                        ...response,
                        refillQuantity: values?.quantity?.value,
                    };
                }

                const modifyMedicationRes: any = await modifyMedicationAPI({
                    payload: { ...payload, response: [response] },
                });
                if (modifyMedicationRes) {
                    message.success(
                        "Modify medication requested successfully.",
                    );
                }
                setIsLoadingChangeMedication(false);
                setIsModifyModalOpen(false);
                onClose;
            }
        } catch (error) {
            console.log("Error");
            setIsLoadingChangeMedication(false);
            setIsModifyModalOpen(false);
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

    const CHANGE_REQUEST_OPTIONS = [
        {
            label: "200 g",
            value: "200 g",
        },
        {
            label: "150 g",
            value: "150 g",
        },
        {
            label: "100 g",
            value: "100 g",
        },
        {
            label: "50 g",
            value: "50 g",
        },
    ];

    return (
        <Modal
            title={
                <p className="text-2xl text-secondary font-bold">
                    Modify Medication
                </p>
            }
            width={700}
            centered
            maskClosable={false}
            open={isOpen}
            className={ModifyMedicationStyles.modalContent}
            onCancel={onClose}
            footer={
                <div className="flex flex-col md:flex-row justify-center mt-5 mb-5">
                    <Button
                        className="font-bold text-base rounded-[10px] border-light-black min-btn-width min-btn-height"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        disabled={
                            !watchFields["isSelectEarlyRefill"] &&
                            !watchFields["isSelectRefillFrequency"] &&
                            !watchFields["isSelectRefillQuantity"]
                        }
                        loading={isLoadingModifyMedication}
                        form="modifyMedicationForm"
                        className={`mt-5 md:mt-0 !ml-0 md:!ml-5 btn-primary antLoaderButton ${ModifyMedicationStyles.disableButton}`}
                    >
                        Submit Request
                    </Button>
                </div>
            }
        >
            <form
                id="modifyMedicationForm"
                onSubmit={handleSubmit(submitHandler)}
            >
                <div
                    className={`px-5 md:px-8 pb-6 py-5 ${ModifyMedicationStyles.modifyModalScroll}`}
                >
                    <p className="font-bold text-start text-[16px]">
                        Select Medication to Modify
                        <span className="text-danger">*</span>
                    </p>
                    <div className="pt-5 flex flex-col justify-start">
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
                    <div className="flex mx-[7px] pt-6 md:pt-5">
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
                            <p className="font-bold text-start text-[16px] pt-4">
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

                    {/* // EARLY REFILL COMPONENT */}
                    <div className="mt-6 flex flex-wrap justify-start items-center">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                id: "isSelectEarlyRefill",
                                name: "isSelectEarlyRefill",
                                onChange: (e: any) => {
                                    setValue(
                                        "isSelectEarlyRefill",
                                        e?.target.checked,
                                    );
                                    if (!e?.target.checked) {
                                        setValue("isSelectEarlyRefill", false);
                                    }
                                },
                                className: "w-[18px] h-[18px] mr-2 md:mr-0",
                            }}
                        />
                        <div
                            className={`font-bold text-start text-[16px] pl-2 ${ModifyMedicationStyles.requestCheck}`}
                        >
                            Request an early refill
                        </div>
                    </div>
                    {watchFields["isSelectEarlyRefill"] && (
                        <div className="pt-2 pl-7">
                            <p className="font-medium text-start text-[16px] ">
                                Refill date request
                                <span className="text-danger pl-[1px]">*</span>
                            </p>
                            <div
                                className={`flex pt-3 !w-full ${ModifyMedicationStyles.datePicker}`}
                            >
                                <InputDateField
                                    {...{
                                        register,
                                        formState,
                                        isDisabledPast: true,
                                        control,
                                        id: "date",
                                        placeholder: "Date refill",
                                        allowClear: true,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex flex-wrap justify-start items-center">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                id: "isSelectRefillFrequency",
                                name: "isSelectRefillFrequency",
                                onChange: (e: any) => {
                                    setValue(
                                        "isSelectRefillFrequency",
                                        e?.target.checked,
                                    );
                                    if (!e?.target.checked) {
                                        setValue(
                                            "isSelectRefillFrequency",
                                            false,
                                        );
                                    }
                                },

                                className: "w-[18px] h-[18px] mr-2 md:mr-0",
                            }}
                        />
                        <div
                            className={`font-bold text-start text-[16px] pl-2 ${ModifyMedicationStyles.requestCheck}`}
                        >
                            Change refill frequency
                        </div>
                    </div>
                    {watchFields["isSelectRefillFrequency"] && (
                        <div className="flex mx-[7px] flex-wrap">
                            <div className="pt-4 flex justify-start">
                                <InputRadioField
                                    {...{
                                        register,
                                        formState,
                                        id: "oneMonth",
                                        name: "frequency",
                                        value: "1 Month",
                                        label: "1 Month",
                                        className: "w-[18px] h-[18px]",
                                        defaultChecked: true,
                                    }}
                                />
                            </div>
                            <div className="md:mx-6 mx-0 pt-4 flex justify-start">
                                <InputRadioField
                                    {...{
                                        register,
                                        formState,
                                        id: "threeMonth",
                                        label: "3 Months",
                                        name: "frequency",
                                        value: "3 Month",
                                        className: "w-[18px] h-[18px]",
                                    }}
                                />
                                <p className="md:text-base text-sm font-semibold text-secondary flex justify-center items-center ml-3">
                                    Save up to 30% with 3 months
                                </p>
                            </div>
                        </div>
                    )}
                    <div
                        className={`mt-4 flex justify-start items-start break-words md:items-center  ${ModifyMedicationStyles.checkbox}`}
                    >
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                id: "isSelectRefillQuantity",
                                name: "isSelectRefillQuantity",
                                onChange: (e: any) => {
                                    setValue(
                                        "isSelectRefillQuantity",
                                        e?.target.checked,
                                    );
                                    if (!e?.target.checked) {
                                        setValue(
                                            "isSelectRefillQuantity",
                                            false,
                                        );
                                    }
                                },
                                className: "w-[18px] h-[18px] mr-2 md:mr-0",
                            }}
                        />
                        <div
                            className={`font-bold text-start text-[16px] pl-2 ${ModifyMedicationStyles.requestCheck}`}
                        >
                            Request monthly quantity adjustment
                        </div>
                    </div>
                    {watchFields["isSelectRefillQuantity"] && (
                        <div
                            className={`pb-6 pt-5 ${
                                watchFields["isSelectRefillQuantity"]
                                    ? ModifyMedicationStyles.selectField
                                    : ModifyMedicationStyles.modifyModalScroll
                            }`}
                        >
                            <SelectField
                                {...{
                                    register,
                                    formState,
                                    id: "quantity",
                                    name: "quantity",
                                    showError: true,
                                    control,
                                    options: CHANGE_REQUEST_OPTIONS,
                                    placeholder: "Select Quantity",
                                    className: "rounded-[10px]",
                                }}
                            />
                        </div>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default ModifyMedicationModal;
