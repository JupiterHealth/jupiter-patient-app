import React from "react";
import AntiAgingHealthScene from "./antiAgingHealthScene";
import { AuthLayoutComponent } from "@components/layout/authLayout";

const AntiAgingHealthContainer = () => {
    return (
        <>
            <AntiAgingHealthScene />
        </>
    );
};

AntiAgingHealthContainer.Layout = AuthLayoutComponent;
export default AntiAgingHealthContainer;
