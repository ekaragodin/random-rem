import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

function App() {
    const [auth, setAuth] = useState({});
    useEffect(() => {
        chrome.storage.local.get(['userId', 'apiKey'], (result) => {
            setAuth(result);
        });
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        chrome.storage.local.set(data);
    };

    return (
        <>
            <h1>Random Rem Options</h1>
            <p>
                Create <a href="https://www.remnote.io/api_keys" target="_blank">a new API key</a> and paste it here.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>User id:
                        <input
                            type="text"
                            defaultValue={auth.userId || ''}
                            {...register('userId', { required: true })}
                        />
                        {errors.userId && <span>This field is required</span>}
                    </label>
                </div>

                <div>
                    <label>API key:
                        <input
                            type="password"
                            defaultValue={auth.apiKey || ''}
                            {...register('apiKey', { required: true })}
                        />
                        {errors.apiKey && <span>This field is required</span>}
                    </label>
                </div>

                <button type="submit">Save</button>
            </form>
        </>
    );
}

render(
    <App />,
    document.getElementById('root')
);
