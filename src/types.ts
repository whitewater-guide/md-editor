import { Transaction } from 'prosemirror-state';

export type Dispatch = (tr: Transaction) => void;
