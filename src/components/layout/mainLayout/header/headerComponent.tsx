/*eslint-disable*/
import { RootState } from "@redux/reducers";
import { LoginUserState, SignupUserState } from "@redux/slices/auth";
import { Drawer, Tooltip } from "antd";
import { AvatarComponent } from "jupiter-commons/src/components/libs/avatarComponent";
import {
    getStringInitials,
    shortStr,
} from "jupiter-commons/src/components/libs/helpers";
import { MenuBarsIcon } from "jupiter-commons/src/components/theme/icons/menuBarsIcon";
import { Logo } from "jupiter-commons/src/components/theme/logo/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SidebarComponent } from "../sidebar/sidebarComponent";
// import {
//     NotificationBell,
//     NovuProvider,
//     PopoverNotificationCenter,
// } from "@novu/notification-center";
import dynamic from "next/dynamic";
import MainLayoutStyles from "../mainLayoutStyles.module.scss";

const NotificationBell = dynamic(
    () =>
        import("@novu/notification-center").then(
            (module) => module.NotificationBell,
        ),
    {
        ssr: false,
    },
);

const NovuProvider = dynamic(
    () =>
        import("@novu/notification-center").then(
            (module) => module.NovuProvider,
        ),
    {
        ssr: false,
    },
);

const PopoverNotificationCenter = dynamic(
    () =>
        import("@novu/notification-center").then(
            (module) => module.PopoverNotificationCenter,
        ),
    {
        ssr: false,
    },
);

