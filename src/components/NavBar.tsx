import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { fetchAuthSession, signOut, deleteUser } from "aws-amplify/auth";
import { useState } from "react";
import { useDeleteUser } from "../hook/useDeleteUser";

export default function NavBar() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteUserBD } = useDeleteUser();

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
  };

  const handleDeleteUser = async () => {
    const userData = localStorage.getItem(("user"));
    const { uuid } = JSON.parse(userData!);
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();

    if (!token) {
      console.error("User Unauthenticated");
      return;
    }
    await deleteUserBD(token, uuid);
    await deleteUser();
    localStorage.removeItem("user");
    setUser(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-50 shadow-lg bg-neutral text-neutral-content px-4 bg-cyan-900 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold px-4">
            Home
          </Link>
          <Link className="btn btn-ghost btn-sm rounded-btn" to="/document-page">
            Document
          </Link>
          <Link className="btn btn-ghost btn-sm rounded-btn" to="/car-page">
            Car
          </Link>
          <Link className="btn btn-ghost btn-sm rounded-btn" to="/picture">
            Picture
          </Link>
        </div>

        <div className="relative inline-block text-left">
          {user ? (
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-white"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                {user.email}
                <svg
                  className="-mr-1 size-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-cyan-900 ring-1 shadow-lg ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/user-update"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-400"
                      role="menuitem"
                    >
                      Update User
                    </Link>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-400"
                      role="menuitem"
                    >
                      Delete User
                    </button>
                  </div>
                  <div className="py-1" role="none">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-400"
                      role="menuitem"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login-aws-form"
                className="btn btn-outline btn-sm text-white border-white hover:bg-gray-400"
              >
                Iniciar sesión
              </Link>
              <Link to="/register-aws-form" className="btn btn-primary btn-sm">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Are you sure to delete your {user?.email}?
            </h3>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
