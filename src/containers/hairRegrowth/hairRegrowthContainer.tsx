import React, { useEffect, useState } from "react";
import HairRegrowthScene from "./hairRegrowthScene";
import { useFieldArray, useForm } from "react-hook-form";
import {
    Step1ProfileFormValidateSchema,
    Step2NotRequiredValidateSchema,
    Step2ValidateSchema,
    Step4ProfileFormValidateSchema,
} from "src/schemas/step1ProfileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginUserState, SignupUserState } from "@redux/slices/auth";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import {
    checkoutPayload,
    questionObj,
    treatmentType,
} from "@redux/slices/assessment";
import { useCookies } from "react-cookie";
import {
    PATIENT_COOKIE,
    SUCCESS_MESSAGES,
} from "jupiter-commons/src/components/libs/constants";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import {
    assessmentQuestionSendAPI,
    checkAssessmentAPI,
    checkoutAPI,
    makePaymentAPI,
    medicalHistoryAPI,
    treatmentAPI,
    updateAssessmentProfileAPI,
} from "@redux/services/assessment.api";
import { message } from "antd";
import router from "next/router";
import { wrapper } from "@redux/store";
import { NextPageContext } from "next";
import BlankLayoutComponent from "@components/layout/blankLayout/blankLayoutComponent";
import { hairRegrowthQuestions } from "../../libs/hairRegrowthQuestions.js";
import { MedicalHistoryQuestions } from "src/libs/medicalHistoryQuestions";
import ExitAssessmentModal from "@components/commonModalComponent/exitAssessmentModal";
import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import PaymentSuccessModal from "@components/commonModalComponent/paymentSuccessModal";
import SendPrescriptionToLocalModal from "@components/theme/modal/sendPrescriptionToLocalModal/sendPrescriptionToLocalModal";
import ProceedWithJupiterModal from "@components/theme/modal/ProceedWithJupiterModal/proceedWithJupiterModal";

