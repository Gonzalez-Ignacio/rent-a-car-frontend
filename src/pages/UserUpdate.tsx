import { useState } from "react";
import { useUpdateUser } from "../hook/useUpdateUser";
import { fetchAuthSession } from "@aws-amplify/auth";

export default function UserUpdate() {
  // Estado para mantener el usuario actualizado desde localStorage
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  });

  const { updateUser } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dob: user?.dob || "",
    country: user?.country || "",
    address: user?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.accessToken.toString();

      if (!token) {
        console.error("User Unauthenticated");
        return;
      }

      await updateUser(token, userData);

      const updatedUser = { ...user, ...userData };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <div className="container flex flex-col items-start pt-4">
      {isEditing ? (
        <>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Name:
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />

          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            LastName:
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />

          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Dob:
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="dob"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
          />

          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Address:
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />

          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Country:
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <p>Nombre: {user.firstName}</p>
          <p>Apellido: {user.lastName}</p>
          <p>Fecha de Nacimiento: {user.dob}</p>
          <p>
            Email: {user?.email}{" "}
            <small className="text-xs text-red-800">
              (El email no se puede modificar)
            </small>
          </p>
          <p>Dirección: {user.address}</p>
          <p>País: {user.country}</p>
        </>
      )}

      <button className="bg-cyan-900" type="button" onClick={handleUpdate}>
        {isEditing ? "Enviar" : "Editar"}
      </button>
    </div>
  );
}
