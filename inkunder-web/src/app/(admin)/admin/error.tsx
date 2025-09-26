'use client';
export default function ErrorAdmin({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="p-10 text-center">
            <h1 className="text-xl font-semibold">Đã xảy ra lỗi (Admin)</h1>
            <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
            <button className="mt-4 rounded bg-black px-4 py-2 text-white" onClick={() => reset()}>
                Thử lại
            </button>
        </div>
    );
}