import React from "react";
import MaleSexualHealthQuizScene from "./maleSexualHealthQuizScene";
import { AuthLayoutComponent } from "@components/layout/authLayout";

const MaleSexualHealthQuizContainer = () => {
    return (
        <>
            <MaleSexualHealthQuizScene />
        </>
    );
};

MaleSexualHealthQuizContainer.Layout = AuthLayoutComponent;
export default MaleSexualHealthQuizContainer;
