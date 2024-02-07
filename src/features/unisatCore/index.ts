import { atom } from 'jotai';

// export const unisatAtom = atom(null);
export const connectedAtom = atom(false);
export const publicKeyAtom = atom('');
export const addressAtom = atom('');
export const balanceAtom = atom({ confirmed: 0, unconfirmed: 0, total: 0 });
export const unisatInstalledAtom = atom(false);

export const toAddressAtom = atom('');
export const txidsAtom = atom([]);

// subscribe
// export const unisatStore = createStore();
//
// const unsub = unisatStore.sub(countAtom, () => {
//   console.log("countAtom value is changed to", myStore.get(countAtom));
// });
