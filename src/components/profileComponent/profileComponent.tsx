import { RootState } from "@redux/reducers";
import { LoginUserState } from "@redux/slices/auth";
import { Col, Row } from "antd";
import { GET_PROVINCE } from "jupiter-commons/src/components/libs/constants";
import {
    FormGroup,
    InputDateField,
    InputField,
    InputRadioField,
    SelectField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { FemaleIcon } from "jupiter-commons/src/components/theme/icons/femaleIcon";
import { MaleIcon } from "jupiter-commons/src/components/theme/icons/maleIcon";
import moment from "moment";
import { useSelector } from "react-redux";
import ProfileComponentStyles from "./profileComponentStyle.module.scss";

export interface ProfileComponentProps {
    formState: any;
    register: (d: any) => void;
    handleSubmit: (d: any) => any;
    control: any;
    setSelectedOption: (d: any) => any;
    onSubmit: (d: any) => any;
    selectedOption: string;
    assessMentDetails?: any;
    watchFields: any;
}

const ProfileComponent = (props: ProfileComponentProps) => {
    const {
        formState,
        register,
        handleSubmit,
        control,
        setSelectedOption,
        onSubmit,
        selectedOption,
        assessMentDetails,
        watchFields,
    } = props;

    const { data: loginUserData }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
    };

    return (
        <form id="assessmentProfileForm" onSubmit={handleSubmit(onSubmit)}>
            <>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                    Let's get to know you a little
                </h1>
                <p className="text-sm xl:text-base font-bold text-light-black mt-2">
                    Please enter some of your personal details below.
                </p>
                <Row className="mt-5 md:mt-9" gutter={32}>
                    <Col span={24} md={12}>
                        <FormGroup
                            className={`${ProfileComponentStyles.inputHoverEffect}`}
                        >
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "firstName",
                                    label: "First Name",
                                    placeholder: "Enter First Name",
                                    maxLength: 60,
                                    className: "capitalize",
                                    disabled: loginUserData?.user?.firstName,
                                    defaultValue:
                                        loginUserData?.user?.firstName || "",
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col span={24} md={12}>
                        <FormGroup
                            className={`${ProfileComponentStyles.inputHoverEffect}`}
                        >
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "lastName",
                                    label: "Last Name",
                                    placeholder: "Enter Last Name",
                                    maxLength: 60,
                                    className: "capitalize",
                                    disabled: loginUserData?.user?.lastName,
                                    defaultValue:
                                        loginUserData?.user?.lastName || "",
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={24} md={12}>
                        <FormGroup className={`antdDatePicker`}>
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "dob",
                                    label: "Date of Birth",
                                    placeholder: "YYYY-MM-DD",
                                    isDisabledDate: true,
                                    fromDate: moment().subtract(18, "year"),
                                    isDisabled18: true,
                                    defaultValue:
                                        assessMentDetails?.profile?.dob || "",
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col span={24} md={12}>
                        <h1 className="text-base text-light-black font-medium text-left pb-2">
                            Sex at Birth<span className="text-danger">*</span>
                        </h1>
                        <Row>
                            <Col span={24} className="flex">
                                <div className="flex items-center mr-5">
                                    <input
                                        className="checkbox-tools hidden"
                                        type="radio"
                                        id="maleGender"
                                        value="MALE"
                                        checked={selectedOption === "MALE"}
                                        onChange={handleOptionChange}
                                        defaultValue={
                                            loginUserData?.gender || ""
                                        }
                                    />
                                    <label htmlFor="maleGender">
                                        <MaleIcon />
                                    </label>
                                    <label
                                        className="text-base text-light-black font-medium ml-4 cursor-pointer"
                                        htmlFor="maleGender"
                                    >
                                        Male
                                    </label>
                                </div>
                                <div className="flex items-center mr-5">
                                    <input
                                        className="checkbox-tools hidden"
                                        type="radio"
                                        id="femaleGender"
                                        value="FEMALE"
                                        checked={selectedOption === "FEMALE"}
                                        onChange={handleOptionChange}
                                        defaultValue={
                                            loginUserData?.gender || ""
                                        }
                                    />
                                    <label className="" htmlFor="femaleGender">
                                        <FemaleIcon />
                                    </label>
                                    <label
                                        className="text-base text-light-black font-medium ml-4 cursor-pointer"
                                        htmlFor="femaleGender"
                                    >
                                        Female
                                    </label>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {selectedOption === "FEMALE" && (
                    <>
                        <Row gutter={32} className="mt-6 md:mt-0">
                            <Col
                                span={24}
                                md={12}
                                className={` ${
                                    watchFields.isPlanPregnant === "true" &&
                                    "cursor-not-allowed"
                                }`}
                            >
                                <h1 className="text-base text-light-black font-medium text-left pb-2">
                                    Are you pregnant?
                                    <span className="text-danger">*</span>
                                </h1>
                                <div className="flex">
                                    <InputRadioField
                                        {...{
                                            register,
                                            formState,
                                            id: "yes",
                                            name: "isPregnant",
                                            value: true,
                                            label: "Yes",
                                            defaultValue:
                                                loginUserData?.user
                                                    ?.isPregnant || "",
                                            disabled:
                                                watchFields.isPlanPregnant ===
                                                "true",
                                        }}
                                    />
                                    <div className="ml-10">
                                        <InputRadioField
                                            {...{
                                                register,
                                                formState,
                                                id: "no",
                                                name: "isPregnant",
                                                value: false,
                                                label: "No",
                                                defaultValue:
                                                    loginUserData?.user
                                                        ?.isPregnant || "",
                                                disabled:
                                                    watchFields.isPlanPregnant ===
                                                    "true",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={24} md={12} className="mt-6 md:mt-0">
                                <h1 className="text-base text-light-black font-medium text-left pb-2">
                                    Are you breastfeeding?
                                    <span className="text-danger">*</span>
                                </h1>
                                <div className="flex">
                                    <InputRadioField
                                        {...{
                                            register,
                                            formState,
                                            id: "yes2",
                                            name: "isBreastFeeding",
                                            value: true,
                                            label: "Yes",
                                            defaultValue:
                                                loginUserData?.user
                                                    ?.isBreastFeeding || "",
                                        }}
                                    />
                                    <div className="ml-10">
                                        <InputRadioField
                                            {...{
                                                register,
                                                formState,
                                                id: "no2",
                                                name: "isBreastFeeding",
                                                value: false,
                                                label: "No",
                                                defaultValue:
                                                    loginUserData?.user
                                                        ?.isBreastFeeding || "",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col
                                span={24}
                                md={12}
                                className={`mt-6 md:pt-3 md:mt-0 ${
                                    watchFields.isPregnant === "true" &&
                                    "cursor-not-allowed"
                                }`}
                            >
                                <h1 className="text-base text-light-black font-medium text-left pb-2">
                                    Are you planning to become pregnant?{" "}
                                    <span className="text-danger">*</span>
                                </h1>
                                <div className="flex">
                                    <InputRadioField
                                        {...{
                                            register,
                                            formState,
                                            id: "yes3",
                                            name: "isPlanPregnant",
                                            value: true,
                                            label: "Yes",
                                            defaultValue:
                                                loginUserData?.user
                                                    ?.isPlanPregnant || "",
                                            disabled:
                                                watchFields.isPregnant ===
                                                "true",
                                        }}
                                    />
                                    <div className="ml-10">
                                        <InputRadioField
                                            {...{
                                                register,
                                                formState,
                                                id: "no3",
                                                name: "isPlanPregnant",
                                                value: false,
                                                label: "No",
                                                defaultValue:
                                                    loginUserData?.user
                                                        ?.isPlanPregnant || "",
                                                disabled:
                                                    watchFields.isPregnant ===
                                                    "true",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
                <Row gutter={32}>
                    <Col span={24} md={12} className="md:mt-2 mt-6">
                        <FormGroup className="reactSelect !mb-0">
                            <SelectField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "province",
                                    label: "Where do you live?",
                                    options: GET_PROVINCE,
                                    isClearable: false,
                                    placeholder: "Select Province",
                                    name: "province",
                                    defaultValue: {
                                        label:
                                            loginUserData?.user
                                                ?.patientUserAddress[0]
                                                ?.province,
                                        value:
                                            loginUserData?.user
                                                ?.patientUserAddress[0]
                                                ?.province,
                                    },
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </>
        </form>
    );
};

export default ProfileComponent;
