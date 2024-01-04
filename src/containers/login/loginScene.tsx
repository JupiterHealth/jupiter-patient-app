import { LoginState } from "@redux/slices/auth";
import { Button } from "antd";
import {
    INPUT_TAX_MAX_LENGTH,
    SIGNIN_SUB_TITLE,
    SIGNIN_TITLE,
} from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputField,
    InputPasswordField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import Link from "next/link";
import OTPInput from "react-otp-input";
import LoginStyle from "../signup/signupStyles.module.scss";
import loginStyle from "./loginStyle.module.scss";
import { handleFormatTimer } from "jupiter-commons/src/components/libs/helpers";
import { Logo } from "jupiter-commons/src/components/theme/logo/logo";

export interface LoginSceneProps {
    register: any;
    formState: any;
    onSubmit: (d: any) => void;
    handleSubmit: (data: any) => () => void;
    loginState: LoginState;
    otp: string;
    setOtp: (d: string) => void;
    isOtpVerification: boolean;
    handleOtpResend: (d: any) => void;
    handleOtpVerification: (o?: string) => void;
    counter: number;
    watchFields: any;
    isOtpSubmitting: boolean;
    isOtpResend: boolean;
    isLoading: boolean;
    setIsPrivacyModalOpen: (d: any) => void;
    setIsTermsOfUseModalOpen: (d: any) => void;
}

const LoginScene = (props: LoginSceneProps) => {
    const {
        register,
        formState,
        onSubmit,
        handleSubmit,
        loginState,
        isOtpVerification,
        otp,
        setOtp,
        handleOtpResend,
        handleOtpVerification,
        counter,
        watchFields,
        isOtpSubmitting,
        isOtpResend,
        isLoading,
        setIsPrivacyModalOpen,
        setIsTermsOfUseModalOpen,
    } = props;

    return (
        <>
            {!isOtpVerification && (
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Link href="/">
                                <Logo className="!w-52 mx-auto mb-4 block md:hidden" />
                            </Link>
                            <h1 className="text-3xl xl:text-2xl font-bold mx-auto text-secondary">
                                {SIGNIN_TITLE}
                            </h1>

                            <p className="text-base font-bold text-light-black mt-4 xl:mt-1 2xl:mt-2">
                                {SIGNIN_SUB_TITLE}
                            </p>
                            <div className="mt-6 xl:mt-4 2xl:mt-7 relative">
                                <FormGroup className="mb-4 xl:!mb-3 mx-auto">
                                    <div className="flex mb-[2px]">
                                        <p className="text-base font-medium text-start">
                                            Email
                                        </p>
                                        <span className="text-danger text-lg">
                                            *
                                        </span>
                                    </div>
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            id: "email",
                                            placeholder: "Enter Email",
                                            className: "w-full",
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup className="!mb-0 mx-auto">
                                    <div className="flex mb-[2px]">
                                        <p className="text-base font-medium text-start">
                                            Password
                                        </p>
                                        <span className="text-danger text-lg">
                                            *
                                        </span>
                                    </div>
                                    <InputPasswordField
                                        {...{
                                            register,
                                            formState,
                                            id: "password",
                                            placeholder: "Enter Password",
                                            maxLength: INPUT_TAX_MAX_LENGTH,
                                        }}
                                    />
                                </FormGroup>
                                <div className="absolute right-0 mt-3 xl:mt-1 2xl:mt-2">
                                    <Link href={"/forgot-password"}>
                                        <p className="text-secondary text-base font-medium">
                                            Forgot your
                                            <span className="font-semibold underline ml-1">
                                                password
                                            </span>
                                            <span>?</span>
                                        </p>
                                    </Link>
                                </div>
                                <div className="pt-14 xl:pt-10 2xl:pt-12">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={`btn-primary text-lg font-medium px-9 mx-auto flex items-center justify-center !mt-3 antLoaderButton`}
                                        loading={
                                            formState?.isSubmitting ||
                                            loginState.isLoading ||
                                            isLoading
                                        }
                                        disabled={
                                            formState?.isSubmitting ||
                                            !(
                                                watchFields?.email &&
                                                watchFields?.password
                                            )
                                        }
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 lg:mt-9 xl:mt-5 2xl:mt-7">
                                <h1 className="text-base xl:text-sm font-medium text-light-black">
                                    Don't have an account?
                                </h1>
                                <Link href={"/signup"}>
                                    <p className="text-secondary text-xl md:text-lg xl:text-base font-semibold underline mt-2 xl:mt-[2px] 2xl:mt-1">
                                        Sign Up with Jupiter Health
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="pt-6 block md:hidden">
                            <div className="flex items-center justify-center">
                                <p
                                    className="text-base font-medium text-secondary underline"
                                    onClick={() => setIsPrivacyModalOpen(true)}
                                >
                                    Privacy Policy
                                </p>
                                <p className="mx-3 text-secondary">|</p>
                                <p
                                    className="text-base font-medium text-secondary underline"
                                    onClick={() =>
                                        setIsTermsOfUseModalOpen(true)
                                    }
                                >
                                    Terms & Conditions
                                </p>
                            </div>
                            <h1 className="mt-1.5 text-base font-semibold">
                                © Jupiter Health 2023
                            </h1>
                        </div>
                    </form>
                </div>
            )}
            {isOtpVerification && (
                <form onSubmit={handleSubmit(handleOtpVerification)}>
                    <div className="flex justify-center">
                        <div>
                            <h1 className="text-3xl xl:text-2xl 2xl:text-2xl font-bold text-secondary">
                                Verify your email
                            </h1>
                            <p className="text-base font-bold text-light-black mt-2">
                                Please enter the six digit verification code
                                sent to your email.
                            </p>
                            <div className="w-fit mx-auto mt-[30px]">
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
                                    inputStyle={`ant-input ${LoginStyle.otpInput} text-black`}
                                    renderInput={(props) => (
                                        <input {...props} type="tel" />
                                    )}
                                />
                            </div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={`btn-primary text-lg font-medium px-9 mx-auto flex items-center justify-center !mt-9 antLoaderButton`}
                                loading={isOtpSubmitting}
                                disabled={!otp || otp.length !== 6}
                            >
                                Verify
                            </Button>
                            <div className="mt-3">
                                <h3 className="pt-3 text-center text-primary font-bold">
                                    {handleFormatTimer(counter)}
                                </h3>
                                <h1 className="text-base mt-6 xl:mt-3 mb-1 font-semibold md:font-medium text-light-black">
                                    Didn't receive the code?
                                </h1>
                                <div className={loginStyle.resendBtn}>
                                    <Button
                                        type="link"
                                        className={`active:!border-none active:!outline-none active:!text-secondary !text-secondary h-6 text-lg xl:text-base font-semibold mt-1 xl:!mt-2 antLoaderButton`}
                                        loading={isOtpResend}
                                        disabled={counter !== 0}
                                        onClick={handleOtpResend}
                                    >
                                        Resend Code
                                    </Button>
                                </div>
                            </div>
                            <div className="mx-auto md:mt-3 mt-16">
                                <p className="text-sm font-medium text-light-black">
                                    <span className="font-bold">
                                        Disclaimer :
                                    </span>{" "}
                                    Didn’t receive the code? Check your spam
                                    folder or Resend Code.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default LoginScene;
