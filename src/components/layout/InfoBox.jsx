export default function ErrorBox({children}) {
    return (
        <div
        className="text-center bg-red-300 p-4 max-w-md mx-auto border-2 border-red-400 rounded-lg"
        >
            {children}
        </div>
    )
}