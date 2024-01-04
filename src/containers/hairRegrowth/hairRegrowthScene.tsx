import React from "react";
import HairRegrowthStyles from "./hairRegrowthStyles.module.scss";
import { Progress, Tooltip } from "antd";
import {
    checkoutPayload,
    questionObj,
    treatmentType,
} from "@redux/slices/assessment";
import { BackLeftIcon } from "jupiter-commons/src/components/theme/icons/backLeftIcon";
import { CloseOutlined } from "@ant-design/icons";
import { CheckOutlineIcon } from "jupiter-commons/src/components/theme/icons/checkOutlineIcon";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";
import AssessmentButtonComponent from "../painManagement/assessmentButtonComponent";
import Step1Component from "./stepper/step1Component";
import Step2Component from "./stepper/step2Component";
import Step3Component from "./stepper/step3Component";
import Step4Component from "./stepper/step4Component";
import Step5Component from "./stepper/step5Component";

export interface HairRegrowthSceneProps {
    setSteperStep?: (d: any) => void;
    steperStep?: any;
    current: number;
    setCurrent: (d: any) => void;
    handleOnNextButton: (d?: any) => void;
    handleOnPrevButton: (d?: any) => void;
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    activeQuestionId: string;
    handleSubmit: (d?: any) => void;
    setAssessmentFlag: (d?: any) => void;
    loadingState: any;
    control: any;
    medicines: any;
    setMedicines: (d?: any) => void;
    setSendPrescriptionModal: (d?: any) => void;
    handleTextareaChange: (d?: any) => void;
    setSelectedOption: (d: any) => any;
    onSubmit: (d: any) => any;
    selectedOption: string;
    selectedTreatment: treatmentType;
    setSelectedTreatment: (d: any) => any;
    checkoutPayload: checkoutPayload;
    setCheckoutPayload: (d: any) => any;
    setValue?: any;
    reset: (d: any) => any;
    submitAddress: (d: any) => any;
    assessMentDetails: any;
    handleDisabled: (d?: any) => any;
    unregister: (d?: any) => any;
    paymentState: any;
    setPaymentState: (d?: any) => any;
    setAssessmentExit: (d?: any) => any;
    assessmentId: string;
    setProduct: (d?: any) => any;
    watchFields: any;
    router: any;
    hairProduct?: any;
    fields: any;
    append: any;
    setSelectedOptions: (d?: any) => any;
    selectedOptions: any;
    imageData: any;
    setImageData: (d: any) => any;
    setSelectedProduct?: any;
    selectedProduct?: any;
}

const steps = [
    {
        title: "Profile Questions",
        component: Step1Component,
    },
    {
        title: "Hair Regrowth Questions",
        component: Step2Component,
    },
    {
        title: "Medical History",
        component: Step3Component,
    },
    {
        title: "Treatment Options",
        component: Step4Component,
    },
    {
        title: "Checkout",
        component: Step5Component,
    },
];

