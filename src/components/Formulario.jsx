import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

const Formulario = ({ cliente, cargando }) => {
  //Redireccionar
  const navigate = useNavigate();

  //Validacion con Yup
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(40, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("El Número no es válido"),
  });

  const handleSubmit = async (valores) => {
    //Creacion de REST API con json-server
    try {
      let respuesta;

      if (cliente.id) {
        //Editando registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        //fetch API, sin especificar las opciones manda el metodo GET
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores), //Convertir a string
          headers: {
            "Content-Type": "application/json", //obligatorio de json-server
          },
        });
      } else {
        //Nuevo Registro
        const url = `http://localhost:4000/clientes`;

        //fetch API, sin especificar las opciones manda el metodo GET
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores), //Convertir a string
          headers: {
            "Content-Type": "application/json", //obligatorio de json-server
          },
        });
      }

      await respuesta.json();
      navigate("/clientes");

    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.id ? "Editar cliente" : "Agregar cliente"}
      </h1>
      <Formik
        // cliente?.nombre ?? "" === cliente.nombre? cliente.nombre : "";
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values); //Esperar el POST de los datos
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {/* Extraer errors y touched (cuando se pierde el foco) */}
        {/* Se necesita un arrow function para el form, para extrar datos de Formik */}
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label className="font-bold text-gray-800" htmlFor="nombre">
                Nombre:{" "}
              </label>
              <Field
                name="nombre"
                id="nombre"
                type="text"
                className="mt-2 block p-3 w-full bg-gray-50"
                placeholder="Nombre del Cliente"
              />
              {errors.nombre && touched.nombre && (
                <Alerta> {errors.nombre} </Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-800" htmlFor="empresa">
                Empresa:{" "}
              </label>
              <Field
                name="empresa"
                id="empresa"
                type="text"
                className="mt-2 block p-3 w-full bg-gray-50"
                placeholder="Empresa del cliente"
              />
              {errors.empresa && touched.empresa && (
                <Alerta> {errors.empresa} </Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-800" htmlFor="email">
                Email:{" "}
              </label>
              <Field
                name="email"
                id="email"
                type="email"
                className="mt-2 block p-3 w-full bg-gray-50"
                placeholder="Email del cliente"
              />
              {errors.email && touched.email && (
                <Alerta> {errors.email} </Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-800" htmlFor="Notas">
                Teléfono:{" "}
              </label>
              <Field
                name="telefono"
                id="Notas"
                type="tel"
                className="mt-2 block p-3 w-full bg-gray-50"
                placeholder="Teléfono del cliente"
              />
              {errors.telefono && touched.telefono && (
                <Alerta> {errors.telefono} </Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-800" htmlFor="notas">
                Notas:{" "}
              </label>
              <Field
                name="notas"
                as="textarea"
                id="notas"
                type="text"
                className="mt-2 block p-3 w-full bg-gray-50 h-40"
                placeholder="Notas del cliente"
              />
            </div>
            <input
              type="submit"
              value={cliente?.id ? "Actualizar cliente" : "Agregar cliente"}
              className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
