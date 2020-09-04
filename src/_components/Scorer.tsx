import React, { createContext, useContext } from 'react';
import { FormProvider } from 'react-hook-form';

interface ScorerContextType {
    formMethods: any; // form methods
    tns: string; // translation namespace
    onChange: (any) => void; // method to call on any answer
}

export const ScorerContext = createContext<Partial<ScorerContextType>>({});

interface ScorerProps {
    formMethods: any;
    tns: string;
    onChange: (any) => void;
    children?: React.ReactNode;
}

export function Scorer(props: ScorerProps) {
    const { formMethods, tns, onChange, children } = props;
    return <ScorerContext.Provider value={{ formMethods, tns, onChange }}>{children}</ScorerContext.Provider>;
}
