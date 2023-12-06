import { MainLayoutComponent } from "@components/layout/mainLayout";
import { RootState } from "@redux/reducers";
import {
    checkPharmacyExistsAPI,
    getPharmacyListAPI,
} from "@redux/services/pharmacy.api";
import { LoginUserState } from "@redux/slices/auth";
import { pharmacyListObject, pharmacyObject } from "@redux/slices/pharmacy";
import { wrapper } from "@redux/store";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "jupiter-commons/src/components/libs/firebase";
import { nextRedirect } from "jupiter-commons/src/components/libs/helpers";
import { QueryParams } from "jupiter-commons/src/components/libs/types";
import NoDataComponent from "jupiter-commons/src/components/noDataComponent/noDataComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PharmacyChatScene from "./pharmacyChatScene";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";
import { NoChatIcon } from "jupiter-commons/src/components/theme/icons/noChatIcon";

interface PharmacyChatContainerProps {
    pharmacy: pharmacyObject;
}

const PharmacyChatContainer = (props: PharmacyChatContainerProps) => {
    const { pharmacy } = props;
    const { data: loginUserState }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const [isPharmacy, setIsPharmacy] = useState<any>(null);
    const [isLoadingCheckPharmacy, setIsLoadingCheckPharmacy] = useState(false);
    const p: pharmacyListObject = pharmacy?.list[0];
    const combinedId = `${loginUserState?.user?.id}${p?.id}`;

    const handlePharmacyChat = async () => {
        try {
            const userChatsRes = await getDoc(doc(db, "userChats", p?.id));
            if (!userChatsRes?.exists()) {
                await setDoc(doc(db, "userChats", p?.id), {});
            }

            //create user chats
            await updateDoc(doc(db, "userChats", loginUserState?.user?.id), {
                [combinedId + ".userInfo"]: {
                    uid: p?.pharmacyUser[0]?.id,
                    email: p?.pharmacyUser[0]?.email,
                    name: `${p?.pharmacyUser[0]?.firstName} ${p?.pharmacyUser[0]?.lastName}`,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", p?.id), {
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

    const checkPharmacyExistsHandler = async () => {
        try {
            setIsLoadingCheckPharmacy(true);
            const checkPharmacyRes: any = await checkPharmacyExistsAPI();
            if (checkPharmacyRes) {
                setIsPharmacy(checkPharmacyRes);
            } else {
                setIsPharmacy(false);
            }
            setIsLoadingCheckPharmacy(false);
        } catch (error) {
            console.log("error", error);
            setIsLoadingCheckPharmacy(false);
        }
    };

    useEffect(() => {
        handlePharmacyChat();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [pharmacy]);

    useEffect(() => {
        checkPharmacyExistsHandler();
    }, []);

    return (
        <>
            {pharmacy && pharmacy?.count > 0 && isPharmacy && (
                <PharmacyChatScene
                    {...{
                        pharmacyDetails: pharmacy?.list[0],
                        combinedId,
                    }}
                />
            )}

            {isLoadingCheckPharmacy && <DefaultSkeleton />}

            {(pharmacy && pharmacy?.count === 0) ||
                (isPharmacy === false && !isLoadingCheckPharmacy && (
                    <div className="flex flex-col items-center justify-center mt-48">
                        <NoChatIcon className="w-20 h-20" />
                        <p className="font-medium pt-4 text-[17px]">
                            No Chat History
                        </p>
                    </div>
                ))}
        </>
    );
};

PharmacyChatContainer.Layout = MainLayoutComponent;
PharmacyChatContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (ctx: any) => {
        try {
            const queryParams: QueryParams = {
                take: 10,
                skip: 0,
                include: ["pharmacyUser"],
            };
            const res = await getPharmacyListAPI(queryParams);
            if (res) {
                return { pharmacy: res };
            }
        } catch (e: any) {
            console.log(e);
            nextRedirect({
                ctx,
                location: "/dashboard",
            });
        }
        return { pharmacy: null };
    },
);

export default PharmacyChatContainer;
