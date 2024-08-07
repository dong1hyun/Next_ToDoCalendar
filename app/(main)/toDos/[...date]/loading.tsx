const Card = () => <div className="w-[300px] sm:min-w-[350px] md:min-w-[400px] bg-white shadow rounded-lg p-4 space-y-2 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-blue-300 rounded w-16"></div>
    </div>
</div>


export default function Loading() {
    return <div className="flex flex-col gap-5 items-center justify-center pt-32">
            <div className="h-10 w-[180px] bg-gray-300 rounded" />
            <Card />
            <Card />
            <Card />
    </div>
}