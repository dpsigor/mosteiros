export interface IMosteiro {
  nome: string;
  logradouro: string | null;
  bairro: string | null;
  cep: string | null;
  cidade: string | null;
  emails: (string | null)[];
  telefones: (string | null)[];
  sites: (string | null)[];
  uf: string | null;
  foto: string | null;
  lng: number | null;
  lat: number | null;
}

interface hasResumo { resumo: string };
export type MosteiroJ = IMosteiro & hasResumo;
