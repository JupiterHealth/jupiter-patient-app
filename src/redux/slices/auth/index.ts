import {
    getLoginUser,
    loginAPI,
    logoutAPI,
    signupAPI,
} from "@redux/services/auth.api";
import { createSlice } from "@reduxjs/toolkit";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";

export interface SignupPayload {
    email: string;
    password: string;
    isTerm: boolean;
}

export interface SessionObject {
    id: string;
    usrId: string;
    accessToken: string;
    agnt: string;
    sts: string;
    tp: string;
    expAt: string;
    lockedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface userObject {
    createdBy: string;
    updatedBy: string;
    id: string;
    fNm: string;
    lNm: string;
    nm: string;
    email: string;
    phn: string;
    contryCd: string;
    usrNm: string;
    gender: string;
    dob: string;
    img: string;
    hgt: string;
    wgt: string;
    hcNo: string;
    hcVc: string;
    phnChngReq: string;
    emailChngReq: string;
    stripeCustomerId: string;
    stripeAccountId: string;
    stripeAccLinked: string;
    tp: string;
    createdAt: string;
    updatedAt: string;
    lastLoggedInAt: string;
}
export interface SignupDataResponse {
    otpRef?: string;
    user?: userObject;
}
export interface SignupState {
    data?: LoginDataResponse | any;
    error?: string | null;
    isLoading?: boolean;
}
export interface SignupUserState {
    data: LoginUserDataResponse | any;
    isLogin?: boolean;
    error?: string | null;
    isLoading?: boolean;
}
export interface SignupUserSuccessResponse {
    data?: LoginUserDataResponse | any;
    isLogin?: boolean;
    error?: string | null;
    isLoading?: boolean;
}

const signupInitialState: SignupState = {
    data: {},
    error: null,
    isLoading: false,
};
const signupUserInitialState: SignupUserState = {
    data: {},
    error: null,
    isLogin: false,
    isLoading: false,
};

export interface LogoutUserXPayload {
    sessionId: string;
    noApiCall?: boolean;
}

export const signupSlice = createSlice({
    name: "signup",
    initialState: deepClone(signupInitialState),
    reducers: {
        signupStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        signupSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        signupFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        signupReset: () => {
            return deepClone(signupInitialState);
        },
    },
});

export const signupUserSlice = createSlice({
    name: "signupUser",
    initialState: deepClone(signupUserInitialState),
    reducers: {
        signupUserStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        signupUserSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                    isLogin: true,
                },
            };
        },
        signupUserUpdate: (state, action) => {
            return {
                ...state,
                ...{
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                    error: null,
                    isLoading: false,
                    isLogin: true,
                },
            };
        },
        signupUserWorkspaceUpdate: (state, action) => {
            return {
                ...state,
                ...{
                    data: { ...state.data, workspace: action.payload },
                    error: null,
                    isLoading: false,
                    isLogin: true,
                },
            };
        },
        signupUserFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        signupUserReset: () => {
            return deepClone(signupUserInitialState);
        },
    },
});
export const {
    signupSuccess,
    signupStarted,
    signupFail,
    signupReset,
} = signupSlice.actions;

export const {
    signupUserSuccess,
    signupUserStarted,
    signupUserUpdate,
    signupUserWorkspaceUpdate,
    signupUserFail,
    signupUserReset,
} = signupUserSlice.actions;

export const doSignup = (data: SignupPayload) => async (dispatch: any) => {
    dispatch(signupStarted());
    try {
        const res: SignupDataResponse = await signupAPI(data);
        if (res) {
            dispatch(signupSuccess(res));
        }
    } catch (e: any) {
        dispatch(signupFail(e.message));
    }
};

export const fetchSignupUser = ({
    authorization,
}: {
    authorization: any;
}) => async (dispatch: any) => {
    dispatch(signupUserStarted());
    try {
        const res: SignupUserSuccessResponse = await getLoginUser({
            authorization,
        });
        if (res) {
            dispatch(signupUserSuccess(res));
        }
    } catch (e: any) {
        dispatch(signupUserFail(e.message));
    }
};

// for LOGIN
export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginDataResponse {
    otpRef?: string;
    user?: userObject;
}
export interface LoginUserDataResponse {
    session: SessionObject;
    user: userObject;
}
export interface LoginUserPayload {
    authorization: string;
}
export interface LoginOtherUserPayload {
    authorization: string;
    wpSlg: string;
}
export interface LoginUserSuccessResponse {
    data?: LoginUserDataResponse | any;
    isLogin?: boolean;
    error?: string | null;
    isLoading?: boolean;
}
export interface LoginState {
    isSubmitting: boolean;
    data?: LoginDataResponse | any;
    error?: string | null;
    isLoading?: boolean;
}
export interface LoginUserState {
    isSubmitting: boolean | undefined;
    data?: LoginUserDataResponse | any;
    isLogin?: boolean;
    error?: string | null;
    isLoading?: boolean;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    resetPasswordToken: string;
    newPassword: string;
    confirmPassword: string;
}

const loginInitialState: LoginState = {
    data: {},
    error: null,
    isLoading: false,
    isSubmitting: false,
};

const loginUserInitialState: LoginUserState = {
    data: {},
    error: null,
    isLogin: false,
    isLoading: false,
    isSubmitting: undefined,
};

export interface LogoutUserPayload {
    sessionId: string;
    noApiCall?: boolean;
}

export const loginSlice = createSlice({
    name: "login",
    initialState: deepClone(loginInitialState),
    reducers: {
        loginStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                },
            };
        },
        loginFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        loginReset: () => {
            return deepClone(loginInitialState);
        },
    },
});

export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: deepClone(loginUserInitialState),
    reducers: {
        loginUserStarted: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        loginUserSuccess: (state, action) => {
            return {
                ...state,
                ...{
                    data: action.payload,
                    error: null,
                    isLoading: false,
                    isLogin: true,
                },
            };
        },
        loginUserUpdate: (state, action) => {
            return {
                ...state,
                ...{
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                    error: null,
                    isLoading: false,
                    isLogin: true,
                },
            };
        },
        loginUserFail: (state, action) => {
            return {
                ...state,
                ...{ error: action.payload, isLoading: false },
            };
        },
        loginUserReset: () => {
            return deepClone(loginUserInitialState);
        },
    },
});

export const {
    loginSuccess,
    loginStarted,
    loginFail,
    loginReset,
} = loginSlice.actions;

export const {
    loginUserSuccess,
    loginUserStarted,
    loginUserUpdate,
    loginUserFail,
    loginUserReset,
} = loginUserSlice.actions;

export const doLogin = (data: LoginPayload) => async (dispatch: any) => {
    dispatch(loginStarted());
    try {
        const res: LoginDataResponse = await loginAPI(data);
        if (res) {
            dispatch(loginSuccess(res));
        }
    } catch (e: any) {
        dispatch(loginFail(e.message));
    }
};

export const fetchLoginUser = ({
    authorization,
}: {
    authorization: any;
}) => async (dispatch: any) => {
    dispatch(loginUserStarted());
    try {
        const res: LoginUserSuccessResponse = await getLoginUser({
            authorization,
        });
        if (res) {
            dispatch(loginUserSuccess(res));
        }
    } catch (e: any) {
        dispatch(loginUserFail(e.message));
    }
};

export const logoutUser = (data: LogoutUserPayload) => async (
    dispatch: any,
) => {
    try {
        dispatch(loginReset());
        dispatch(loginUserReset());
        if (!data.noApiCall) {
            await logoutAPI({ sessionId: data?.sessionId });
        }
    } catch (e: any) {
        console.log("LogoutUser", e);
    }
};
