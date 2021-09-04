
import { useState } from 'react';

export function useRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);
    const request = async (action, params) => {
        try {
            setIsLoading(true);
            setError(undefined);
            const res = await fetch(
                `https://api.remnote.io/api/v0/${action}`,
                {
                    method: "post",
                    body: JSON.stringify({
                        ...params,
                    }),
                }
            );

            if (!res.ok) {
                const body = await res.text();
                setError(body);
                return;
            }

            const body = await res.json();
            setData(body);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { request, isLoading, data, error };
}
