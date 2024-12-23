import { SearchResultType } from "./ToDoSearchResultContainer";

const ToDoSearchResult = ({ searchResult }: { searchResult: SearchResultType[] }) => {
    if (!searchResult) return <div>Loading...</div>;
    if (searchResult && searchResult.length === 0) return (
        <div className="text-2xl">
            검색결과가 없어요.
        </div>
    )
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    searchResult.map(({ title, description }) => (
                        <div className='border border-solid  rounded-xl px-2 py-1 overflow-scroll h-[50px] cursor-pointer hover:scale-105 marker:transition-transform duration-150 bg-sky-100'>
                            <div className='mb-1'>
                                <span className='font-semibold'>제목:</span> {title}
                            </div>
                            <div>
                                <span className='font-semibold'>내용:</span> {description}
                            </div>
                        </div>
                    ))
                }
                {searchResult.length === 0 && <div>검색결과가 없어요</div>}
            </div>
        </>
    )
}

export default ToDoSearchResult;