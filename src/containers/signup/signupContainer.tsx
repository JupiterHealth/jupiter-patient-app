import { AuthLayoutComponent } from "@components/layout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@redux/reducers";
import {
    signupOtpVerificationAPI,
    signupResendOtpAPI,
} from "@redux/services/auth.api";
import {
    SignupState,
    doSignup,
    fetchSignupUser,
    signupReset,
} from "@redux/slices/auth";
import { PATIENT_COOKIE } from "jupiter-commons/src/components/libs/constants";
import useSignUpContainer from "jupiter-commons/src/components/libs/useSignUpContainer";
import useSignUpStatus from "jupiter-commons/src/components/libs/useSignupStatus";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    SignupFormInputs,
    SignupFormValidateSchema,
} from "src/schemas/signupSchema";
import SignupScene from "./signupScene";
import { OTP_RESEND_TIME } from "jupiter-commons/src/components/libs/constants";
import PrivacyPolicyModal from "@components/theme/modal/privacyPolicyModal/privacyPolicyModal";
import TermsOfUseModal from "@components/theme/modal/termsOfUseModal/termsOfUseModal";
import { wrapper } from "@redux/store";
import { NextPageContext } from "next";
import { createNewAssessmentAPI } from "@redux/services/assessment.api";

export interface SignupContainerProps {
    serviceKey?: string;
}

const SignupContainer = (props: SignupContainerProps) => {
    const {
        register,
        formState,
        handleSubmit,
        setFocus,
        watch,
        setValue,
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(SignupFormValidateSchema),
    });

    const { serviceKey } = props;

    const SignUpState: SignupState = useSelector(
        (state: RootState) => state.signup,
    );

    const watchFields = watch();

    const {
        isLoading,
        isOtpVerification,
        isLoadingAssessment,
    } = useSignUpStatus({
        redirectSlug: "/dashboard",
        resetAction: signupReset(),
        dynamicValues: {
            cookieName: PATIENT_COOKIE,
        },
        serviceKey,
        createNewAssessmentAPI: createNewAssessmentAPI,
    });
    const [privacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [termsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

    const handleOk = () => {
        setIsPrivacyModalOpen(false);
        setIsTermsOfUseModalOpen(false);
    };

    const {
        onSubmit,
        setOtp,
        handleOtpVerification,
        handleOtpResend,
        setCounter,
        handleCheckPasswordCriteria,
        handleUpdateCommonStates,
        otp,
        counter,
        isOtpResend,
        isOtpSubmitting,
        defaultStates,
        commonStates,
    } = useSignUpContainer({
        fetchSignUp: doSignup,
        fetchWhoAmI: fetchSignupUser,
        otpVerificationAPI: signupOtpVerificationAPI,
        otpResendAPI: signupResendOtpAPI,
        defaultCounter: OTP_RESEND_TIME, // Two minutes
    });

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isOtpVerification && counter > 0) {
            timer = setInterval(
                () => setCounter((prevCounter) => prevCounter - 1),
                1000,
            );
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isOtpVerification, counter]);

    useEffect(() => {
        setFocus("email");
        return () => {
            handleUpdateCommonStates(defaultStates);
        };
    }, []);

    return (
        <div>
            <SignupScene
                {...{
                    register,
                    formState,
                    handleCheckPasswordCriteria,
                    isLoading,
                    SignUpState,
                    isOtpVerification,
                    otp,
                    setOtp,
                    watchFields,
                    counter,
                    setFocus,
                    isOtpSubmitting,
                    isOtpResend,
                    handleUpdateCommonStates,
                    caseSensitiveValidated:
                        commonStates?.caseSensitiveValidated,
                    numberValidated: commonStates?.numberValidated,
                    specialValidated: commonStates?.specialValidated,
                    lengthValidated: commonStates?.lengthValidated,
                    isValidationSectionShow:
                        commonStates?.isValidationSectionShow,
                    onSave: handleSubmit(onSubmit),
                    onOtpSubmit: handleSubmit(handleOtpVerification),
                    onOtpResend: handleSubmit(handleOtpResend),
                    setValue,
                    setIsPrivacyModalOpen,
                    setIsTermsOfUseModalOpen,
                    isLoadingAssessment,
                }}
            />
            {privacyModalOpen && (
                <PrivacyPolicyModal
                    {...{
                        isOpen: privacyModalOpen,
                        handleCancel: handleOk,
                        handleOk,
                    }}
                />
            )}
            {termsOfUseModalOpen && (
                <TermsOfUseModal
                    {...{
                        isOpen: termsOfUseModalOpen,
                        handleCancel: handleOk,
                        handleOk,
                    }}
                />
            )}
        </div>
    );
};

SignupContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (context: NextPageContext) => {
        const serviceKey: any = context?.query?.key;

        try {
            if (serviceKey) {
                return { serviceKey };
            }
        } catch (e: any) {
            console.log(e, "e2");
        }
    },
);

SignupContainer.Layout = AuthLayoutComponent;
export default SignupContainer;
