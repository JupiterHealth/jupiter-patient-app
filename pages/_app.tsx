/* eslint-disable no-irregular-whitespace */
import "antd/dist/antd.less";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { LayoutContextProvider } from "../src/contexts/layoutContext";
import ErrorComponent from "../src/containers/error/errorComponent";
import { AppContextType } from "next/dist/shared/lib/utils";
import Cookies from "universal-cookie";
import {
    loginReset,
    loginUserFail,
    loginUserReset,
    loginUserSuccess,
    signupReset,
    signupUserFail,
    signupUserReset,
    signupUserSuccess,
} from "@redux/slices/auth";
import { useStore } from "react-redux";
import { wrapper } from "@redux/store";
import { getLoginUser } from "@redux/services/auth.api";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";
import { PATIENT_COOKIE } from "jupiter-commons/src/components/libs/constants";
import { API, nextRedirect } from "jupiter-commons/src/components/libs/helpers";
import "jupiter-commons/src/components/styles/global.scss";
import zipy from "zipyai";

const Noop = ({ children }: { children: JSX.Element }) => children;

const MyApp = ({
    Component,
    Component: { Layout = Noop, ...restLayoutProps },
    pageProps,
}: AppProps | any): JSX.Element => {
    // if (
    //     process.env.NEXT_ENV === "STAG" ||
    //     process.env.NEXT_ENV === "PRODUCTION"
    // ) {
    //     zipy.init("9e5e8ea3");
    // }
    const router = useRouter();
    const blankRouters = ["pain-management"];
    const { statusCode = 200 } = pageProps || {};

    const [isLoading, setIsLoading] = useState(false);
    const store = useStore();

    Router.events.on("routeChangeStart", (/*url*/) => {
        setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
    });
    Router.events.on("routeChangeError", () => {
        setIsLoading(false);
    });
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <title>Jupiter Patient App</title>
                <meta name="description" content="Jupiter Patient App" />
                <meta name="keywords" content="Jupiter Patient App" />
                <link href="/favicon.png" rel="icon" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicon/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                ></link>
                {process.env.NEXT_ENV !== "PRODUCTION" && (
                    <meta name="robots" content="noindex,nofollow" />
                )}
                <style>
                    {typeof window === "undefined" &&
                        `svg {
                            width: 32px;
                            height: 32px;
                        }
`}
                </style>
            </Head>
            {/* <Provider store={store}> */}
            <LayoutContextProvider>
                {statusCode === 200 && (
                    <div
                        className={`${
                            blankRouters.includes(router.pathname)
                                ? "blankClass"
                                : "authClass"
                        }`}
                    >
                        <Layout {...restLayoutProps}>
                            {isLoading && (
                                <>
                                    <div>
                                        <DefaultSkeleton isContent={true} />
                                    </div>
                                </>
                            )}
                            {!isLoading && <Component {...pageProps} />}
                        </Layout>
                    </div>
                )}
                {!isLoading && statusCode !== 200 && (
                    <ErrorComponent {...pageProps} />
                )}
            </LayoutContextProvider>
            {/* </Provider> */}
        </>
    );
};
MyApp.getInitialProps = wrapper.getInitialPageProps(
    (store: any) => async (appContext: AppContextType | any) => {
        const ctx = appContext.ctx;
        const redirectUrls = [
            "/signup",
            "/login",
            "/forget-password",
            "/set-password",
            "/reset-password",
            // "/my-profile",
        ];
        let appProps: any = {};
        if (appContext.ctx.req) {
            const cookies = new Cookies(ctx.req.headers.cookie);
            const authCookies: any = cookies.get(PATIENT_COOKIE);
            console.log("🚀 -----------------------------🚀");
            console.log("🚀 ~ authCookies:", authCookies);
            console.log("🚀 -----------------------------🚀");
            // Server Side Axios Setup.
            const axiosInstance = API(true);
            axiosInstance.interceptors.request.use(
                (c: any) => {
                    if (authCookies?.session?.accessToken) {
                        c.headers[
                            "authorization"
                        ] = `Bearer ${authCookies?.session?.accessToken}`;
                    }
                    return c;
                },
                (error: any) => {
                    // Do something with request error
                    return Promise.reject(error);
                },
            );

            // This Line will trigger component level getInitialProps
            appProps = await App.getInitialProps(appContext);
            const statusCode = appProps?.pageProps?.statusCode || 200;
            if (statusCode < 400) {
                if (authCookies && authCookies?.session?.id) {
                    if (authCookies?.session?.id) {
                        if (ctx.pathname === "/signup") {
                            nextRedirect({ ctx, location: "/dashboard" });
                        }
                    } else {
                        if (ctx.pathname !== "/signup") {
                            nextRedirect({ ctx, location: "/signup" });
                        }
                    }
                } else {
                    if (redirectUrls.indexOf(ctx.pathname) === -1) {
                        nextRedirect({ ctx, location: "/login" });
                    }
                }
            }
            // Fill data of loginUser in redux from Serverside.

            console.log(
                "🚀 -------------------------------------------------------------------------🚀",
            );
            console.log(
                "🚀 ~ authCookies?.session?.accessToken:",
                authCookies?.session?.accessToken,
            );
            console.log(
                "🚀 -------------------------------------------------------------------------🚀",
            );
            if (authCookies?.session?.accessToken) {
                try {
                    console.log(
                        "🚀 -------------------------------------------------------------------------🚀",
                    );
                    console.log("🚀 ~ login:", "Login");
                    console.log(
                        "🚀 -------------------------------------------------------------------------🚀",
                    );
                    const loginUser = await getLoginUser({
                        // authorization: `Bearer ${authCookies?.session?.accessToken}`,
                        authorization: `${authCookies?.session?.accessToken}`,
                    });
                    console.log("🚀 -------------------------🚀");
                    console.log("🚀 ~ loginUserRAXIT:", loginUser);
                    console.log("🚀 -------------------------🚀");

                    store.dispatch(signupUserSuccess(loginUser));
                    store.dispatch(loginUserSuccess(loginUser));
                } catch (e: any) {
                    console.log("🚀 -------------------------🚀");
                    console.log("🚀 ~ e.message:", e.message);
                    console.log("🚀 -------------------------🚀");
                    // store.dispatch(signupUserFail(e.message));
                    // store.dispatch(loginUserFail(e.message));
                    // store.dispatch(signupReset());
                    // store.dispatch(loginReset());
                    // store.dispatch(signupUserReset());
                    // store.dispatch(loginUserReset());
                }
            }
        } else {
            appProps = await App.getInitialProps(appContext);
            const cookies = new Cookies();
            const authCookies: any = cookies.get(PATIENT_COOKIE);
            if (authCookies && authCookies?.session?.id) {
                if (authCookies?.session?.id) {
                    if (ctx.pathname === "/signup") {
                        nextRedirect({ ctx, location: "/dashboard" });
                    }
                } else {
                    if (ctx.pathname !== "/signup") {
                        nextRedirect({ ctx, location: "/signup" });
                    }
                }
            } else {
                if (redirectUrls.indexOf(ctx.pathname) === -1) {
                    const redirectURL = "/login";

                    nextRedirect({
                        location: redirectURL,
                    });
                }
            }
        }

        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
