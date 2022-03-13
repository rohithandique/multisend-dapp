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
    const [ isPro, setIsPro ] = useState(false)
    const [ balance, setBalance ] = useState()
    const [ tabIndex, setTabIndex ] = useState(0)

    const contractAddr = "0x57135bEA188990A1bc58113c9f0C08AB5C6C0f5F"//"0x83cC30e1E5f814883B260CE32A2a13D3493E5439"
    const value = {
        currentAccount, setCurrentAccount,
        currentNetwork, setCurrentNetwork,
        amount, setAmount,
        tokenAddress, setTokenAddress,
        addresses, setAddresses,
        isUpload, setIsUpload,
        isPro, setIsPro,
        balance, setBalance,
        contractAddr,
        tabIndex, setTabIndex
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