export const HeaderComponent = () => {
    const [visible, setVisible] = useState(false);

    const { data: loginUserData }: LoginUserState = useSelector(
        (state: any) => state.loginUser,
    );
    const { data: signUpUserData }: SignupUserState = useSelector(
        (state: RootState) => state.signupUser,
    );
    const router = useRouter();
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const NOVU_API: any = process.env.NOVU_APPLICATION_IDENTIFIER;
    const NOVU_BACKEND_URL: any = process.env.NOVU_BACKEND_URL;
    const NOVU_SOCKET_URL: any = process.env.NOVU_SOCKET_URL;

    const onNotificationClick = async (message: any) => {
        // your logic to handle the notification click
        if (message?.cta?.data?.url) {
            router.push(message?.cta?.data?.url);

            await new Promise(requestAnimationFrame);

            const element: any = document.querySelector(
                ".mantine-Popover-dropdown",
            );
            if (element) {
                element.style.display = "none";
            }
        }
    };

    return (
        <div>
            <div
                className={`${MainLayoutStyles.LayoutContainer__header} px-5 md:px-8 xl:px-20 flex justify-between items-center`}
            >
                <div className="flex flex-col">
                    <Link href="/">
                        <Logo className="w-32" />
                    </Link>
                </div>
                <div className="flex items-center justify-between cursor-pointer">
                    <div
                        className={`flex items-center ${MainLayoutStyles.headerAvatar}`}
                    >
                        <div className="notification">
                            <NovuProvider
                                subscriberId={
                                    loginUserData?.user?.id ||
                                    signUpUserData?.user?.id
                                }
                                subscriberHash={
                                    loginUserData?.user?.subscriberHash ||
                                    signUpUserData?.user?.subscriberHash
                                }
                                backendUrl={NOVU_BACKEND_URL}
                                socketUrl={NOVU_SOCKET_URL}
                                applicationIdentifier={NOVU_API}
                                initialFetchingStrategy={{
                                    fetchNotifications: true,
                                    fetchUnseenCount: true,
                                    fetchUserPreferences: true,
                                }}
                            >
                                <PopoverNotificationCenter
                                    showUserPreferences={true}
                                    colorScheme={"light"}
                                    offset={10}
                                    onNotificationClick={onNotificationClick}
                                >
                                    {({ unseenCount }) => (
                                        <NotificationBell
                                            unseenCount={unseenCount}
                                        />
                                    )}
                                </PopoverNotificationCenter>
                            </NovuProvider>
                        </div>

                        {/* Avatar Icon */}
                        <div className="hidden xl:block">
                            {(loginUserData?.user?.id ||
                                signUpUserData?.user?.id) && (
                                <AvatarComponent
                                    size={48}
                                    className="bg-black flex items-center justify-center ml-5"
                                >
                                    <span>
                                        {getStringInitials(
                                            loginUserData?.user?.firstName ??
                                                signUpUserData?.user?.firstName,
                                        )}
                                    </span>
                                </AvatarComponent>
                            )}
                            {!(
                                loginUserData?.user?.id ||
                                signUpUserData?.user?.id
                            ) && (
                                <AvatarComponent
                                    size={48}
                                    className="bg-black flex items-center justify-center ml-5"
                                ></AvatarComponent>
                            )}
                        </div>
                        {/* Avatar Icon User Name */}
                        <div className="ml-2 mr-2 hidden xl:block">
                            <p className="font-bold text-2xl">
                                Hi,{" "}
                                {loginUserData?.user?.firstName ??
                                    signUpUserData?.user?.firstName}
                            </p>
                        </div>
                    </div>
                    {/* Mobile view */}
                    <div
                        onClick={showDrawer}
                        className={`${MainLayoutStyles.menuIcon}`}
                    >
                        <MenuBarsIcon className="cursor-pointer ml-3" />
                    </div>
                    <Drawer
                        className={MainLayoutStyles.navigationMenu}
                        title={
                            <div
                                className={`flex items-center ${MainLayoutStyles.headerAvatar}`}
                            >
                                <div className="md:ml-2">
                                    {(loginUserData?.user?.id ||
                                        signUpUserData?.user?.id) && (
                                        <AvatarComponent
                                            size={50}
                                            className="bg-black flex items-center justify-center"
                                        >
                                            <span>
                                                {getStringInitials(
                                                    loginUserData?.user
                                                        ?.firstName ??
                                                        signUpUserData?.user
                                                            ?.firstName,
                                                )}
                                            </span>
                                        </AvatarComponent>
                                    )}
                                    {!(
                                        loginUserData?.user?.id ||
                                        signUpUserData?.user?.id
                                    ) && (
                                        <AvatarComponent
                                            size={50}
                                            className="bg-black flex items-center justify-center"
                                        ></AvatarComponent>
                                    )}
                                </div>
                                <div className="ml-2 mr-2">
                                    <p className="font-bold text-lg">
                                        Hi,{" "}
                                        {loginUserData?.user ? (
                                            loginUserData?.user?.firstName
                                                ?.length >= 15 ? (
                                                <Tooltip
                                                    placement="topLeft"
                                                    title={
                                                        <p>{`${loginUserData?.user?.firstName}`}</p>
                                                    }
                                                    overlayStyle={{
                                                        minWidth: "20px",
                                                    }}
                                                >
                                                    <span>
                                                        {shortStr(
                                                            `${loginUserData?.user?.firstName}`,
                                                            15,
                                                        )}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <span>{`${loginUserData?.user?.firstName}`}</span>
                                            )
                                        ) : signUpUserData?.user ? (
                                            signUpUserData?.user?.firstName
                                                ?.length >= 15 ? (
                                                <Tooltip
                                                    placement="topLeft"
                                                    title={
                                                        <p>{`${signUpUserData?.user?.firstName}`}</p>
                                                    }
                                                    overlayStyle={{
                                                        minWidth: "20px",
                                                    }}
                                                >
                                                    <span>
                                                        {shortStr(
                                                            `${signUpUserData?.user?.firstName}`,
                                                            15,
                                                        )}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <span>{`${signUpUserData?.user?.firstName}`}</span>
                                            )
                                        ) : null}
                                    </p>
                                </div>
                            </div>
                        }
                        placement="right"
                        onClose={onClose}
                        visible={visible}
                        width={320}
                    >
                        <SidebarComponent {...{ onClose }} />
                    </Drawer>
                </div>
            </div>
        </div>
    );
};
