import { isMobile } from '@/helpers';
import { atom } from 'jotai';

export const isMobileAtom = atom(isMobile());
