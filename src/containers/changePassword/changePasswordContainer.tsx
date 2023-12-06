import { MainLayoutComponent } from "@components/layout/mainLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordAPI } from "@redux/services/auth.api";
import { PATIENT_COOKIE } from "jupiter-commons/src/components/libs/constants";
import useChangePassword from "jupiter-commons/src/components/libs/useChangePassword";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    ChangePasswordFormInputs,
    ChangePasswordFormValidateSchema,
} from "src/schemas/changePasswodSchema";
import ChangePasswordScene from "./changepasswordScene";

const ChangePasswordContainer = () => {
    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    const {
        register,
        handleSubmit,
        formState,
        reset,
        watch,
    } = useForm<ChangePasswordFormInputs>({
        defaultValues: initialValues,
        resolver: yupResolver(ChangePasswordFormValidateSchema),
    });
    const watchFields = watch();

    const {
        onSubmit,
        handleCheckPasswordCriteria,
        handleUpdateCommonStates,
        commonStates,
        defaultStates,
    } = useChangePassword({
        API: changePasswordAPI,
        reset,
        initialValues,
        dynamicValues: {
            cookieName: PATIENT_COOKIE,
        },
    });

    useEffect(() => {
        return () => {
            handleUpdateCommonStates(defaultStates);
        };
    }, []);

    return (
        <>
            <ChangePasswordScene
                {...{
                    register,
                    formState,
                    onSave: handleSubmit(onSubmit),
                    handleCheckPasswordCriteria,
                    caseSensitiveValidated:
                        commonStates?.caseSensitiveValidated,
                    numberValidated: commonStates?.numberValidated,
                    specialValidated: commonStates?.specialValidated,
                    lengthValidated: commonStates?.lengthValidated,
                    isClearedValues: commonStates?.isClearedValues,
                    isValidationSectionShow:
                        commonStates?.isValidationSectionShow,
                    watchFields,
                    handleUpdateCommonStates,
                }}
            />
        </>
    );
};

ChangePasswordContainer.Layout = MainLayoutComponent;
export default ChangePasswordContainer;
