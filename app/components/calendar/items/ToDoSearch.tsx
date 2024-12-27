import { Dispatch, SetStateAction, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getToDoByKeyword } from "../action";
import ToDoSearchResultContainer from "./ToDoSearchResultContainer";

interface Props {
    isOpenSearchResult: boolean,
    setIsOpenSearchResult: Dispatch<SetStateAction<boolean>>
    year: number
    month: number
}

export interface SearchResultType {
    title: string
    description: string
    day: number
}

const ToDoSearch = ({ isOpenSearchResult, setIsOpenSearchResult, year, month }: Props) => {
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState<SearchResultType[]>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const onValid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!keyword) return;
        setIsOpenSearchResult(true);
        const data = await getToDoByKeyword(keyword, year, month);
        if (data) setSearchResult(data);
    }
    return (
        <form
            onSubmit={onValid}
            className="flex items-center justify-start gap-2 border border-solid 
            border-neutral-300 rounded-xl px-2 h-8 w-28 text-sm md:w-36 md:text-md">
            <button>
                <IoIosSearch className="text-neutral-400" size={20} />
            </button>
            <input
                value={keyword}
                onChange={onChange}
                placeholder="할 일 검색"
                className="w-full h-full focus:outline-none"
            />
            <ToDoSearchResultContainer keyword={keyword} isOpenSearchResult={isOpenSearchResult} setIsOpenSearchResult={setIsOpenSearchResult} searchResult={searchResult} />
        </form>
    )
}

export default ToDoSearch;