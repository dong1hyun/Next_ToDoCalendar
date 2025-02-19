import { AiOutlineLoading } from "react-icons/ai";

interface Props {
    title: string
    message: string
    size: number,
    style: string
    isLoading: boolean
}

const SpinLoading = ({title, message, size, style, isLoading}: Props) => {
    if(!isLoading) return null;
    return (
        <div className={`absolute rounded-xl p-5 flex flex-col gap-1 items-center bg-white opacity-90 w-56 ${style}`}>
            <span>{title}</span>
            <span>{message}</span>
            <AiOutlineLoading className="animate-spin" size={size} />
        </div>
    )
};

export default SpinLoading;