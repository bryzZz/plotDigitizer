import { useCallback, useState } from 'react';

interface RequestInit {
    method: 'GET' | 'POST';
    body: object;
}

interface FInit {
    body: BodyInit;
    method: RequestInit['method'];
}

export const useFetch = <Response>(url: string) => {
    const [data, setData] = useState<Response>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>();

    const fetchData = async (init?: RequestInit) => {
        const fInit = {} as FInit;
        if (init) {
            fInit.body = JSON.stringify(init.body);
            fInit.method = init.method;
        }

        try {
            const res = await fetch(url, fInit);
            const res_1 = await res.json();
            setIsLoading(false);
            setData(res_1);
            return res_1;
        } catch (reason) {
            console.error(reason);
            setIsError(true);
            setError(reason);
        }
    };

    return { fetchData, data, isLoading, isError, error };
};
