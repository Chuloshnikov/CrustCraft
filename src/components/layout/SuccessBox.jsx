export default function SuccessBox({children}) {
    return (
        <div
        className="text-center bg-green-200 p-4 max-w-md mx-auto border-2 border-green-500 rounded-lg"
        >
            {children}
        </div>
    )
}