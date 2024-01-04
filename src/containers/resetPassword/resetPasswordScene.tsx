import PasswordRequiredComponent from "@components/passwordRequiredComponent/passwordRequiredComponent";
import { Button } from "antd";
import { INPUT_TAX_MAX_LENGTH } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputPasswordField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

export interface ResetPasswordSceneProps {
    register: any;
    formState: any;
    handleSubmit: (data: any) => () => void;
    handleCheckPasswordCriteria: (d: any) => void;
    onSubmit: (d: any) => void;
    isValidationSectionShow: boolean;
    lengthValidated: boolean;
    specialValidated: boolean;
    caseSensitiveValidated: boolean;
    numberValidated: boolean;
    watchFields: any;
    handleUpdateCommonStates: (d: any) => void;
}

const ResetPasswordScene = (props: ResetPasswordSceneProps) => {
    const {
        register,
        formState,
        handleSubmit,
        onSubmit,
        handleCheckPasswordCriteria,
        isValidationSectionShow,
        lengthValidated,
        specialValidated,
        caseSensitiveValidated,
        numberValidated,
        watchFields,
        handleUpdateCommonStates,
    } = props;
    return (
        <>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1 className="text-2xl xl:text-2xl font-bold text-secondary">
                            Reset Your Password
                        </h1>
                        <p className="text-base font-bold text-light-black mt-4 xl:mt-2 2xl:mt-2">
                            Enter a new password below for your Jupiter account.
                        </p>
                        <div className="mt-6 relative">
                            <FormGroup className="!mb-2 w-full md:w-[85%] mx-auto">
                                <div className="flex mb-1">
                                    <p className="text-base font-medium text-start">
                                        New Password
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputPasswordField
                                    {...{
                                        register,
                                        formState,
                                        id: "newPassword",
                                        placeholder: "Enter Password",
                                        maxLength: INPUT_TAX_MAX_LENGTH,
                                        onChange: (e: any) =>
                                            handleCheckPasswordCriteria(
                                                e?.target?.value,
                                            ),
                                        onFocus: () =>
                                            handleUpdateCommonStates({
                                                isValidationSectionShow: true,
                                            }),
                                        onBlur: () =>
                                            handleUpdateCommonStates({
                                                isValidationSectionShow: false,
                                            }),
                                    }}
                                />
                            </FormGroup>
                            <div className="!absolute left-0 md:!left-[42px]">
                                {/* Input Validation start here */}
                                {/* {isValidationSectionShow && ( */}
                                <PasswordRequiredComponent
                                    {...{
                                        lengthValidated,
                                        specialValidated,
                                        caseSensitiveValidated,
                                        numberValidated,
                                    }}
                                />
                                {/* )} */}
                                {/* Input Validation end here */}
                            </div>
                            <FormGroup
                                className={
                                    "!mb-2 w-full md:w-[85%] mt-16 mx-auto"
                                }
                            >
                                <div className="flex mb-1">
                                    <p className="text-base font-medium text-start">
                                        Confirm New Password
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputPasswordField
                                    {...{
                                        register,
                                        formState,
                                        maxLength: INPUT_TAX_MAX_LENGTH,
                                        id: "confirmPassword",
                                        placeholder: "Confirm Password",
                                    }}
                                />
                            </FormGroup>
                            <div className="mt-9">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-primary text-lg font-medium px-9 mx-auto flex items-center justify-center antLoaderButton"
                                    loading={formState?.isSubmitting}
                                    disabled={
                                        formState?.isSubmitting ||
                                        !lengthValidated ||
                                        !specialValidated ||
                                        !caseSensitiveValidated ||
                                        !numberValidated ||
                                        !(
                                            watchFields?.newPassword &&
                                            watchFields?.confirmPassword
                                        )
                                    }
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPasswordScene;
