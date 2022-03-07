import React, { useState } from 'react'
import {
    FormControl, FormLabel, Textarea, Tooltip, Grid, GridItem, Button
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { GrDocumentCsv } from "react-icons/gr"
import { BsBookmarks } from "react-icons/bs"
import CSVUpload from './CSVUpload'

export default function Addresses() {

  const [ isUpload, setIsUpload ] = useState(false)
  return (
    <>
    <FormControl mt="4">
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={4}>
          <FormLabel htmlFor='addresses'>
            Addresses
            <Tooltip label='Max 255 Addresses Allowed' fontSize='sm' rounded="md">
              <InfoOutlineIcon ml="2"/>
            </Tooltip>
          </FormLabel>
        </GridItem>
        <GridItem colSpan={1} display='flex' alignItems='flex-end' justifyContent='flex-end'>
          <Button variant="unstyled" onClick={()=>setIsUpload(!isUpload)} 
          rightIcon={isUpload ? <GrDocumentCsv /> : <BsBookmarks />}
          _focus={{
            outline: "none"
          }}
          pb="4"
          >
            {isUpload ?
            "Upload File"
            :
            "Direct Input"
            }
          </Button>
        </GridItem>
      </Grid>
      { isUpload ?
      <Textarea id='addresses' type='text' w="100%" rows="8" backgroundColor="#E5E5E5"
      _placeholder={{color: "gray.500"}}
      placeholder='Input addresses separated with comma.
Example:
0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea,
0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea'
      />
      :
      <CSVUpload />
      }
      
      
    </FormControl>
    </>
  )
}
