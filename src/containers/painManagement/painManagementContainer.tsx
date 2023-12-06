import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import PaymentSuccessModal from "@components/commonModalComponent/paymentSuccessModal";
import BlankLayoutComponent from "@components/layout/blankLayout/blankLayoutComponent";
import ProceedWithJupiterModal from "@components/theme/modal/ProceedWithJupiterModal/proceedWithJupiterModal";
import SendPrescriptionToLocalModal from "@components/theme/modal/sendPrescriptionToLocalModal/sendPrescriptionToLocalModal";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    assessmentQuestionSendAPI,
    checkAssessmentAPI,
    checkoutAPI,
    makePaymentAPI,
    medicalHistoryAPI,
    treatmentAPI,
    updateAssessmentProfileAPI,
} from "@redux/services/assessment.api";
import {
    checkoutPayload,
    questionObj,
    treatmentType,
} from "@redux/slices/assessment";
import { wrapper } from "@redux/store";
import { message } from "antd";
import {
    PATIENT_COOKIE,
    SUCCESS_MESSAGES,
} from "jupiter-commons/src/components/libs/constants";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import {
    Step1ProfileFormValidateSchema,
    Step2NotRequiredValidateSchema,
    Step2ValidateSchema,
    Step4ProfileFormValidateSchema,
} from "src/schemas/step1ProfileSchema";
import { MedicalHistoryQuestions } from "../../libs/medicalHistoryQuestions";
import { painManagementQuestions } from "../../libs/painManagementQuestions.js";
import PainManagementScene from "./painManagementScene";
import ExitAssessmentModal from "@components/commonModalComponent/exitAssessmentModal";
import { RootState } from "@redux/reducers";
import {
    LoginState,
    LoginUserState,
    SignupUserState,
} from "@redux/slices/auth";
import { useSelector } from "react-redux";

export interface PainManagementContainerProps {
    assessmentId: string;
    activeQuestionId: string;
}
export const checkoutRoutes = [
    "delivery-address",
    "upload-identification",
    "upload-insurance",
    "checkout",
];

export const treatmentRoutes = [
    "treatment-options",
    "complementing-suppliments",
    "treatment-frequency",
];

