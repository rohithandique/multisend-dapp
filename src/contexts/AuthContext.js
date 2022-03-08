import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [ currentAccount, setCurrentAccount] = useState()
    const [ currentNetwork, setCurrentNetwork ] = useState()
    const [ amount, setAmount ] = useState()
    const [ tokenAddress, setTokenAddress ] = useState()
    const [ addresses, setAddresses] = useState()
    const [ isUpload, setIsUpload ] = useState(false)

    const value = {
        currentAccount, setCurrentAccount,
        currentNetwork, setCurrentNetwork,
        amount, setAmount,
        tokenAddress, setTokenAddress,
        addresses, setAddresses,
        isUpload, setIsUpload
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
