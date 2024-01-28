import { useState } from "react";

export default function Formularios() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    numero: "",
    fecha: "",
  });

  const [pdf, setPDF] = useState({
    titulo: "",
    file: "",
  });

  const [img, setIMG] = useState({
    titulo: "",
    file: "",
  });

  const handleChangeData = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log("user:", user);
  };

  const handleChangePDF = (event) => {
    if (event.target.name === "file") {
      const selectedFile = event.target.files[0];
      setPDF({ ...pdf, file: selectedFile });
    } else {
      setPDF({ ...pdf, [event.target.name]: event.target.value });
    }
    console.log("pdf", pdf);
  };

  const handleChangeIMG = (event) => {
    if (event.target.name === "file") {
      setIMG({ ...img, file: event.target.files[0] });
    } else {
      setIMG({ ...img, [event.target.name]: event.target.value });
    }
    console.log("img", img);
  };

  const submitData = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/prueba/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const submitPDF = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", pdf.titulo);
    formData.append("file", pdf.file);

    fetch("http://localhost:3001/api/prueba/pdf", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const submitIMG = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", img.titulo);
    formData.append("image", img.file);

    fetch("http://localhost:3001/api/prueba/image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <form>
        <h2>Datos de usuario:</h2>
        <label>Nombre:</label>
        <input type="text" name="nombre" onChange={handleChangeData} />
        <label>Apellido:</label>
        <input type="text" name="apellido" onChange={handleChangeData} />
        <label>Telefono:</label>
        <input type="text" name="numero" onChange={handleChangeData} />
        <label>Fecha de nacimiento:</label>
        <input type="date" name="fecha" onChange={handleChangeData} />
        <button type="button" onClick={submitData}>
          SUBIR
        </button>
      </form>
      <form encType="multipart/form-data">
        <h2>Subir PDF:</h2>
        <label>Titulo:</label>
        <input type="text" name="titulo" onChange={handleChangePDF} />
        <input type="file" name="file" onChange={handleChangePDF} />
        <button type="button" onClick={submitPDF}>
          SUBIR
        </button>
      </form>
      <form encType="multipart/form-data">
        <h2>Subir Imagen:</h2>
        <label>Titulo:</label>
        <input type="text" name="titulo" onChange={handleChangeIMG} />
        <input type="file" name="file" onChange={handleChangeIMG} />
        <button type="button" onClick={submitIMG}>
          SUBIR
        </button>
      </form>
    </div>
  );
}
