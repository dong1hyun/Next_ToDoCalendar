import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
    const [value, setValue] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const onValid = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form
            onSubmit={onValid}
            className="flex items-center justify-start gap-2 border border-solid border-neutral-300 h-8 w-40 rounded-xl px-2">
            <IoIosSearch className="text-neutral-400" size={20} />
            <input
                value={value}
                onChange={onChange}
                placeholder="할 일 검색"
                className="w-full h-full focus:outline-none"
            />
        </form>
    )
}

export default SearchBar;