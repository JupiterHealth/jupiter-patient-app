import React from "react";
import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import { Col, Row, Select } from "antd";
import {
    FormGroup,
    InputDateField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { FilterIcon } from "jupiter-commons/src/components/theme/icons/filterIcon";
import { SearchInputComponent } from "jupiter-commons/src/components/theme/searchInput/searchInputComponent";
import TableComponent from "jupiter-commons/src/components/theme/table/tableComponent";
import AllPrescriptionsStyle from "./allPrescriptionsStyles.module.scss";

export const TRANSACTION_FILTER = [
    {
        label: "Succeeded",
        value: "SUCCEEDED",
    },
    {
        label: "Failed",
        value: "FAILED",
    },
];
export interface MytransactionSceneAProps {
    register: any;
    formState: any;
    control: any;
    handleSearch: any;
    paginationObj: any;
    allPrescriptionsListColumns: any;
    transactionData: any;
    isLoading: boolean;
    handleOnTableChange: (d?: any) => void;
    handleFilterChange?: (d?: any) => void;
    handleDateSearch: any;
}

const MytransactionScene = (props: MytransactionSceneAProps) => {
    const {
        handleSearch,
        register,
        formState,
        control,
        paginationObj,
        allPrescriptionsListColumns,
        transactionData,
        isLoading,
        handleOnTableChange,
        handleFilterChange,
        handleDateSearch,
    } = props;
    return (
        <div className="py-3 px-4">
            <div className="flex justify-between">
                <HeaderSectionComponent
                    {...{
                        title: "Transactions",
                        description: "",
                    }}
                />
            </div>
            <Row className="mt-7" gutter={15}>
                <Col span={24} md={14} className="pb-4 md:pb-0">
                    <SearchInputComponent
                        placeholder="Search"
                        {...{ handleSearch }}
                    />
                </Col>
                <Col span={12} md={5}>
                    <div className={`${AllPrescriptionsStyle.datePicker}`}>
                        <FormGroup className="antdDataPickerWithoutLabel">
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "Expiry Date",
                                    placeholder: "Date",
                                    isDisableFuture: true,
                                    allowClear: true,
                                }}
                                onChange={handleDateSearch}
                            />
                        </FormGroup>
                    </div>
                </Col>
                <Col span={12} md={5}>
                    <Select
                        options={TRANSACTION_FILTER}
                        className={`!w-full filter text-lg font-medium text-grey-300`}
                        placeholder="All"
                        suffixIcon={
                            <FilterIcon className="w-[16px] h-[16px]" />
                        }
                        onChange={handleFilterChange}
                        showArrow
                        allowClear
                        onClear={handleFilterChange}
                    />
                </Col>
            </Row>

            <TableComponent
                columns={allPrescriptionsListColumns}
                dataSource={transactionData?.list ?? []}
                loading={isLoading}
                className={AllPrescriptionsStyle.customTable}
                onTableChange={handleOnTableChange}
                pagination={transactionData?.total > 10 ? paginationObj : false}
            />
        </div>
    );
};

export default MytransactionScene;
