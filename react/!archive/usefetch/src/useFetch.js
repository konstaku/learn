import { useEffect, useState } from "react";

function foo() {
    return false;
}

export function useFetch(url, OPTIONS = {}) {
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setData(undefined);
        setIsError(null);

        const controller = new AbortController();

        fetch(url, { ...OPTIONS, signal: controller.signal })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status > 200 && response.status < 300) {
                    return response.json();
                } else {
                    console.log(response);
                    return Promise.reject(response);
                }
            })
            .then((result) => setData(result))
            .catch((e) => {
                if (e.name === "AbortError") {
                    return;
                }
                setIsError(e);
            })
            .finally(() => {
                if (controller.signal.aborted === true) {
                    return;
                }
                setIsLoading(false);
            });

        return () => {
            return controller.abort();
        };
    }, [url]);

    return { data, isLoading, isError };
}
