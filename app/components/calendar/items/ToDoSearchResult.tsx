import { useParams, useRouter } from "next/navigation";
import { SearchResultType } from "./ToDoSearchResultContainer";

const ToDoSearchResult = ({ searchResult }: { searchResult: SearchResultType[] }) => {
    const {date} = useParams();
    const year = +date[0];
    const month = +date[1];
    const router = useRouter();
    if (!searchResult) return <div>Loading...</div>;
    if (searchResult && searchResult.length === 0) return (
        <div className="text-2xl">
            검색결과가 없어요.
        </div>
    )
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-8'>
                {
                    searchResult.map(({ title, description, day }) => (
                        <div
                            onClick={() => router.push(`/toDos/${year}/${month}/${day}`)}
                            key={title + description + day}
                            className='text-xs border border-solid  rounded-xl px-2 py-1 overflow-scroll h-[50px] cursor-pointer hover:scale-105 marker:transition-transform duration-150 bg-sky-100'>
                            <div className='mb-1 border-b border-solid border-neutral-400'>
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