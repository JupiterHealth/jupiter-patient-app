import React from "react";
import Head from "next/head";
import Link from "next/link";
import errorStyles from "./errorStyles.module.scss";

export interface ErrorComponentProps {
    statusCode: number;
}

const ErrorComponent = (props: ErrorComponentProps) => {
    const { statusCode } = props;

    const pageLoad = () => {
        location.reload();
    };

    return (
        <>
            <Head>
                <title>Jupiter - 404 Page Not Found</title>
            </Head>
            <div
                className={`box-border m-auto lg:w-2/3 py-12 lg:px-56 h-auto rounded-lg mx-auto my-28 ${errorStyles.container}`}
            >
                <div>
                    <h2 className="text-center text-5xl font-bold text-primary mb-3">
                        Whoops!
                    </h2>
                    <p className="text-center text-base font-medium">
                        We're not sure how you got here but seems like you're
                        lost in cyberspace. Or perhaps you entered an incorrect
                        URL. Visit the Home page instead
                    </p>
                    <img
                        src="/images/errorImg.svg"
                        alt=""
                        className="mx-auto mt-6 w-72 mb-6"
                    />
                    <div
                        className={`${errorStyles.errorText} mt-5 text-center text-3x text-purple-700`}
                    >
                        <div className=" text-5xl mb-3">{statusCode}</div>
                        {statusCode === 404
                            ? "Page Not Found"
                            : "internal server error"}
                    </div>
                </div>

                <div className="rounded text-center mt-1">
                    {statusCode === 404 ? (
                        <Link href="/login">Go To Home Page</Link>
                    ) : (
                        <a onClick={pageLoad} className="">
                            Reload Page
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};

export default ErrorComponent;
