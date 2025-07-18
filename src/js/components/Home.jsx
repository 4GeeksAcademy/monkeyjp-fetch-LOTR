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

	const getPersonajes = async () => {
		const response = await fetch("https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey/personajes")
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
		const response = await fetch("https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey", {
			method: "POST"
		})
		const data = await response.json()
		console.log(data);

	}

	const crearPersonaje = async () => {
		const response = await fetch("https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey/personajes", {
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