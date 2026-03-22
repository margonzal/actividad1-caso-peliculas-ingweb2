import { useEffect, useState } from "react";
import { getDirectores, createDirector, deleteDirector } from "../services/directorService";
import Swal from "sweetalert2";

function Director() {

  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargarDirectores = async () => {
    try {
      const res = await getDirectores();
      setDirectores(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar directores"
      });
    }
  };

  useEffect(() => {
    cargarDirectores();
  }, []);

  const guardarDirector = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debes escribir un director"
      });
      return;
    }

    try {

      await createDirector({ nombre });

      Swal.fire({
        icon: "success",
        title: "Director creado",
        timer: 1500,
        showConfirmButton: false
      });

      setNombre("");
      cargarDirectores();

    } catch (error) {

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "El director ya existe"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de conexión con el servidor"
        });
      }

    }
  };

  const eliminarDirector = async (id) => {

    Swal.fire({
      title: "¿Eliminar director?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await deleteDirector(id);

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            timer: 1200,
            showConfirmButton: false
          });

          cargarDirectores();

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

      <h2>Gestión de Directores</h2>

      <form onSubmit={guardarDirector} className="mb-3">

        <input
          className="form-control mb-2"
          placeholder="Nombre del director"
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

          {directores.map((d) => (
            <tr key={d._id}>

              <td>{d.nombre}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarDirector(d._id)}
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

export default Director;