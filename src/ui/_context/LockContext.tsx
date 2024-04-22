import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LockContextType {
    lockId: number | null;
    setLockId: (id: number | null) => void;
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
    const [lockId, setLockId] = useState<number | null>(null);

    return (
        <LockContext.Provider value={{ lockId, setLockId }}>
            {children}
        </LockContext.Provider>
    );
};
