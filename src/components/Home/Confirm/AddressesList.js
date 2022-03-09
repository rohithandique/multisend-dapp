import React from 'react'
import { useAuth } from 'contexts/AuthContext';
import { Tbody, Tr,Td 
} from '@chakra-ui/react'

export default function AddressesList() {
    const { isPro, isUpload, amount, addresses, tokenAddress } = useAuth()
    if(addresses) {
        const addrArr = addresses.map((_addr, index)=>(
            <Tr key={index}>
                <Td >{_addr}</Td>
                <Td isNumeric>{amount}</Td>
            </Tr>
        ))
        return <Tbody>{addrArr}</Tbody>
    } 
    return null;
}
