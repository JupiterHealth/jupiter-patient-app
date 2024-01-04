import { MainLayoutComponent } from "@components/layout/mainLayout";
import CancelRXModal from "@components/theme/modal/cancelRXModal/cancelRXModal";
import ModifyMedicationModal from "@components/theme/modal/modifyMedicationModal/modifyMedicationModal";
import PauseRXModal from "@components/theme/modal/pauseRXModal/pauseRXModal";
import ResumeRXModal from "@components/theme/modal/resumeRXModal/resumeRXModal";
import { LoginState } from "@redux/slices/auth";
import { Popover, Tooltip } from "antd";
import axios from "axios";
import {
    DEFAULT_TABLE_LIMIT,
    DETAIL_DATE_FORMAT,
    EST_TIMEZONE,
} from "jupiter-commons/src/components/libs/constants";
import {
    convertDateToTimezone,
    deepClone,
} from "jupiter-commons/src/components/libs/helpers";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import useList from "jupiter-commons/src/components/libs/useList";
import { CancelIcon } from "jupiter-commons/src/components/theme/icons/cancelIcon";
import { CounsellingInformationIcon } from "jupiter-commons/src/components/theme/icons/counsellingInformationIcon";
import { ModifyIcon } from "jupiter-commons/src/components/theme/icons/modifyIcon";
import { PauseIcon } from "jupiter-commons/src/components/theme/icons/pauseIcon";
import { ResumeIcon } from "jupiter-commons/src/components/theme/icons/resumeIcon";
import { VerticalDotIcon } from "jupiter-commons/src/components/theme/icons/verticalDotIcon";
import moment from "moment";
import router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyMedicationscene from "./myMedicationscene";
import { RootState } from "@redux/reducers";
import medicationStyle from "./medicationStyle.module.scss";
import { InformationIcon } from "jupiter-commons/src/components/theme/icons/informationIcon";
import { SidebarPrescriberChatIcon } from "jupiter-commons/src/components/theme/icons/sidebarPrescriberChatIcon";
import Link from "next/link";
import { PILLEO_API_URL } from "jupiter-commons/src/components/libs/constants";
import { PILLEO_AUTHORIZATION_CODE } from "jupiter-commons/src/components/libs/constants";

