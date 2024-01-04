import { Checkbox, Modal, message } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import {
    InputField,
    InputRadioField,
    SelectField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pauseRXStyles from "./pauseRXStyle.module.scss";
import PainQuestionsStyle from "../../../painManagement/painQuestionsStyle.module.scss";
import {
    PauseMedicationFormInputs,
    PauseMedicationValidationSchema,
} from "src/schemas/modifyMedicationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyMedicationAPI } from "@redux/services/assessment.api";

export interface PauseRXModalProps {
    isOpen: boolean;
    onClose: (data: any) => void;
    selectedAssessment?: any;
    setIsPauseRXModalOpen: (d?: any) => void;
}

const PauseRXModal = (props: PauseRXModalProps) => {
    const {
        isOpen,
        onClose,
        selectedAssessment,
        setIsPauseRXModalOpen,
    } = props;
    const {
        formState,
        register,
        control,
        watch,
        setValue,
        handleSubmit,
    } = useForm<PauseMedicationFormInputs>({
        defaultValues: {
            medicines: [],
        },
        resolver: yupResolver(PauseMedicationValidationSchema),
    });
    const [preSubmit, setPreSubmit] = useState(false);
    const watchFields = watch();

    const [
        isLoadingPauseMedication,
        setIsLoadingPauseMedication,
    ] = useState<boolean>(false);

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

    const [medicationOptions, setMedicationOptions] = useState<any>([]);

    const submitHandler = async (values: any) => {
        setPreSubmit(true);
        try {
            if (values?.medicines?.length > 0) {
                setIsLoadingPauseMedication(true);
                const payload: any = {
                    type: "PAUSE",
                    productIds: values?.medicines,
                };
                let response: any = {};
                if (values?.reasonForPause) {
                    if (values?.reasonForPause?.value !== "Other") {
                        response = {
                            ...response,
                            reason: values?.reasonForPause?.value,
                        };
                    } else {
                        response = {
                            ...response,
                            reason: values?.otherReasonText,
                        };
                    }
                }
                if (values?.pauseOption === "Pause For Days") {
                    response = {
                        ...response,
                        pauseOption: `Pause for ${values?.days} days`,
                    };
                } else {
                    response = {
                        ...response,
                        pauseOption: values?.pauseOption,
                    };
                }

                const modifyMedicationRes: any = await modifyMedicationAPI({
                    payload: { ...payload, response: [response] },
                });
                if (modifyMedicationRes) {
                    message.success("Pause medication requested successfully.");
                }
                setIsLoadingPauseMedication(false);
                setIsPauseRXModalOpen(false);
                onClose;
            }
        } catch (error) {
            console.log("Error");
            setIsLoadingPauseMedication(false);
            setIsPauseRXModalOpen(false);
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
                    Pause Medication
                </p>
            }
            width={650}
            centered
            maskClosable={false}
            open={isOpen}
            onCancel={onClose}
            className={`${pauseRXStyles.modalContent}`}
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
                        loading={isLoadingPauseMedication}
                        form="pauseRxForm"
                        disabled={!watchFields["pauseOption"]}
                        className={`!ml-0 md:!ml-5 mt-5 md:mt-0 antLoaderButton btn-primary ${pauseRXStyles.disableButton}`}
                    >
                        Pause Medication
                    </Button>
                </div>
            }
        >
            <form id="pauseRxForm" onSubmit={handleSubmit(submitHandler)}>
                {" "}
                <div
                    className={`px-6 py-5 ${pauseRXStyles.modalCustomContent}`}
                >
                    <p className="font-bold text-start text-[16px]">
                        Select Medication to Pause
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
                        Pause Subscription Options
                        <span className="text-danger pl-[1px]">*</span>
                    </p>
                    <div className="pt-6 flex flex-col justify-start">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                showError: false,
                                id: "Yes",
                                name: "pauseOption",
                                value: "Pause till next fill",
                                label: "Pause next fill ONLY",
                                className: "w-[18px] h-[18px]",
                            }}
                        />
                    </div>
                    <div
                        className={`pt-4 flex justify-start items-start !mr-0 ${PainQuestionsStyle.checkForPause}`}
                    >
                        <div className="pt-[12px]">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "PauseForDays",
                                    name: "pauseOption",
                                    showError: false,
                                    value: "Pause For Days",
                                    className: "w-[18px] h-[18px]",
                                }}
                            />
                        </div>

                        <p
                            className={`flex items-start text-base font-medium ${pauseRXStyles.inputField}`}
                        >
                            <span className="pr-2 ml-[-8px]"> Pause for</span>
                            <div className="w-[90px] md:w-[90px] text-sm !text-danger">
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        id: "days",
                                        name: "days",
                                        disabled:
                                            watchFields["pauseOption"] !==
                                            "Pause For Days",
                                        maxLength: 3,
                                        type: "text",
                                        className:
                                            "w-[90px] md:w-[90px] h-[20px] ",
                                    }}
                                />
                            </div>

                            <span className="pl-2">days</span>
                        </p>
                    </div>
                    <div className="pt-4 flex flex-col justify-start !font-semibold">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "pauseUntilFurtherNotice",
                                name: "pauseOption",
                                showError: false,
                                value: "Pause until further notice",
                                label:
                                    "Pause subscription until further notice",
                                className: "w-[18px] h-[18px] ",
                            }}
                        />
                    </div>
                    <p className="font-bold text-start text-[16px] pt-8">
                        Select reason for pause
                        <span className="text-danger pl-[1px]">*</span>
                    </p>
                    <div className="py-4">
                        <SelectField
                            {...{
                                register,
                                formState,
                                id: "reasonForPause",
                                name: "reasonForPause",
                                control,
                                options: CHANGE_REASON_OPTIONS,
                                placeholder: "Enter here",
                                className: "rounded-[10px]",
                            }}
                        />
                    </div>
                    {watchFields["reasonForPause"]?.value === "Other" && (
                        <>
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
            </form>
        </Modal>
    );
};

export default PauseRXModal;
