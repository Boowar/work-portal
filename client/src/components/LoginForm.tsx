import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useActions } from '../hooks/useActions'

const LoginForm: FC = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const {login} = useActions()

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit( (data) => {setData(JSON.stringify(data));
            console.log(data)
            login(data.username, data.password)
        }              
                )}>
                <input {...register("username")} placeholder="Username" className="input"/>
                <input {...register("password")} placeholder="Password" type="password" className="input"/>
            <p>{data}</p>
            <input type="submit" className="submit-button"/>
            </form>
        </div>
    )
}

export default LoginForm