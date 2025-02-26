import { useCallback, useEffect, useRef, useState } from "react"
import { fetchAuthSession } from "@aws-amplify/auth";
import { DocumentForm } from "../components/Document/DocumentForm";
import { useGetDocument } from "../hook/document/useGetDocument";
import { DocumentCard } from "../components/Document/DocumentCard";
import { IDocument } from "../interface/Document/document.interface";

export default function DocumentPage() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { getDocument } = useGetDocument();
  const user = localStorage.getItem("user");
  const userUuidRef = useRef(user ? JSON.parse(user).uuid : null);

  const fetchDocuments = useCallback(async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();
    const userUuid = userUuidRef.current;

    if (token && userUuid) {
      const documentsData = await getDocument(token, userUuid);
      setDocuments(documentsData.data);
    }
  }, [getDocument]);

  useEffect(() => {
    fetchDocuments();
  },[]);

  return (
    <div className="container">
      <h1>Cargar sus Documentos:</h1>

      <button onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? "Cancelar" : "Crear Documento"}
      </button>

      {showForm && <DocumentForm fetchDocuments={fetchDocuments} />}

      <div className="document-list mt-4">
        {documents.length > 0 ? (
          documents.map((document) => (
            <DocumentCard 
              key={document.uuid} 
              document={document}
              fetchDocuments={fetchDocuments}
            />
          ))
        ) : (
          <p>No hay documentos cargados.</p>
        )}
      </div>
    </div>
  );
}
