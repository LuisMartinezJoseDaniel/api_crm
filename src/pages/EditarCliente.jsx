import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //extraer el id enviado por paramtros
  //ej. http://localhost:4000/clientes/:id -> /clientes/20
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        if (Object.keys(resultado).length > 0) {
          setCliente(resultado);
        }
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteApi();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar los datos del cliente
      </p>
      {/* Si existe cliente.id entonces-> <Formulario> */}
      {cliente?.id ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (<p>Cliente no válido</p>) }
    </>
  );
};

export default EditarCliente;
