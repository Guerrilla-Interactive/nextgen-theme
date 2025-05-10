import { sanityFetch } from "@/sanity/lib/live";
import { GET_FRONT_PAGE_QUERY } from "./page-index.route-query";
import { GET_FRONT_PAGE_QUERYResult } from "@/sanity.types";

export const fetchFrontPage = async (): Promise<GET_FRONT_PAGE_QUERYResult> => {
    const { data } = await sanityFetch({
        query: GET_FRONT_PAGE_QUERY,
    });
    return data;
}