export const MyMedicationContainer = () => {
    const [selectedAssessment, setSelectedAssessment] = useState<any>();
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isCancelRXModalOpen, setIsCancelRXModalOpen] = useState(false);
    const [isResumeRXModalOpen, setIsResumeRXModalOpen] = useState(false);
    const [isPauseRXModalOpen, setIsPauseRXModalOpen] = useState(false);
    const [medication, setMedication] = useState<any>({});
    const [isLoadingMedication, setIsLoadingMedication] = useState<any>(false);

    const {
        apiParam,
        setPaginationObj,
        paginationObj,
        handleOnTableChange,
        setApiParam,
        search,
    } = useList({
        queryParams: {
            skip: 0,
            take: DEFAULT_TABLE_LIMIT,
        },
    });

    const getUrlByName = (pname: any) => {
        const name = (pname?.drg?.brName ?? pname?.drgMix?.description)
            .split("-")[0]
            .trim();

        const urlMap: any = {
            "INF 1":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568a5b62fa9d33ce36b1aa1_INF%201%20-%20Counselling%20Information.pdf",
            "INF 2":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb27f907e7cf056330a1_INF%202%20-%20Counselling%20Information.pdf",
            "INF 3":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb27c32ecda9505e6350_INF%203%20-%20Counselling%20Information.pdf",
            "MSK 1":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb2721d1219bafffd7a8_MSK%201%20-%20Counselling%20Information.pdf",
            "MSK 2":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb27ae8a83bbc69a331c_MSK%202%20-%20Counselling%20Information.pdf",
            "NUP 1":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb279f53b1837a851674_NUP%201%20-%20Counselling%20Information.pdf",
            "NUP 2":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb28bc91e911495064f4_NUP%202%20-%20Counselling%20Information.pdf",
            "NUP 3":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb2960df036e55757210_NUP%203%20-%20Counselling%20Information.pdf",
            "MXP 1":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb279cf360ead3fc3aa9_MXP%201%20-%20Counselling%20Information.pdf",
            "MXP 2":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb27bc73a44d08723e3c_MXP%202%20-%20Counselling%20Information.pdf",
            "MXP 3":
                "https://uploads-ssl.webflow.com/644be1b1b30293915f6122ca/6568eb27575b6f01209b4f4c_MXP%203%20-%20Counselling%20Information.pdf",
        };

        return urlMap[name] || "/404"; // Redirect to a 404 page if the name is not found
    };

    const loginUser: LoginState = useSelector(
        (state: RootState) => state.loginUser,
    );

    const tableColumnsData: TableColumnsProps[] = [
        {
            title: <div className="font-semibold">Medication</div>,
            dataIndex: "Medication",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {patientMedication?.drg?.brName ??
                            patientMedication?.drgMix?.description}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Qty</div>,
            dataIndex: "qty",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {Number(patientMedication?.dispQty)?.toFixed(0) ??
                            "N/A"}
                        {patientMedication?.drgMix?.drgform?.form ??
                            patientMedication?.drg?.drgform?.form}
                    </span>
                </div>
            ),
        },
        {
            title: (
                <div className="font-semibold flex">
                    Cash Portion{" "}
                    <Tooltip
                        placement="right"
                        title={
                            <p className="font-medium text-xs">
                                The 'Cash Portion' represents the amount billed
                                to the patient after accounting for any
                                applicable insurance coverage.
                            </p>
                        }
                        overlayStyle={{
                            minWidth: "20px",
                        }}
                    >
                        <p className="mb-[2px]">
                            <InformationIcon className="w-3 h-3 mt-2 mx-[2px]" />
                        </p>
                    </Tooltip>
                </div>
            ),
            dataIndex: "CashPortion",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        $ {patientMedication?.rxPln[0]?.pays ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Remaining Refills</div>,
            dataIndex: "refills",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {Number(patientMedication?.remQty)?.toFixed(0) ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Fill Date</div>,
            dataIndex: "fillDate",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {moment(
                            convertDateToTimezone(
                                patientMedication?.fillDate,
                                EST_TIMEZONE,
                            ),
                        ).format(DETAIL_DATE_FORMAT) ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Next Fill Date</div>,
            dataIndex: "nextfillDate",
            sorter: false,
            render: (_: any, patientMedication: any) => {
                const remainingRefills = Number(patientMedication?.remQty);
                if (remainingRefills === 0) {
                    return (
                        <div className="flex">
                            <span className="font-medium">N/A</span>
                        </div>
                    );
                }
                return (
                    <div className="flex">
                        <span className="font-medium">
                            {moment(
                                convertDateToTimezone(
                                    patientMedication?.fillDate,
                                    EST_TIMEZONE,
                                ),
                            )
                                .add(
                                    Number(patientMedication?.daysSupply),
                                    "day",
                                )
                                .format(DETAIL_DATE_FORMAT)}
                        </span>
                    </div>
                );
            },
        },

        {
            title: <div className="font-semibold">Status</div>,
            dataIndex: "Status",
            sorter: false,
            render: (_: any, patientMedication: any) => (
                <>
                    <div className="text-success font-medium">
                        {patientMedication?.Status ?? "N/A"}
                    </div>
                    {/* <div className="text-primary font-medium">Shipped</div>
                    <>
                        <div className="text-[#EBB02A] font-medium">
                            Pending
                        </div>
                    </>
                    <p className="font-medium">ID #1234567</p> */}
                </>
            ),
        },
        {
            title: <div className="font-semibold">Actions</div>,
            dataIndex: "Actions",
            sorter: false,
            render: (_: any, myAssessment: any) => (
                <>
                    <div className={medicationStyle.popover}>
                        <Popover
                            trigger="click"
                            overlayClassName={medicationStyle.popover}
                            title={
                                <div className="text-lg w-72 items-center m-4 cursor-pointer">
                                    <div className="flex text-start">
                                        <CounsellingInformationIcon className="text-light-black w-4" />
                                        <p className="ml-3 text-[15px] font-medium text-light-black">
                                            <Link
                                                href={getUrlByName(
                                                    myAssessment,
                                                )}
                                                target="_blank"
                                            >
                                                Counseling Information
                                            </Link>
                                        </p>
                                    </div>
                                    <div
                                        className="flex mt-2 items-center"
                                        onClick={() =>
                                            router.push("/pharmacy-chat")
                                        }
                                    >
                                        <SidebarPrescriberChatIcon className="text-light-black w-4 mr-1 pt-1" />
                                        <p className="ml-2 text-[15px] font-medium text-light-black">
                                            Start Pharmacy Chat
                                        </p>
                                    </div>
                                    <div
                                        className="flex mt-2 items-center cursor-pointer"
                                        onClick={() => {
                                            setIsModifyModalOpen(true);
                                            setSelectedAssessment(myAssessment);
                                        }}
                                    >
                                        <ModifyIcon className="text-light-black w-4" />
                                        <p className="ml-3 text-[15px] font-medium text-light-black">
                                            Modify
                                        </p>
                                    </div>
                                    <div
                                        className="flex mt-2 items-center cursor-pointer"
                                        onClick={() => {
                                            setIsPauseRXModalOpen(true);
                                            setSelectedAssessment(myAssessment);
                                        }}
                                    >
                                        <PauseIcon className="text-light-black w-4" />
                                        <p className="ml-3 text-[15px] font-medium text-light-black">
                                            Pause Medication
                                        </p>
                                    </div>
                                    <div
                                        className="flex mt-2 items-center cursor-pointer"
                                        onClick={() => {
                                            setIsResumeRXModalOpen(true);
                                            setSelectedAssessment(myAssessment);
                                        }}
                                    >
                                        <ResumeIcon className="text-light-black w-4" />
                                        <p className="ml-3 text-[15px] font-medium text-light-black">
                                            Resume Medication
                                        </p>
                                    </div>
                                    <div
                                        className="flex mt-2 font-medium items-center cursor-pointer"
                                        onClick={() => {
                                            setIsCancelRXModalOpen(true);
                                            setSelectedAssessment(myAssessment);
                                        }}
                                    >
                                        <CancelIcon className="text-light-black w-4" />
                                        <p className="ml-3 text-[15px] font-medium text-light-black">
                                            Cancel Rx
                                        </p>
                                    </div>
                                </div>
                            }
                            placement="bottomRight"
                        >
                            <VerticalDotIcon className="w-4 h-4 cursor-pointer mx-auto" />
                        </Popover>
                    </div>
                </>
            ),
        },
    ];

    const handleSearch = (searchVal: any) => {
        setApiParam((d) => {
            const temp = deepClone(d);
            if (
                searchVal?.target?.value &&
                searchVal?.target?.value?.trim() !== ""
            ) {
                temp["search"] = searchVal?.target?.value?.trim();
                temp["searchColumn"] = ["drg.brName"];
            } else {
                delete temp["search"];
                delete temp["searchColumn"];
            }
            temp["skip"] = 0;
            const newValue = deepClone(temp);
            return newValue;
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

    const fetchMedication = async () => {
        const options: any = {
            method: "GET",
            url: `${PILLEO_API_URL}/patient-medication/active-list/${loginUser?.data?.user?.krollId}/`,
            params: apiParam,
            headers: {
                accept: "application/json",
                authorization: PILLEO_AUTHORIZATION_CODE,
            },
        };
        setIsLoadingMedication(true);
        await axios
            .request(options)
            .then(function (response) {
                setMedication(response.data?.data);
            })
            .catch(function (error) {
                console.error(error);
            });
        setIsLoadingMedication(false);
    };

    useEffect(() => {
        if (loginUser?.data?.user?.krollId) {
            fetchMedication();
        }
    }, [apiParam]);

    useEffect(() => {
        if (medication && medication?.total > 0) {
            setPaginationObj({
                ...paginationObj,
                total: medication?.total,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [medication]);

    return (
        <>
            <MyMedicationscene
                {...{
                    tableColumnsData,
                    handleFilterChange,
                    handleSearch,
                    medication,
                    handleOnTableChange,
                    paginationObj,
                    isLoadingMedication,
                }}
            />
            {isModifyModalOpen && (
                <ModifyMedicationModal
                    isOpen={isModifyModalOpen}
                    onClose={() => {
                        setIsModifyModalOpen(false);
                    }}
                    selectedAssessment={selectedAssessment}
                    setIsModifyModalOpen={setIsModifyModalOpen}
                />
            )}
            {isCancelRXModalOpen && (
                <CancelRXModal
                    isOpen={isCancelRXModalOpen}
                    onClose={() => {
                        setIsCancelRXModalOpen(false);
                    }}
                    selectedAssessment={selectedAssessment}
                    setIsCancelRXModalOpen={setIsCancelRXModalOpen}
                />
            )}

            {isResumeRXModalOpen && (
                <ResumeRXModal
                    isOpen={isResumeRXModalOpen}
                    onClose={() => {
                        setIsResumeRXModalOpen(false);
                    }}
                    selectedAssessment={selectedAssessment}
                    setIsResumeRXModalOpen={setIsResumeRXModalOpen}
                />
            )}
            {isPauseRXModalOpen && (
                <PauseRXModal
                    isOpen={isPauseRXModalOpen}
                    onClose={() => {
                        setIsPauseRXModalOpen(false);
                    }}
                    selectedAssessment={selectedAssessment}
                    setIsPauseRXModalOpen={setIsPauseRXModalOpen}
                />
            )}
        </>
    );
};

MyMedicationContainer.Layout = MainLayoutComponent;
export default MyMedicationContainer;
