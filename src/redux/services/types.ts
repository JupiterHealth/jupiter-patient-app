export interface QueryParams {
    orderBy?: string;
    take: number;
    skip: number;
    sort?: any;
    include?: any;
    where?: any;
    search_column?: string[];
    search?: string;
    faqFor?: string;
    filter?: {
        // limit: number;
        // // skip: number;
        // order: any;
        // include?: any;
        // where?: any;
    };
}
