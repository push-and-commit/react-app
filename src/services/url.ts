import conf from "@conf";

export const addParamsToUrl = ({ url, params }: { url: string; params: Record<string, string> }) => {
    const newUrl = new URL(url);
    const urlParams = new URLSearchParams(newUrl.search);

    Object.entries(params).forEach(([key, value]) => {
        urlParams.set(key, value);
    });

    return `${conf.baseUrl}?${urlParams.toString()}`;
};