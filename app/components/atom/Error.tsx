export default function Error({errorMsg}: {errorMsg?: string}) {
    if(!errorMsg) return null;
    return <div className="text-red-500 font-medium">
        <span className="text-red-500 font-medium">{errorMsg}</span>
    </div>
}