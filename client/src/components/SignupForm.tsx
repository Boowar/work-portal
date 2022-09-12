import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useActions } from '../hooks/useActions'

const SignupForm: FC = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const {signin} = useActions()

    return (
        <div>
            <form onSubmit={handleSubmit( (data) => {setData(JSON.stringify(data));
            console.log(data)
            signin(data.username, data.password, data.email)
        }              
                )}>
                <input {...register("username")} placeholder="Username" className="input"/>
                <input {...register("password")} placeholder="Password" type="password" className="input"/>
                <input {...register("email")} placeholder="Email" className="input"/>
            <p>{data}</p>
            <input type="submit" className="submit-button"/>
            </form>
        </div>
    )
}

export default SignupForm