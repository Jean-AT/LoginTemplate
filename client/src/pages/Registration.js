import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Integración Yup
import axios from "axios";//For the request to que api
import {useNavigate} from "react-router-dom";//Navigate in the pages
import * as Yup from "yup";//Require the password and the username in a default long

export default function Login(){
    const navigate = useNavigate();
    const validationSchema=Yup.object().shape({
        username:Yup.string().min(3).max(15).required(),
        password:Yup.string().min(5).max(20).required(),
        email:Yup.string().min(5).max(40),
        bornDate:Yup.date(),
        firstName:Yup.string().min(3).max(10),
        lastName:Yup.string()
    });
    const OnSubmit= async(data)=>{
        try{
            await axios.post("http://localhost:3000/auth/registration",data).then(()=>{
                console.log(data);
                navigate("/");
            });
        }catch (err){
            console.log(err);
        }
    };
    const {register,handleSubmit, formState:{errors}}=useForm({
        defaultValues:{
            username:"",
            password:"",
            email:"",
            bornDate:null,
            firstName:"",
            lastName:"",
        },
        resolver:yupResolver(validationSchema)
    });
    

    return(
        <dev>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <input 
                {...register("username")}
                placeholder="Username"
                autoComplete="off"
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                {...register("password")}
                placeholder="Password"
                type="password"
                autoComplete="off"
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                {...register("email")}
                placeholder="Email"
                autoComplete="off"
                />
                <input
                {...register("bornDate")}
                placeholder="Born Date"
                type="date"
                autoComplete="off"
                />
                <input
                {...register("firstName")}
                placeholder="First Name"
                autoComplete="off"
                />
                <input
                {...register("lastName")}
                placeholder="Last Name"
                autoComplete="off"
                />
                <button type="submit">Registration</button>
            </form>
        </dev>
    );
}