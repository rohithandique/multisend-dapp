import React from 'react'
import {
    FormControl, FormLabel, FormHelperText, Input
} from '@chakra-ui/react'

export default function Amounts() {

  return (
    <>
    <FormControl mt="4">
        <FormLabel htmlFor='amount'>Amount per Address</FormLabel>
        <Input id='amount' _placeholder={{color: "gray.500"}} type='email' w={{base:'100%', md:"75%"}} backgroundColor="#E5E5E5" placeholder='10'/>
        <FormHelperText>Wallet Balance: 0 BNB</FormHelperText>
    </FormControl>
    </>
  )
}
