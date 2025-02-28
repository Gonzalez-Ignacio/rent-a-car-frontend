import { fetchAuthSession } from "@aws-amplify/auth";
import { useDeleteDocument } from "../../hook/document/useDeleteDocument";
import { IDocumentCardProps } from "../../interface/Document/documentsCardProps";

export function DocumentCard({ document, fetchDocuments }: IDocumentCardProps) {
  const { deleteDocument } = useDeleteDocument();
  const user = localStorage.getItem("user");
  const userUuid = user ? JSON.parse(user).uuid : null;

  const handleDelete = async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();

    if (!token || !userUuid) {
      console.error("User Unauthenticated");
      return;
    }

    try {
      await deleteDocument(token, document.uuid, userUuid);
      fetchDocuments?.();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="document-card">
      <h2>{document.title}</h2>
      <p>{document.description}</p>
      <a href={document.url} target="_blank" rel="noopener noreferrer">
        Ver Documento
      </a>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
      >
        Eliminar
      </button>
    </div>
  );
}
