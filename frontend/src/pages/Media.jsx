import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getMedias, createMedia, updateMedia, deleteMedia } from "../services/mediaService";
import { getGeneros } from "../services/generoService";
import { getDirectores } from "../services/directorService";
import { getProductoras } from "../services/productoraService";
import { getTipos } from "../services/tipoService";

function Media(){

  const [medias,setMedias]=useState([]);

  const [titulo,setTitulo]=useState("");
  const [sinopsis,setSinopsis]=useState("");
  const [anioEstreno,setAnioEstreno]=useState("");
  const [imagen,setImagen]=useState("");

  const [genero,setGenero]=useState("");
  const [director,setDirector]=useState("");
  const [productora,setProductora]=useState("");
  const [tipo,setTipo]=useState("");

  const [generos,setGeneros]=useState([]);
  const [directores,setDirectores]=useState([]);
  const [productoras,setProductoras]=useState([]);
  const [tipos,setTipos]=useState([]);

  const [editando,setEditando]=useState(null);


  useEffect(()=>{
    cargarDatos();
    cargarMedias();
  },[]);


  const cargarDatos=async()=>{

    setGeneros((await getGeneros()).data);
    setDirectores((await getDirectores()).data);
    setProductoras((await getProductoras()).data);
    setTipos((await getTipos()).data);
  };


  const cargarMedias=async()=>{
    try{
      const res=await getMedias();
      setMedias(res.data);

    }catch(error){
      Swal.fire({
        icon:"error",
        title:"Error al cargar películas"
      });
    }
  };


  const limpiarFormulario=()=>{

    setTitulo("");
    setSinopsis("");
    setGenero("");
    setDirector("");
    setProductora("");
    setTipo("");
    setAnioEstreno("");
    setImagen("");
    setEditando(null);
  };


  const guardarMedia=async(e)=>{
    e.preventDefault();

    if(!titulo.trim()){
      Swal.fire({
        icon:"warning",
        title:"Debes escribir un título"
      });
      return;
    }

    try{

      const data={
        titulo,
        sinopsis,
        genero,
        director,
        productora,
        tipo,
        anioEstreno,
        imagen
      };

      if(editando){
        await updateMedia(editando,data);
        Swal.fire({
          icon:"success",
          title:"Película actualizada",
          timer:1500,
          showConfirmButton:false
        });

      } else {
        await createMedia(data);
        Swal.fire({
          icon:"success",
          title:"Película creada",
          timer:1500,
          showConfirmButton:false
        });
      }

      limpiarFormulario();
      cargarMedias();

    }catch(error){
      Swal.fire({
        icon:"error",
        title:"Error al guardar"
      });
    }
  };


  const editarMedia=(m)=>{

    setTitulo(m.titulo || "");
    setSinopsis(m.sinopsis || "");
    setGenero(m.genero?._id || m.genero);
    setDirector(m.director?._id || m.director);
    setProductora(m.productora?._id || m.productora);
    setTipo(m.tipo?._id || m.tipo);
    setAnioEstreno(m.anioEstreno || "");
    setImagen(m.imagen || "");
    setEditando(m._id);
  };


  const eliminarMedia=async(id)=>{

    Swal.fire({
      title:"¿Eliminar película?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Sí"
    }).then(async(result)=>{

      if(result.isConfirmed){
        await deleteMedia(id);
        cargarMedias();
      }

    });
  };


  return(

    <div className="container mt-4">

      <h2>Gestión de Películas / Series</h2>

      <form onSubmit={guardarMedia}>

        <input
          className="form-control mb-2"
          placeholder="Título"
          value={titulo}
          onChange={(e)=>setTitulo(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e)=>setSinopsis(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Año de estreno"
          value={anioEstreno}
          onChange={(e)=>setAnioEstreno(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={(e)=>setImagen(e.target.value)}
        />


        <select
          className="form-control mb-2"
          value={genero}
          onChange={(e)=>setGenero(e.target.value)}
        >
          <option value="">Seleccione género</option>

          {generos.map((g)=>(
            <option key={g._id} value={g._id}>
              {g.nombre}
            </option>
          ))}

        </select>


        <select
          className="form-control mb-2"
          value={director}
          onChange={(e)=>setDirector(e.target.value)}
        >
          <option value="">Seleccione director</option>

          {directores.map((d)=>(
            <option key={d._id} value={d._id}>
              {d.nombre}
            </option>
          ))}

        </select>


        <select
          className="form-control mb-2"
          value={productora}
          onChange={(e)=>setProductora(e.target.value)}
        >
          <option value="">Seleccione productora</option>

          {productoras.map((p)=>(
            <option key={p._id} value={p._id}>
              {p.nombre}
            </option>
          ))}

        </select>


        <select
          className="form-control mb-3"
          value={tipo}
          onChange={(e)=>setTipo(e.target.value)}
        >
          <option value="">Seleccione tipo</option>

          {tipos.map((t)=>(
            <option key={t._id} value={t._id}>
              {t.nombre}
            </option>
          ))}

        </select>


        <button className="btn btn-primary">
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <hr/>


      <table className="table table-bordered mt-3">
        <thead>

          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {medias.map((m)=>(

            <tr key={m._id}>

              <td>
                <img 
                  src={m.imagen} 
                  alt="img"
                  style={{ width: "80px", height: "100px", objectFit: "cover" }}/>
              </td>    

              <td>{m.titulo}</td>
              <td>{m.anioEstreno}</td>

              <td>

                <button
                  className="btn btn-warning me-2"
                  onClick={()=>editarMedia(m)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={()=>eliminarMedia(m._id)}
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

export default Media;