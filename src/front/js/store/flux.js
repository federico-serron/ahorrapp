import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {

	const apiUrl = process.env.BACKEND_URL;

	return {
		store: {
			message: null,
			categories: {
				Restaurante: [
					"restaurante", "parrillada", "pizzeria", "cafeteria", "bar", "chiviteria",
					"sushi", "bistro", "comida rapida", "hamburgueseria", "brunch", "almuerzo",
					"cena", "brindis", "cerveceria", "gastrobar", "birra"
				],
				Supermercado: [
					"supermercado", "almacen", "minimercado", "autoservicio", "mercado",
					"hipermercado", "despensa", "kiosco", "feria", "verduleria", "fruteria",
					"carniceria", "pescaderia", "panaderia", "granja"
				],
				Transporte: [
					"uber", "taxi", "omnibus", "bus", "colectivo", "peaje", "nafta", "combustible",
					"estacionamiento", "subte", "tren", "bicicleta", "bici", "pasaje", "aeropuerto",
					"vuelo", "remise", "moto"
				],
				Vivienda: [
					"alquiler", "renta", "hipoteca", "gastos comunes", "contribucion", "impuesto",
					"UTE", "OSE", "ANTEL", "electricidad", "agua", "telefono", "internet", "gas",
					"seguro hogar", "mantencion"
				],
				Entretenimiento: [
					"cine", "teatro", "concierto", "evento", "recital", "festival", "espectaculo",
					"museo", "exposicion", "karaoke", "parque de diversiones", "juegos", "videojuegos",
					"netflix", "spotify", "plataforma", "streaming"
				],
				Salud: [
					"farmacia", "medicamentos", "mutualista", "consultas", "analisis", "dentista",
					"oftalmologo", "psicologo", "fisioterapia", "examen medico", "salud"
				],
				Educacion: [
					"colegiatura", "cuota", "universidad", "curso", "taller", "clases", "academia",
					"seminario", "libros", "materiales", "examen", "educacion"
				],
				Compras: [
					"ropa", "calzado", "indumentaria", "zapatos", "accesorios", "perfumeria",
					"cosmeticos", "tecnologia", "electronica", "celular", "computadora", "notebook",
					"auriculares", "gaming", "decoracion", "muebles", "repuesto"
				],
				Deporte: [
					"gimnasio", "fitness", "deporte", "entrenamiento", "yoga", "pilates", "pesas",
					"cancha", "futbol", "basquet", "padel", "correr", "maraton"
				],
				Finanzas: [
					"banco", "transferencia", "tarjeta", "pago", "prestamo", "intereses",
					"credito", "debito", "inversion", "comision", "gastos bancarios"
				],
				Mascotas: [
					"veterinaria", "alimento", "mascota", "perro", "gato", "vacuna", "bano",
					"accesorios mascotas", "paseador"
				],
				Viajes: [
					"hotel", "hostel", "alojamiento", "pasaje", "vuelo", "excursion",
					"tour", "viaje", "transporte turistico", "souvenir", "paquete turistico"
				],
				Otros: [
					"regalo", "donacion", "caridad", "cobro", "perdida", "error bancario",
					"servicio tecnico", "reparacion", "multas", "papeleria", "tramite",
					"gastos varios", "sin categoria"
				]
			},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			//Info de Usuario actualmente logeado
			logged_user: [],
			//Listado de todos los usuarios de la plataforma
			users: [{
				id: 1,
				name: "Lucía Fernández",
				email: "lucia.fernandez@example.com",
				phone: "+598 94 123 456",
				address: "Canelones 1234, Montevideo",
				role: "admin",
				last_login: "2025-04-28T10:45:00.000Z",
				is_active: true,
				is_premium: true,
				wallets: [
					{ id: 1, name: "Santander", balance: 5000, currency: "UYU" },
					{ id: 2, name: "Paypal", balance: 300, currency: "USD" }
				],
				records: [
					{ id: 1, concept: "Compra supermercado", amount: 1200, date: "2025-04-25T14:00:00Z" },
					{ id: 2, concept: "Pago Netflix", amount: 390, date: "2025-04-20T08:30:00Z" }
				],
				goals: [
					{ id: 1, title: "Ahorro viaje", target_amount: 20000, current_amount: 5000 }
				]
			},
			{
				id: 2,
				name: "Martín Rodríguez",
				email: "martin.rodriguez@example.com",
				phone: "+598 92 654 321",
				address: "Av. Italia 4567, Montevideo",
				role: "user",
				last_login: "2025-04-26T14:20:00.000Z",
				is_active: true,
				is_premium: false,
				wallets: [
					{ id: 3, name: "BROU", balance: 7800, currency: "UYU" }
				],
				records: [
					{ id: 3, concept: "Nafta", amount: 2100, date: "2025-04-23T12:00:00Z" }
				],
				goals: []
			},
			{
				id: 3,
				name: "Sofía García",
				email: "sofia.garcia@example.com",
				phone: "+598 93 987 654",
				address: "18 de Julio 789, Montevideo",
				role: "user",
				last_login: "2025-04-27T09:10:00.000Z",
				is_active: false,
				is_premium: false,
				wallets: [],
				records: [],
				goals: []
			}],

			//Categorias de prueba, eliminar luego
			categories_db: [
				{
					id: 1,
					name: "Alimentación",
					description: "Gastos en comida y supermercado",
					records_count: 15
				},
				{
					id: 2,
					name: "Transporte",
					description: "Gastos en ómnibus, taxi o combustible",
					records_count: 8
				},
				{
					id: 3,
					name: "Entretenimiento",
					description: "Cine, Netflix, salidas y ocio",
					records_count: 5
				},
				{
					id: 4,
					name: "Salud",
					description: "Consultas médicas, farmacia, mutualista",
					records_count: 3
				},
				{
					id: 5,
					name: "Educación",
					description: "Cursos, libros, materiales de estudio",
					records_count: 7
				}
			],

			//Registros de gastos/ingresos
			records: [],

			// Registros de Metas (Goals)
			goals: [],

			// Progreso actual de la meta seleccionada. Es null si no hay una meta seleccionada.
			goalProgress: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			login: async (email, password) => {
				const URLlogin = `${apiUrl}/api/login`;
				const store = getStore();

				try {
					if (!email || !password) {
						console.log("Missing email or password")
						return false
					}
					let response = await fetch(URLlogin, {
						method: "POST",
						body: JSON.stringify({ 'email': email, 'password': password }),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})
					if (!response.ok) {
						console.error("Error trying to login, pelase try again.");
						throw new Error(response.statusText);
					}

					const data = await response.json();

					if (!data.access_token) {
						console.error(data, "No valid token received!")
						throw new Error("No token received");
					}

					localStorage.setItem("token", data.access_token)
					console.log("Successfully logged in!")
					setStore({ ...store, logged_user: data })
					return true

				} catch (error) {
					console.error(error);
					return false
				}
			},

			// Action Registro de Usuario

			signup: async (name, email, password, role) => {
				const URLregister = `${apiUrl}/api/signup`;
				const store = getStore();

				try {
					if (!email || !password || !name) {
						console.log("Falta correo electrónico, contraseña o contraseña de confirmación");
						return false;
					}

					const userData = {
						name: name,
						email: email,
						password: password,
						role: role
					};

					let response = await fetch(URLregister, {
						method: "POST",
						body: JSON.stringify(userData),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					});

					if (!response.ok) {
						console.error("Error al intentar registrar el usuario, por favor inténtelo nuevamente.");
						throw new Error(response.statusText);
					}

					const data = await response.json();
					console.log("¡Registrado exitosamente!", data);
					return true;

				} catch (error) {
					console.error("Hubo un error durante el registro:", error);
					return false;
				}
			},

			// Acción para obtener registros filtrados por usuario y categoría en un período de tiempo (get-records)
			get_records: async (category_id, start_date) => {
				const baseURL = `${apiUrl}/api/records/list`;
				const queryParams = [];
				const store = getStore();


				if (category_id) queryParams.push(`category_id=${category_id}`);
				if (start_date) queryParams.push(`start_date=${new Date(start_date).toISOString()}`);

				const URLlistRecords = queryParams.length > 0 ? `${baseURL}?${queryParams.join('&')}` : baseURL;


				try {
					const response = await fetch(URLlistRecords, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
							'Content-Type': 'application/json'
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error en la petición: ${response.status} - ${errorData?.message || response.statusText}`);
					}

					const data = await response.json();
					setStore({ ...store, records: data.records });
					return true;

				} catch (error) {
					console.error("Error al obtener los registros:", error);
					setStore({ recordsError: error.message || "Ocurrió un error al cargar los registros." });
					return false
				}
			},



			// Action para agregar un nuevo registro (Record)
			addRecord: async (description, amount, type, category_name, wallet_id) => {
				const URLaddRecord = `${apiUrl}/api/records/add`;
				const store = getStore();

				try {
					if (!description || !amount || !type || !category_name || !wallet_id) {
						console.error("Faltan campos requeridos para agregar el registro.");
						return false;
					}

					const recordData = {
						description: description,
						amount: parseFloat(amount),
						type: type,
						category_name: category_name,
						wallet_id: parseInt(wallet_id),
					};

					const response = await fetch(URLaddRecord, {
						method: "POST",
						body: JSON.stringify(recordData),
						headers: {
							"Content-type": "application/json; charset=UTF-8",

							"Authorization": `Bearer ${localStorage.getItem('token')}`
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al agregar el registro:", errorData?.msg || response.statusText);
						return false;
					}

					const data = await response.json();
					console.log("Registro agregado exitosamente:", data);

					setStore({ ...store, records: [...store.records, data] });
					return true;

				} catch (error) {
					console.error("Hubo un error al agregar el registro:", error);
					return false;
				}
			},


			//Actions Juan
			// Action  para crear nueva meta (goal)

			setGoal: async (name_goal, goal_value) => {
				const urlSetGoal = `${apiUrl}/api/goal/add`;
				const store = getStore();

				try {

					if (!name_goal || !goal_value) {
						console.error("Completa todos los campos requeridos .");
						return false;
					}


					const response = await fetch(urlSetGoal, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",

							Authorization: `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({
							name: name_goal,
							goal_value: goal_value
						})
					});


					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al crear la meta:", errorData.msg);
						return false;
					}

					const data = await response.json();



					setStore({
						...store,
						goals: [...store.goals, data]
					});

					return true;
				} catch (error) {
					console.error("Ocurrió un error al realizar la operación:", error);
					return false;
				}
			},

			// Action  para Modificar meta  ( Goal )

			editGoal: async (goal_id, name_goal, goal_value) => {
				const urlEditGoal = `${apiUrl}/api/goal/edit/${goal_id}`;
				const store = getStore();

				try {
					if (!goal_id || (!name_goal && !goal_value)) {
						console.error("Faltan campos requeridos para modificar la Meta.");
						return false;
					}

					const goalData = {};
					if (name_goal) goalData.name = name_goal;
					if (goal_value) goalData.goal_value = goal_value;

					const response = await fetch(urlEditGoal, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify(goalData)
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al modificar la Meta:", errorData?.msg || response.statusText);
						return false;
					}

					const data = await response.json();
					console.log("modificado exitosamente:", data);


					setStore({
						...store,
						goals: store.goals.map(goal =>
							goal.id === goal_id ? data : goal
						)
					});
					return true;

				} catch (error) {
					console.error("Hubo un error al modificar la Meta:", error);
					return false;
				}
			},

			// Action para eliminar una meta (Goal)

			deleteGoal: async (goal_id) => {
				const urlDeleteGoal = `${apiUrl}/api/goal/delete/${goal_id}`;
				const store = getStore();

				try {
					if (!goal_id) {
						console.error("Falta el ID  para eliminar.");
						return false;
					}

					const response = await fetch(urlDeleteGoal, {
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al eliminar la Meta:", errorData?.msg || response.statusText);
						return false;
					}




					setStore({
						...store,
						goals: store.goals.filter(goal => goal.id !== goal_id)
					});

					return true;

				} catch (error) {
					console.error("Hubo un error al eliminar la meta :", error);
					return false;
				}
			},

			// Action para obtener todas las metas (Goals ) del usuario 

			getAllGoals: async () => {
				const urlGetAllGoals = `${apiUrl}/api/goal/get-all`;
				const store = getStore();

				try {
					const response = await fetch(urlGetAllGoals, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al obtener los datos:", errorData?.msg || response.statusText);
						return false;
					}

					const data = await response.json();



					setStore({
						...store,
						goals: [...data]
					});
					return true;

				} catch (error) {
					console.error("Hubo un error al obtener los datos :", error);
					return false;
				}
			},

			// Action para obtener una meta (Goal ) por su ID 

			getGoalById: async (goal_id) => {
				const urlGetGoalById = `${apiUrl}/api/goal/get/${goal_id}`;
				const store = getStore();

				try {
					if (!goal_id) {
						console.error("Falta el ID  para buscar.");
						return false;
					}

					const response = await fetch(urlGetGoalById, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al obtener la Meta:", errorData?.msg || response.statusText);
						return false;
					}

					const data = await response.json();



					setStore({
						...store,
						goals: store.goals.map(goal =>
							goal.id === goal_id ? data : goal
						)
					});

					return data;
				} catch (error) {
					console.error("Hubo un error al obtener  la Meta:", error);
					return false;
				}
			},

			// Action Progreso de la meta (Goal)

			getGoalProgress: async (goal_id) => {
				const urlGetGoalProgress = `${apiUrl}/api/goal/get-progress/${goal_id}`;
				const store = getStore();

				try {
					if (!goal_id) {
						console.error("Falta el ID  para obtener el progreso.");
						return false;
					}

					const response = await fetch(urlGetGoalProgress, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al obtener el progreso:", errorData?.msg || response.statusText);
						return false;
					}

					const data = await response.json();



					setStore({
						...store,
						goalProgress: data
					});

					return data;

				} catch (error) {
					console.error("Hubo un error al obtener el progreso :", error);
					return false;
				}
			},

			//Actions Rafa

			//Actions Fede
			//Captura el rol desencriptando el token
			getUserRoleFromToken: () => {
				const token = localStorage.getItem("token");

				if (!token) return null;

				try {

					const decoded = jwtDecode(token);
					return decoded.role || null;

				} catch (err) {

					console.error("Error al decodificar token:", err);
					return null;
				}
			},

			//PayPal functions
			//Crear order -> ver PayPalBtn.jsx
			createOrderPayPal: async (amount) => {
				try {
					const response = await fetch(`${apiUrl}/api/paypal/create-order`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ amount: amount }),
					});

					const data = await response.json();
					const approvalUrl = data.links.find((link) => link.rel === "approve")?.href;

					if (approvalUrl) {
						return approvalUrl
					} else {
						console.error("No hay approvalLink:", data);
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud PayPal:", error);
					alert("Hubo un problema al iniciar el pago.");
				}
			},

			//Capturar orden -> ver useEffect en PayPalSuccess.jsx
			captureOrderPayPal: async (token) => {

				const response = await fetch(`${apiUrl}/api/paypal/capture-order`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					body: JSON.stringify({ order_id: token }),

				});

				const data = await response.json();

				if (data.status === "COMPLETED") {
					return data;
					// Actualizás wallet, redireccionás, etc.
				} else {
					alert("El pago no se completó.");
				}
			},

			//Actions Jose

		}
	};
};

export default getState;
