export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract?: string;
  pdfUrl?: string;
  citation?: string;
}