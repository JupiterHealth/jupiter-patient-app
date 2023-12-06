import { AuthLayoutComponent } from "@components/layout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@redux/reducers";
import {
    loginOtpVerificationAPI,
    loginResendOtpAPI,
} from "@redux/services/auth.api";
import { PATIENT_COOKIE } from "jupiter-commons/src/components/libs/constants";
import useLoginContainer from "jupiter-commons/src/components/libs/useLoginContainer";
import useLoginStatus from "jupiter-commons/src/components/libs/useLoginStatus";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    LoginFormInputs,
    LoginFormValidateSchema,
} from "src/schemas/loginSchema";
import {
    LoginState,
    doLogin,
    fetchLoginUser,
    loginReset,
} from "../../redux/slices/auth";
import LoginScene from "./loginScene";
import { OTP_RESEND_TIME } from "jupiter-commons/src/components/libs/constants";
import PrivacyPolicyModal from "@components/theme/modal/privacyPolicyModal/privacyPolicyModal";
import TermsOfUseModal from "@components/theme/modal/termsOfUseModal/termsOfUseModal";

const LoginContainer = () => {
    const {
        register,
        formState,
        handleSubmit,
        setFocus,
        watch,
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(LoginFormValidateSchema),
    });

    const loginState: LoginState = useSelector(
        (state: RootState) => state.login,
    );
    const watchFields = watch();
    const { isLoading, isOtpVerification } = useLoginStatus({
        redirectSlug: "/dashboard",
        resetAction: loginReset(),
        dynamicValues: {
            cookieName: PATIENT_COOKIE,
        },
    });

    const {
        onSubmit,
        setOtp,
        handleOtpVerification,
        handleOtpResend,
        setCounter,
        otp,
        counter,
        isOtpResend,
        isOtpSubmitting,
    } = useLoginContainer({
        fetchLogin: doLogin,
        fetchWhoAmI: fetchLoginUser,
        otpVerificationAPI: loginOtpVerificationAPI,
        otpResendAPI: loginResendOtpAPI,
        defaultCounter: OTP_RESEND_TIME, // Two minutes
    });

    const [privacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [termsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

    const handleOk = () => {
        setIsPrivacyModalOpen(false);
        setIsTermsOfUseModalOpen(false);
    };

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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, []);

    return (
        <div>
            <LoginScene
                {...{
                    register,
                    formState,
                    onSubmit,
                    handleSubmit,
                    isLoading,
                    loginState,
                    otp,
                    setOtp,
                    handleOtpResend,
                    handleOtpVerification,
                    isOtpVerification,
                    counter,
                    watchFields,
                    isOtpSubmitting,
                    isOtpResend,
                    setIsPrivacyModalOpen,
                    setIsTermsOfUseModalOpen,
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

LoginContainer.Layout = AuthLayoutComponent;
export default LoginContainer;
