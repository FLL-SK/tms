import React, { createContext } from 'react';

interface ScorerContextType {
    /** form methods returned from useForm hook */
    formMethods: any;
    /** translation name-space */
    tns: string;
    /** method to call on any answer */
    onChange: () => any;
}

export const ScorerContext = createContext<Partial<ScorerContextType>>({});

interface ScorerProps {
    /** useForm hook formeMethods */
    formMethods: any;
    /** translation name-space */
    tns: string;
    /** method to call on changing any answer */
    onChange: () => any;
    children?: React.ReactNode;
}

export function ScorerProvider(props: ScorerProps) {
    const { formMethods, tns, onChange, children } = props;
    return <ScorerContext.Provider value={{ formMethods, tns, onChange }}>{children}</ScorerContext.Provider>;
}
