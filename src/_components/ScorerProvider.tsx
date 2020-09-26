import React, { createContext } from 'react';

interface ScorerContextType {
    /** translation name-space */
    tns: string;
    /** method to call on any answer */
    onChange: () => any;
}

export const ScorerContext = createContext<ScorerContextType>({ tns: '', onChange: () => null });

interface ScorerContextProviderProps extends ScorerContextType {
    children?: React.ReactNode;
}

export function ScorerContextProvider(props: ScorerContextProviderProps) {
    const { tns, onChange, children } = props;
    return <ScorerContext.Provider value={{ tns, onChange }}>{children}</ScorerContext.Provider>;
}
