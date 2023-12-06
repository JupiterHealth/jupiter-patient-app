const withLess = require("next-with-less");
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

let nextConfig = {
    reactStrictMode: true,
    // webpack5: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    env: {
        NEXT_ENV: process.env.NEXT_ENV,
        NEXT_ENDPOINT: process.env.NEXT_ENDPOINT,
        NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
        SECRET_STRIPE: process.env.SECRET_STRIPE,
        PUBLIC_STRIPE: process.env.PUBLIC_STRIPE,
        NOVU_APPLICATION_IDENTIFIER: process.env.NOVU_APPLICATION_IDENTIFIER,
        NOVU_BACKEND_URL: process.env.NOVU_BACKEND_URL,
        NOVU_SOCKET_URL: process.env.NOVU_SOCKET_URL,
    },
    // poweredByHeader: false,
    // future: {},
    async redirects() {
        return [
            {
                source: "/",
                destination: "/signup",
                permanent: false,
            },
        ];
    },
    ...withLess({
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                    "primary-color": "#AD3BB4",
                    "link-color": "#AD3BB4",
                    "success-color": "#30C940",
                    "danger-color": "#E1002F",
                    "deactivate-color": "#FF0002",
                    "warning-color": "#FFDD55",
                    "error-color": "#FD6060",
                },
            },
        },
    }),
};

// if (process.env.NEXT_ENV !== "local") {
//     nextConfig.pwa = {
//         dest: "public",
//         runtimeCaching,
//     };
//     const withPWA = require("next-pwa");
//     nextConfig = withPWA(nextConfig);
// }

module.exports = nextConfig;
