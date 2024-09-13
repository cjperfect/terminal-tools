import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<CmdProps[]>(() => sessionStorage);
export const resultAtom = atomWithStorage<CmdProps[]>(
  "resultList",
  [],
  storage
);
