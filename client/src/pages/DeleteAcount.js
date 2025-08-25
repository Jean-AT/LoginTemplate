import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteAcount(){
  const navigate = useNavigate();
  
  const onClick = async () => {
    try {
        await axios.delete("http://localhost:3000/auth/deleteAcount", {
            withCredentials: true,
        });
        console.log("Cuenta eliminada");
        navigate("/"); // lo mandas a crear nueva cuenta
        } catch (err) {
            console.error("Error al eliminar cuenta:", err.response?.data || err.message);
        }
  };

    return(
        <div>
            <button
            onClick={onClick}
            >
            Eliminar mi cuenta
            </button>
        </div>
    )
}