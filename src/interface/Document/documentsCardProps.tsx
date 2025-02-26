import { IDocument } from "./document.interface";

export interface IDocumentCardProps {
  document: IDocument;
  fetchDocuments: () => void
}