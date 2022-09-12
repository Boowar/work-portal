import { FC} from "react";

interface Props {
    onClick: () => void;
    icon?: React.ReactNode;
    text?: React.ReactNode;
    className: string;
}

const Button: FC<Props> = ({onClick, icon, className, text}) => {
    return (
        <button type="button" className={className} onClick={onClick}>
            {icon}{text}
        </button>
    )
}

export default Button