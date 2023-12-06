import PasswordRequiredComponent from "@components/passwordRequiredComponent/passwordRequiredComponent";
import { SignupState } from "@redux/slices/auth";
import { Button } from "antd";
import { INPUT_TAX_MAX_LENGTH } from "jupiter-commons/src/components/libs/constants";
import { handleFormatTimer } from "jupiter-commons/src/components/libs/helpers";
import {
    CheckBoxField,
    FormGroup,
    InputField,
    InputPasswordField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import Link from "next/link";
import OTPInput from "react-otp-input";
import SignupStyle from "./signupStyles.module.scss";
import { Logo } from "jupiter-commons/src/components/theme/logo/logo";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";

export interface SignupSceneProps {
    register: any;
    formState: any;
    isOtpVerification: boolean;
    isLoading: boolean;
    SignUpState: SignupState;
    otp: any;
    setOtp: any;
    isValidationSectionShow: boolean;
    lengthValidated: boolean;
    specialValidated: boolean;
    caseSensitiveValidated: boolean;
    numberValidated: boolean;
    watchFields: any;
    counter: number;
    isOtpSubmitting: boolean;
    isOtpResend: boolean;
    onSave: (d: any) => void;
    onOtpSubmit: (d: any) => void;
    onOtpResend: (d: any) => void;
    handleCheckPasswordCriteria: (d: any) => void;
    handleUpdateCommonStates: (d: any) => void;
    setValue: any;
    setIsPrivacyModalOpen: (d: any) => void;
    setIsTermsOfUseModalOpen: (d: any) => void;
    isLoadingAssessment?: boolean;
}

const SignupScene = (props: SignupSceneProps) => {
    const {
        register,
        formState,
        isOtpVerification,
        SignUpState,
        otp,
        setOtp,
        isValidationSectionShow,
        lengthValidated,
        specialValidated,
        caseSensitiveValidated,
        numberValidated,
        watchFields,
        counter,
        isOtpSubmitting,
        isOtpResend,
        isLoading,
        onSave,
        handleCheckPasswordCriteria,
        onOtpResend,
        onOtpSubmit,
        handleUpdateCommonStates,
        setIsPrivacyModalOpen,
        setIsTermsOfUseModalOpen,
        setValue,
        isLoadingAssessment,
    } = props;

    return (
        <>
            {isLoadingAssessment && <DefaultSkeleton />}
            {!isLoadingAssessment && !isOtpVerification && (
                <div className="flex justify-center">
                    <form onSubmit={onSave}>
                        <div>
                            <Link href="/">
                                <Logo className="!w-52 mx-auto mb-6 block md:hidden" />
                            </Link>
                            <h1
                                className={`text-3xl 2xl:text-2xl font-bold text-secondary ${
                                    isValidationSectionShow
                                        ? "xl:text-2xl 2xl:text-2xl"
                                        : "xl:text-2xl 2xl:text-2xl"
                                }`}
                            >
                                Let's get started!
                            </h1>
                            <p
                                className={`font-bold text-light-black mt-[1px] pt-4 md:pt-5 xl:pt-0 ${
                                    isValidationSectionShow
                                        ? "text-base xl:text-sm"
                                        : "text-base xl:text-sm"
                                }`}
                            >
                                Sign up below by entering your email and
                                creating a password.
                            </p>
                            <div
                                className={`relative w-full md:!w-fit mx-auto flex flex-col items-center justify-center ${
                                    isValidationSectionShow
                                        ? "mt-6 xl:mt-2 2xl:mt-3"
                                        : "mt-6 xl:mt-4 2xl:mt-6"
                                }`}
                            >
                                <FormGroup
                                    className={`w-full md:w-[397px] ${
                                        isValidationSectionShow
                                            ? "!mb-4 md:!mb-5 2xl:!mb-3 xl:!mb-1"
                                            : "!mb-4 md:!mb-5 2xl:!mb-5 xl:!mb-4"
                                    }`}
                                >
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            id: "email",
                                            label: "Email",
                                            className: "w-full",
                                            placeholder: "Enter Email",
                                        }}
                                    />
                                </FormGroup>
                                <div className="flex mb-1 w-full">
                                    <p className="text-base font-medium text-start">
                                        Create Password
                                    </p>
                                    <span className="text-danger text-lg">
                                        *
                                    </span>
                                </div>
                                <FormGroup
                                    className={`w-full md:w-[397px] ${
                                        isValidationSectionShow
                                            ? "xl:!mb-3"
                                            : "!mb-2"
                                    }`}
                                >
                                    <InputPasswordField
                                        {...{
                                            register,
                                            formState,
                                            id: "password",
                                            className: "w-full",
                                            placeholder: "Create Password",
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
                                <div>
                                    {/* Input Validation start here */}
                                    {isValidationSectionShow && (
                                        <PasswordRequiredComponent
                                            {...{
                                                lengthValidated,
                                                specialValidated,
                                                caseSensitiveValidated,
                                                numberValidated,
                                            }}
                                        />
                                    )}
                                    {/* Input Validation end here */}
                                </div>
                                <div
                                    className={
                                        isValidationSectionShow
                                            ? "pt-16 md:pt-14 xl:pt-12 2xl:pt-12 flex !items-start mt-1 w-full"
                                            : "pt-1 flex !items-start mt-3 xl:mt-1 w-full"
                                    }
                                >
                                    <CheckBoxField
                                        {...{
                                            register,
                                            formState,
                                            name: "thickened skin",
                                            type: "Checkbox",
                                            id: "checkbox",
                                            className:
                                                "w-[16px] h-[16px] xl:w-[16px] xl:h-[16px] 2xl:w-[18px] 2xl:h-[18px]",
                                            onChange: (e: any) => {
                                                setValue(
                                                    "checkbox",
                                                    e?.target?.checked,
                                                );
                                            },
                                        }}
                                    />
                                    <label
                                        htmlFor="checkbox"
                                        className="relative bottom-[2px] xl:bottom-[1px] ml-2 text-sm xl:text-xs 2xl:text-sm font-medium"
                                    >
                                        Accept
                                        <span
                                            className="text-secondary underline cursor-pointer mx-1"
                                            onClick={() =>
                                                setIsPrivacyModalOpen(true)
                                            }
                                        >
                                            Privacy policy
                                        </span>
                                        and
                                        <span
                                            className="text-secondary underline cursor-pointer ml-1"
                                            onClick={() =>
                                                setIsTermsOfUseModalOpen(true)
                                            }
                                        >
                                            Terms of use
                                        </span>
                                        .
                                    </label>
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={`btn-primary text-lg font-medium px-9 mx-auto flex items-center justify-center !mt-3 antLoaderButton focus:!bg-primary focus:text-white focus:border-primary ${
                                            isValidationSectionShow
                                                ? "mt-8 md:!mt-9 xl:!mt-3 2xl:!mt-6"
                                                : "mt-8 md:!mt-9 xl:!mt-5"
                                        } ${SignupStyle.disabledButton}`}
                                        loading={
                                            SignUpState?.isLoading ||
                                            formState?.isSubmitting ||
                                            isLoading
                                        }
                                        disabled={
                                            formState?.isSubmitting ||
                                            !caseSensitiveValidated ||
                                            !numberValidated ||
                                            !specialValidated ||
                                            !lengthValidated ||
                                            !(
                                                watchFields?.email &&
                                                watchFields?.password &&
                                                watchFields?.checkbox
                                            )
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div
                                    className={`${
                                        isValidationSectionShow
                                            ? "mt-8 md:mt-8 xl:mt-3 2xl:mt-5"
                                            : "mt-8 md:mt-8 xl:mt-3 2xl:mt-6"
                                    }`}
                                >
                                    <h1
                                        className={`font-medium text-light-black ${
                                            isValidationSectionShow
                                                ? "text-base xl:text-xs 2xl:text-sm"
                                                : "text-base xl:text-sm 2xl:text-sm"
                                        }`}
                                    >
                                        Already have an account?
                                    </h1>
                                    <Link href={"/login"}>
                                        <p
                                            className={`text-secondary font-semibold underline mt-2  xl:mt-[2px] ${
                                                isValidationSectionShow
                                                    ? "text-lg xl:text-sm 2xl:text-base"
                                                    : "text-lg xl:text-[15px] 2xl:text-base"
                                            }`}
                                        >
                                            Sign In to Jupiter Health
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isOtpVerification && (
                <form onSubmit={onOtpSubmit}>
                    <div className="flex justify-center h-[235px]">
                        <div>
                            <h1 className="text-3xl xl:text-2xl 2xl:text-2xl font-bold text-secondary">
                                Verify your email
                            </h1>
                            <p className="text-base font-bold text-light-black mt-5 xl:mt-2">
                                Please enter the six digit verification code
                                sent to your email.
                            </p>
                            <div className="w-fit mx-auto mt-[29px]">
                                <p className="text-base text-light-black text-left font-medium mb-2">
                                    Enter 6-digit Code
                                    <span className="text-danger">*</span>
                                </p>
                                <OTPInput
                                    value={otp}
                                    onChange={(newOtp: string) => {
                                        if (newOtp.length === 6) {
                                            if (otp?.length === 6) {
                                                return;
                                            }
                                            setOtp(
                                                newOtp.length <= 6
                                                    ? newOtp
                                                    : otp?.substring(0, 5) +
                                                          newOtp?.charAt(5),
                                            );
                                        } else {
                                            setOtp(newOtp);
                                        }
                                    }}
                                    shouldAutoFocus={true}
                                    numInputs={6}
                                    renderSeparator={
                                        <span className="mx-2.5" />
                                    }
                                    containerStyle="justify-center"
                                    inputStyle={`ant-input ${SignupStyle.otpInput} text-black`}
                                    renderInput={(props) => (
                                        <input {...props} type="tel" />
                                    )}
                                />
                            </div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={`btn-primary text-lg font-medium px-9 mx-auto flex items-center justify-center !mt-11 antLoaderButton`}
                                loading={isOtpSubmitting}
                                disabled={!otp || otp.length !== 6}
                            >
                                Verify
                            </Button>
                            <div className="mt-5">
                                <h3 className="mt-3 text-center text-primary font-bold">
                                    {handleFormatTimer(counter)}
                                </h3>
                                <h1 className="text-base mt-6 xl:mt-3 mb-1 font-medium text-light-black">
                                    Didn't receive the code?
                                </h1>
                                <div className={SignupStyle.resendBtn}>
                                    <Button
                                        type="link"
                                        className={`!text-secondary h-6 text-lg xl:text-base font-semibold mt-1 xl:!mt-2 antLoaderButton`}
                                        loading={isOtpResend}
                                        disabled={counter !== 0}
                                        onClick={onOtpResend}
                                    >
                                        Resend Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default SignupScene;
