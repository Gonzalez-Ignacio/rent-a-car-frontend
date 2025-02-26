import axios from "../../Api/axios.config";
import { IDocumentCreate } from "../../interface/Document/documentCreate.interface";

export const useCreateDocument = () => {
  const createDocument = async (token: string, data: IDocumentCreate) => {
    const response = await axios.post<IDocumentCreate>("documents", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };
  return { createDocument };
};