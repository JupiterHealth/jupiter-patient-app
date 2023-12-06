import React from "react";
import DermatologyScene from "./dermatologyScene";
import { AuthLayoutComponent } from "@components/layout/authLayout";

const DermatologyContainer = () => {
    return (
        <>
            <DermatologyScene />
        </>
    );
};

DermatologyContainer.Layout = AuthLayoutComponent;
export default DermatologyContainer;
