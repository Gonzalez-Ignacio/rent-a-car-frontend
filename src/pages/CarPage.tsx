import { useCallback, useEffect, useState } from "react";
import { useGetCars } from "../hook/car/useGetCars";
import { fetchAuthSession } from "@aws-amplify/auth";
import { CarForm } from "../components/Car/CarForm";

export interface ICar {
  uuid: string;
  brand: string;
  model: string;
  img: string;
  color: string;
  passengers: number;
  ac: boolean;
  pricePerDay: number;
}

export default function CarPage() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { getCars } = useGetCars();

  const fetchCars = useCallback(async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();

    if (token) {
      const carsData = await getCars(token);
      setCars(carsData.data);
    }
  }, [getCars]);

  useEffect(() => {
    fetchCars();
  },[]);

  return (
    <div className="container">
      <h1>Cargar sus Autos:</h1>

      <button onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? "Cancelar" : "Crear Auto"}
      </button>

      {showForm && <CarForm />}
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {cars.map((car) => (
          <div key={car.uuid} className="bg-white rounded-lg shadow-md p-4">
            <img src={car.img} alt={car.model} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold">{car.brand} {car.model}</h2>
            <p className="text-gray-600">Color: {car.color}</p>
            <p className="text-gray-600">Pasajeros: {car.passengers}</p>
            <p className="text-gray-600">Aire Acondicionado: {car.ac ? "Si" : "No"}</p>
            <p className="text-gray-600">Precio por Día: ${car.pricePerDay}</p>
          </div>
        ))}
      </div>
    </div>
  )
}