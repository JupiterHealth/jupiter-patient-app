import React from "react";
import MyMassageScene from "./myMassageScene";
import { MainLayoutComponent } from "@components/layout/mainLayout";
import { useForm } from "react-hook-form";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip } from "antd";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import { ChatIcon } from "jupiter-commons/src/components/theme/icons/chatIcon";
import { DashboardMassageIcon } from "jupiter-commons/src/components/theme/icons/dashboardMassageIcon";

const MyMassageContainer = () => {
    const { register, formState, control } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });

    const handleTypeSelect = (e: any) => {
        // let isValueAvailable = false;
        // setSelectedOption((prevState: any[]) => {
        //     isValueAvailable = prevState.every(
        //         (item) => item?.value !== e?.value,
        //     );
        //     if (isValueAvailable) {
        //         return [...prevState, { value: e?.value, label: e?.label }];
        //     } else {
        //         return prevState;
        //     }
        // });
    };

    const patientData = {
        list: [
            {
                Assessment: "577547",
                Service: "Hair Regrowth",
                Date: "26 Jun 2023",
                Time: "5:00 AM",
                MessageByPrescriber: "Prescriber",
                MessageByPrescriberName: "Prescriber Name",
                Message:
                    "Lorem ipsum is a dummy text. It is a placeholder text used as sa...",
                Actions: "",
            },
            {
                Assessment: "577547",
                Service: "Pain Management",
                Date: "26 Jun 2023",
                Time: "5:00 AM",
                MessageByPrescriber: "Pharmacy",
                MessageByPrescriberName: "Pharmacy Name",
                Message:
                    "Lorem ipsum is a dummy text. It is a placeholder text used as sa...",
                Actions: "",
            },
        ],
    };
    const tableColumnsData: TableColumnsProps[] = [
        {
            title: <div className="font-semibold">Transaction ID</div>,
            dataIndex: "Assessment",
            sorter: false,
            render: (_: any, patient: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {patient?.Assessment ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Service</div>,
            dataIndex: "Service",
            sorter: false,
            render: (_: any, patient: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {patient?.Service ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Date & Time</div>,
            dataIndex: "DateTime",
            sorter: false,
            render: (_: any, patient: any) => (
                <div>
                    <div className="font-medium">{patient?.Date ?? "N/A"}</div>
                    <div className="font-medium">{patient?.Time ?? "N/A"}</div>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Message by</div>,
            dataIndex: "MessageBy",
            sorter: false,
            render: (_: any, patient: any) => (
                <div>
                    <p className="font-medium">
                        {patient?.MessageByPrescriber ?? "N/A"}
                    </p>
                    <p className="font-medium">
                        {patient?.MessageByPrescriberName ?? "N/A"}
                    </p>
                </div>
            ),
        },
        {
            title: <div className="font-semibold">Message</div>,
            dataIndex: "Message",
            sorter: false,
            render: (_: any, patient: any) => (
                <div className="flex ">
                    <span className="font-medium">
                        {patient?.Message ?? "N/A"}
                    </span>
                </div>
            ),
        },
        {
            title: <div className="font-semibold text-end mr-5">Actions</div>,
            dataIndex: "Action",
            sorter: false,
            render: (_: any, patient: any) => (
                <>
                    <div className="flex justify-center">
                        <Tooltip
                            placement="bottomRight"
                            title={"Start Prescriber Chat"}
                            className="font-medium"
                            overlayClassName="hoverOverTooltip"
                        >
                            <ChatIcon className="ml-3" />
                            <DashboardMassageIcon className="ml-3" />
                        </Tooltip>
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <MyMassageScene
                {...{
                    tableColumnsData,
                    patientData,
                    register,
                    formState,
                    control,
                    // selectedOption,
                    handleTypeSelect,
                }}
            />
        </>
    );
};

MyMassageContainer.Layout = MainLayoutComponent;
export default MyMassageContainer;
