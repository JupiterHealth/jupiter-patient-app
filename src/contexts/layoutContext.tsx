import React, { createContext, useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserState, logoutUser } from "@redux/slices/auth";
import { RootState } from "@redux/reducers";
import { message } from "antd";
import {
    PATIENT_COOKIE,
    TOAST_MESSAGE_DELAY,
} from "jupiter-commons/src/components/libs/constants";
import { API } from "jupiter-commons/src/components/libs/helpers";
import { useLocalStorage } from "jupiter-commons/src/components/libs/uselocalStorageHook";

export interface LayoutContextModel {
    isModalVisible: boolean;
    setIsModalVisible: (d?: boolean) => void;
    setCollapsed: (d?: boolean) => void;
    handleCancel: (data: any) => void;
    doLogout?: () => void;
    collapsed: boolean;
    isLoggingOut: boolean;
    dermatologyData?: any;
    setDermatologyData: (d?: any) => void;
}

const initialState: LayoutContextModel = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    isModalVisible: false,
    isLoggingOut: false,
    collapsed: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsModalVisible: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCollapsed: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleCancel: () => {},
    dermatologyData: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setDermatologyData: () => {},
};

export const LayoutContext = createContext(initialState);

export const LayoutContextProvider = ({ children }: any) => {
    const [isModalVisible, setIsModalVisible]: any = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [{ patient_cookie }, removeCookie]: any = useCookies([
        PATIENT_COOKIE,
    ]);
    const dispatch: any = useDispatch();
    const [collapsed, setCollapsed]: any = useState(false);
    const axiosInstance: AxiosInstance = API();
    const { data: loginUser }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const [dermatologyData, setDermatologyData] = useLocalStorage([
        "dermatologyData",
        null,
    ]);

    const doLogout = async (noApiCall = false) => {
        try {
            setIsLoggingOut(true);
            if (patient_cookie?.session?.id) {
                await dispatch(
                    logoutUser({
                        noApiCall,
                        sessionId: patient_cookie.session.id,
                    }),
                );
            }
            setDermatologyData(null);
        } catch (e) {
            setIsLoggingOut(false);
            console.log(e);
        }

        removeCookie(PATIENT_COOKIE, { path: "/" });
        window.location.href = "/login";
    };

    useEffect(() => {
        if (
            patient_cookie &&
            patient_cookie?.session?.accessToken &&
            !(loginUser && loginUser?.user && loginUser?.user?.id)
        ) {
            // doLogout();
        }
    }, []);

    axiosInstance.interceptors.response.use(
        (response: any) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        (error: any) => {
            if (
                (error && error.response && error.response.status === 401) ||
                error.response.status === 406
            ) {
                doLogout(true);
            }
            if (
                error?.response?.status >= 400 &&
                error?.response?.status <= 499
            ) {
                message.destroy();
                if (Array.isArray(error.response.data.message)) {
                    message.error(
                        error.response.data.message[0],
                        TOAST_MESSAGE_DELAY,
                    );
                } else {
                    message.error(
                        error.response.data.message,
                        TOAST_MESSAGE_DELAY,
                    );
                }
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(
                (error.response && error.response.data) || error,
            );
        },
    );
    axiosInstance.interceptors.request.use(
        (c: any) => {
            if (patient_cookie && patient_cookie?.session?.accessToken) {
                if (!(c.headers && c.headers["authorization"])) {
                    c.headers[
                        "authorization"
                    ] = `Bearer ${patient_cookie?.session?.accessToken}`;
                }
            }
            return c;
        },
        (error: any) => {
            return Promise.reject(error);
        },
    );

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <LayoutContext.Provider
            value={{
                isModalVisible,
                setIsModalVisible,
                isLoggingOut,
                handleCancel,
                doLogout,
                collapsed,
                setCollapsed,
                dermatologyData,
                setDermatologyData,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
