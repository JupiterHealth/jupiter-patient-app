import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import { Button, Col, Empty, Row } from "antd";
import { MODE } from "jupiter-commons/src/components/libs/constants";
import { DefaultSkeleton } from "jupiter-commons/src/components/theme/defaultSkeleton";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { AmericanExpressCardIcon } from "jupiter-commons/src/components/theme/icons/americanExpressCardIcon";
import { CreditCardDeleteIcon } from "jupiter-commons/src/components/theme/icons/creditCardDeleteIcon";
import { EditIcon } from "jupiter-commons/src/components/theme/icons/editIcon";
import { MasterCardIcon } from "jupiter-commons/src/components/theme/icons/masterCardIcon";
import { PlusIcon } from "jupiter-commons/src/components/theme/icons/plusIcon";
import { VisaCardIcon } from "jupiter-commons/src/components/theme/icons/visaCardIcon";
import creditCardStyes from "./credtiCardStyle.module.scss";

export interface MyCreditCardSceneProps {
    register?: any;
    formState?: any;
    setSelectedCreditCardData: (data: any) => void;
    setIsCreditCardModal: (data: boolean) => void;
    setMode: (data: string) => void;
    setIsDeleteModalOpen: (data: boolean) => void;
    makeDefaultCard: (data: any) => void;
    creditCardData?: any;
    isLoadingCreditCardList?: boolean;
    isLoadingMakeDefault?: boolean;
}

const MyCreditCardScene = (props: MyCreditCardSceneProps) => {
    const {
        register,
        formState,
        setIsCreditCardModal,
        setIsDeleteModalOpen,
        creditCardData,
        isLoadingCreditCardList,
        isLoadingMakeDefault,
        setMode,
        setSelectedCreditCardData,
        makeDefaultCard,
    } = props;

    return (
        <div className="py-3 px-4">
            <div className="md:flex justify-between">
                <HeaderSectionComponent
                    {...{
                        title: "My Credit Cards",
                        description:
                            "View, edit and change your payment methods.",
                    }}
                />
                <Button
                    className="flex items-center mt-3 font-bold md:ml-7 bg-primary text-white text-base h-10 rounded-[10px]"
                    onClick={() => {
                        setMode(MODE.ADD);
                        setIsCreditCardModal(true);
                    }}
                >
                    <PlusIcon className="mr-3" />
                    <span>Add New Credit Card</span>
                </Button>
            </div>
            <Row gutter={20} className="mt-7">
                {creditCardData?.list &&
                    !isLoadingCreditCardList &&
                    creditCardData?.list?.length >= 0 &&
                    creditCardData?.list?.map((listItem: any) => (
                        <Col span={24} lg={12} className="pb-3">
                            <div className="border-input border p-4 rounded-[10px]">
                                <div className="flex justify-between gap-3">
                                    <div className="flex">
                                        <div>
                                            {listItem?.cardType ===
                                                "MasterCard" && (
                                                <MasterCardIcon className="w-10 h-10" />
                                            )}
                                            {listItem?.cardType === "Visa" && (
                                                <VisaCardIcon className="w-8 h-8 pb-3" />
                                            )}
                                            {listItem?.cardType ===
                                                "American Express" && (
                                                <AmericanExpressCardIcon className="w-10 h-10" />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-semibold">
                                                Ending with{" "}
                                                {listItem?.cardNumber}
                                            </p>
                                            <p className="text-sm font-medium text-grey-300">
                                                Expires {listItem?.exp_month}/
                                                {listItem?.exp_year}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer">
                                        <div
                                            className="flex "
                                            onClick={() => {
                                                // setSelectedCreditCardData(
                                                //     listItem,
                                                // );
                                            }}
                                        >
                                            {!listItem?.isDefault ? (
                                                <p className="text-grey-300 font-medium text-sm pt-[1px]">
                                                    Mark as Default
                                                </p>
                                            ) : (
                                                <p className="text-secondary font-medium text-sm pt-[1px]">
                                                    Default
                                                </p>
                                            )}
                                            <div
                                                className={`!items-start mt-[11px] ml-4 !mr-0 ${creditCardStyes.defaultCheck}`}
                                            >
                                                <InputRadioField
                                                    {...{
                                                        register,
                                                        formState,
                                                        id: listItem?.id,
                                                        name: "default",
                                                        value:
                                                            listItem?.isDefault,
                                                        className: "mb-2",
                                                        checked:
                                                            listItem?.isDefault,
                                                    }}
                                                    onClick={() =>
                                                        makeDefaultCard(
                                                            listItem?.id,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-start md:items-center relative bottom-[-3px] md:bottom-3">
                                            {creditCardData?.total > 1 && (
                                                <CreditCardDeleteIcon
                                                    className="cursor-pointer w-4 h-4"
                                                    onClick={() => {
                                                        setSelectedCreditCardData(
                                                            listItem,
                                                        );
                                                        setIsDeleteModalOpen(
                                                            true,
                                                        );
                                                    }}
                                                />
                                            )}
                                            <EditIcon
                                                className="cursor-pointer ml-3 w-4 h-4"
                                                onClick={() => {
                                                    setSelectedCreditCardData(
                                                        listItem,
                                                    );
                                                    setIsCreditCardModal(true);
                                                    setMode(MODE.EDIT);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
            {(isLoadingCreditCardList || isLoadingMakeDefault) && (
                <DefaultSkeleton />
            )}
            {!isLoadingCreditCardList && creditCardData?.list.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}

            {!isLoadingCreditCardList && (
                <div
                    className={`border-t border-t-border-input mt-12 md:pb-5 flex justify-between md:absolute bottom-0 w-[97.4%]`}
                >
                    <div className="pt-3">
                        <p className="text-xs md:text-[15px] font-semibold">
                            We accept the following methods of payment
                        </p>
                        <div className="flex items-center mt-2 gap-5">
                            <VisaCardIcon className="w-9 h-9" />
                            <MasterCardIcon className="w-7 h-7" />
                            <AmericanExpressCardIcon className="w-9 h-9" />
                        </div>
                    </div>
                    <div className="pt-3">
                        <p className="text-xs md:text-[15px] font-semibold text-end md:text-start">
                            Safe and secured payments
                        </p>
                        <img
                            src="/images/stripe-Logo.svg"
                            alt="Stripe"
                            className="mt-2 flex ml-auto h-8"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCreditCardScene;
