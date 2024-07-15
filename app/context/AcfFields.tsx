import { createContext, useContext } from 'react';
import { AcfFields } from "../_types"

export const AcfFieldsContext = createContext<AcfFields | undefined>(undefined);


export function useAcfFieldsContext() {
  const AcfData = useContext(AcfFieldsContext)

  if (AcfData === undefined) {
    throw new Error('Use useAcfFieldsContext must be used with a AcfFieldsContext')
  }

  return AcfData;
}