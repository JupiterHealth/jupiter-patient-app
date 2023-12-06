import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LayoutContext, LayoutContextModel } from "src/contexts/layoutContext";
import { RootState } from "@redux/reducers";
import { LoginUserState } from "@redux/slices/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "jupiter-commons/src/components/libs/firebase";
import { ChangePasswordIcon } from "jupiter-commons/src/components/theme/icons/changePasswordIcon";
import { DashboardIcon } from "jupiter-commons/src/components/theme/icons/dashboardIcon";
import { MedicationIcon } from "jupiter-commons/src/components/theme/icons/medicationIcon";
import { MyAssesmentIcon } from "jupiter-commons/src/components/theme/icons/myAssesmentIcon";
import { MyCreditcardIcon } from "jupiter-commons/src/components/theme/icons/myCreditcardIcon";
import { MyProfileIcon } from "jupiter-commons/src/components/theme/icons/myProfileIcon";
import { SidebarPrescriberChatIcon } from "jupiter-commons/src/components/theme/icons/sidebarPrescriberChatIcon";
import { SignOutIcon } from "jupiter-commons/src/components/theme/icons/signOutIcon";
import { useSelector } from "react-redux";
import sidebarComponentStyle from "./sidebarComponentStyle.module.scss";
import { TranscationIcon } from "jupiter-commons/src/components/theme/icons/transcationIcon";
import { DEFAULT_SUPPORT_EMAIL } from "jupiter-commons/src/components/libs/constants";

export interface SidebarComponentProps {
    onClose?: (d?: any) => void;
}

export const SidebarComponent = (props: SidebarComponentProps) => {
    const { onClose } = props;
    const { doLogout }: LayoutContextModel = useContext(LayoutContext);
    const router = useRouter();
    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );

    let sidebarMenu: any = [];
    const currentEnvironment: any = process.env.NEXT_ENV;

    const handleCreateUsersRoom = async () => {
        try {
            const res = await getDoc(
                doc(db, "users", loginUserState?.user?.id),
            );

            if (!res?.exists()) {
                await setDoc(doc(db, "users", loginUserState?.user?.id), {
                    uid: loginUserState?.user?.id,
                    email: loginUserState?.user?.email,
                    name: `${loginUserState?.user?.firstName} ${loginUserState?.user?.lastName}`,
                });
                const userChatRes = await getDoc(
                    doc(db, "userChats", loginUserState?.user?.id),
                );
                if (!userChatRes?.exists()) {
                    await setDoc(
                        doc(db, "userChats", loginUserState?.user?.id),
                        {},
                    );
                }
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    sidebarMenu = [
        {
            key: "dashboard",
            title: "Dashboard",
            path: `/dashboard`,
            icon: <DashboardIcon className="w-4 mr-3" />,
        },
        {
            key: "my_medications",
            title: "My Medications",
            path: `/my-medication`,
            icon: <MedicationIcon className="w-4 mr-3" />,
        },
        {
            key: "prescriber_chat",
            title: "Prescriber chat",
            path: `/prescriber-chat`,
            icon: <SidebarPrescriberChatIcon className="w-4 mr-3" />,
        },
        {
            key: "pharmacy_chat",
            title: "Pharmacy chat",
            path: `/pharmacy-chat`,
            icon: <SidebarPrescriberChatIcon className="w-4 mr-3" />,
        },
        // {
        //     title: (
        //         <div className="flex">
        //             <div>My Messages</div>
        //             <p className="bg-secondary text-base text-white rounded-xl items-center text-center font-semibold w-8 ml-2">
        //                 03
        //             </p>
        //         </div>
        //     ),
        //     path: `/my-massage`,
        //     icon: <MyMessageIcon className="w-4 mr-3" />,
        // },
        {
            key: "my_assessments",
            title: "My Assessments",
            path: `/my-assessment`,
            icon: <MyAssesmentIcon className="w-5 mr-2" />,
        },
        {
            key: "my_credit_cards",
            title: "My Credit Cards",
            path: `/my-credit-card`,
            icon: <MyCreditcardIcon className="w-4 mr-3" />,
        },
        {
            key: "transactions",
            title: "Transactions",
            path: `/transactions`,
            icon: <TranscationIcon className="w-[16px] mr-[13px]" />,
        },
        {
            key: "my_profile",
            title: "My Profile",
            path: `/my-profile`,
            icon: <MyProfileIcon className="w-4 mr-3" />,
        },
        {
            key: "change_password",
            title: "Change Password",
            path: `/change-password`,
            icon: <ChangePasswordIcon className="w-4 mr-3" />,
        },
    ];

    return (
        <>
            <div className={`${sidebarComponentStyle.sidebarContainer}`}>
                {sidebarMenu &&
                    sidebarMenu.length > 0 &&
                    sidebarMenu.map((s: any) => {
                        return (
                            <div
                                className={`  ${
                                    sidebarComponentStyle.sidebarMenu
                                } ${
                                    s.path ===
                                        `/${router.pathname.split("/")[1]}` &&
                                    sidebarComponentStyle.sidebarMenuActive
                                }`}
                                onClick={() => {
                                    if (
                                        [
                                            "prescriber_chat",
                                            "pharmacy_chat",
                                            "my_assessments",
                                        ].includes(s?.key)
                                    ) {
                                        handleCreateUsersRoom();
                                    }
                                    if (typeof onClose === "function") {
                                        onClose();
                                    }
                                }}
                            >
                                <Link href={`${s.path}`}>
                                    <span className={`flex items-center`}>
                                        {s.icon} {s.title}
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                <div
                    onClick={doLogout}
                    className={sidebarComponentStyle.signOut}
                >
                    <a className="flex items-center">
                        <SignOutIcon className="w-[15px] ml-[10px] mr-[11px]" />
                        Sign Out
                    </a>
                </div>
            </div>
            <div
                className={`p-2 !px-5 md:px-2 !mx-4 xl:mx-3 w-[285px] xl:w-[210px] bg-grey-100 fixed bottom-[15px] rounded-[10px] `}
            >
                <p className="text-base font-medium">Need help?</p>
                <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`} target="_blank">
                    <p className="!text-secondary text-bse xl:text-sm font-medium cursor-pointer">
                        {DEFAULT_SUPPORT_EMAIL}
                    </p>
                </a>
            </div>
        </>
    );
};
