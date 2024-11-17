export type TDoc = {
  docId: string;
  title: string;
  pids: number[];
}

export type PDoc = {
  docId: number;
  pid?: string;
  title: string;
};

export type User = {
  _id: number;
  uname: string;
  displayName: string;
};

export type UDict = Record<number | string, User>;

export type PDict = Record<number | string, PDoc>;
