export type TDoc = {
  docId: string;
  title: string;
}

export type PDoc = {
  docId: number;
  pid?: string;
  title: string;
};

export type PDict = Record<number | string, PDoc>;
