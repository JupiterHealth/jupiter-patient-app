import { MainLayoutComponent } from "@components/layout/mainLayout";
import { fetchAllTransaction } from "@redux/slices/transaction";
import { Tooltip } from "antd";
import {
    DEFAULT_TABLE_LIMIT,
    DETAIL_DATE_FORMAT,
    DETAIL_TIME_FORMAT,
    EST_TIMEZONE,
} from "jupiter-commons/src/components/libs/constants";
import {
    convertDateToTimezone,
    deepClone,
} from "jupiter-commons/src/components/libs/helpers";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import useList from "jupiter-commons/src/components/libs/useList";
import { DownloadIcon } from "jupiter-commons/src/components/theme/icons/downloadIcon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PromotionLinkFormInputs } from "src/schemas/promotionLinkSchema";
import MytransactionScene from "./myTransactionScene";
import moment from "moment";
import { downloadInvoiceAPI } from "@redux/services/transactions.api";
import Spinner from "jupiter-commons/src/components/theme/spinner";

const MyTransactionsContainer = () => {
    const { register, formState, control } = useForm<PromotionLinkFormInputs>({
        // resolver: yupResolver(PromotionLinkFormValidateSchema),
    });

    const dispatch: any = useDispatch();
    const {
        apiParam,
        handleOnTableChange,
        setApiParam,
        paginationObj,
        setPaginationObj,
        search,
    } = useList({
        queryParams: {
            take: DEFAULT_TABLE_LIMIT,
            skip: 0,
            orderBy: "createdAt|desc",
            include: ["service", "patientUser"],
        },
    });
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>();
    const { data: transactionData, isLoading } = useSelector(
        (state: any) => state.allTransaction,
    );

    const allPrescriptionsListColumns: TableColumnsProps[] = [
        {
            title: "Receipt No.",
            dataIndex: "receipt_no",
            render: (assessment: any, transaction: any) => (
                <span className="capitalize break-all">
                    {transaction?.uniqueId ? transaction?.uniqueId : "-"}
                </span>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (service: any, transaction: any) => (
                <span className="">
                    {transaction?.amount
                        ? `$${transaction?.amount.toFixed(2)}`
                        : "-"}
                </span>
            ),
        },
        // {
        //     title: "Patient",
        //     dataIndex: "patientName",
        //     render: (patientName: any, transaction: any) => (
        //         <span className="">
        //             {transaction?.patientUser?.firstName
        //                 ? transaction?.patientUser?.firstName
        //                 : "-"}{" "}
        //             {transaction?.patientUser?.lastName
        //                 ? transaction?.patientUser?.lastName
        //                 : "-"}
        //         </span>
        //     ),
        // },
        {
            title: "Type",
            dataIndex: "type",
            render: (type: any, transaction: any) => (
                <span className="">
                    {transaction?.service?.serviceName
                        ? transaction?.service?.serviceName
                        : "-"}
                </span>
            ),
        },
        {
            title: "Date & Time",
            dataIndex: "createdAt",
            sorter: false,
            render: (createdAt: any, transaction: any) => {
                return (
                    <>
                        <p>
                            {moment(
                                convertDateToTimezone(
                                    transaction?.createdAt,
                                    EST_TIMEZONE,
                                ),
                            ).format(DETAIL_DATE_FORMAT)}
                        </p>
                        <p>
                            {" "}
                            {moment(
                                convertDateToTimezone(
                                    transaction?.createdAt,
                                    EST_TIMEZONE,
                                ),
                            ).format(DETAIL_TIME_FORMAT)}
                        </p>
                    </>
                );
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (type: any, transaction: any) => (
                <div
                    className={`capitalize ${
                        transaction?.paymentStatus === "succeeded"
                            ? "text-success"
                            : "text-deactivate"
                    }`}
                >
                    {transaction?.paymentStatus ? (
                        transaction?.paymentStatus
                    ) : (
                        <span className="!text-black">-</span>
                    )}{" "}
                </div>
            ),
        },
        {
            title: "Actions",
            dataIndex: "action",
            render: (_: any, transaction: any) => (
                <div className="ml-5">
                    {transaction?.paymentStatus === "succeeded" && (
                        <Tooltip
                            placement="bottomRight"
                            title={"Download Invoice"}
                            overlayClassName="hoverOverTooltip"
                        >
                            <div className="flex items-center">
                                {isLoadingDownload &&
                                transaction?.id === selectedTransaction?.id ? (
                                    <Spinner size={20} />
                                ) : (
                                    <DownloadIcon
                                        className="w-5 h-5 text-light-black cursor-pointer"
                                        onClick={() => {
                                            setSelectedTransaction(transaction);
                                            handleInvoiceDownload(transaction);
                                        }}
                                    />
                                )}
                            </div>
                        </Tooltip>
                    )}
                    {transaction?.paymentStatus !== "succeeded" && "-"}
                </div>
            ),
        },
    ];

    const handleInvoiceDownload = async (transaction: any) => {
        try {
            setIsLoadingDownload(true);

            const downloadRes = await downloadInvoiceAPI({
                assessmentId: transaction?.assessmentId,
                orderId: transaction?.uniqueId,
                isPatient: false,
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
        search(searchVal?.target?.value, []);
        setPaginationObj({ ...paginationObj, current: 1 });
    };

    const handleFilterChange = (value: any) => {
        setApiParam((d) => {
            const temp = deepClone(d);
            if (typeof value !== "undefined") {
                temp["paymentStatus"] = value;
            } else {
                delete temp["paymentStatus"];
            }
            temp["skip"] = 0;
            const newState = deepClone(temp);
            return newState;
        });
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

    useEffect(() => {
        dispatch(
            fetchAllTransaction({
                ...apiParam,
                type: "CHARGE",
                // paymentStatus: "APPROVED",
                // isSentToPharmacy: "true",
            }),
        );
    }, [apiParam]);

    useEffect(() => {
        if (transactionData && transactionData?.total > 0) {
            setPaginationObj({
                ...paginationObj,
                total: transactionData?.total,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [transactionData]);

    return (
        <>
            <MytransactionScene
                {...{
                    handleSearch,
                    register,
                    formState,
                    control,
                    paginationObj,
                    handleOnTableChange,
                    handleFilterChange,
                    allPrescriptionsListColumns,
                    transactionData,
                    isLoading,
                    handleDateSearch,
                }}
            />
        </>
    );
};

MyTransactionsContainer.Layout = MainLayoutComponent;
export default MyTransactionsContainer;
