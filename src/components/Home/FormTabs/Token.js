import React from 'react'
import {
    FormControl, FormLabel, Input, Badge
} from '@chakra-ui/react'

export default function Token() {
  return (
    <>
    <FormControl>
        <FormLabel htmlFor='token'>
          Token
          <Badge colorScheme="blue" ml="2" rounded="md" p="1">Contract (BNB Chain)</Badge>
        </FormLabel>
        <Input id='token' _placeholder={{color: "gray.500"}} 
        type='email' w='100%' backgroundColor="#E5E5E5" placeholder='0xA0c68C638235ee32657e8f720a23ceC1bFc77C77'/>
    </FormControl>
    </>
  )
}
