import { CheckCancllationIcon } from "jupiter-commons/src/components/theme/icons/checkCancllationIcon";
import { CheckVerifiedIcon } from "jupiter-commons/src/components/theme/icons/checkVerifiedIcon";
import React from "react";

export interface PasswordComponentProps {
    lengthValidated?: boolean;
    specialValidated?: boolean;
    numberValidated?: boolean;
    caseSensitiveValidated?: boolean;
}
const PasswordRequiredComponent = (props: PasswordComponentProps) => {
    const {
        lengthValidated,
        specialValidated,
        caseSensitiveValidated,
        numberValidated,
    } = props;
    return (
        <>
            <div className=" absolute left-0 flex">
                <div>
                    <div className="flex items-center mb-1 !w-40">
                        {lengthValidated ? (
                            <CheckVerifiedIcon className={`w-4 h-4  `} />
                        ) : (
                            <CheckCancllationIcon className={`w-4 h-4  `} />
                        )}
                        <p className="text-xs font-semibold ml-2 ">
                            8 or more characters
                        </p>
                    </div>
                    <div className="flex items-center">
                        {specialValidated ? (
                            <CheckVerifiedIcon className={`w-4 h-4  `} />
                        ) : (
                            <CheckCancllationIcon className={`w-4 h-4  `} />
                        )}
                        <p className="text-xs font-semibold ml-2">
                            Special characters
                        </p>
                    </div>
                </div>
                <div className="ml-5">
                    <div className="flex items-center mb-1 !w-40">
                        {caseSensitiveValidated ? (
                            <CheckVerifiedIcon className={`w-4 h-4  `} />
                        ) : (
                            <CheckCancllationIcon className={`w-4 h-4  `} />
                        )}
                        <p className="text-xs font-semibold ml-2 ">
                            Upper & lowercase
                        </p>
                    </div>
                    <div className="flex items-center">
                        {numberValidated ? (
                            <CheckVerifiedIcon className={`w-4 h-4  `} />
                        ) : (
                            <CheckCancllationIcon className={`w-4 h-4  `} />
                        )}
                        <p className="text-xs font-semibold ml-2">Numbers</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordRequiredComponent;
