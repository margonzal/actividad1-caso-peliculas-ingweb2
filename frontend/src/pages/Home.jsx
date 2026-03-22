import { useEffect, useState } from "react";
import { getMedias } from "../services/mediaService";

function Home(){

const [peliculas,setPeliculas]=useState([]);
const [activa,setActiva]=useState(null);

useEffect(()=>{

cargarPeliculas();

},[]);

const cargarPeliculas=async()=>{

const res=await getMedias();
setPeliculas(res.data);

};

return(

<div className="container mt-4">

<h2>Películas</h2>

<div className="row">

{peliculas.map((p)=>{

const activaClase=activa===p._id ? "card shadow-lg" : "card";

return(

<div
key={p._id}
className="col-lg-3 col-md-4 col-sm-6 mb-4"
>

<div
className={activaClase}
style={{
borderRadius:"15px",
cursor:"pointer",
transform:activa===p._id ? "scale(1.05)" : "scale(1)",
transition:"0.3s",
opacity: activa && activa !== p._id ? 0.5 : 1
}}

onClick={()=>setActiva(p._id)}
>

<img
src={p.imagen}
alt={p.titulo}
className="card-img-top"
style={{height:"350px", objectFit:"cover", borderRadius:"15px"}}
/>

<div className="card-body">

<div>
  <h5 style={{marginBottom:"2px"}}>{p.titulo}</h5>
  <div style={{fontSize:"0.85rem", color:"gray"}}>
    {p.anioEstreno}
  </div>
</div>

{activa===p._id &&(

<div>

<p>{p.sinopsis}</p>
<p><b>Genero:</b> {p.genero?.nombre}</p>
<p><b>Director:</b> {p.director?.nombre}</p>
<p><b>Productora:</b> {p.productora?.nombre}</p>
</div>

)}

</div>
</div>
</div>
);
})}
</div>
</div>
);
}

export default Home;