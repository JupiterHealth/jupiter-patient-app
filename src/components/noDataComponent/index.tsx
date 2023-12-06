// import { handleGreetingMessage } from "jupiter-commons/src/components/libs/helpers";
import React from "react";

export interface NoDataComponentProps {
    text: string;
    loginUser: any;
}
const NoDataComponent = (props: NoDataComponentProps) => {
    const { text, loginUser } = props;

    return (
        <div>
            <p className="flex justify-center capitalize font-bold text-xl mt-10">
                Hi {loginUser?.user?.firstName} {loginUser?.user?.lastName},{" "}
                {/* {handleGreetingMessage()} */}
            </p>
            <p className="flex justify-center capitalize font-bold text-xl pt-4">
                Select a client to view client profile or perform any action
            </p>
            <div className="pt-9">
                <img src="../images/noData.svg" className="w-3/4 mx-auto" />
                <div className="flex justify-around mt-3 capitalize">
                    <p className="text-xl font-bold">{text}</p>
                    <p className="text-xl font-bold pr-[150px]">
                        {text} Profile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoDataComponent;