const HairRegrowthScene = (props: HairRegrowthSceneProps) => {
    const {
        current,
        handleOnNextButton,
        handleOnPrevButton,
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        watch,
        activeQuestionId,
        setAssessmentFlag,
        loadingState,
        handleSubmit,
        control,
        medicines,
        setMedicines,
        setSendPrescriptionModal,
        handleTextareaChange,
        setSelectedOption,
        onSubmit,
        selectedOption,
        selectedTreatment,
        setSelectedTreatment,
        checkoutPayload,
        setCheckoutPayload,
        setValue,
        reset,
        submitAddress,
        assessMentDetails,
        handleDisabled,
        unregister,
        paymentState,
        setPaymentState,
        setAssessmentExit,
        assessmentId,
        setProduct,
        watchFields,
        router,
        hairProduct,
        fields,
        append,
        setSelectedOptions,
        selectedOptions,
        imageData,
        setImageData,
        setSelectedProduct,
        selectedProduct,
    } = props;

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <div>
            {/* CustomerStepper */}
            <div
                className={`md:pt-10 md:mt-0 pb-3 md:pb-14 w-full ${HairRegrowthStyles.customStepper}`}
            >
                <div className="!bg-[#f9f9f9] w-full flex items-center justify-between lg:hidden landscapeBack bg-transparent py-2">
                    <p
                        onClick={() => handleOnPrevButton()}
                        className="text-secondary font-semibold text-base flex items-center"
                    >
                        <BackLeftIcon className="w-7 h-7" />
                        Back
                    </p>
                    <div
                        className={`text-base bg-white text-white shadow-lg p-3 w-[30px] h-[30px] md:w-[15px] md:h-[15px] lg:w-[30px] lg:h-[30px] rounded-full flex items-center justify-center landscapeClose ${HairRegrowthStyles.closeOutlined}`}
                    >
                        <Tooltip
                            placement="bottom"
                            title={"Close Assessment"}
                            overlayClassName="hoverOverTooltip"
                        >
                            <CloseOutlined
                                className="text-danger"
                                onClick={() => setAssessmentExit(true)}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className="flex items-start justify-center container mx-auto relative rounded-[10px] md:rounded-none pt-5 md:pt-0 pb-12 md:pb-0 bg-white md:bg-none">
                    <div className="flex flex-col items-start w-[68px] md:w-[120px] lg:w-[140px] xl:w-[185px]">
                        <div className="flex w-full items-center place-content-start">
                            <div className="relative">
                                {/* // TODO bg-pink text-white */}
                                <div
                                    className={`bg-light-bg text-input-border ${
                                        [0, 1, 2, 3, 4].includes(current) &&
                                        "!bg-pink !text-white"
                                    } w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center`}
                                >
                                    {current === 0 && (
                                        <p className="text-base xl:text-lg font-semibold">
                                            1
                                        </p>
                                    )}
                                    {/* // TODO Check Icon */}
                                    {[1, 2, 3, 4].includes(current) && (
                                        <CheckOutlineIcon className="text-white w-4 h-4 lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
                                    )}
                                </div>

                                <p
                                    className={`absolute bottom-[-40px] left-[-10px] md:bottom-[-40px] md:left-[-10px] lg:bottom-[-35px] lg:left-[-35px] lg:whitespace-nowrap text-[10px] xl:text-sm pt-4 text-input-border ${
                                        [0, 1, 2, 3, 4].includes(current) &&
                                        "!text-[#3A3A3A]"
                                    } font-semibold break-words`}
                                >
                                    Profile Questions
                                </p>
                            </div>
                            <div className="w-full">
                                <Progress
                                    percent={
                                        activeQuestionId === "my-profile"
                                            ? 50
                                            : 100
                                    }
                                    status="active"
                                    strokeColor={{
                                        from: "#D9139C",
                                        to: "#A244BA",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-[68px] md:w-[120px] lg:w-[140px] xl:w-[185px]">
                        <div className="flex w-full items-center place-content-start">
                            <div className="relative">
                                {/* // TODO bg-primary text-white */}
                                <div
                                    className={`bg-light-bg text-input-border ${
                                        [1, 2, 3, 4].includes(current) &&
                                        "!bg-primary !text-white"
                                    } w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center`}
                                >
                                    {[0, 1].includes(current) && (
                                        <p className="text-base xl:text-lg font-semibold">
                                            2
                                        </p>
                                    )}
                                    {/* // TODO Check Icon */}
                                    {[2, 3, 4].includes(current) && (
                                        <CheckOutlineIcon className="text-white w-4 h-4 lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
                                    )}
                                </div>

                                <p
                                    className={`absolute bottom-[-40px] left-[-10px] md:bottom-[-40px] md:left-[-10px] lg:bottom-[-35px] lg:left-[-35px] lg:whitespace-nowrap text-[10px] xl:text-sm pt-4 text-input-border ${
                                        [1, 2, 3, 4].includes(current) &&
                                        "!text-[#3A3A3A]"
                                    } font-semibold break-words`}
                                >
                                    Hair Regrowth
                                </p>
                            </div>
                            <Progress
                                percent={
                                    activeQuestionId === "QUE_1"
                                        ? 5
                                        : activeQuestionId === "QUE_2"
                                        ? 10
                                        : activeQuestionId === "QUE_3"
                                        ? 15
                                        : activeQuestionId === "QUE_4"
                                        ? 25
                                        : activeQuestionId === "QUE_5"
                                        ? 30
                                        : activeQuestionId === "QUE_6"
                                        ? 40
                                        : activeQuestionId === "QUE_7"
                                        ? 50
                                        : activeQuestionId === "QUE_8"
                                        ? 60
                                        : activeQuestionId === "QUE_9"
                                        ? 65
                                        : activeQuestionId === "QUE_10"
                                        ? 70
                                        : activeQuestionId === "QUE_11"
                                        ? 78
                                        : activeQuestionId === "QUE_12"
                                        ? 87
                                        : activeQuestionId === "QUE_13"
                                        ? 95
                                        : activeQuestionId === "QUE_14" ||
                                          [2, 3, 4].includes(current)
                                        ? 100
                                        : 0
                                }
                                status="active"
                                strokeColor={{
                                    from: "#A244BA",
                                    to: "#875CC8",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-[68px] md:w-[120px] lg:w-[140px] xl:w-[185px]">
                        <div className="flex w-full items-center place-content-start">
                            <div className="relative">
                                <div
                                    className={`bg-light-bg text-input-border ${
                                        [2, 3, 4].includes(current) &&
                                        "!bg-[#875CC8] !text-white"
                                    } w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center`}
                                >
                                    {[0, 1, 2].includes(current) && (
                                        <p className="text-base xl:text-lg font-semibold">
                                            3
                                        </p>
                                    )}
                                    {/* // TODO Check Icon */}
                                    {[3, 4].includes(current) && (
                                        <CheckOutlineIcon className="text-white w-4 h-4 lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
                                    )}
                                </div>
                                <p
                                    className={`absolute bottom-[-40px] left-[-10px] md:bottom-[-40px] md:left-[-10px] lg:bottom-[-35px] lg:left-[-35px] lg:whitespace-nowrap text-[10px] xl:text-sm pt-4 text-input-border ${
                                        [2, 3, 4].includes(current) &&
                                        "!text-[#3A3A3A]"
                                    } font-semibold break-words`}
                                >
                                    Medical History
                                </p>
                            </div>
                            <Progress
                                percent={
                                    activeQuestionId === "ME_QUE_1"
                                        ? 20
                                        : activeQuestionId === "ME_QUE_2"
                                        ? 40
                                        : activeQuestionId === "ME_QUE_3"
                                        ? 60
                                        : activeQuestionId === "ME_QUE_4"
                                        ? 80
                                        : activeQuestionId === "ME_QUE_5" ||
                                          [3, 4].includes(current)
                                        ? 100
                                        : 0
                                }
                                status="active"
                                strokeColor={{
                                    from: "#875CC8",
                                    to: "#3979C3",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-[68px] md:w-[120px] lg:w-[140px] xl:w-[185px]">
                        <div className="flex w-full items-center place-content-start">
                            <div className="relative">
                                <div
                                    className={`bg-light-bg text-input-border ${
                                        [3, 4].includes(current) &&
                                        "!bg-secondary !text-white"
                                    } w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center`}
                                >
                                    {[0, 1, 2, 3].includes(current) && (
                                        <p className="text-base xl:text-lg font-semibold">
                                            4
                                        </p>
                                    )}
                                    {/* // TODO Check Icon */}
                                    {current === 4 && (
                                        <CheckOutlineIcon className="text-white w-4 h-4 lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
                                    )}
                                </div>
                                <p
                                    className={`absolute bottom-[-40px] left-[-10px] md:bottom-[-40px] md:left-[-10px] lg:bottom-[-35px] lg:left-[-35px] lg:whitespace-nowrap text-[10px] xl:text-sm pt-4 text-input-border ${
                                        [3, 4].includes(current) &&
                                        "!text-[#3A3A3A]"
                                    } font-semibold break-words`}
                                >
                                    Treatment Plan
                                </p>
                            </div>
                            <Progress
                                percent={
                                    activeQuestionId === "treatment-options"
                                        ? 33
                                        : activeQuestionId ===
                                          "complementing-suppliments"
                                        ? 66
                                        : activeQuestionId ===
                                              "treatment-frequency" ||
                                          [4].includes(current)
                                        ? 100
                                        : 0
                                }
                                status="active"
                                strokeColor={{
                                    from: "#3979C3",
                                    to: "#124784",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-auto">
                        <div className="w-full">
                            <div className="relative">
                                <div
                                    className={`bg-light-bg text-input-border ${
                                        current === 4 &&
                                        "!bg-[#124784] !text-white"
                                    } w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center`}
                                >
                                    <p className="text-base xl:text-lg font-semibold">
                                        5
                                    </p>
                                </div>
                                <p
                                    className={`absolute bottom-[-25px] left-[-10px] md:bottom-[-25px] md:left-[-13px] lg:bottom-[-35px] lg:left-[-14px] lg:whitespace-nowrap text-[10px] xl:text-sm ${
                                        current === 4 && "!text-[#3A3A3A]"
                                    } pt-4 text-input-border font-semibold break-words`}
                                >
                                    Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`hidden text-base absolute top-[-30px] right-[7px] bg-white text-white shadow-lg p-3 w-[30px] h-[30px] md:w-[15px] md:h-[15px] lg:w-[30px] lg:h-[30px] rounded-full md:flex items-center justify-center ${HairRegrowthStyles.closeOutlined}`}
                    >
                        <Tooltip
                            placement="bottom"
                            title={"Close Assessment"}
                            overlayClassName="hoverOverTooltip"
                        >
                            <CloseOutlined
                                className="text-danger"
                                onClick={() => setAssessmentExit(true)}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
            {loadingState?.checkAssessMent && (
                <div className={HairRegrowthStyles.defaultSkeleton}>
                    <DefaultSkeleton />
                </div>
            )}
            {/* Container */}
            {!loadingState?.checkAssessMent && (
                <div
                    className={`md:container mx-auto mt-2
                    ${
                        [
                            "my-profile",
                            "begin_assessment",
                            "QUE_1",
                            "QUE_2",
                            "QUE_3",
                            "QUE_4",
                            "QUE_5",
                            "QUE_6",
                            "QUE_7",
                            "QUE_8",
                            "QUE_9",
                            "QUE_10",
                            "QUE_11",
                            "QUE_12",
                            "QUE_13",
                            "QUE_14",
                            "ME_QUE_1",
                            "ME_QUE_2",
                            "ME_QUE_3",
                            "ME_QUE_4",
                            "ME_QUE_5",
                            "treatment-options",
                            "complementing-suppliments",
                            "treatment-frequency",
                            "delivery-address",
                            "upload-identification",
                            "upload-insurance",
                            "checkout",
                        ].includes(activeQuestionId)
                            ? HairRegrowthStyles.painManagementContentCustom
                            : HairRegrowthStyles.painManagementContent
                    }
                  `}
                >
                    {current === 0 && (
                        <div className="w-auto md:w-[630px] mx-auto bg-white md:bg-none overflow-x-hidden rounded-lg p-4 overflow-auto max-h-[calc(100vh_-_298px)] md:max-h-full">
                            <Step1Component
                                {...{
                                    activeQuestionId,
                                    register,
                                    formState,
                                    watch,
                                    handleSubmit,
                                    control,
                                    setSelectedOption,
                                    onSubmit,
                                    selectedOption,
                                    watchFields,
                                    assessMentDetails,
                                }}
                            />
                            <AssessmentButtonComponent
                                {...{
                                    loadingState,
                                    activeQuestionId,
                                    handleOnPrevButton,
                                    handleOnNextButton,
                                    handleDisabled,
                                }}
                            />
                        </div>
                    )}
                    {current === 1 && (
                        <div className="bg-white md:bg-none overflow-x-hidden rounded-lg p-4 overflow-auto max-h-[calc(100vh_-_270px)] md:max-h-full landscapeQuestion">
                            <Step2Component
                                {...{
                                    currentQuestionObj,
                                    setCurrentQuestionObj,
                                    register,
                                    formState,
                                    setValue,
                                    watch,
                                    activeQuestionId,
                                    setAssessmentFlag,
                                    handleTextareaChange,
                                    unregister,
                                    router,
                                    watchFields,
                                    control,
                                    hairProduct,
                                    fields,
                                    append,
                                    setSelectedOptions,
                                    selectedOptions,
                                }}
                            />
                            <AssessmentButtonComponent
                                {...{
                                    loadingState,
                                    activeQuestionId,
                                    handleOnPrevButton,
                                    handleOnNextButton,
                                    handleDisabled,
                                }}
                            />
                        </div>
                    )}
                    {current === 2 && (
                        <div className="md:container w-auto mx-auto bg-white md:bg-none overflow-x-hidden rounded-lg p-4 overflow-auto max-h-[calc(100vh_-_270px)] md:max-h-full landscapeQuestion md:overflow-hidden">
                            <Step3Component
                                {...{
                                    activeQuestionId,
                                    currentQuestionObj,
                                    setCurrentQuestionObj,
                                    register,
                                    formState,
                                    medicines,
                                    setMedicines,
                                    control,
                                    unregister,
                                    setValue,
                                    assessmentId,
                                }}
                            />
                            <AssessmentButtonComponent
                                {...{
                                    loadingState,
                                    activeQuestionId,
                                    handleOnPrevButton,
                                    handleOnNextButton,
                                    handleDisabled,
                                }}
                            />
                        </div>
                    )}
                    {current === 3 && (
                        <div className="md:container w-auto mx-auto bg-white md:bg-none overflow-x-hidden rounded-lg p-4 overflow-auto max-h-[calc(100vh_-_274px)] md:max-h-full landscapeQuestion">
                            <Step4Component
                                {...{
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
                                }}
                            />
                            <AssessmentButtonComponent
                                {...{
                                    loadingState,
                                    activeQuestionId,
                                    handleOnPrevButton,
                                    handleOnNextButton,
                                    handleDisabled,
                                }}
                            />
                        </div>
                    )}
                    {current === 4 && (
                        <div className="md:container w-auto mx-auto bg-white md:bg-none overflow-x-hidden rounded-lg p-4 overflow-auto max-h-[calc(100vh_-_270px)] md:max-h-full landscapeQuestion">
                            <Step5Component
                                {...{
                                    activeQuestionId,
                                    register,
                                    formState,
                                    handleSubmit,
                                    control,
                                    checkoutPayload,
                                    setCheckoutPayload,
                                    setValue,
                                    reset,
                                    submitAddress,
                                    imageData,
                                    setImageData,
                                    assessMentDetails,
                                    paymentState,
                                    setPaymentState,
                                    assessmentId,
                                }}
                            />
                            <AssessmentButtonComponent
                                {...{
                                    loadingState,
                                    activeQuestionId,
                                    handleOnPrevButton,
                                    handleOnNextButton,
                                    handleDisabled,
                                }}
                            />
                        </div>
                    )}
                    {activeQuestionId === "begin_assessment" && (
                        <div className="mt-4 mb-3">
                            <p className="hidden md:block text-sm md:text-base font-medium text-light-black text-center">
                                To make your experience as smooth as possible,
                                please have your health card,{" "}
                                <br className="hidden md:block" />
                                insurance/benefits card (if you have one), and
                                credit card accessible
                            </p>
                        </div>
                    )}
                </div>
            )}
            {/* Go Back & Next Button */}
        </div>
    );
};

export default HairRegrowthScene;
