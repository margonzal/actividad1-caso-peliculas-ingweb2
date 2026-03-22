import { useEffect, useState } from "react";
import { getProductoras, createProductora, deleteProductora } from "../services/productoraService";
import Swal from "sweetalert2";

function Productora() {

  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargarProductoras = async () => {
    try {
      const res = await getProductoras();
      setProductoras(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar productoras"
      });
    }
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  const guardarProductora = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debes escribir una productora"
      });
      return;
    }

    try {

      await createProductora({ nombre });

      Swal.fire({
        icon: "success",
        title: "Productora creada",
        timer: 1500,
        showConfirmButton: false
      });

      setNombre("");
      cargarProductoras();

    } catch (error) {

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "La productora ya existe"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de conexión con el servidor"
        });
      }

    }
  };

  const eliminarProductora = async (id) => {

    Swal.fire({
      title: "¿Eliminar productora?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await deleteProductora(id);

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            timer: 1200,
            showConfirmButton: false
          });

          cargarProductoras();

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

      <h2>Gestión de Productoras</h2>

      <form onSubmit={guardarProductora} className="mb-3">

        <input
          className="form-control mb-2"
          placeholder="Nombre de la productora"
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

          {productoras.map((p) => (
            <tr key={p._id}>

              <td>{p.nombre}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarProductora(p._id)}
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

export default Productora;