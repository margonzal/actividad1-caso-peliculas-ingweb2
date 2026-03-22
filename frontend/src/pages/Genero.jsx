import { useEffect, useState } from "react";
import { getGeneros, createGenero, deleteGenero } from "../services/generoService";
import Swal from "sweetalert2";

function Genero() {

  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargarGeneros = async () => {
    try {
      const res = await getGeneros();
      setGeneros(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar géneros"
      });
    }
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  const guardarGenero = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debes escribir un género"
      });
      return;
    }

    try {

      await createGenero({ nombre });

      Swal.fire({
        icon: "success",
        title: "Género creado",
        timer: 1500,
        showConfirmButton: false
      });

      setNombre("");
      cargarGeneros();

    } catch (error) {

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "El género ya existe"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de conexión con el servidor"
        });
      }

    }
  };

  const eliminarGenero = async (id) => {

    Swal.fire({
      title: "¿Eliminar género?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await deleteGenero(id);

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            timer: 1200,
            showConfirmButton: false
          });

          cargarGeneros();

        } catch (error) {

          Swal.fire({
            icon: "error",
            title: "No se pudo eliminar"
          });

        }

      }

    });

  };

  return (

    <div className="container mt-4">

      <h2>Gestión de Géneros</h2>

      <form onSubmit={guardarGenero} className="mb-3">

        <input
          className="form-control mb-2"
          placeholder="Nombre del género"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button className="btn btn-primary">
          Guardar
        </button>

      </form>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Nombre</th>
            
          </tr>
        </thead>

        <tbody>

          {generos.map((g) => (
            <tr key={g._id}>

              <td>{g.nombre}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarGenero(g._id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Genero;