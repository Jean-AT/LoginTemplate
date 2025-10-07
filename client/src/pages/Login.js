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
    });
    const OnSubmit= async(data)=>{
        try{
            await axios.post("http://localhost:3000/auth/login", data, {
            withCredentials: true
            })
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Login exitoso");
                navigate('/DashBoard')
                // NO guardas nada en sessionStorage
            }
            });

        }catch (err){
            console.log(err);
        }
    };
    const {register,handleSubmit, formState:{errors}}=useForm({
        defaultValues:{
            username:"",
            password:"",
        },
        resolver:yupResolver(validationSchema)
    });
    

    return(
        <div>
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
                <button type="submit">Registration</button>
            </form>
        </div>
    );
}