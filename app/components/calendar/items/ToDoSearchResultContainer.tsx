import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import ToDoSearchResult from './ToDoSearchResult';

export interface SearchResultType {
    title: string
    description: string
    day: number
}

interface Props {
    keyword: string
    isOpenSearchResult: boolean,
    setIsOpenSearchResult: Dispatch<SetStateAction<boolean>>
    searchResult: SearchResultType[]
}

const ToDoSearchResultContainer = ({ keyword, isOpenSearchResult, setIsOpenSearchResult, searchResult }: Props) => {
    useEffect(() => {
    }, [searchResult])
    if (!isOpenSearchResult) return null;
    return (
        <AnimatePresence>
            <motion.article
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute p-3 flex flex-col items-center gap-5 z-10 left-1/2 top-14 -translate-x-1/2 w-[230px] 
                sm:w-[350px] md:w-[500px] bg-white border border-solid border-neutral-200 rounded-xl shadow-xl h-[280px]
                overflow-y-scroll
                "
            >
                <IoClose
                    onClick={() => setIsOpenSearchResult(false)}
                    className='absolute right-3 top-3 size-5 text-neutral-400 cursor-pointer'
                />
                <h1>{`"${keyword}"`} 검색 결과입니다.</h1>
                <ToDoSearchResult searchResult={searchResult} />
            </motion.article>
        </AnimatePresence>
    )
}

export default ToDoSearchResultContainer;