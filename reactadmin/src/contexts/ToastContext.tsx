import { createContext, useState, useContext, ReactNode } from "react";

export type ToastType = 'success' | 'warning' | 'error' | null;

interface ToastContextType {
    message: string,
    type: ToastType,
    setMessage: (message: string, type?: ToastType) => void,
}

const toastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
    children: ReactNode    
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {

    const [message, setToastMessage] = useState<string>('')
    const [type, setType] = useState<ToastType>(null)

    const  setMessage = (message: string, type: ToastType = null) => {
        setToastMessage(message)
        setType(type)
    }

    return(
        <toastContext.Provider value={{ message,type, setMessage }}>
            {children}
        </toastContext.Provider>
    )
}

export const useToast = ():ToastContextType => {
    const context = useContext(toastContext)
    if (!context) {
        throw new Error('có vấn đề xảy ra')
    }
    return context
}