import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useRequest } from './hooks/useRequest';
import { sample } from './helpers';

function App() {
    const [auth, setAuth] = useState({});
    const [remNotFound, setRemNotFound] = useState(false);
    const { request, isLoading, data: rem, error } = useRequest();
    const name = 'Daily Document';

    useEffect(() => {
        chrome.storage.local.get(['userId', 'apiKey'], setAuth);
    }, []);

    useEffect(() => {
        if (!rem) {
            return;
        }

        if (!rem.found) {
            setRemNotFound(true);
            return;
        }

        const randomId = sample(rem.tagChildren);
        chrome.tabs.create({
            url: `https://www.remnote.io/document/${randomId}`,
        });
    }, [rem]);

    async function handleOpenRandomRem() {
        setRemNotFound(false);
        request('get_by_name', {
            name,
            ...auth,
        });
    }

    if (Object.keys(auth).length === 0) {
        return (
            <a href="" onClick={() => chrome.runtime.openOptionsPage()}>The extension is not configured yet.</a>
        );
    }

    return (
        <div>
            {error && <div>Request failed with error: {error}</div>}
            {remNotFound && <div>Rem "{name}" not found.</div>}
            <button
                className="button"
                onClick={handleOpenRandomRem}
                disabled={isLoading}
            >
                Random Daily Document
            </button>
        </div>
    );
}

render(
    <App />,
    document.getElementById('root')
);