export interface HairRegrowthContainerProps {
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

const HairRegrowthContainer = (props: HairRegrowthContainerProps) => {
    const { assessmentId, activeQuestionId } = props;
    const [current, setCurrent] = useState(0);
    const [assessMentDetails, setAssessmentDetails] = useState<any>();

    const hairProduct: any = [];

    const {
        register,
        formState,
        watch,
        handleSubmit,
        control,
        reset,
        setValue,
        unregister,
        getValues,
    } = useForm<any>({
        resolver: [
            "QUE_9",
            "QUE_10",
            "QUE_11",
            "ME_QUE_3",
            "ME_QUE_4",
        ].includes(activeQuestionId)
            ? yupResolver(Step2ValidateSchema)
            : current === 0
            ? yupResolver(Step1ProfileFormValidateSchema)
            : current === 4
            ? yupResolver(Step4ProfileFormValidateSchema)
            : yupResolver(Step2NotRequiredValidateSchema),
        mode: "all",
        defaultValues: {
            test: hairProduct,
        },
    });
    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: "test",
    });
    const [selectedOptions, setSelectedOptions] = useState<
        Array<number | null>
    >(Array(fields?.length).fill(null));

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
    const [paymentState, setPaymentState] = useState<any>({
        creditCardId: null,
        promoCode: null,
        creditCardConsent: false,
        jupiterConsent: false,
    });

    // STATES FOR MY PROFILE
    const [{ patient_cookie }]: any = useCookies([PATIENT_COOKIE]);
    const [selectedOption, setSelectedOption] = useState("MALE");

    const [isSendPrescriptionModal, setSendPrescriptionModal] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<treatmentType>({
        supplementIds: [],
    });
    const [checkoutPayload, setCheckoutPayload] = useState<checkoutPayload>({
        applyInsurance: true,
    });
    const [product, setProduct] = useState<any>();
    const [imageData, setImageData] = useState([]);
    const [
        isOpenPaymentSuccessModal,
        setIsOpenPaymentSuccessModal,
    ] = useState<boolean>(false);
    const [isSendToLocalPharmacyModal, setSendToLocalPharmacyModal] = useState(
        false,
    );
    const [selectedProduct, setSelectedProduct] = useState<any>({
        supplementIds: [],
    });

    //Medical History States
    const [medicines, setMedicines] = useState<any>([]);

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
                    const currentQuestionIndex = hairRegrowthQuestions.findIndex(
                        (question: any) => question.qId === activeQuestionId,
                    );
                    const nextQuestion =
                        hairRegrowthQuestions[currentQuestionIndex];
                    return { ...nextQuestion };
                });
            }
            if (currentQuestionObj?.qId === "QUE_14") {
                reset({
                    otherText: currentQuestionObj?.answers.find(
                        (answer: any) => answer?.Other,
                    )?.Other,
                });
            }
            if (currentQuestionObj?.qId === "QUE_7") {
                if (
                    currentQuestionObj &&
                    currentQuestionObj?.answers?.length > 1
                ) {
                    currentQuestionObj?.answers[1]?.map((data: any) => {
                        return hairProduct.push({
                            name: data?.name,
                            sideEffect: data?.sideEffect,
                        });
                    });
                } else {
                    hairProduct.push({
                        name: "",
                        callMethod: "",
                    });
                }
                reset({
                    test: hairProduct,
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
            setSelectedProduct(assessMentDetails?.treatmentOption?.treatment);
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
                        assessMentDetails?.checkout?.insuranceAdditionalDetails,
                });
                setCheckoutPayload((d: any) => {
                    return {
                        applyInsurance:
                            assessMentDetails?.checkout?.applyInsurance,
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
            //function for profile step1
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
                    } else if (
                        assessMentDetails?.treatmentOption?.product?.length > 0
                    ) {
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
            //function for assessment step2
            if (current === 1) {
                let questionPayload: any = {};

                const formData = getValues();
                questionPayload = {
                    ...currentQuestionObj,
                    answers: currentQuestionObj?.answers,
                };

                if (currentQuestionObj?.qId === "QUE_7") {
                    const updatedAnswers = [
                        currentQuestionObj?.answers.toString(),
                        formData?.test,
                    ];
                    questionPayload = {
                        ...currentQuestionObj,
                        answers: updatedAnswers,
                    };
                }
                const responseFromNext = await assessmentQuestionSendAPI(
                    questionPayload,
                    assessmentId,
                );

                if (responseFromNext) {
                    const currentQuestionIndex = hairRegrowthQuestions.findIndex(
                        (question: any) =>
                            question.qId === currentQuestionObj.qId,
                    );

                    if (currentQuestionIndex === 13) {
                        setCurrent(2);
                        router.query.activeQuestionId = "ME_QUE_1";
                        router.push(router);
                    } else {
                        const nextQuestion =
                            hairRegrowthQuestions[currentQuestionIndex + 1];
                        router.query.activeQuestionId = nextQuestion.qId;
                        router.push(router);
                    }
                }
            }
            //function for medical history step3
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
            //function for treatment options step3
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
                            productId: selectedProduct?.productId,
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
                            applyInsurance: checkoutPayload?.applyInsurance,
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
            const currentQuestionIndex = hairRegrowthQuestions.findIndex(
                (question: any) => question.qId === currentQuestionObj.qId,
            );
            if (currentQuestionIndex === 0) {
                setCurrent(0);
                router.query.activeQuestionId = "begin_assessment";
                router.push(router);
            } else {
                const prevQuestion =
                    hairRegrowthQuestions[currentQuestionIndex - 1];
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
                if (
                    assessMentDetails?.treatmentOption?.treatment
                        ?.hasLocalPharmacy === true
                ) {
                    router.query.activeQuestionId = "treatment-frequency";
                    router.push(router);
                } else {
                    router.query.activeQuestionId = "delivery-address";
                    router.push(router);
                }
            }
            if (activeQuestionId === "upload-insurance") {
                router.query.activeQuestionId = "upload-identification";
                router.push(router);
            }
            if (activeQuestionId === "checkout") {
                if (
                    assessMentDetails?.treatmentOption?.treatment
                        ?.hasLocalPharmacy === true
                ) {
                    router.query.activeQuestionId = "upload-identification";
                    router.push(router);
                } else {
                    router.query.activeQuestionId = "upload-insurance";
                    router.push(router);
                }
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
            hairRegrowthQuestions.find((q: any) => q?.qId === activeQuestionId)
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
            if (currentQuestionObj?.qId === "QUE_14") {
                return false;
            }
            if (currentQuestionObj?.answers.length === 0) {
                return true;
            } else if (
                ["QUE_9", "QUE_10", "QUE_11"].includes(activeQuestionId)
            ) {
                let otherOptionField = 2;
                activeQuestionId === "QUE_1" ? (otherOptionField = 1) : "";
                if (currentQuestionObj?.answers.length === 1) {
                    const checkAnyOptionPresent = currentQuestionObj.options.every(
                        (option) => {
                            return !currentQuestionObj.answers.includes(
                                option.key,
                            );
                        },
                    );
                    if (checkAnyOptionPresent) {
                        return true;
                    }
                }

                if (
                    currentQuestionObj?.answers.includes(
                        `${
                            currentQuestionObj?.options?.[
                                currentQuestionObj?.options.length -
                                    otherOptionField
                            ]?.key
                        }`,
                    )
                ) {
                    {
                        if (
                            watchFields["otherText"] === "" ||
                            !formState.isValid
                        ) {
                            return true;
                        }
                    }
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
                    ["ME_QUE_3", "ME_QUE_4"].includes(activeQuestionId)
                ) {
                    if (watchFields["otherText"] === "" || !formState.isValid) {
                        return true;
                    }
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
                if (selectedProduct?.productId?.length > 0) {
                    return false;
                } else {
                    return true;
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

    // Function to get flag title
    const getTitle = (currentQuestionObj: any) => {
        if (currentQuestionObj?.flagTitle) {
            return currentQuestionObj.flagTitle;
        } else if (
            currentQuestionObj?.options?.some(
                (flag: any) => flag?.flag === "Purple",
            )
        ) {
            return "Disclaimer";
        } else {
            return "Important Health Notice";
        }
    };

    // Function to get flag description
    const getDescription = (currentQuestionObj: any) => {
        if (currentQuestionObj?.flagText) {
            return currentQuestionObj.flagText;
        } else if (
            currentQuestionObj?.options?.some(
                (flag: any) => flag?.flag === "Purple",
            )
        ) {
            return (
                <div className="text-lg font-medium mx-7 text-center">
                    Products containing Finasteride have the potential to impact
                    a fetus.
                </div>
            );
        } else {
            return "We apologize for the inconvenience, but we are unable to proceed with your assessment at this time due to the time elapsed since your last procedure. We would be happy to serve you after at least 2 months have passed since your last procedure. For immediate support, we recommend that you seek assistance from your specialist or family doctor. We appreciate your understanding, and our team looks forward to assisting you in the future.";
        }
    };

    return (
        <>
            <HairRegrowthScene
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
                }}
            />
            {assessmentExit && (
                <ExitAssessmentModal
                    isOpen={assessmentExit}
                    onClose={() => {
                        setAssessmentExit(false);
                    }}
                />
            )}
            {assessmentFlag?.status && (
                <CommonModalComponent
                    isOpen={assessmentFlag?.status}
                    title={getTitle(currentQuestionObj)}
                    description={getDescription(currentQuestionObj)}
                    onClose={() => {
                        setAssessmentFlag(null);
                    }}
                    setLoadingState={setLoadingState}
                    loadingState={loadingState}
                    assessmentId={assessmentId}
                    currentQuestionObj={currentQuestionObj}
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

HairRegrowthContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (context: NextPageContext) => {
        const activeQuestionId: any = context?.query?.activeQuestionId;
        const assessmentId: any = context?.query?.assessmentId;
        try {
            if (activeQuestionId) {
                return { assessmentId, activeQuestionId };
            }
        } catch (e: any) {
            console.log(e, "e");
        }
    },
);

HairRegrowthContainer.Layout = BlankLayoutComponent;
export default HairRegrowthContainer;
