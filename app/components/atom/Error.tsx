export default function Error({errors = []}: {errors?: string[]}) {
    return <div className="text-red-500 font-medium">
        {errors.map((error, index) => <span key={index} className="text-red-500 font-medium">{error}</span>)}
    </div>
}