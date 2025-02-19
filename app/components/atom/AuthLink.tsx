import Link from "next/link"

interface Props {
    path: string
    title: string
    color: string
}

const AuthLink = ({path, title, color}: Props) => {
    return <Link href={path} className={`${color} text-white p-3 w-40`}>{title}</Link>
};

export default AuthLink;