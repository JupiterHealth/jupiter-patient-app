import { MainLayoutComponent } from "@components/layout/mainLayout";
import ChangeMedicationModal from "@components/theme/modal/changeMedicationModal/changeMedicationModal";
import RenewPrescriptionModal from "@components/theme/modal/renewPrescriptionModal/renewPrescriptionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginUserState, SignupUserState } from "@redux/slices/auth";
import {
    MyAssessmentListState,
    fetchMyAssessment,
} from "@redux/slices/myAssessment";
import { Tooltip } from "antd";
import {
    DEFAULT_TABLE_LIMIT,
    DETAIL_DATE_FORMAT,
    DETAIL_TIME_FORMAT,
    EST_TIMEZONE,
} from "jupiter-commons/src/components/libs/constants";
import {
    convertDateToTimezone,
    convertToTitleCaseAndRemoveUnderscore,
    deepClone,
} from "jupiter-commons/src/components/libs/helpers";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import useList from "jupiter-commons/src/components/libs/useList";
import { ChangeMedicationIcon } from "jupiter-commons/src/components/theme/icons/changeMedicationIcon";
import { DownloadIcon } from "jupiter-commons/src/components/theme/icons/downloadIcon";
import { RenewIcon } from "jupiter-commons/src/components/theme/icons/renewIcon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import MyAssessmentScene from "./myAssessmentScene";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "jupiter-commons/src/components/libs/firebase";
import PrescriberChatModal from "@components/theme/modal/prescriberChatModal/prescriberChatModal";
import moment from "moment";
import Spinner from "jupiter-commons/src/components/theme/spinner";
import { downloadInvoiceAPI } from "@redux/services/transactions.api";
import { SidebarPrescriberChatIcon } from "jupiter-commons/src/components/theme/icons/sidebarPrescriberChatIcon";

