import { useEffect, useState } from "react";
import { getTipos, createTipo, deleteTipo } from "../services/tipoService";
import Swal from "sweetalert2";

function Tipo() {

  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargarTipos = async () => {
    try {
      const res = await getTipos();
      setTipos(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar tipos"
      });
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const guardarTipo = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debes escribir un tipo"
      });
      return;
    }

    try {

      await createTipo({ nombre });

      Swal.fire({
        icon: "success",
        title: "Tipo creado correctamente",
        showConfirmButton: false,
        timer: 1500
      });

      setNombre("");
      cargarTipos();

    } catch (error) {

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "El tipo ya existe"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de conexión con el servidor"
        });
      }

    }
  };

  const eliminarTipo = async (id) => {

    Swal.fire({
      title: "¿Eliminar tipo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await deleteTipo(id);

          Swal.fire({
            icon: "success",
            title: "Tipo eliminado",
            timer: 1200,
            showConfirmButton: false
          });

          cargarTipos();

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

      <h2>Gestión de Tipos</h2>

      <form onSubmit={guardarTipo} className="mb-3">

        <input
          className="form-control mb-2"
          placeholder="Tipo"
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

          {tipos.map((t) => (
            <tr key={t._id}>

              <td>{t.nombre}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarTipo(t._id)}
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

export default Tipo;