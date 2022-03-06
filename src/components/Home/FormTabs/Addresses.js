import React from 'react'
import {
    FormControl, FormLabel, Textarea, Tooltip
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function Addresses() {
  return (
    <>
    <FormControl mt="4">
        <FormLabel htmlFor='addresses'>
          Addresses
          <Tooltip label='Max 255 Addresses Allowed' fontSize='sm' rounded="md">
            <InfoOutlineIcon ml="2"/>
          </Tooltip>
        </FormLabel>
        <Textarea id='addresses' type='text' w="100%" rows="8" backgroundColor="#E5E5E5"
        _placeholder={{color: "gray.500"}}
        placeholder='Input addresses separated with comma.
Example:
0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea,
0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea'
        />
    </FormControl>
    </>
  )
}
