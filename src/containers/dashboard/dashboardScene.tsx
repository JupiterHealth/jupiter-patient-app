import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";
import Spinner from "jupiter-commons/src/components/theme/spinner";
import DashboardSTyles from "./dashboardStyles.module.scss";
import { DoubleRightOutlined } from "@ant-design/icons";

export interface DashboardProps {
    myAssessmentList?: any;
    loadingAssessmentList?: boolean;
    createNewAssessmentHandler: (d?: any) => void;
    loadingCreateAssessment?: boolean;
    services?: any;
    loadingServices?: boolean;
    setServiceKey: (d?: any) => any;
    serviceKey: string;
    handleInProgressAssessment: (d?: any) => any;
    loadingRedirectAssessment?: boolean;
    setSelectedAssessment: (d: any) => void;
    selectedAssessment: any;
}

const DashboardScene = (props: DashboardProps) => {
    const {
        myAssessmentList,
        loadingAssessmentList,
        createNewAssessmentHandler,
        loadingCreateAssessment,
        services,
        loadingServices,
        setServiceKey,
        serviceKey,
        handleInProgressAssessment,
        loadingRedirectAssessment,
        setSelectedAssessment,
        selectedAssessment,
    } = props;

    return (
        <div className="py-3 px-4">
            <div className="flex justify-between">
                <HeaderSectionComponent
                    {...{
                        title: "Dashboard",
                        description: "",
                    }}
                />
            </div>
            {!loadingServices && services && (
                <h1 className="text-start text-xl font-bold mt-4">
                    Start an assessment
                </h1>
            )}
            <div className="flex flex-wrap gap-4 mt-2.5">
                {services &&
                    services
                        ?.sort((a: any, b: any) => {
                            const serviceNameA = a.serviceName.toUpperCase();
                            const serviceNameB = b.serviceName.toUpperCase();

                            if (serviceNameA < serviceNameB) {
                                return -1;
                            }
                            if (serviceNameA > serviceNameB) {
                                return 1;
                            }

                            return 0;
                        })
                        ?.filter((s: any) => s?.status === "ENABLED")
                        .map((service: any, index: any) => (
                            <div
                                className={`min-h-[80px] w-full md:w-[30%] xl:w-[25%] p-3 flex items-center justify-center md:block border border-input-border rounded-md ${
                                    service?.status === "ENABLED"
                                        ? "cursor-pointer"
                                        : "cursor-no-drop"
                                } ${DashboardSTyles.box}`}
                                onClick={() => {
                                    if (
                                        service?.status === "ENABLED" &&
                                        !loadingCreateAssessment
                                    ) {
                                        setServiceKey(service?.serviceKey);
                                        createNewAssessmentHandler(
                                            service?.serviceKey,
                                        );
                                    }
                                }}
                            >
                                <h1 className="text-base font-semibold text-black flex flex-col">
                                    <div className="flex items-center">
                                        {service?.serviceName}
                                        <DoubleRightOutlined className="ml-2" />
                                    </div>
                                    {service?.status === "DISABLED" && (
                                        <p className="text-[#BBBBBB] text-xs font-semibold pt-1">
                                            Coming soon....
                                        </p>
                                    )}
                                    {service?.serviceKey === serviceKey && (
                                        <Spinner
                                            className="loader primary flex justify-center align-center my-2 hover:text-white"
                                            size={20}
                                        />
                                    )}
                                </h1>
                            </div>
                        ))}
            </div>
            {loadingAssessmentList && <DefaultSkeleton />}
            {!loadingAssessmentList &&
                myAssessmentList?.list &&
                myAssessmentList?.total > 0 && (
                    <h1 className="text-start text-xl font-bold mt-7">
                        Incomplete Assessments
                    </h1>
                )}
            {!loadingAssessmentList && (
                <div
                    className={`mt-2.5 flex flex-wrap gap-4 ${
                        myAssessmentList?.total === 0 && " justify-center"
                    }`}
                >
                    {myAssessmentList?.total > 0 &&
                        myAssessmentList?.list &&
                        myAssessmentList?.list.map((assessment: any) => (
                            <div
                                className="cursor-pointer w-full md:w-[48%] xl:w-[49%]"
                                onClick={() => {
                                    setSelectedAssessment(assessment);
                                    handleInProgressAssessment(assessment);
                                }}
                            >
                                <div className="p-3 border border-input rounded-[10px] flex flex-wrap items-start justify-between">
                                    <p className="text-sm md:text-base font-semibold w-[75%] md:w-[72%] md:mb-1 xl:mb-0">
                                        {assessment?.service?.serviceName}{" "}
                                        Assessment
                                    </p>
                                    {loadingRedirectAssessment &&
                                        selectedAssessment?.id ===
                                            assessment?.id && (
                                            <Spinner className="mb-1" />
                                        )}
                                    <p className="text-secondary text-sm md:text-base font-semibold">
                                        Incomplete
                                    </p>
                                </div>
                            </div>
                        ))}
                    {myAssessmentList?.total === 0 && (
                        <h1 className="text-start text-base font-medium mt-3 pl-3">
                            No ongoing assessment found
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardScene;
