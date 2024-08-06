const Element = ({ bg }: { bg: string }) => <div className="flex gap-2"><span className={`size-4 bg-${bg}-500 rounded-full`} /><span className="bg-neutral-300 rounded-md w-8" /></div>

export default function Loading() {
    return <div className="h-screen flex flex-col xl:flex-row justify-center items-center gap-4 animate-pulse pt-20 xl:pt-0">
        <div className="h-[400px] w-[360px] sm:w-[450px] md:w-[600px] bg-white rounded-lg shadow-2xl " />
        <div className="flex flex-col items-center gap-12">
            <div className="bg-neutral-300 rounded-md w-36 h-8" />
            <div className="size-44 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex justify-center items-center">
                <div className="bg-white size-1/2 rounded-full" />
            </div>
            <div className="flex gap-3">
                <Element bg="purple" />
                <Element bg="fuchsia" />
                <Element bg="blue" />
                <Element bg="orange" />
                <Element bg="red" />
            </div>
        </div>
    </div>
}