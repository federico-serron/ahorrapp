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
				  "auriculares", "gaming", "decoracion", "muebles"
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
			records: [{
				id: 1,
				description: "Cena con amigos en la parrillada",
				timestamp: "2025-04-26T21:30:00",
				amount: -2500,
				type: "expense",
				category: {
				  id: 3,
				  name: "Restaurante",
				  keywords: ["restaurante", "parrillada", "bar", "comida"]
				},
				wallet: {
				  id: 1,
				  name: "Cuenta Bancaria"
				},
				user: {
				  id: 1,
				  name: "Federico"
				}
			  },
			  {
				id: 2,
				description: "Compra de frutas en la feria",
				timestamp: "2025-04-25T10:00:00",
				amount: -800,
				type: "expense",
				category: {
				  id: 2,
				  name: "Supermercado",
				  keywords: ["feria", "supermercado", "verduleria"]
				},
				wallet: {
				  id: 2,
				  name: "Tarjeta de Crédito"
				},
				user: {
				  id: 1,
				  name: "Federico"
				}
			  },
			  {
				id: 3,
				description: "Pago de alquiler de abril",
				timestamp: "2025-04-01T09:00:00",
				amount: -15000,
				type: "expense",
				category: {
				  id: 5,
				  name: "Vivienda",
				  keywords: ["alquiler", "gastos comunes", "renta"]
				},
				wallet: {
				  id: 1,
				  name: "Cuenta Bancaria"
				},
				user: {
				  id: 1,
				  name: "Federico"
				}
			  },
			  {
				id: 4,
				description: "Cobro de sueldo de abril",
				timestamp: "2025-04-01T08:00:00",
				amount: 60000,
				type: "income",
				category: {
				  id: 9,
				  name: "Finanzas",
				  keywords: ["sueldo", "ingreso", "pago"]
				},
				wallet: {
				  id: 1,
				  name: "Cuenta Bancaria"
				},
				user: {
				  id: 1,
				  name: "Federico"
				}
			  },
			  {
				id: 5,
				description: "Suscripción mensual de Netflix",
				timestamp: "2025-04-20T12:00:00",
				amount: -450,
				type: "expense",
				category: {
				  id: 6,
				  name: "Entretenimiento",
				  keywords: ["netflix", "streaming", "cine"]
				},
				wallet: {
				  id: 2,
				  name: "Tarjeta de Crédito"
				},
				user: {
				  id: 1,
				  name: "Federico"
				}
			  }
			],

			//Siguientes funciones a crear
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
						body: JSON.stringify({'email': email, 'password': password}),
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
					setStore({...store, logged_user: data })
					return true

				} catch (error) {
					console.error(error);
					return false
				}
			},

			// Action Registro de Usuario

			signup: async (name, email, password) => {
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

			//Action 1

			//Action 2

			//Action 3

			//Action 4

			//Siguientes actions aqui debajo
			
			// Acción para obtener registros filtrados por usuario y categoría en un período de tiempo (get-records)
			get_records: async (category_id, start_date) => {
				const baseURL = `${apiUrl}/api/records/list`;
				const queryParams = [];
		
				if (category_id) queryParams.push(`category_id=${category_id}`);
				if (start_date) queryParams.push(`start_date=${new Date(start_date).toISOString()}`);
		
				const URLlistRecords = queryParams.length > 0 ? `${baseURL}?${queryParams.join('&')}` : baseURL;
				const { setStore } = getActions();
		
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
					setStore({ ...store, records: [...store.records, data.records]}); 
					return true;
		
				} catch (error) {
					console.error("Error al obtener los registros:", error);
					setStore({ recordsError: error.message || "Ocurrió un error al cargar los registros." });
					return false
				}
			},



			// Action para agregar un nuevo registro (Record)
			addRecord: async (description, amount, type, category_id, wallet_id) => {
                const URLaddRecord = `${apiUrl}/api/records/add`;
                const { getStore, setStore } = getActions(); 

                try {
                    if (!description || !amount || !type || !category_id || !wallet_id) {
                        console.error("Faltan campos requeridos para agregar el registro.");
                        return false;
                    }

                    const recordData = {
                        description: description,
                        amount: parseFloat(amount), 
                        type: type,
                        category_id: parseInt(category_id), 
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

                   
                    const store = getStore();

                    setStore({ ...store, records: [...store.records, data] });


                    return true;

                } catch (error) {
                    console.error("Hubo un error al agregar el registro:", error);
                    return false;
                }
            },
		}
	};
};

export default getState;
