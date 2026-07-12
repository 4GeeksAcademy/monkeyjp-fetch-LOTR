// fetch es una función de JavaScript que nos permite hacer peticiones HTTP (pedir información) a un servidor.

// En palabras simples:

// fetch sirve para obtener datos de una API o enviar datos a un servidor.

// ¿Qué es una API?
// Una API (Application Programming Interface) es una forma de comunicación entre programas.
// 👉 En este caso:
// El frontend (JavaScript)
// se comunica con un servidor
// usando HTTP
// Ejemplo sencillo:
// “Yo pido datos” → “El servidor responde con datos”


// ¿Qué es una función asíncrona?

// Antes de usar fetch, hay que entender asincronía.
// ⏱️ Código síncrono
// El código se ejecuta línea por línea, esperando a que cada instrucción termine.

// ⚡ Código asíncrono
// Algunas tareas (como pedir datos a un servidor) tardan tiempo.
// JavaScript no se queda bloqueado esperando, sino que continúa y recibe el resultado después.

// 👉 fetch es asíncrono, porque pedir datos a un servidor lleva tiempo.


// GET     → Leer algo (traer datos)
// POST    → Crear algo nuevo
// PUT     → Actualizar algo existente
// DELETE  → Borrar algo


// Petición HTTP:

// 1. Método:         GET / POST / PUT / DELETE
// 2. URL:            https://api.com/todos/1
// 3. Headers:        Content-Type: application/json
// 4. Body:           {"title": "Nuevo todo"}   <-- solo en POST y PUT

// “Cada vez que hacemos una petición con fetch, estamos enviando algo con estas 4 partes:
// Método: le dice al servidor qué tipo de operación hacer.
// URL: le dice a dónde va la petición (a qué recurso).
// Headers: sirven para decir en qué formato va la información (normalmente JSON).
// Body: el contenido que enviás (sólo en POST o PUT).”


import { useEffect, useState } from "react";


const Home = () => {

	const [personajes, setPersonajes] = useState([])
	const [newPersonaje, setNewPersonaje] = useState({
		nombre: "",
		frase: "",
		imagen: ""
	})
	const [showAlert, setShowAlert] = useState(false);

	const handleInputsChange = (e) => {
		setNewPersonaje({ ...newPersonaje, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!newPersonaje.nombre || !newPersonaje.frase || !newPersonaje.imagen) {
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 2000);
			return;
		}
		crearPersonaje()
		
	}

	const API_URL = "https://cautious-umbrella-vq6q556gww9frv4-8000.app.github.dev"
	const USER = "mili"

	const getPersonajes = async () => {
		const response = await fetch(`${API_URL}/usuarios/${USER}/personajes`)
		console.log(response);
		if (!response.ok) {
			console.log("debo crear el usuario");
			crearUsuario()
			return
		}
		const data = await response.json()
		console.log(data);
		setPersonajes(data)

	}

	const crearUsuario = async () => {
		const response = await fetch(`${API_URL}/usuarios/nombre/${USER}`, {
			method: "POST"
		})
		const data = await response.json()
		console.log(data);

	}

	const crearPersonaje = async () => {
		const response = await fetch(`${API_URL}/usuarios/${USER}/personajes`, {
			method: "POST",
			body: JSON.stringify(newPersonaje),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		console.log(data);
		getPersonajes()
		setNewPersonaje({
			nombre: "",
			frase: "",
			imagen: ""
		})

	}

	useEffect(() => {
		getPersonajes()

	}, [])

	return (
		<div className="container pt-4">
			<h2 className="text-center text-light"><img style={{ height: "40px" }} src="https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png" alt="" /> Crea tu personaje de El Señor de los Anillos</h2>

			{showAlert && (
				<div className="alert alert-warning" role="alert">
					Todos los campos son obligatorios
				</div>
			)}

			<form className="mb-5" onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="Nombre"
					name="nombre"
					value={newPersonaje.nombre}
					onChange={handleInputsChange}
				/>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="Frase"
					name="frase"
					value={newPersonaje.frase}
					onChange={handleInputsChange}
				/>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="URL de la imagen"
					value={newPersonaje.imagen}
					name="imagen"
					onChange={handleInputsChange}
				/>
				<button className="btn btn-success w-100">Agregar Personaje</button>
			</form>

			<div className="row">
				{personajes.map((p, index) => (
					<div className="col-md-4 mb-4" key={index}>
						<div className="card h-100 shadow">
							<img
								src={p.imagen}
								className="card-img-top"
								alt={p.nombre}
								style={{ height: "300px", objectFit: "cover" }}
							/>
							<div className="card-body">
								<h5 className="card-title">{p.nombre}</h5>
								<p className="card-text fst-italic">"{p.frase}"</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;