import React from "react";
import HairRegrowthScene from "./hairRegrowthScene";
import { AuthLayoutComponent } from "@components/layout/authLayout";

const HairRegrowthContainer = () => {
    return (
        <>
            <HairRegrowthScene />
        </>
    );
};

HairRegrowthContainer.Layout = AuthLayoutComponent;
export default HairRegrowthContainer;
