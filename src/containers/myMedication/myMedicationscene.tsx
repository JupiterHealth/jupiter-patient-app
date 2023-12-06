import React from "react";
import { Col, Row, Select } from "antd";
import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import TableComponent from "jupiter-commons/src/components/theme/table/tableComponent";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import { FilterIcon } from "jupiter-commons/src/components/theme/icons/filterIcon";
import { ASSESSMENT_FILTER_OPTIONS } from "jupiter-commons/src/components/libs/constants";
import { SearchInputComponent } from "jupiter-commons/src/components/theme/searchInput/searchInputComponent";
import { convertToTitleCase } from "jupiter-commons/src/components/libs/helpers";
import medicationStyle from "./medicationStyle.module.scss";

export interface MyMedicationsceneProps {
    tableColumnsData: any;
    handleSearch?: any;
    handleFilterChange: any;
    medicationListColumns?: TableColumnsProps[];
    medication?: any;
    isLoadingMedication?: boolean;
    handleOnTableChange?: (d?: any) => void;
    paginationObj?: any;
}

const MyMedicationscene = (props: MyMedicationsceneProps) => {
    const {
        handleFilterChange,
        medication,
        handleOnTableChange,
        paginationObj,
        tableColumnsData,
        handleSearch,
        isLoadingMedication,
    } = props;
    return (
        <div className="py-3 px-4">
            <HeaderSectionComponent
                {...{
                    title: "My Medications",
                    description: "View and manage your medications.",
                }}
            />
            <Row className="my-7" gutter={15}>
                <Col span={12} md={18}>
                    <SearchInputComponent
                        placeholder="Search"
                        {...{ handleSearch }}
                    />
                </Col>
                <Col span={12} md={6}>
                    <Select
                        options={ASSESSMENT_FILTER_OPTIONS.map((option) => ({
                            ...option,
                            label: convertToTitleCase(
                                option.label.replace(/_/g, " "),
                            ),
                        }))}
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
                columns={tableColumnsData}
                dataSource={medication?.list || []}
                loading={isLoadingMedication}
                onTableChange={handleOnTableChange}
                className={medicationStyle.customTable}
                pagination={medication?.total > 10 ? paginationObj : false}
            />
        </div>
    );
};

export default MyMedicationscene;