const PainManagementContainer = (props: PainManagementContainerProps) => {
    // State and Props
    const { assessmentId, activeQuestionId } = props;

    const router = useRouter();
    const [current, setCurrent] = useState(0);

    const [assessMentDetails, setAssessmentDetails] = useState<any>();
    const {
        register,
        formState,
        watch,
        handleSubmit,
        control,
        reset,
        setValue,
        unregister,
    } = useForm<any>({
        resolver: ["QUE_1", "QUE_2", "QUE_6", "ME_QUE_3", "ME_QUE_4"].includes(
            activeQuestionId,
        )
            ? yupResolver(Step2ValidateSchema)
            : current === 0
            ? yupResolver(Step1ProfileFormValidateSchema)
            : current === 4
            ? yupResolver(Step4ProfileFormValidateSchema)
            : yupResolver(Step2NotRequiredValidateSchema),
        mode: "all",
    });

    const [assessmentFlag, setAssessmentFlag] = useState<any>({
        status: false,
        option: {},
        flagText: "",
        flagTitle: "",
    });

    const { data: loginUserData }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const { data: signupUserData }: SignupUserState = useSelector(
        (state: RootState) => state.signupUser,
    );

    const [assessmentExit, setAssessmentExit] = useState<any>(false);
    const watchFields = watch();

    const [scale, setScale] = useState<number>();
    const [currentQuestionObj, setCurrentQuestionObj] = useState<questionObj>({
        qId: "QUE_1",
        question: "",
        qKey: "1",
        answers: [],
        options: [],
    });

    const [loadingState, setLoadingState] = useState({
        assessMentFlagLoading: false,
        checkAssessMent: false,
        isSubmittingQuestion: false,
    });

    const [frontParts, setFrontParts] = useState<any>({});
    const [backParts, setBackParts] = useState<any>({});

    //Medical History States

    const [medicines, setMedicines] = useState<any>([]);

    //Treatment States

    const [isSendToLocalPharmacyModal, setSendToLocalPharmacyModal] = useState(
        false,
    );
    const [isSendPrescriptionModal, setSendPrescriptionModal] = useState(false);

    const [selectedTreatment, setSelectedTreatment] = useState<treatmentType>({
        supplementIds: [],
    });
    const [
        isOpenPaymentSuccessModal,
        setIsOpenPaymentSuccessModal,
    ] = useState<boolean>(false);

    const [product, setProduct] = useState<any>();

    // STATES FOR CHECKOUT

    const [checkoutPayload, setCheckoutPayload] = useState<checkoutPayload>({
        applyInsurance: true,
    });
    const [imageData, setImageData] = useState([]);

    const [paymentState, setPaymentState] = useState<any>({
        creditCardId: null,
        promoCode: null,
        creditCardConsent: false,
        jupiterConsent: false,
    });

    // STATES FOR MY PROFILE

    const [{ patient_cookie }]: any = useCookies([PATIENT_COOKIE]);
    const [selectedOption, setSelectedOption] = useState("MALE");

    const onSubmit = async (values: any) => {
        let response = null;
        let payload: any = deepClone(values);
        const authCookies: any = patient_cookie;
        try {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: true,
                };
            });
            payload = {
                firstName: values?.firstName,
                lastName: values?.lastName,
                dob: values?.dob,
                gender: selectedOption,
                isPregnant: values?.isPregnant == "true" ? true : false,
                isBreastFeeding:
                    values?.isBreastFeeding == "true" ? true : false,
                isPlanPregnant: values?.isPlanPregnant == "true" ? true : false,
                province: values?.province.value,
            };
            if (payload) {
                response = await updateAssessmentProfileAPI(
                    payload,
                    assessmentId,
                );
            }
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
            message.success(SUCCESS_MESSAGES.profileMessage);
            router.query.activeQuestionId = "begin_assessment";
            router.push(router);
            setCurrent(1);
        } catch (e: any) {
            console.log(e.message);
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
        }
    };

    const submitAddress = async (values: any) => {
        let response = null;
        try {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: true,
                };
            });
            const payload: any = {
                shippingAddress: {
                    addressLine1: values?.addressLine1,
                    addressLine2: values?.addressLine2,
                    city: values?.city,
                    country: "Canada",
                    province: values?.province,
                    postalCode: values?.postalCode,
                    contactNumber: `+1${values?.phoneNumber}`,
                },
            };
            if (payload) {
                response = await checkoutAPI(payload, assessmentId);
                if (response) {
                    router.query.activeQuestionId = "upload-identification";
                    router.push(router);
                }
            }
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
        } catch (e: any) {
            console.log(e.message);
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
        }
    };

    const handleTextareaChange = (event: any) => {
        const newOtherValue = event?.target?.value;
        const newAnswers = [...currentQuestionObj.answers];

        const otherIndex = newAnswers.findIndex(
            (item) => typeof item === "object" && "Other" in item,
        );

        if (otherIndex !== -1) {
            newAnswers[otherIndex] = { Other: newOtherValue };
        } else {
            newAnswers.push({ Other: newOtherValue });
        }
        setCurrentQuestionObj({
            ...currentQuestionObj,
            answers: newAnswers,
        });
    };

    // Assessment details check method call
    const checkAssessmentStatus = async () => {
        try {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    checkAssessMent: true,
                };
            });

            const assessmentStatus = await checkAssessmentAPI(assessmentId);
            setAssessmentDetails(assessmentStatus);

            setLoadingState((d: any) => {
                return {
                    ...d,
                    checkAssessMent: false,
                };
            });
        } catch (error) {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    checkAssessMent: false,
                };
            });
        }
    };

    // UseEffect hook for checking assessment details
    useEffect(() => {
        if (assessmentId) {
            checkAssessmentStatus();
        }
    }, [assessmentId]);

    //UseEffect hook for finding current question and setting up State
    useEffect(() => {
        if (activeQuestionId === "my-profile") {
            reset({
                firstName: assessMentDetails?.profile?.firstName,
                lastName: assessMentDetails?.profile?.lastName,
                dob: assessMentDetails?.profile?.dob,

                isPregnant:
                    assessMentDetails?.profile?.isPregnant == true
                        ? "true"
                        : "false",
                isBreastFeeding:
                    assessMentDetails?.profile?.isBreastFeeding == true
                        ? "true"
                        : "false",
                isPlanPregnant:
                    assessMentDetails?.profile?.isPlanPregnant == true
                        ? "true"
                        : "false",
            });
            assessMentDetails?.profile?.province !== ""
                ? setValue("province", {
                      label: assessMentDetails?.profile?.province,
                      value: assessMentDetails?.profile?.province,
                  })
                : setValue("province", "");
            setSelectedOption(assessMentDetails?.profile?.gender);
        }
        if (current === 1) {
            const currentQuestionfromApi = assessMentDetails?.questions.find(
                (q: any) => q?.qId === activeQuestionId,
            );
            if (current === 1 && currentQuestionfromApi) {
                setCurrentQuestionObj((d: any) => {
                    return currentQuestionfromApi;
                });
            } else {
                setCurrentQuestionObj((d: any) => {
                    const currentQuestionIndex = painManagementQuestions.findIndex(
                        (question: any) => question.qId === activeQuestionId,
                    );
                    const nextQuestion =
                        painManagementQuestions[currentQuestionIndex];
                    return { ...nextQuestion };
                });
            }
            if (currentQuestionfromApi?.qId === "QUE_8") {
                setFrontParts(currentQuestionfromApi?.answers[0]);
                setBackParts(currentQuestionfromApi?.answers[1]);
            }
            if (["QUE_P_1", "QUE_G_2"].includes(currentQuestionfromApi?.qId)) {
                setScale(currentQuestionfromApi?.answers[0]);
            }
            if (currentQuestionObj?.qId === "QUE_19") {
                reset({
                    otherText: currentQuestionObj?.answers.find(
                        (answer: any) => answer?.Other,
                    )?.Other,
                });
            }
        }

        if (current === 2) {
            const currentQuestionfromApi = assessMentDetails?.medicalHistory.find(
                (q: any) => q?.qId === activeQuestionId,
            );
            if (currentQuestionfromApi) {
                setCurrentQuestionObj((d: any) => {
                    return currentQuestionfromApi;
                });
                if (
                    currentQuestionfromApi.answers[0] ===
                    currentQuestionfromApi.options[0].key
                ) {
                    setMedicines(
                        currentQuestionfromApi.answers[1][0].medicines,
                    );
                    setValue(
                        "otherText",
                        currentQuestionfromApi.answers[1][0].medicines,
                    );
                }
            } else {
                setCurrentQuestionObj((d: any) => {
                    const currentQuestionIndex = MedicalHistoryQuestions.findIndex(
                        (question: any) => question.qId === activeQuestionId,
                    );
                    const nextQuestion =
                        MedicalHistoryQuestions[currentQuestionIndex];
                    return { ...nextQuestion };
                });
            }
        }

        if (current === 3) {
            setSelectedTreatment(assessMentDetails?.treatmentOption?.treatment);
            reset({
                commentForPrescriber:
                    assessMentDetails?.treatmentOption?.treatment
                        ?.commentForPrescriber,
            });
        }
        if (current === 4) {
            if (activeQuestionId === "delivery-address") {
                reset({
                    addressLine1:
                        assessMentDetails?.checkout?.shippingAddress
                            ?.addressLine1 ??
                        loginUserData?.user?.patientUserAddress[0]
                            ?.addressLine1 ??
                        signupUserData?.user?.patientUserAddress[0]
                            ?.addressLine1 ??
                        "",
                    addressLine2:
                        assessMentDetails?.checkout?.shippingAddress
                            ?.addressLine2 ??
                        loginUserData?.user?.patientUserAddress[0]
                            ?.addressLine2 ??
                        signupUserData?.user?.patientUserAddress[0]
                            ?.addressLine2 ??
                        "",
                    city:
                        assessMentDetails?.checkout?.shippingAddress?.city ??
                        loginUserData?.user?.patientUserAddress[0]?.city ??
                        signupUserData?.user?.patientUserAddress[0]?.city ??
                        "",
                    province:
                        assessMentDetails?.checkout?.shippingAddress
                            ?.province ??
                        loginUserData?.user?.patientUserAddress[0]?.province ??
                        signupUserData?.user?.patientUserAddress[0]?.province ??
                        "",
                    postalCode:
                        assessMentDetails?.checkout?.shippingAddress
                            ?.postalCode ??
                        loginUserData?.user?.patientUserAddress[0]
                            ?.postalCode ??
                        signupUserData?.user?.patientUserAddress[0]
                            ?.postalCode ??
                        "",
                    phoneNumber: assessMentDetails?.checkout?.shippingAddress?.contactNumber.substring(
                        2,
                    ),
                });
            }
            if (activeQuestionId === "upload-identification") {
                const updatedImgObj =
                    assessMentDetails?.checkout?.identification?.length > 0
                        ? assessMentDetails?.checkout?.identification.map(
                              ({ description, key, name }: any) => ({
                                  response: {
                                      Location: description,
                                      key,
                                      originalname: name,
                                  },
                              }),
                          )
                        : [];
                setImageData(updatedImgObj);
            }
            if (activeQuestionId === "upload-insurance") {
                const updatedImgObj =
                    assessMentDetails?.checkout?.insurance?.length > 0
                        ? assessMentDetails?.checkout?.insurance?.map(
                              ({ description, key, name }: any) => ({
                                  response: {
                                      Location: description,
                                      key,
                                      originalname: name,
                                  },
                              }),
                          )
                        : [];
                setImageData(updatedImgObj);
                reset({
                    insuranceAdditionalDetails:
                        assessMentDetails.checkout.insuranceAdditionalDetails,
                });
                setCheckoutPayload((d: any) => {
                    return {
                        applyInsurance:
                            assessMentDetails.checkout.applyInsurance,
                    };
                });
            }
        }
    }, [assessMentDetails, activeQuestionId]);

    // Handler for Next Button
    const handleOnNextButton = async () => {
        try {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: true,
                };
            });
            if (current === 0) {
                if (activeQuestionId === "my-profile") {
                    // onSubmit(watchFields);
                } else {
                    if (assessMentDetails?.checkout?.shippingAddress) {
                        router.query.activeQuestionId = "delivery-address";
                        router.push(router);
                    } else if (
                        assessMentDetails?.treatmentOption?.treatment
                            ?.deliveryFrequency &&
                        assessMentDetails?.treatmentOption?.treatment
                            ?.deliveryFrequency !== ""
                    ) {
                        router.query.activeQuestionId = "treatment-frequency";
                        router.push(router);
                    } else if (
                        assessMentDetails?.treatmentOption?.supplements
                            ?.length > 0
                    ) {
                        router.query.activeQuestionId =
                            "complementing-suppliments";
                        router.push(router);
                    } else if (assessMentDetails?.treatmentOption?.product) {
                        router.query.activeQuestionId = "treatment-options";
                        router.push(router);
                    } else if (
                        assessMentDetails &&
                        assessMentDetails?.medicalHistory?.length > 0
                    ) {
                        router.query.activeQuestionId =
                            assessMentDetails?.medicalHistory[
                                assessMentDetails.medicalHistory.length - 1
                            ].qId;
                        router.push(router);
                    } else if (
                        assessMentDetails &&
                        assessMentDetails?.questions?.length > 0
                    ) {
                        router.query.activeQuestionId =
                            assessMentDetails?.questions[
                                assessMentDetails.questions.length - 1
                            ].qId;
                        router.push(router);
                    } else {
                        router.query.activeQuestionId = "QUE_1";
                        router.push(router);
                    }
                }
            }
            if (current === 1) {
                let questionPayload: any = {};
                if (currentQuestionObj?.qId === "QUE_8") {
                    questionPayload = {
                        ...currentQuestionObj,
                        answers: [
                            frontParts,
                            backParts,
                            currentQuestionObj?.answers.find(
                                (answer: any) => answer?.Other,
                            ),
                        ],
                    };
                } else if (
                    ["QUE_P_1", "QUE_G_2"].includes(currentQuestionObj?.qId)
                ) {
                    questionPayload = {
                        ...currentQuestionObj,
                        answers: [scale],
                    };
                } else {
                    questionPayload = {
                        ...currentQuestionObj,
                        answers: currentQuestionObj?.answers,
                    };
                }

                const responseFromNext = await assessmentQuestionSendAPI(
                    questionPayload,
                    assessmentId,
                );

                if (responseFromNext) {
                    const currentQuestionIndex = painManagementQuestions.findIndex(
                        (question: any) =>
                            question.qId === currentQuestionObj.qId,
                    );
                    if (currentQuestionObj?.qId === "QUE_3") {
                        if (
                            !currentQuestionObj?.answers.includes(
                                `${
                                    currentQuestionObj?.options?.[
                                        currentQuestionObj?.options.length - 1
                                    ]?.key
                                }`,
                            )
                        ) {
                            router.query.activeQuestionId = "QUE_3_A";
                            router.push(router);
                        } else {
                            router.query.activeQuestionId = "QUE_4";
                            router.push(router);
                        }
                    } else if (currentQuestionIndex === 19) {
                        setCurrent(2);
                        router.query.activeQuestionId = "ME_QUE_1";
                        router.push(router);
                    } else {
                        const nextQuestion =
                            painManagementQuestions[currentQuestionIndex + 1];
                        router.query.activeQuestionId = nextQuestion.qId;
                        router.push(router);
                    }
                }
            }
            if (current === 2) {
                let questionPayload: any = {};

                if (
                    currentQuestionObj.answers[0] ===
                    currentQuestionObj.options[0].key
                ) {
                    const updatedAnswers = currentQuestionObj.answers.map(
                        (answer) => {
                            return { medicines: medicines };
                        },
                    );

                    questionPayload = {
                        ...currentQuestionObj,
                        answers: [
                            currentQuestionObj.options[0].key,
                            updatedAnswers,
                        ],
                    };
                } else {
                    questionPayload = currentQuestionObj;
                }

                const responseFromNext = await medicalHistoryAPI(
                    questionPayload,
                    assessmentId,
                );
                if (responseFromNext) {
                    const currentQuestionIndex = MedicalHistoryQuestions.findIndex(
                        (question: any) =>
                            question.qId === currentQuestionObj.qId,
                    );
                    if (currentQuestionIndex === 4) {
                        setCurrent(3);
                        router.query.activeQuestionId = "treatment-options";
                        router.push(router);
                    } else {
                        const nextQuestion =
                            MedicalHistoryQuestions[currentQuestionIndex + 1];
                        router.query.activeQuestionId = nextQuestion.qId;
                        router.push(router);
                    }
                }
            }
            if (current === 3) {
                if (activeQuestionId === "treatment-frequency") {
                    const treatmentResponse = await treatmentAPI(
                        {
                            deliveryFrequency: "1",
                            hasLocalPharmacy: false,
                        },
                        assessmentId,
                    );
                    if (treatmentResponse) {
                        router.query.activeQuestionId = "delivery-address";
                        router.push(router);
                        setCurrent(4);
                    }
                }
                if (activeQuestionId === "treatment-options") {
                    const treatmentResponse = await treatmentAPI(
                        {
                            productId: selectedTreatment.productId,
                            commentForPrescriber:
                                watchFields["commentForPrescriber"],
                        },
                        assessmentId,
                    );
                    if (treatmentResponse) {
                        if (product && product?.supplements?.length === 0) {
                            router.query.activeQuestionId =
                                "treatment-frequency";
                            router.push(router);
                        } else {
                            router.query.activeQuestionId =
                                "complementing-suppliments";
                            router.push(router);
                        }
                    }
                }
                if (activeQuestionId === "complementing-suppliments") {
                    const treatmentResponse = await treatmentAPI(
                        {
                            supplementIds: selectedTreatment.supplementIds,
                        },
                        assessmentId,
                    );
                    if (treatmentResponse) {
                        router.query.activeQuestionId = "treatment-frequency";
                        router.push(router);
                    }
                }
            }
            if (current === 4) {
                const imagePayload: any = [];
                if (activeQuestionId === "delivery-address") {
                    //submitAddress(watchfields)
                }
                if (activeQuestionId === "upload-identification") {
                    if (imageData && imageData?.length > 0) {
                        imageData.map((e: any) =>
                            imagePayload.push({
                                key: e?.response?.key,
                                name: e?.response?.originalname,
                                description: e?.response?.Location,
                            }),
                        );
                    }
                    const checkoutRes = await checkoutAPI(
                        {
                            identification: imagePayload,
                        },
                        assessmentId,
                    );
                    if (checkoutRes) {
                        if (
                            assessMentDetails?.treatmentOption?.treatment
                                ?.hasLocalPharmacy === true
                        ) {
                            router.query.activeQuestionId = "checkout";
                            router.push(router);
                        } else {
                            router.query.activeQuestionId = "upload-insurance";
                            router.push(router);
                        }
                    }
                }
                if (activeQuestionId === "upload-insurance") {
                    if (imageData && imageData?.length > 0) {
                        imageData.map((e: any) =>
                            imagePayload.push({
                                key: e?.response?.key,
                                name: e?.response?.originalname,
                                description: e?.response?.Location,
                            }),
                        );
                    }
                    let payload = {};
                    if (checkoutPayload.applyInsurance) {
                        payload = {
                            applyInsurance: checkoutPayload.applyInsurance,
                            insurance: imagePayload,
                            insuranceAdditionalDetails:
                                watchFields["insuranceAdditionalDetails"],
                        };
                    } else {
                        payload = {
                            applyInsurance: checkoutPayload.applyInsurance,
                        };
                    }
                    const checkoutRes = await checkoutAPI(
                        payload,
                        assessmentId,
                    );
                    if (checkoutRes) {
                        router.query.activeQuestionId = "checkout";
                        router.push(router);
                    }
                }
                if (activeQuestionId === "checkout") {
                    let paymentPayload: any = {};
                    if (paymentState?.promoCode) {
                        paymentPayload = {
                            creditCardId: paymentState?.creditCardId,
                            promoCodeId: paymentState?.promoCode?.id,
                        };
                    } else {
                        paymentPayload = {
                            creditCardId: paymentState?.creditCardId,
                        };
                    }
                    const paymentRes = await makePaymentAPI(
                        paymentPayload,
                        assessmentId,
                    );

                    if (paymentRes) {
                        setIsOpenPaymentSuccessModal(true);
                    }
                }
            }
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
        } catch (error) {
            setLoadingState((d: any) => {
                return {
                    ...d,
                    isSubmittingQuestion: false,
                };
            });
        }
    };

    // Function to handle handleOnPrevButton button actions
    const handleOnPrevButton = () => {
        if (current === 1) {
            const currentQuestionIndex = painManagementQuestions.findIndex(
                (question: any) => question.qId === currentQuestionObj.qId,
            );
            if (currentQuestionIndex === 0) {
                setCurrent(0);
                router.query.activeQuestionId = "begin_assessment";
                router.push(router);
            } else if (activeQuestionId === "QUE_4") {
                if (
                    assessMentDetails?.questions[2]?.answers?.includes(
                        "QUE_3_ANS_6",
                    )
                ) {
                    router.query.activeQuestionId = "QUE_3";
                    router.push(router);
                } else {
                    router.query.activeQuestionId = "QUE_3_A";
                    router.push(router);
                }
            } else {
                const prevQuestion =
                    painManagementQuestions[currentQuestionIndex - 1];
                if (prevQuestion) {
                    router.query.activeQuestionId = prevQuestion.qId;
                    router.push(router);
                }
            }
        }
        if (current === 0) {
            if (activeQuestionId === "begin_assessment") {
                router.query.activeQuestionId = "my-profile";
                router.push(router);
            }
            if (activeQuestionId === "my-profile") {
                router.push("/dashboard");
            }
        }
        if (current === 2) {
            const currentQuestionIndex = MedicalHistoryQuestions.findIndex(
                (question: any) => question.qId === currentQuestionObj.qId,
            );
            if (currentQuestionIndex === 0) {
                setCurrent(2);
                router.query.activeQuestionId = "QUE_19";
                router.push(router);
            } else {
                const prevQuestion =
                    MedicalHistoryQuestions[currentQuestionIndex - 1];
                if (prevQuestion) {
                    router.query.activeQuestionId = prevQuestion.qId;
                    router.push(router);
                }
            }
        }
        if (current === 3) {
            if (activeQuestionId === "treatment-options") {
                router.query.activeQuestionId = "ME_QUE_5";
                router.push(router);
            }
            if (activeQuestionId === "complementing-suppliments") {
                router.query.activeQuestionId = "treatment-options";
                router.push(router);
            }
            if (activeQuestionId === "treatment-frequency") {
                router.query.activeQuestionId = "complementing-suppliments";
                router.push(router);
            }
        }
        if (current === 4) {
            if (activeQuestionId === "delivery-address") {
                router.query.activeQuestionId = "treatment-frequency";
                router.push(router);
            }
            if (activeQuestionId === "upload-identification") {
                router.query.activeQuestionId = "delivery-address";
                router.push(router);
            }
            if (activeQuestionId === "upload-insurance") {
                router.query.activeQuestionId = "upload-identification";
                router.push(router);
            }
            if (activeQuestionId === "checkout") {
                router.query.activeQuestionId = "upload-insurance";
                router.push(router);
            }
        }
    };

    // Use Effect to set current based on Query
    useEffect(() => {
        if (!activeQuestionId) {
            setCurrent(0);
            router.query.activeQuestionId = "my-profile";
            router.push(router);
        }
        if (
            painManagementQuestions.find(
                (q: any) => q?.qId === activeQuestionId,
            )
        ) {
            setCurrent(1);
        }
        if (
            MedicalHistoryQuestions.find(
                (q: any) => q?.qId === activeQuestionId,
            )
        ) {
            setCurrent(2);
        }
        if (treatmentRoutes.includes(activeQuestionId)) {
            setCurrent(3);
        }
        if (checkoutRoutes.includes(activeQuestionId)) {
            setCurrent(4);
        }
    }, []);

    const checkAllFalse = (frontParts: any, backParts: any) => {
        for (let i = 0; i < [frontParts, backParts].length; i++) {
            const item = [frontParts, backParts][i];
            for (const key in item) {
                if (item[key].selected === true) {
                    return false;
                }
            }
        }
        return true;
    };

    useEffect(() => {
        if (currentQuestionObj?.qId === "QUE_G_2") {
            setScale(7);
        }
    }, [currentQuestionObj?.qId]);

    // FUNCTION FOR DISABLE NEXT AND BACK BUTTON
    const handleDisabled = () => {
        if (activeQuestionId === "my-profile") {
            if (formState?.isValid) {
                return false;
            } else {
                return true;
            }
        }
        if (current === 1) {
            if (currentQuestionObj?.qId === "QUE_19") {
                return false;
            }
            if (currentQuestionObj?.qId === "QUE_8") {
                if (!frontParts && !backParts) {
                    return true;
                } else if (frontParts || backParts) {
                    return checkAllFalse(frontParts, backParts);
                } else {
                    return false;
                }
            } else if (currentQuestionObj?.qId === "QUE_P_1") {
                if (!scale) {
                    return true;
                } else {
                    return false;
                }
            } else if (currentQuestionObj?.qId === "QUE_G_2") {
                if (!scale) {
                    return true;
                } else {
                    return false;
                }
            } else if (currentQuestionObj?.answers.length === 0) {
                return true;
            }
            // else if (["QUE_1", "QUE_2", "QUE_6"].includes(activeQuestionId)) {
            //     let otherOptionField = 2;
            //     activeQuestionId === "QUE_1" ? (otherOptionField = 1) : "";
            //     if (currentQuestionObj?.answers.length === 1) {
            //         const checkAnyOptionPresent = currentQuestionObj.options.every(
            //             (option) => {
            //                 return !currentQuestionObj.answers.includes(
            //                     option.key,
            //                 );
            //             },
            //         );
            //         if (checkAnyOptionPresent) {
            //             return true;
            //         }
            //     }

            //     if (
            //         currentQuestionObj?.answers.includes(
            //             `${
            //                 currentQuestionObj?.options?.[
            //                     currentQuestionObj?.options.length -
            //                         otherOptionField
            //                 ]?.key
            //             }`,
            //         )
            //     ) {
            //         if (
            //             !watchFields["otherText"] ||
            //             (watchFields["otherText"] &&
            //                 watchFields["otherText"].trim() === "") ||
            //             formState?.isDirty
            //         ) {
            //             return true;
            //         }
            //     }
            // }
            else {
                if (
                    !currentQuestionObj?.options?.some((option) =>
                        currentQuestionObj?.answers?.includes(option.key),
                    )
                ) {
                    return true;
                }
            }
        }
        if (current === 2) {
            if (currentQuestionObj?.answers.length === 0) {
                return true;
            }
            if (
                currentQuestionObj?.answers.includes(
                    `${
                        currentQuestionObj?.options?.[
                            currentQuestionObj?.options.length - 2
                        ]?.key
                    }`,
                )
            ) {
                if (
                    ["ME_QUE_1", "ME_QUE_2", "ME_QUE_5"].includes(
                        activeQuestionId,
                    )
                ) {
                    if (medicines.length === 0) {
                        return true;
                    }
                } else if (
                    !watchFields["otherText"] ||
                    (watchFields["otherText"] &&
                        watchFields["otherText"].trim() === "") ||
                    formState?.isDirty
                ) {
                    return true;
                }
            } else {
                if (
                    !currentQuestionObj?.options?.some((option) =>
                        currentQuestionObj?.answers?.includes(option.key),
                    )
                ) {
                    return true;
                }
            }
        }

        if (current === 3) {
            if (activeQuestionId === "treatment-options") {
                if (!selectedTreatment?.productId) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        if (current === 4) {
            if (activeQuestionId === "checkout") {
                if (
                    !paymentState?.creditCardId ||
                    !paymentState?.creditCardConsent ||
                    !paymentState?.jupiterConsent
                ) {
                    return true;
                }
            }
            if (activeQuestionId === "delivery-address") {
                if (!formState?.isValid) {
                    return true;
                } else {
                    return false;
                }
            }
            if (activeQuestionId === "upload-insurance") {
                if (imageData?.length === 0) {
                    if (checkoutPayload?.applyInsurance) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            if (activeQuestionId === "upload-identification") {
                if (imageData?.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };

    return (
        <>
            <PainManagementScene
                {...{
                    current,
                    setCurrent,
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
                    scale,
                    setScale,
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
                    imageData,
                    setImageData,
                    assessMentDetails,
                    handleDisabled,
                    unregister,
                    paymentState,
                    setPaymentState,
                    frontParts,
                    setFrontParts,
                    backParts,
                    setBackParts,
                    setAssessmentExit,
                    assessmentId,
                    setProduct,
                    watchFields,
                }}
            />
            {assessmentFlag?.status && (
                <CommonModalComponent
                    isOpen={assessmentFlag?.status}
                    title={
                        currentQuestionObj?.flagTitle
                            ? currentQuestionObj?.flagTitle
                            : "Assessment Flagged"
                    }
                    description={
                        currentQuestionObj?.flagText
                            ? currentQuestionObj?.flagText
                            : "We apologize for the inconvenience, but we are unable to proceed with your assessment at this time due to the time elapsed since your last procedure. We would be happy to serve your after at least 2 months have passed since your last procedure. For immediate support, we recommend that you seek assistance from your specialist or family doctor. We appreciate your understanding, and our team looks forward to assisting you in the future."
                    }
                    onClose={() => {
                        setAssessmentFlag(null);
                    }}
                    setLoadingState={setLoadingState}
                    loadingState={loadingState}
                    assessmentId={assessmentId}
                />
            )}

            {isOpenPaymentSuccessModal && (
                <PaymentSuccessModal
                    isOpen={isOpenPaymentSuccessModal}
                    onClose={() => {
                        router.push("/dashboard");
                    }}
                />
            )}
            {assessmentExit && (
                <ExitAssessmentModal
                    isOpen={assessmentExit}
                    onClose={() => {
                        setAssessmentExit(false);
                    }}
                />
            )}
            {isSendPrescriptionModal && (
                <SendPrescriptionToLocalModal
                    isOpen={isSendPrescriptionModal}
                    onClose={() => {
                        setSendPrescriptionModal(false);
                    }}
                    setSendToLocalPharmacyModal={setSendToLocalPharmacyModal}
                    setSendPrescriptionModal={setSendPrescriptionModal}
                    setCurrent={setCurrent}
                    assessmentId={assessmentId}
                />
            )}
            {isSendToLocalPharmacyModal && (
                <ProceedWithJupiterModal
                    isOpen={isSendToLocalPharmacyModal}
                    onClose={() => {
                        setSendToLocalPharmacyModal(false);
                    }}
                    setCurrent={setCurrent}
                    assessMentDetails={assessMentDetails}
                    setSendToLocalPharmacyModal={setSendToLocalPharmacyModal}
                    setSendPrescriptionModal={setSendPrescriptionModal}
                    assessmentId={assessmentId}
                />
            )}
        </>
    );
};

PainManagementContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (context: NextPageContext) => {
        const activeQuestionId: any = context?.query?.activeQuestionId;
        const assessmentId: any = context?.query?.assessmentId;
        try {
            if (activeQuestionId) {
                return { assessmentId, activeQuestionId };
            }
        } catch (e: any) {
            console.log(e, "e2");
        }
    },
);

PainManagementContainer.Layout = BlankLayoutComponent;
export default PainManagementContainer;
