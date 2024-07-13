export const inputForm = "bg-transparent pl-2 rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition ring-black focus:ring-blue-500 border-none placeholder:text-neutral-400"

export function Error({errors = []}: {errors?: string[]}) {
    return <div className="text-red-500 font-medium">
        {errors.map((error, index) => <span key={index} className="text-red-500 font-medium">{error}</span>)}
    </div>
}