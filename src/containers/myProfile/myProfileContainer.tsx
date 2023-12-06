import React, { useEffect, useState } from "react";
import MyProfileScene from "./myProfileScene";
import { MainLayoutComponent } from "@components/layout/mainLayout";
import { useForm } from "react-hook-form";
import {
    ProfileFormInputs,
    ProfileFormValidateSchema,
} from "src/schemas/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useCookies } from "react-cookie";
import {
    LoginUserState,
    SignupUserState,
    loginUserUpdate,
    signupUserUpdate,
} from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { updateAuthProfileAPI } from "@redux/services/auth.api";
import {
    PATIENT_COOKIE,
    SUCCESS_MESSAGES,
} from "jupiter-commons/src/components/libs/constants";
import {
    convertToTitleCase,
    deepClone,
} from "jupiter-commons/src/components/libs/helpers";

const MyProfileContainer = () => {
    const {
        register,
        handleSubmit,
        formState,
        control,
        reset,
        watch,
        handleSubmit: handleAddress,
        setValue,
    } = useForm<ProfileFormInputs>({
        resolver: yupResolver(ProfileFormValidateSchema),
    });

    const watchFields = watch();

    const [{ patient_cookie }, setCookie]: any = useCookies([PATIENT_COOKIE]);
    const [{ patient_cookieRemove }, removeCookie]: any = useCookies([
        PATIENT_COOKIE,
    ]);
    const dispatch = useDispatch();
    const { data: loginUserData }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const { data: signupUserData }: SignupUserState = useSelector(
        (state: RootState) => state.signupUser,
    );
    const [formattedValue, setFormattedValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [genderModified, setGenderModified] = useState(false);

    const handleCancel = (gender: string) => {
        if (loginUserData && loginUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = loginUserData?.user?.patientUserAddress;
            initializeValues.firstName = loginUserData?.user?.firstName;
            initializeValues.lastName = loginUserData?.user?.lastName;
            initializeValues.dob = loginUserData?.user?.dob;
            initializeValues.email = loginUserData?.user?.email;
            initializeValues.gender = loginUserData?.user?.gender || "";
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            setGenderModified(false);
            setSelectedOption(gender);

            reset(initializeValues);
        } else if (signupUserData && signupUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = signupUserData?.user?.patientUserAddress;
            initializeValues.firstName = signupUserData?.user?.firstName;
            initializeValues.lastName = signupUserData?.user?.lastName;
            initializeValues.dob = signupUserData?.user?.dob;
            initializeValues.email = signupUserData?.user?.email;
            initializeValues.gender = signupUserData?.user?.gender || "";
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            setGenderModified(false);
            setSelectedOption(gender);

            reset(initializeValues);
        }
    };

    const onSubmit = async (values: any) => {
        let payload: any = deepClone(values);
        const authCookies: any = patient_cookie;
        const authorization = `Bearer ${authCookies?.session?.accessToken}`;
        payload = {
            firstName: values?.firstName,
            lastName: values?.lastName,
            email: values?.email,
            dob: values?.dob,
            gender: selectedOption,
            address: [
                {
                    addressLine1: convertToTitleCase(values?.addressLine1),
                    addressLine2: convertToTitleCase(values?.addressLine2),
                    city: values?.city,
                    province: values?.province,
                    postalCode: values?.postalCode,
                    country: values?.country ? values?.country : "Canada",
                    isDefault: true,
                },
            ],
        };

        try {
            if (payload) {
                const response = await updateAuthProfileAPI({
                    payload,
                    authorization,
                });
                if (response) {
                    setGenderModified(false);
                    message.success(SUCCESS_MESSAGES.profileMessage);
                    reset({
                        firstName: response?.firstName,
                        lastName: response?.lastName,
                        email: response?.email,
                        dob: response?.dob,
                        gender: response?.gender,
                        addressLine1:
                            response?.patientUserAddress[0]["addressLine1"],
                        addressLine2:
                            response?.patientUserAddress[0]["addressLine2"],
                        province: response?.patientUserAddress[0]["province"],
                        city: response?.patientUserAddress[0]["city"],
                        postalCode:
                            response?.patientUserAddress[0]["postalCode"],
                    });

                    // Update User into Auth Cookie
                    const tempCookie = deepClone(patient_cookie);
                    tempCookie.user.firstName = response?.firstName;
                    tempCookie.user.lastName = response?.lastName;
                    tempCookie.user.email = response?.email;
                    tempCookie.user.gender = response?.gender;

                    removeCookie(PATIENT_COOKIE, { path: "/" });
                    setCookie(PATIENT_COOKIE, JSON.stringify(tempCookie), {
                        path: "/",
                    });

                    const signupUserUpdatePayload = deepClone(signupUserData);
                    if (signupUserUpdatePayload) {
                        signupUserUpdatePayload.user.firstName =
                            response?.firstName;
                        signupUserUpdatePayload.user.lastName =
                            response?.lastName;
                        signupUserUpdatePayload.user.email = response?.email;
                        signupUserUpdatePayload.user.gender = response?.gender;
                        signupUserUpdatePayload.user.dob = response?.dob;
                        signupUserUpdatePayload.user.patientUserAddress =
                            response?.patientUserAddress;
                        dispatch(signupUserUpdate(signupUserUpdatePayload));
                    }

                    // Update User into Redux
                    const loginUserUpdatePayload = deepClone(loginUserData);
                    if (loginUserUpdatePayload) {
                        loginUserUpdatePayload.user.firstName =
                            response?.firstName;
                        loginUserUpdatePayload.user.lastName =
                            response?.lastName;
                        loginUserUpdatePayload.user.email = response?.email;
                        loginUserUpdatePayload.user.gender = response?.gender;
                        loginUserUpdatePayload.user.dob = response?.dob;
                        loginUserUpdatePayload.user.patientUserAddress =
                            response?.patientUserAddress;
                        dispatch(loginUserUpdate(loginUserUpdatePayload));
                    }
                }
            }
        } catch (e: any) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        if (loginUserData && loginUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = loginUserData?.user?.patientUserAddress;
            initializeValues.firstName = loginUserData?.user?.firstName;
            initializeValues.lastName = loginUserData?.user?.lastName;
            initializeValues.dob = loginUserData?.user?.dob;
            initializeValues.email = loginUserData?.user?.email;
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            initializeValues.gender = loginUserData?.user?.gender || "";
            setSelectedOption(initializeValues.gender);
            reset(initializeValues);
        } else if (signupUserData && signupUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = signupUserData?.user?.patientUserAddress;
            initializeValues.firstName = signupUserData?.user?.firstName;
            initializeValues.lastName = signupUserData?.user?.lastName;
            initializeValues.dob = signupUserData?.user?.dob;
            initializeValues.email = signupUserData?.user?.email;
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            initializeValues.gender = loginUserData?.user?.gender || "";
            setSelectedOption(initializeValues.gender);
            reset(initializeValues);
        }

        return () => {
            reset();
        };
    }, []);

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        const formattedInput = inputValue
            .replace(/\s/g, "")
            .match(/.{1,3}/g)
            ?.join(" ");
        const capitalizedInput = formattedInput?.replace(
            /\b\w/g,
            (match: any) => match.toUpperCase(),
        );
        setFormattedValue(capitalizedInput || "");
    };

    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
        setGenderModified(true);
    };

    return (
        <MyProfileScene
            {...{
                register,
                formState,
                handleSubmit,
                onSubmit,
                control,
                formattedValue,
                setValue,
                loginUserData,
                handleAddress,
                handleChange,
                handleCancel,
                signupUserData,
                watchFields,
                selectedOption,
                handleOptionChange,
                genderModified,
            }}
        />
    );
};

MyProfileContainer.Layout = MainLayoutComponent;
export default MyProfileContainer;
