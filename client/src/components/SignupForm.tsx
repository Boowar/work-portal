import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { registration } from '../store/slice/authSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useTypedSelector } from "../hooks/useTypedSelector";

const SignupForm: FC = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const dispatch = useDispatch<AppDispatch>()
    
    const {error} = useTypedSelector(state => state.auth)

    return (
        <div>
            {error}
            <form onSubmit={handleSubmit( (data) => {setData(JSON.stringify(data));
            console.log(data);
            const newUser = {
                username: data.username,
                password: data.password,
                email: data.email
            }

            dispatch(registration(newUser))
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