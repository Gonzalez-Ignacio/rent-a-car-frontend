import axios from "../Api/axios.config";

export const useDeleteUser = () => {
  const deleteUserBD = async (token: string, uuid: string) => {
    return await axios.delete(`/users/profile/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { uuid },
    });
  };
  return { deleteUserBD };
};