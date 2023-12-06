import React from "react";
import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import { Button, Col, Row } from "antd";
import { SignupDataResponse } from "@redux/slices/auth";
import {
    FormGroup,
    InputDateField,
    InputField,
    InputGoogleAutoCompleteField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { getPostalCodeFormat } from "jupiter-commons/src/components/libs/helpers";
import myProfileStyle from "./myProfileStyle.module.scss";
import { MaleIcon } from "jupiter-commons/src/components/theme/icons/maleIcon";
import { FemaleIcon } from "jupiter-commons/src/components/theme/icons/femaleIcon";
import moment from "moment";

interface MyProfileSceneProps {
    register: any;
    formState: any;
    control: any;
    setValue: any;
    handleSubmit: (data: any) => () => void;
    onSubmit: (d: any) => void;
    loginUserData: any;
    formattedValue: string;
    handleChange: (data: any) => void;
    handleCancel?: any;
    signupUserData?: SignupDataResponse;
    watchFields?: any;
    selectedOption: string;
    handleOptionChange: (data: any) => void;
    genderModified: boolean;
}
const MyProfileScene = (props: MyProfileSceneProps) => {
    const {
        register,
        formState,
        control,
        setValue,
        onSubmit,
        handleSubmit,
        formattedValue,
        handleChange,
        loginUserData,
        handleCancel,
        signupUserData,
        watchFields,
        selectedOption,
        handleOptionChange,
        genderModified,
    } = props;

    return (
        <div className="py-3 px-4">
            <HeaderSectionComponent
                {...{
                    title: "Profile Details",
                    description:
                        "View and edit your personal account information.",
                }}
            />
            <form id="myProfileForm" onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-5 md:mt-7 xl:mt-6 !mr-0" gutter={32}>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 xl:pr-4"
                    >
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "firstName",
                                    placeholder: "Enter First Name",
                                    maxLength: 60,
                                    label: "First Name",
                                    className: "capitalize",
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 xl:pr-4"
                    >
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "lastName",
                                    placeholder: "Enter Last Name",
                                    maxLength: 60,
                                    label: "Last Name",
                                    className: "capitalize",
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="!mr-0" gutter={32}>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 md:pr-4"
                    >
                        <FormGroup>
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "dob",
                                    label: "Date of Birth",
                                    defaultValue: watchFields["dob"],
                                    className: myProfileStyle.dateField,
                                    placeholder: "YYYY-MM-DD",
                                    isDisabledDate: true,
                                    fromDate: moment().subtract(18, "year"),
                                    isDisabled18: true,
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 xl:pr-4"
                    >
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "email",
                                    label: "Email",
                                    placeholder: "Enter Email",
                                    className: myProfileStyle.disabledField,
                                    disabled:
                                        loginUserData?.user?.email ??
                                        signupUserData?.user?.email,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mb-6 !mr-0" gutter={32}>
                    <Col span={24} md={12} lg={12} xl={10}>
                        <div className="flex mb-2">
                            <p className="text-lg font-medium text-start">
                                Sex at Birth
                            </p>
                            <span className="text-danger text-lg">*</span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center mr-5">
                                <input
                                    className="checkbox-tools hidden"
                                    type="radio"
                                    id="maleGender"
                                    value="MALE"
                                    checked={selectedOption === "MALE"}
                                    onChange={handleOptionChange}
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
                        </div>
                    </Col>
                </Row>
                <FormGroup className="!mb-6 w-full xl:w-[81.8%]">
                    <InputGoogleAutoCompleteField
                        {...{
                            register,
                            formState,
                            id: "addressLine1",
                            label: "Shipping Address 1",
                            maxLength: 60,
                            placeholder: "Enter Shipping Address 1",
                            autoComplete: "off",
                            googleAutoCompleteConfig: {
                                setValue,
                                autoCompleteId: "addressLine1",
                                autoPopulateFields: {
                                    addressLine1: "addressLine1",
                                    addressLine2: "addressLine2",
                                    city: "city",
                                    province: "province",
                                    zip: "postalCode",
                                    country: "country",
                                    className: "capitalize",
                                },
                            },
                        }}
                    />
                </FormGroup>
                <FormGroup
                    className={`!mb-6 w-full xl:w-[81.8%] ${myProfileStyle.addressLine}`}
                >
                    <InputField
                        {...{
                            register,
                            formState,
                            id: "addressLine2",
                            label: "Shipping Address 2",
                            placeholder: "Enter Address Line 2",
                            maxLength: 60,
                            className: "capitalize",
                            autoComplete: "off",
                        }}
                    />
                </FormGroup>
                <Row className="!mr-0" gutter={32}>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 md:pr-4"
                    >
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "city",
                                    name: "citySelect",
                                    label: "City",
                                    placeholder: "Enter City",
                                    maxLength: 40,
                                    className: "capitalize",
                                    autoComplete: "off",
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col
                        span={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className="!pr-0 xl:pr-4"
                    >
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "province",
                                    name: "provinceSelect",
                                    label: "Province",
                                    placeholder: "Enter Province",
                                    maxLength: 40,
                                    className: "capitalize",
                                    autoComplete: "off",
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} md={12} lg={12} xl={10}>
                        <FormGroup className="w-full md:w-[95%]">
                            <InputField
                                {...{
                                    id: "postalCode",
                                    placeholder: "Enter Postal Code",
                                    register,
                                    label: "Postal Code",
                                    value: formattedValue,
                                    onChange: handleChange,
                                    formState,
                                    maxLength: 7,
                                    className: "capitalize",
                                    autoComplete: "off",
                                }}
                                onChange={(e: any) => {
                                    e.target.value.length === 6 &&
                                        setValue(
                                            "postalCode",
                                            getPostalCodeFormat(e.target.value),
                                            {
                                                shouldValidate: true,
                                            },
                                        );
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col span={24} md={12} lg={12} xl={12} hidden>
                        <FormGroup>
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "country",
                                    name: "countrySelect",
                                    label: "Country",
                                    placeholder: "Enter Country",
                                    maxLength: 40,
                                    className: "capitalize",
                                    autoComplete: "off",
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {((formState?.isDirty && !genderModified) ||
                    genderModified) && (
                    <div className="flex justify-center md:justify-end mt-14 mb-8 md:mr-5">
                        <>
                            <Button
                                className="font-semibold border border-light-black text-lg w-32 h-10 rounded-[10px]"
                                onClick={() => handleCancel(watchFields.gender)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`font-semibold ml-5 w-32 btn-primary text-base h-10 rounded-[10px] antLoaderButton`}
                                type="primary"
                                htmlType="submit"
                                form="myProfileForm"
                                loading={formState?.isSubmitting}
                                disabled={formState?.isSubmitting}
                            >
                                Update
                            </Button>
                        </>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyProfileScene;
