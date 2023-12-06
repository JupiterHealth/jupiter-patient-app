import { AuthLayoutComponent } from "@components/layout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordAPI, resendLinkAPI } from "@redux/services/auth.api";
import useForgotPassword from "jupiter-commons/src/components/libs/useForgotPassword";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    ForgotPasswordFormInputs,
    ForgotPasswordFormValidateSchema,
} from "src/schemas/forgotPasswordSchema";
import ForgotPasswordScene from "./forgotPasswordScene";
import { OTP_RESEND_TIME } from "jupiter-commons/src/components/libs/constants";

const ForgotPasswordContainer = () => {
    const {
        register,
        formState,
        handleSubmit,
        setFocus,
        watch,
    } = useForm<ForgotPasswordFormInputs>({
        resolver: yupResolver(ForgotPasswordFormValidateSchema),
    });
    const watchFields = watch();

    const {
        onSubmit,
        handleResendInvite,
        setIsCounter,
        setIsForgotLinkSending,
        setIsLinkResend,
        counter,
        isCounter,
        isForgotLinkSending,
        isLinkResend,
    } = useForgotPassword({
        forgotPassAPI: forgotPasswordAPI,
        resendLinkAPI,
        defaultCounter: OTP_RESEND_TIME,
    });

    useEffect(() => {
        setFocus("email");
        return () => {
            setIsCounter(false);
            setIsForgotLinkSending(false);
            setIsLinkResend(false);
        };
    }, []);

    return (
        <>
            <ForgotPasswordScene
                {...{
                    register,
                    formState,
                    handleSubmit,
                    onSubmit,
                    handleResendInvite,
                    watchFields,
                    isForgotLinkSending,
                    isLinkResend,
                    counter,
                    isCounter,
                }}
            />
        </>
    );
};

ForgotPasswordContainer.Layout = AuthLayoutComponent;
ForgotPasswordContainer.MetaData = {
    title: "Forgot Password",
    description: "Forgot Password",
    routerInfo: {
        name: "Forgot Password",
        label: "Forgot Password",
    },
};
export default ForgotPasswordContainer;
