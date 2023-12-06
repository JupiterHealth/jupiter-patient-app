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
import { message } from "antd";
import useList from "jupiter-commons/src/components/libs/useList";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardScene from "./dashboardScene";

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
    const createNewAssessmentHandler = async (serviceKey: string) => {
        try {
            setIsLoadingCreateAssessment(true);
            const assessmentRes = await createNewAssessmentAPI(serviceKey);

            if (assessmentRes) {
                if (assessmentRes?.questions?.length === 0) {
                    router.query.activeQuestionId = "my-profile";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (assessmentRes?.checkout?.shippingAddress) {
                    router.query.activeQuestionId = "delivery-address";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency &&
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency !== ""
                ) {
                    router.query.activeQuestionId = "treatment-frequency";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.supplements?.length > 0
                ) {
                    router.query.activeQuestionId = "complementing-suppliments";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (assessmentRes?.treatmentOption?.product) {
                    router.query.activeQuestionId = "treatment-options";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
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
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
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
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else {
                    router.query.activeQuestionId = "QUE_1";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
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

    const handleInProgressAssessment = async (assessmentId: any) => {
        try {
            setLoadingRedirectAssessment(true);
            const assessmentRes = await checkAssessmentAPI(assessmentId);
            if (assessmentRes) {
                if (assessmentRes?.questions?.length === 0) {
                    router.query.activeQuestionId = "my-profile";

                    router.push(
                        `pain-management/${assessmentRes?.assessment?.id}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (assessmentRes?.checkout?.shippingAddress) {
                    router.query.activeQuestionId = "delivery-address";

                    router.push(
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency &&
                    assessmentRes?.treatmentOption?.treatment
                        ?.deliveryFrequency !== ""
                ) {
                    router.query.activeQuestionId = "treatment-frequency";

                    router.push(
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (
                    assessmentRes?.treatmentOption?.supplements?.length > 0
                ) {
                    router.query.activeQuestionId = "complementing-suppliments";

                    router.push(
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else if (assessmentRes?.treatmentOption?.product) {
                    router.query.activeQuestionId = "treatment-options";

                    router.push(
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
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
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
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
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
                    );
                } else {
                    router.query.activeQuestionId = "QUE_1";

                    router.push(
                        `pain-management/${assessmentId}?activeQuestionId=${router.query.activeQuestionId}`,
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

    console.log("🚀 -----------------------------------------------------🚀");
    console.log("🚀 ~ loginUserData?.user?.id:", loginUserData?.user?.id);
    console.log("🚀 -----------------------------------------------------🚀");
    console.log("🚀 -------------------------------------------------------🚀");
    console.log("🚀 ~ SignupUserData?.user?.id:", SignupUserData?.user?.id);
    console.log("🚀 -------------------------------------------------------🚀");

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
                }}
            />
        </>
    );
};

DashboardContainer.Layout = MainLayoutComponent;
export default DashboardContainer;
