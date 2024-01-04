import { MainLayoutComponent } from "@components/layout/mainLayout";
import {
    checkAssessmentAPI,
    createNewAssessmentAPI,
    fetchServiceForDashboard,
} from "@redux/services/assessment.api";
import { LoginUserState, SignupUserState } from "@redux/slices/auth";
import {
    MyAssessmentListState,
    fetchMyAssessment,
} from "@redux/slices/myAssessment";
import useList from "jupiter-commons/src/components/libs/useList";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardScene from "./dashboardScene";
import {
    ASSESSMENT_ENUM,
    ASSESSMENT_ENUM_VALUE,
} from "jupiter-commons/src/components/libs/constants";

const DashboardContainer = () => {
    const dispatch = useDispatch<any>();
    const {
        apiParam,
        setPaginationObj,
        paginationObj,
        handleOnTableChange,
        setApiParam,
    } = useList({
        queryParams: {
            orderBy: "uniqueId|asc",
            skip: 0,
            take: 50,
            include: ["service", "assessmentHasPatientProfile"],
        },
    });
    const {
        data: myAssessmentList,
        isLoading: loadingAssessmentList,
    }: MyAssessmentListState = useSelector((state: any) => state.myAssessment);

    const { data: loginUserData }: LoginUserState = useSelector(
        (state: any) => state.loginUser,
    );
    const { data: SignupUserData }: SignupUserState = useSelector(
        (state: any) => state.signupUser,
    );
    const [services, setServices] = useState<any>([]);
    const [serviceKey, setServiceKey] = useState<any>("");
    const [
        loadingCreateAssessment,
        setIsLoadingCreateAssessment,
    ] = useState<boolean>(false);
    const [
        loadingRedirectAssessment,
        setLoadingRedirectAssessment,
    ] = useState<boolean>(false);
    const [loadingServices, setLoadingServices] = useState<boolean>(false);
    const [selectedAssessment, setSelectedAssessment] = useState(null);

    const createNewAssessmentHandler = async (serviceKey: string) => {
        try {
            setIsLoadingCreateAssessment(true);
            const assessmentRes = await createNewAssessmentAPI(serviceKey);

            const key =
                ASSESSMENT_ENUM.PAIN_MANAGEMENT === serviceKey
                    ? ASSESSMENT_ENUM_VALUE.PAIN_MANAGEMENT
                    : ASSESSMENT_ENUM.DERMATOLOGY === serviceKey
                    ? ASSESSMENT_ENUM_VALUE.DERMATOLOGY
                    : ASSESSMENT_ENUM.HAIR_REGROWTH === serviceKey
                    ? ASSESSMENT_ENUM_VALUE.HAIR_REGROWTH
                    : "";

            if (assessmentRes) {
                if (assessmentRes?.questions?.length === 0) {
                    router.query.activeQuestionId = "my-profile";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (assessmentRes?.checkout?.shippingAddress) {
                    router.query.activeQuestionId = "delivery-address";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency &&
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency !== ""
                ) {
                    router.query.activeQuestionId = "treatment-frequency";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.supplements?.length > 0
                ) {
                    router.query.activeQuestionId = "complementing-suppliments";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.product?.length > 0
                ) {
                    router.query.activeQuestionId = "treatment-options";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes &&
                    assessmentRes?.medicalHistory?.length > 0
                ) {
                    router.query.activeQuestionId =
                        assessmentRes?.medicalHistory[
                            assessmentRes.medicalHistory.length - 1
                        ].qId;

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes &&
                    assessmentRes?.questions?.length > 0
                ) {
                    router.query.activeQuestionId =
                        assessmentRes?.questions[
                            assessmentRes.questions.length - 1
                        ].qId;

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else {
                    router.query.activeQuestionId = "QUE_1";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                }
            }
            setIsLoadingCreateAssessment(false);
            setServiceKey("");
        } catch (error) {
            console.log("error", error);
            setIsLoadingCreateAssessment(false);
            setServiceKey("");
        }
    };

    const handleFetchServiceForDashboard = async () => {
        try {
            setLoadingServices(true);
            const serviceRes = await fetchServiceForDashboard();
            if (serviceRes) {
                setServices(serviceRes);
            }
            setLoadingServices(false);
        } catch (error) {
            console.log("error", error);
            setLoadingServices(false);
        }
    };

    const handleInProgressAssessment = async (assessment: any) => {
        try {
            setLoadingRedirectAssessment(true);
            const assessmentRes = await checkAssessmentAPI(assessment?.id);
            const key =
                ASSESSMENT_ENUM.PAIN_MANAGEMENT ===
                assessment?.service?.serviceKey
                    ? ASSESSMENT_ENUM_VALUE.PAIN_MANAGEMENT
                    : ASSESSMENT_ENUM.DERMATOLOGY ===
                      assessment?.service?.serviceKey
                    ? ASSESSMENT_ENUM_VALUE.DERMATOLOGY
                    : ASSESSMENT_ENUM.HAIR_REGROWTH ===
                      assessment?.service?.serviceKey
                    ? ASSESSMENT_ENUM_VALUE.HAIR_REGROWTH
                    : "";
            if (assessmentRes) {
                if (assessmentRes?.questions?.length === 0) {
                    router.query.activeQuestionId = "my-profile";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.treatment &&
                    assessmentRes?.treatmentOption?.treatment?.hasLocalPharmacy
                ) {
                    router.query.activeQuestionId = "upload-identification";
                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.checkout?.shippingAddress &&
                    assessmentRes?.checkout?.shippingAddress
                ) {
                    router.query.activeQuestionId = "delivery-address";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency &&
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency !== ""
                ) {
                    router.query.activeQuestionId = "treatment-frequency";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.supplements?.length > 0
                ) {
                    router.query.activeQuestionId = "complementing-suppliments";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.product?.length > 0
                ) {
                    router.query.activeQuestionId = "treatment-options";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes &&
                    assessmentRes?.medicalHistory?.length > 0
                ) {
                    router.query.activeQuestionId =
                        assessmentRes?.medicalHistory[
                            assessmentRes.medicalHistory.length - 1
                        ].qId;

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes &&
                    assessmentRes?.questions?.length > 0
                ) {
                    router.query.activeQuestionId =
                        assessmentRes?.questions[
                            assessmentRes.questions.length - 1
                        ].qId;

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else {
                    router.query.activeQuestionId = "QUE_1";

                    router.push(
                        `${key}/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                }
            }
            setLoadingRedirectAssessment(false);
        } catch (error) {
            console.log("error", error);
            setLoadingRedirectAssessment(false);
        }
    };

    useEffect(() => {
        dispatch(
            fetchMyAssessment({
                ...apiParam,
                patientUserId:
                    loginUserData?.user?.id || SignupUserData?.user?.id,
                assessmentStatus: "IN_PROGRESS",
            }),
        );
    }, [apiParam]);

    useEffect(() => {
        handleFetchServiceForDashboard();
    }, []);

    return (
        <>
            <DashboardScene
                {...{
                    myAssessmentList,
                    loadingAssessmentList,
                    createNewAssessmentHandler,
                    loadingCreateAssessment,
                    services,
                    loadingServices,
                    setServiceKey,
                    serviceKey,
                    handleInProgressAssessment,
                    loadingRedirectAssessment,
                    setSelectedAssessment,
                    selectedAssessment,
                }}
            />
        </>
    );
};

DashboardContainer.Layout = MainLayoutComponent;
export default DashboardContainer;
