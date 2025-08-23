import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ChangeData() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("El username es requerido"),
    password: Yup.string().min(5).max(20).required("La contraseña es requerida"),
    email: Yup.string().email("Formato de email inválido").max(40),
  });

  const OnSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/changeData", data, {
        withCredentials: true, // cookies
      });
      console.log("Cambio de Datos Exitoso", res.data);
      navigate("/");
    } catch (err) {
      console.error("Error al cambiar datos:", err.response?.data || err.message);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <form className="Forms-Data" onSubmit={handleSubmit(OnSubmit)}>
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
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          autoComplete="off"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <button type="submit">Change Data</button>
      </form>
    </div>
  );
}
