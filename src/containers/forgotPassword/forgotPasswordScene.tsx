import { LoginUserState } from "@redux/slices/auth";
import { Button } from "antd";
import { handleFormatTimer } from "jupiter-commons/src/components/libs/helpers";
import {
    FormGroup,
    InputField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import ForgotPasswordStyle from "./forgotPasswordStyle.module.scss";

export interface ForgotPasswordSceneProps {
    handleSubmit: (data: any) => () => void;
    onSubmit: (d: any) => void;
    handleResendInvite: (d: any) => void;
    register: any;
    formState?: any;
    watchFields: any;
    isLinkResend: boolean;
    isForgotLinkSending: boolean;
    counter: number;
    isCounter: boolean;
}
const ForgotPasswordScene = (props: ForgotPasswordSceneProps) => {
    const {
        register,
        formState,
        watchFields,
        isForgotLinkSending,
        isLinkResend,
        handleSubmit,
        onSubmit,
        handleResendInvite,
        counter,
        isCounter,
    } = props;

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1 className="text-3xl xl:text-2xl font-bold text-secondary">
                            Forgot Password
                        </h1>
                        <p className="text-base font-bold text-light-black mt-2">
                            Enter your email to receive a secure link to reset
                            your password.
                        </p>
                        <div
                            className={`mt-7 relative ${ForgotPasswordStyle.forgotPasswordInput}`}
                        >
                            <FormGroup
                                className={`!mb-4 w-full md:w-[75%] mx-auto items-start justify-start`}
                            >
                                <div className="flex mb-1">
                                    <p className="text-lg font-medium text-start">
                                        Email
                                    </p>
                                    <span className="text-danger">*</span>
                                </div>
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        id: "email",
                                        placeholder: "Enter Email",
                                    }}
                                />
                            </FormGroup>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={`btn-primary !mt-5 antLoaderButton`}
                                loading={isForgotLinkSending}
                                disabled={
                                    formState?.isSubmitting ||
                                    !watchFields?.email ||
                                    isLinkResend ||
                                    isCounter
                                }
                            >
                                Send Link
                            </Button>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-9 xl:mt-7">
                        {isCounter && (
                            <h3 className="mt-3 text-center text-primary font-bold">
                                {handleFormatTimer(counter)}
                            </h3>
                        )}
                        <h1 className="text-base xl:text-sm font-semibold xl:font-medium text-light-black">
                            Didn't receive the link?
                        </h1>
                        <div className={ForgotPasswordStyle.resendBtn}>
                            <Button
                                type="link"
                                className={`h-6 text-lg xl:text-base font-semibold mt-3 xl:!mt-1 antLoaderButton active:!border-none active:!outline-none active:!text-secondary !text-secondary`}
                                onClick={() =>
                                    handleResendInvite({
                                        email: watchFields.email,
                                    })
                                }
                                loading={isLinkResend}
                                disabled={
                                    formState?.isSubmitting ||
                                    isForgotLinkSending ||
                                    counter
                                }
                            >
                                Resend Link
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPasswordScene;
