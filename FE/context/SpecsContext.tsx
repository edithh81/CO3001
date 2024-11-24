import React from "react";
import { useContext, createContext } from "react";

// use for storing printing specifications, admin only

type specProp = {
    allowType: string; // ".pdf, .docx, .doc"
    defaultPage: number;
    renewPage: number; // time to renew the page slot for students - 1 month, 3 months, 6 months, 1 year
};

interface SpecsContextProps {
    specs: specProp;
    setSpecs: (specs: specProp) => void;
}

const SpecsContext = createContext<SpecsContextProps | undefined>(undefined);

export const useSpecs = () => {
    const context = useContext(SpecsContext);
    if (!context) {
        throw new Error("useSpecs must be used within an SpecsProvider");
    }
    return context;
};

interface SpecsProviderProps {
    children: React.ReactNode;
}

const SpecsProvider = ({ children }: SpecsProviderProps) => {
    const [specs, setSpecs] = React.useState<specProp>({
        allowType: ".pdf, .docx, .doc",
        defaultPage: 10,
        renewPage: 1,
    });

    return (
        <SpecsContext.Provider value={{ specs, setSpecs }}>
            {children}
        </SpecsContext.Provider>
    );
};

export default SpecsProvider;
