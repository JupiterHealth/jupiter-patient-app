import {
    LoginPayload,
    LoginDataResponse,
    SignupPayload,
    SignupDataResponse,
} from "@redux/slices/auth";
import { fetch } from "jupiter-commons/src/components/libs/helpers";

export const signupAPI = async (
    payload: SignupPayload,
): Promise<SignupDataResponse> => {
    return fetch({
        url: "/patient/signup",
        method: "POST",
        data: payload,
    });
};

export const loginAPI = async (
    payload: LoginPayload,
): Promise<LoginDataResponse> => {
    return fetch({
        url: "/patient/auth/login",
        method: "POST",
        data: payload,
    });
};

export const signupOtpVerificationAPI = async (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/signup/otp-verify",
        method: "POST",
        data: payload,
    });
};

export const signupResendOtpAPI = async (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/signup/otp-resend",
        method: "POST",
        data: payload,
    });
};

export const loginOtpVerificationAPI = async (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/auth/otp-verify",
        method: "POST",
        data: payload,
    });
};

export const loginResendOtpAPI = async (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/auth/otp-resend",
        method: "POST",
        data: payload,
    });
};

export const forgotPasswordAPI = async (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/auth/forgot-password",
        method: "POST",
        data: payload,
    });
};

export const resetPasswordAPI = async ({
    payload,
    authorization,
}: {
    payload: any;
    authorization: string;
}): Promise<any> => {
    return fetch({
        url: "/patient/auth/reset-password",
        method: "POST",
        data: payload,
        headers: { authorization },
    });
};

export const changePasswordAPI = async ({
    payload,
    authorization,
}: {
    payload: any;
    authorization: any;
}): Promise<any> => {
    return fetch({
        url: "/patient/auth/change-password",
        method: "PATCH",
        data: payload,
        headers: { authorization },
    });
};

export const updateAuthProfileAPI = async ({
    payload,
    authorization,
}: {
    payload: any;
    authorization: any;
}): Promise<any> => {
    return fetch({
        url: "/patient/auth/profile",
        method: "PATCH",
        data: payload,
        headers: { authorization },
    });
};

export const validateUserDetailAPI = async ({ payload }: any): Promise<any> => {
    return fetch({
        url: "common/validation/user-details",
        method: "POST",
        data: payload,
    });
};

export const getLoginUser = async ({ authorization }: any): Promise<any> => {
    return fetch({
        url: `/patient/auth/who-am-i`,
        headers: { authorization },
    });
};

export const logoutAPI = async ({ sessionId }: any): Promise<any> => {
    return fetch({
        url: `/patient/auth/logout`,
        method: "POST",
        data: { sessionId },
    });
};

export const resendLinkAPI = (payload: any): Promise<any> => {
    return fetch({
        url: "/patient/auth/forgot-password",
        method: "POST",
        data: payload,
    });
};
