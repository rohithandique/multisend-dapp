import React from 'react'
import { Checkbox, HStack } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'

export default function DonationBox() {

    const { isChecked, setIsChecked, currentNetwork } = useAuth()

    return (
    <>
    <HStack>
        <Checkbox isChecked={isChecked} onChange={()=>setIsChecked(!isChecked)}>
            Donate 
            {currentNetwork === 56 || currentNetwork ===97 ? " 0.001 BNB "
            :  
            currentNetwork === 128 ? " 0.04 HT "
            :
            currentNetwork === 1
            ? " 0.00015 ETH " : ""}
            to OneClick
        </Checkbox>
    </HStack>
    </>
  )
}
