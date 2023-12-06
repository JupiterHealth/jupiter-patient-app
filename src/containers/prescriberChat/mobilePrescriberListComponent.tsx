import { Drawer } from "antd";
import SidebarListingComponent, {
    DataObj,
} from "jupiter-commons/src/components/sidebarListing/sidebarListingComponent";
import { SidebarPrescriberChatIcon } from "jupiter-commons/src/components/theme/icons/sidebarPrescriberChatIcon";
import { useState } from "react";
import MobilePrescriberStyles from "./prescriberChatStyles.module.scss";

interface MobilePrescriberListComponentProps {
    transformedArray: DataObj[];
    handleSearch: (d: any) => void;
    handleOnclick: (d: any) => void;
    handleLoadMore: (d: any) => void;
    isLoading: boolean;
    prescribers: any;
    isInfiniteScrolling: boolean;
    infiniteRef: any;
}

const MobilePrescriberListComponent = (
    props: MobilePrescriberListComponentProps,
) => {
    const {
        transformedArray,
        handleSearch,
        handleOnclick,
        handleLoadMore,
        isLoading,
        prescribers,
        infiniteRef,
        isInfiniteScrolling,
    } = props;
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const handleClickEvent = (d: any) => {
        handleOnclick(d);
        onClose();
    };

    return (
        <div className="w-full">
            <SidebarListingComponent
                {...{
                    slug: "prescriber-chat",
                    data: transformedArray,
                    title: "",
                    extraLine: "License No.",
                    handleSearch,
                    isLoading,
                    handleOnclick: handleClickEvent,
                    hasMore: prescribers?.hasMany,
                    handleLoadMore,
                    isInfiniteScrolling,
                    isInfinite: true,
                    infiniteRef: infiniteRef,
                }}
            />
        </div>
    );
};

export default MobilePrescriberListComponent;
