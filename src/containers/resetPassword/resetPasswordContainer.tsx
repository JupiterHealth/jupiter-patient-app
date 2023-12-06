import { AuthLayoutComponent } from "@components/layout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordAPI } from "@redux/services/auth.api";
import useResetPassword from "jupiter-commons/src/components/libs/useResetPassword";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    ResetPasswordFormInputs,
    ResetPasswordFormValidateSchema,
} from "src/schemas/resetPasswordSchema";
import ResetPasswordScene from "./resetPasswordScene";

const SetNewPasswordContainer = () => {
    const {
        register,
        formState,
        handleSubmit,
        watch,
    } = useForm<ResetPasswordFormInputs>({
        resolver: yupResolver(ResetPasswordFormValidateSchema),
    });
    const watchFields = watch();

    const {
        onSubmit,
        handleCheckPasswordCriteria,
        handleUpdateCommonStates,
        commonStates,
        defaultStates,
    } = useResetPassword({
        API: resetPasswordAPI,
        successRedirectTo: "/login",
        failRedirectTo: "/forgot-password",
    });

    useEffect(() => {
        return () => {
            handleUpdateCommonStates(defaultStates);
        };
    }, []);

    return (
        <>
            <ResetPasswordScene
                {...{
                    register,
                    formState,
                    handleSubmit,
                    onSubmit,
                    handleCheckPasswordCriteria,
                    watchFields,
                    handleUpdateCommonStates,
                    caseSensitiveValidated:
                        commonStates?.caseSensitiveValidated,
                    numberValidated: commonStates?.numberValidated,
                    specialValidated: commonStates?.specialValidated,
                    lengthValidated: commonStates?.lengthValidated,
                    isValidationSectionShow:
                        commonStates?.isValidationSectionShow,
                }}
            />
        </>
    );
};

SetNewPasswordContainer.Layout = AuthLayoutComponent;
export default SetNewPasswordContainer;
