import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LockDetails {
    lockId: number | null;
    lockAlias: string | null;
    lockName: string | null;
}

interface LockContextType {
    lockDetails: LockDetails;
    setLockDetails: (details: LockDetails) => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export const useLockContext = () => {
    const context = useContext(LockContext);
    if (!context) {
        throw new Error('useLockContext must be used within a LockProvider');
    }
    return context;
}

export const LockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lockDetails, setLockDetails] = useState<LockDetails>({ lockId: null, lockAlias: null, lockName: null });

    return (
        <LockContext.Provider value={{ lockDetails, setLockDetails }}>
            {children}
        </LockContext.Provider>
    );
};