const MyAssessmentContainer = () => {
    const { register, formState, control } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });

    const dispatch = useDispatch<any>();
    const {
        data: MyAssessmentList,
        isLoading,
    }: MyAssessmentListState = useSelector((state: any) => state.myAssessment);

    const { data: loginUserData }: LoginUserState = useSelector(
        (state: any) => state.loginUser,
    );
    const { data: SignupUserData }: SignupUserState = useSelector(
        (state: any) => state.signupUser,
    );
    const [
        isRenewPrescriptionModalOpen,
        setIsRenewPrescriptionModalOpen,
    ] = useState<boolean>(false);
    const [
        isChangeMedicationModalOpen,
        setIsChangeMedicationModalOpen,
    ] = useState<boolean>(false);

    const [selectedAssessment, setSelectedAssessment] = useState<any>();
    const [isPrescriberChatModalOpen, setIsPrescriberchatModalOpen] = useState(
        false,
    );
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);

    const {
        apiParam,
        setPaginationObj,
        paginationObj,
        handleOnTableChange,
        setApiParam,
        search,
    } = useList({
        queryParams: {
            orderBy: "createdAt|desc",
            skip: 0,
            take: DEFAULT_TABLE_LIMIT,
            include: [
                "service",
                "assessmentHasPatientProfile",
                "assessmentHasTreatmentProduct",
                "prescriberUser",
                "assessmentHasCharge",
            ],
        },
    });

    const myAssessmentListColumns: TableColumnsProps[] = [
        {
            title: <div className="font-semibold">Assessment Number</div>,
            dataIndex: "uniqueId",
            sorter: false,
            render: (_: any, MyAssessmentList: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {MyAssessmentList?.uniqueId ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Service</div>,
            dataIndex: "Service",
            sorter: false,
            render: (Service: any, myAssessment: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {myAssessment?.service?.serviceName
                            ? myAssessment?.service?.serviceName
                            : "-"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Date & Time</div>,
            dataIndex: "createdAt",
            sorter: false,
            render: (_: any, myAssessment: any) => (
                <>
                    <p>
                        {moment(
                            convertDateToTimezone(
                                myAssessment?.createdAt,
                                EST_TIMEZONE,
                            ),
                        ).format(DETAIL_DATE_FORMAT)}
                    </p>
                    <p>
                        {" "}
                        {moment(
                            convertDateToTimezone(
                                myAssessment?.createdAt,
                                EST_TIMEZONE,
                            ),
                        ).format(DETAIL_TIME_FORMAT)}
                    </p>
                </>
            ),
        },
        {
            title: <div className="font-semibold">Status</div>,
            dataIndex: "Status",
            sorter: false,
            render: (_: any, myAssessment: any) => (
                <span
                    className={`${
                        myAssessment?.assessmentStatus === "PENDING"
                            ? "text-yellow-400"
                            : myAssessment?.assessmentStatus === "APPROVED"
                            ? "text-green-400"
                            : myAssessment?.assessmentStatus === "IN_PROGRESS"
                            ? "text-secondary"
                            : myAssessment?.assessmentStatus === "REJECTED"
                            ? "text-red-600"
                            : myAssessment?.assessmentStatus === "EXITED"
                            ? "text-orange-500"
                            : myAssessment?.assessmentStatus === "DELIVERED"
                            ? "text-cyan-900"
                            : "text-red-600"
                    }`}
                >
                    {myAssessment?.assessmentStatus
                        ? (myAssessment?.assessmentStatus)
                              .split("_")
                              .map(
                                  (word: any) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1).toLowerCase(),
                              )
                              .join(" ")
                        : "-"}
                </span>
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            render: (type: any, myAssessment: any) => (
                <span
                    className={`${
                        myAssessment?.requestType === "NEW"
                            ? "text-secondary"
                            : myAssessment?.requestType === "CHANGE_MEDICATION"
                            ? "text-success"
                            : "text-secondary"
                    }`}
                >
                    {myAssessment?.requestType
                        ? `${convertToTitleCaseAndRemoveUnderscore(
                              myAssessment?.requestType,
                          )}`
                        : "-"}{" "}
                </span>
            ),
        },
        {
            title: <div className="font-semibold text-center">Actions</div>,
            dataIndex: "Action",
            sorter: false,
            render: (_: any, myAssessment: any) => (
                <>
                    <div className="flex justify-center items-center">
                        <Tooltip
                            placement="bottomRight"
                            title="Start Prescriber Chat"
                            className="font-medium"
                            overlayClassName="hoverOverTooltip"
                        >
                            {myAssessment?.prescriberUserId && (
                                <SidebarPrescriberChatIcon
                                    className="mr-4 w-5 pt-1 cursor-pointer"
                                    onClick={() => {
                                        handleOnclick(
                                            myAssessment?.prescriberUser,
                                        );
                                        setSelectedAssessment(myAssessment);
                                        setIsPrescriberchatModalOpen(true);
                                    }}
                                />
                            )}
                        </Tooltip>
                        <Tooltip
                            placement="bottomRight"
                            title={"Download Invoice"}
                            overlayClassName="hoverOverTooltip"
                        >
                            <span className="mr-3 flex items-center">
                                {myAssessment?.assessmentStatus ===
                                "EXITED" ? null : isLoadingDownload &&
                                  myAssessment?.id ===
                                      selectedAssessment?.id ? (
                                    <Spinner size={20} />
                                ) : (
                                    <DownloadIcon
                                        className="w-5 h-5 text-light-black cursor-pointer"
                                        onClick={() => {
                                            setSelectedAssessment(myAssessment);
                                            handleInvoiceDownload(myAssessment);
                                        }}
                                    />
                                )}
                            </span>
                        </Tooltip>

                        <Tooltip
                            placement="bottomRight"
                            title={"Change Medication"}
                            overlayClassName="hoverOverTooltip"
                        >
                            {myAssessment?.pharmacyCharged && (
                                <ChangeMedicationIcon
                                    className="mr-4 w-5 cursor-pointer"
                                    onClick={() => {
                                        setSelectedAssessment(myAssessment);
                                        setIsChangeMedicationModalOpen(true);
                                    }}
                                />
                            )}
                        </Tooltip>
                        <Tooltip
                            placement="bottomRight"
                            overlayClassName="hoverOverTooltip"
                            title={"Renew Prescription"}
                        >
                            {myAssessment?.pharmacyCharged &&
                                moment() >
                                    moment(myAssessment?.renewDate).subtract(
                                        3,
                                        "month",
                                    ) && (
                                    <RenewIcon
                                        className="w-5 cursor-pointer"
                                        onClick={() => {
                                            setSelectedAssessment(myAssessment);
                                            setIsRenewPrescriptionModalOpen(
                                                true,
                                            );
                                        }}
                                    />
                                )}
                        </Tooltip>
                    </div>
                </>
            ),
        },
    ];

    const handleInvoiceDownload = async (assessment: any) => {
        try {
            setIsLoadingDownload(true);
            const downloadRes = await downloadInvoiceAPI({
                assessmentId: assessment?.id,
                orderId: assessment?.assessmentHasCharge.filter(
                    (data: any) => data.type === "FEE",
                )[0].uniqueId,
                isPatient: true,
            });

            if (downloadRes) {
                window.open(downloadRes?.Location);
            }
            setIsLoadingDownload(false);
        } catch (error) {
            console.log("error", error);
            setIsLoadingDownload(false);
        }
    };
    const handleSearch = (searchVal: any) => {
        search(searchVal?.target?.value, ["serviceName"]);
        setPaginationObj({ ...paginationObj, current: 1 });
    };

    const handleDateSearch = (e: any) => {
        setApiParam((d) => {
            const temp = deepClone(d);
            if (e) {
                temp["startDate"] = moment
                    .tz(e, EST_TIMEZONE)
                    .utc()
                    .toISOString();
                temp["endDate"] = moment
                    .tz(e, EST_TIMEZONE)
                    .add(23, "hours")
                    .add(59, "minutes")
                    .add(59, "seconds")
                    .add(999, "milliseconds")
                    .utc()
                    .toISOString();
            } else {
                delete temp["startDate"];
                delete temp["endDate"];
            }
            temp["skip"] = 0;
            return temp;
        });
        setPaginationObj({ ...paginationObj, current: 1 });
    };

    const handleFilterChange = (value: any) => {
        setApiParam((d) => {
            const temp = deepClone(d);
            if (typeof value !== "undefined") {
                temp["assessmentStatus"] = value;
            } else {
                delete temp["assessmentStatus"];
            }
            temp["skip"] = 0;
            const newState = deepClone(temp);
            return newState;
        });
        setPaginationObj({ ...paginationObj, current: 1 });
    };

    const handleOnclick = async (prescriber: any) => {
        try {
            const userChatsRes = await getDoc(
                doc(db, "userChats", prescriber?.id),
            );
            if (!userChatsRes?.exists()) {
                await setDoc(doc(db, "userChats", prescriber?.id), {});
            }

            const combinedId = `${prescriber?.id}${loginUserData?.user?.id}`;
            //create user chats
            await updateDoc(doc(db, "userChats", loginUserData?.user?.id), {
                [combinedId + ".userInfo"]: {
                    uid: prescriber?.id,
                    email: prescriber?.email,
                    name: `${prescriber?.firstName} ${prescriber?.lastName}`,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", prescriber?.id), {
                [combinedId + ".userInfo"]: {
                    uid: loginUserData?.user?.id,
                    email: loginUserData?.user?.email,
                    name: `${loginUserData?.user?.firstName} ${loginUserData?.user?.lastName}`,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };
    useEffect(() => {
        dispatch(
            fetchMyAssessment({
                ...apiParam,
                patientUserId:
                    loginUserData?.user?.id || SignupUserData?.user?.id,
            }),
        );
    }, [apiParam]);

    useEffect(() => {
        if (MyAssessmentList && MyAssessmentList?.total > 0) {
            setPaginationObj({
                ...paginationObj,
                total: MyAssessmentList?.total,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [MyAssessmentList]);

    return (
        <>
            <MyAssessmentScene
                {...{
                    myAssessmentListColumns,
                    register,
                    formState,
                    control,
                    handleSearch,
                    MyAssessmentList,
                    handleOnTableChange,
                    isLoading,
                    handleDateSearch,
                    handleFilterChange,
                    paginationObj,
                }}
            />
            {isRenewPrescriptionModalOpen && (
                <RenewPrescriptionModal
                    isOpen={isRenewPrescriptionModalOpen}
                    onClose={() => {
                        setIsRenewPrescriptionModalOpen(false);
                        dispatch(
                            fetchMyAssessment({
                                ...apiParam,
                                patientUserId:
                                    loginUserData?.user?.id ||
                                    SignupUserData?.user?.id,
                            }),
                        );
                    }}
                    register={register}
                    formState={formState}
                    control={control}
                    selectedAssessment={selectedAssessment}
                    setIsRenewPrescriptionModalOpen={
                        setIsRenewPrescriptionModalOpen
                    }
                />
            )}
            {isChangeMedicationModalOpen && (
                <ChangeMedicationModal
                    isOpen={isChangeMedicationModalOpen}
                    onClose={() => {
                        setIsChangeMedicationModalOpen(false);
                        dispatch(
                            fetchMyAssessment({
                                ...apiParam,
                                patientUserId:
                                    loginUserData?.user?.id ||
                                    SignupUserData?.user?.id,
                            }),
                        );
                    }}
                    control={control}
                    selectedAssessment={selectedAssessment}
                    setIsChangeMedicationModalOpen={
                        setIsChangeMedicationModalOpen
                    }
                />
            )}

            {isPrescriberChatModalOpen && (
                <PrescriberChatModal
                    isOpen={isPrescriberChatModalOpen}
                    onClose={() => {
                        setIsPrescriberchatModalOpen(false);
                    }}
                    selectedAssessment={selectedAssessment}
                    setSelectedAssessment={setSelectedAssessment}
                />
            )}
        </>
    );
};
MyAssessmentContainer.Layout = MainLayoutComponent;
export default MyAssessmentContainer;
