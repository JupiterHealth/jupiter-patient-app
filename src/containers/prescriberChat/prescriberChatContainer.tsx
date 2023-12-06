import { MainLayoutComponent } from "@components/layout/mainLayout";
import { RootState } from "@redux/reducers";
import {
    getPrescriberInfoAPI,
    getPrescriberListAPI,
} from "@redux/services/prescriber.api";
import { LoginUserState } from "@redux/slices/auth";
import {
    PrescriberObject,
    fetchPrescriber,
    prescriberListState,
} from "@redux/slices/prescriber";
import { wrapper } from "@redux/store";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import {
    DEFAULT_SIDEBAR_LIMIT,
    DEFAULT_TABLE_LIMIT,
} from "jupiter-commons/src/components/libs/constants";
import { db } from "jupiter-commons/src/components/libs/firebase";
import {
    handleResetInfiniteScroll,
    nextRedirect,
} from "jupiter-commons/src/components/libs/helpers";
import useList from "jupiter-commons/src/components/libs/useList";
import NoDataComponent from "jupiter-commons/src/components/noDataComponent/noDataComponent";
import SidebarListingComponent from "jupiter-commons/src/components/sidebarListing/sidebarListingComponent";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrescriberChatScene from "./prescriberChatScene";
import MobilePrescriberListComponent from "./mobilePrescriberListComponent";
import PrescriberChatStyles from "./prescriberChatStyles.module.scss";
import { NoChatIcon } from "jupiter-commons/src/components/theme/icons/noChatIcon";

interface PrescriberContainerProps {
    prescriberDetails: PrescriberObject;
}
//* ----- Main component start ----- *//
const PrescriberChatContainer = (props: PrescriberContainerProps) => {
    const { prescriberDetails } = props;
    const router = useRouter();
    const { data: loginUser }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );

    return (
        <>
            {router &&
                router?.query &&
                router?.query?.prescriberId &&
                prescriberDetails?.id && (
                    <PrescriberChatScene
                        {...{
                            prescriberDetails,
                        }}
                    />
                )}

            {!(router && router?.query && router?.query?.prescriberId) && (
                <div className="mt-4 md:mt-9 hidden md:block">
                    <NoDataComponent
                        {...{
                            text: "Prescriber",
                            name: `${loginUser?.user?.firstName} ${loginUser?.user?.lastName}`,
                        }}
                    />
                </div>
            )}
        </>
    );
};
//* ----- Main component end ----- *//
//* ----- sidebar listing component start ----- *//
const PrescriberListingLayout: React.FC = ({ children }: any) => {
    const {
        data: prescriberData,
        isLoading,
    }: prescriberListState = useSelector(
        (state: RootState) => state.prescriber,
    );

    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const { apiParam, search } = useList({
        queryParams: {
            orderBy: "createdAt|asc",
            skip: 0,
            take: DEFAULT_SIDEBAR_LIMIT,
        },
    });

    const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(false);
    const infiniteRef = useRef(null);
    const [prescribers, setPrescribers] = useState<any>(prescriberData);

    const transformedArray =
        prescribers?.list?.length > 0
            ? prescribers?.list?.map((item: any) => ({
                  id: item?.id,
                  name: `${item.firstName} ${item.lastName}`,
                  email: item?.email,
                  extraLineData: item?.cpsoNumber,
              }))
            : [];

    const handleSearch = (searchVal: any) => {
        search(searchVal?.target?.value, ["firstName", "lastName"]);
        handleResetInfiniteScroll(infiniteRef);
    };

    const handleOnclick = async (prescriber: any) => {
        try {
            const prescriberRes = await getDoc(
                doc(db, "userChats", prescriber?.id),
            );
            if (!prescriberRes?.exists()) {
                await setDoc(doc(db, "userChats", prescriber?.id), {});
            }

            const combinedId = `${prescriber?.id}${loginUserState?.user?.id}`;
            //create user chats
            await updateDoc(doc(db, "userChats", loginUserState?.user?.id), {
                [combinedId + ".userInfo"]: {
                    uid: prescriber?.id,
                    email: prescriber?.email,
                    name: `${prescriber?.firstName} ${prescriber?.lastName}`,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", prescriber?.id), {
                [combinedId + ".userInfo"]: {
                    uid: loginUserState?.user?.id,
                    email: loginUserState?.user?.email,
                    name: `${loginUserState?.user?.firstName} ${loginUserState?.user?.lastName}`,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };
    const handleLoadMore = async (p: any) => {
        try {
            if (!isInfiniteScrolling) {
                setIsInfiniteScrolling(true);
                const res = await getPrescriberListAPI({
                    ...apiParam,
                    skip: p * DEFAULT_SIDEBAR_LIMIT,
                });
                if (res && res.list) {
                    setPrescribers({
                        list: [...prescribers.list, ...res.list],
                        count: prescribers.count + res.count,
                        hasMany: res.hasMany,
                    });
                }
                setIsInfiniteScrolling(false);
            }
        } catch (error) {
            setIsInfiniteScrolling(false);
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        if (prescriberData) {
            setPrescribers({
                list: prescriberData.list,
                count: prescriberData.count,
                hasMany: prescriberData.hasMany,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [prescriberData]);

    useEffect(() => {
        dispatch(
            fetchPrescriber({
                ...apiParam,
                patientUserId: loginUserState?.user?.id,
            }),
        );

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [apiParam]);
    return (
        <MainLayoutComponent>
            {!prescriberData?.list && !isLoading ? (
                <div className="flex flex-col items-center justify-center mt-48">
                    <NoChatIcon className="w-20 h-20" />
                    <p className="font-medium pt-4 text-[17px]">
                        No Chat History
                    </p>
                </div>
            ) : (
                <div className="flex h-full">
                    <div
                        className={`hidden md:block ${PrescriberChatStyles.sidebarListingPrescriberChat}`}
                    >
                        <SidebarListingComponent
                            {...{
                                slug: "prescriber-chat",
                                data: transformedArray,
                                title: "Prescribers",
                                extraLine: "License No.",
                                handleSearch,
                                isLoading,
                                handleOnclick,
                                hasMore: prescribers?.hasMany,
                                handleLoadMore,
                                isInfiniteScrolling,
                                isInfinite: true,
                                infiniteRef: infiniteRef,
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {!(
                            router &&
                            router?.query &&
                            router?.query?.prescriberId
                        ) && (
                            <>
                                <div className="flex items-center justify-between md:hidden">
                                    <p className="pt-6 px-4 text-lg font-semibold flex">
                                        Prescribers
                                    </p>
                                </div>
                                <div className="flex items-center justify-between md:hidden">
                                    <MobilePrescriberListComponent
                                        {...{
                                            handleLoadMore,
                                            handleOnclick,
                                            handleSearch,
                                            infiniteRef,
                                            isInfiniteScrolling,
                                            isLoading,
                                            prescribers,
                                            transformedArray,
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </MainLayoutComponent>
    );
};
//* ----- sidebar listing component end ----- *//

PrescriberChatContainer.Layout = PrescriberListingLayout;
PrescriberChatContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (ctx: any) => {
        const prescriberId = ctx?.query?.prescriberId;
        try {
            if (prescriberId) {
                const res = await getPrescriberInfoAPI(prescriberId);
                if (res) return { prescriberDetails: res };
            }
        } catch (e: any) {
            console.log(e);
            nextRedirect({
                ctx,
                location: "/prescriber-chat",
            });
        }
        return { prescriberDetails: null };
    },
);

export default PrescriberChatContainer;
