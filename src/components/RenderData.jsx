import { useEffect, useState } from "react";

export default function RenderData() {
  const [user, setUser] = useState();
  const [pdf, setPDF] = useState();
  const [img, setIMG] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/prueba/users");
      const data = await response.json();
      setUser(data.users);
      console.log(user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPDF = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/prueba/pdf");
      const data = await response.json();
      setPDF(data.files);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIMG = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/prueba/image");
      const data = await response.json();
      setIMG(data.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPDF();
    fetchIMG();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Datos de Usuarios</h1>
          {user.map((user, index) => (
            <div key={index}>
              <h2>Nombre: {user.nombre}</h2>
              <h2>Apellido: {user.apellido}</h2>
              <h2>Telefono:{user.telefono}</h2>
              <h2>Fecha de nacimiento:{user.fecha}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando datos del User...</p>
      )}
      {pdf ? (
        <div>
          <h1>Archivos pdf</h1>
          {pdf.map((file, index) => (
            <div key={index}>
              <h2>Titulo: {file.titulo}</h2>
              <a href={file.path} download>
                <iframe
                  title={file.titulo}
                  src={file.path}
                  width="100px"
                  height="100px"
                ></iframe>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando archivo pdf...</p>
      )}
      {img ? (
        <div>
          <h1>Datos del archivo img</h1>
          {img.map((image, index) => (
            <div key={index}>
              <h2>Titulo: {image.titulo}</h2>
              <a href={image.path} download>
                <iframe
                  title={image.titulo}
                  src={image.imagePath}
                  width="100px"
                  height="100px"
                ></iframe>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
}
