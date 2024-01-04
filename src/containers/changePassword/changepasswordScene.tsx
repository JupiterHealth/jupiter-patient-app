import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import PasswordRequiredComponent from "@components/passwordRequiredComponent/passwordRequiredComponent";
import { Button } from "antd";
import { INPUT_TAX_MAX_LENGTH } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputPasswordField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

interface ChangePasswordSceneProps {
    register: any;
    formState: any;
    onSave: (data: any) => void;
    handleCheckPasswordCriteria: (d: any) => void;
    isValidationSectionShow?: boolean;
    lengthValidated?: boolean;
    specialValidated?: boolean;
    caseSensitiveValidated?: boolean;
    numberValidated?: boolean;
    isClearedValues?: boolean;
    watchFields: any;
    handleUpdateCommonStates: (d: any) => void;
}

const ChangePasswordScene = (props: ChangePasswordSceneProps) => {
    const {
        register,
        formState,
        onSave,
        caseSensitiveValidated,
        numberValidated,
        specialValidated,
        lengthValidated,
        handleCheckPasswordCriteria,
        isClearedValues,
        isValidationSectionShow,
        watchFields,
        handleUpdateCommonStates,
    } = props;

    return (
        <div className="relative py-3 px-4">
            <form id="changePasswordForm" onSubmit={onSave}>
                <HeaderSectionComponent
                    {...{
                        title: "Change Password",
                        description: "",
                    }}
                />
                <div className="mt-6 relative">
                    <FormGroup className="!mb-4 md:w-6/12">
                        <InputPasswordField
                            {...{
                                register,
                                formState,
                                id: "currentPassword",
                                maxLength: INPUT_TAX_MAX_LENGTH,
                                label: "Current Password",
                                placeholder: "Enter your current password",
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="!mb-4 md:w-6/12">
                        <InputPasswordField
                            {...{
                                register,
                                formState,
                                id: "newPassword",
                                label: "Set New Password",
                                maxLength: INPUT_TAX_MAX_LENGTH,
                                placeholder: "Enter your new password",
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

                    <FormGroup className={"m-0 md:w-6/12 mt-16"}>
                        <InputPasswordField
                            {...{
                                register,
                                formState,
                                maxLength: INPUT_TAX_MAX_LENGTH,
                                id: "confirmPassword",
                                label: "Confirm New Password",
                                placeholder: "Confirm your new password",
                            }}
                        />
                    </FormGroup>
                </div>
                <div className="">
                    {formState?.isDirty && (
                        <div className=" flex justify-center md:justify-end md:text-end mt-14 mb-8 md:mr-5 md:absolute top-80 right-0">
                            <Button
                                className="font-semibold border border-light-black text-base w-32 h-10 rounded-[10px]"
                                onMouseDown={() => {
                                    handleUpdateCommonStates({
                                        isClearedValues: !isClearedValues,
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`font-semibold ml-5 w-32 btn-primary text-base h-10 rounded-[10px] antLoaderButton antLoaderButton`}
                                type="primary"
                                htmlType="submit"
                                form="changePasswordForm"
                                loading={formState?.isSubmitting}
                                disabled={
                                    !caseSensitiveValidated ||
                                    !numberValidated ||
                                    !specialValidated ||
                                    !lengthValidated ||
                                    !(
                                        watchFields?.currentPassword &&
                                        watchFields?.newPassword &&
                                        watchFields?.confirmPassword
                                    )
                                }
                            >
                                Update
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};
export default ChangePasswordScene;
