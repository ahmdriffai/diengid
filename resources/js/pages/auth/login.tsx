import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function LoginPage() {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/login');
    };

    return (
        <>
            <Head title="Login" />

            <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
                <h1 className="mb-6 text-2xl font-semibold">Customer Login</h1>

                <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 p-6">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            required
                        />
                        {form.errors.email && <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={form.data.password}
                            onChange={(event) => form.setData('password', event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            required
                        />
                        {form.errors.password && <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>}
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.data.remember} onChange={(event) => form.setData('remember', event.target.checked)} />
                        Remember me
                    </label>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                        disabled={form.processing}
                    >
                        Sign In with Email
                    </button>
                </form>

                <a
                    href="/auth/google/redirect"
                    className="mt-4 inline-flex w-full justify-center rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50"
                >
                    Continue with Google
                </a>
            </div>
        </>
    );
}
