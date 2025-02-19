import { AiOutlineLoading } from "react-icons/ai";

interface Props {
    title: string
    message: string
    color: string
    size: number
    isLoading: boolean
}

const SpinLoading = ({title, message, color, size, isLoading}: Props) => {
    if(!isLoading) return null;
    return (
        <div className="absolute p-5 flex flex-col gap-1 items-center bg-white top-1/4 opacity-90 w-56">
            <span>{title}</span>
            <span>{message}</span>
            <AiOutlineLoading className={`animate-spin ${color}`} size={size} />
        </div>
    )
};

export default SpinLoading;