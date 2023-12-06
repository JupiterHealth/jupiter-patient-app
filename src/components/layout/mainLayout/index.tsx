import React from "react";
import { SidebarComponent } from "./sidebar/sidebarComponent";
import { HeaderComponent } from "./header/headerComponent";
import MainLayoutStyles from "./mainLayoutStyles.module.scss";

export const MainLayoutComponent: any = ({ children }: any) => {
    return (
        <>
            <HeaderComponent />
            <div className={MainLayoutStyles.LayoutContainer}>
                <div
                    className={MainLayoutStyles.LayoutContainer__LayoutWrapper}
                >
                    <div
                        className={` ${MainLayoutStyles.LayoutContainer__Sidebar} modern-scrollbar`}
                    >
                        <SidebarComponent />
                    </div>
                    <div
                        className={`${MainLayoutStyles.LayoutContainer__PageContent}`}
                        id="page-content"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
