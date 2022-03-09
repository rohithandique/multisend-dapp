import React from 'react'
import AddressesList from './Confirm/AddressesList';
import { Center, Box, useColorModeValue, 
    Button, Table, Thead, SimpleGrid,
    Tr, Th, Heading, TableCaption, VStack, 
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';

export default function Confirm() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();

    const { addresses, amount } = useAuth()

    return (
    <Center bg={bg} h="90vh">
        <Box rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")} p="4" w="80vw">
            <Button variant="ghost" m="1" leftIcon={<ArrowBackIcon />} onClick={()=>{navigate("/", { replace: false })}}>
                Back
            </Button>
            <Table variant='simple' size="sm">
                <TableCaption placement='top'>
                    <Heading as="h2" size="md" color={useColorModeValue("gray.600", "gray.400")}>DETAILS</Heading>
                </TableCaption>
                <Thead>
                    <Tr>
                    <Th>Address</Th>
                    <Th isNumeric>Amount</Th>
                    </Tr>
                </Thead>
                <AddressesList />
            </Table>
            <Center mt="4">
                <VStack spacing="4">
                    <Heading as="h2" size="md" my="2" color={useColorModeValue("gray.600", "gray.400")}>SUMMARY</Heading>
                    <SimpleGrid columns={[1, null, 2]} spacing={4}>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            Total Number Of Addresses
                            <Center>{addresses.length}</Center>    
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            Total Amount to be Sent
                            <Center>{addresses.length*amount}</Center>
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">Est. Total Transaction Cost</Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">Cost Decreased By</Box>
                    </SimpleGrid>
                    <Button bg="brand.100" color="white"
                    size="md"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={()=>console.log(addresses)}
                    >
                        SEND
                    </Button>
                </VStack>
            </Center>
        </Box>
    </Center>
  )
}
