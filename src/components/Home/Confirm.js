import React, { useState } from 'react'
import AddressesList from './Confirm/AddressesList';
import { Center, Box, useColorModeValue, 
    Button, Table, Thead, SimpleGrid,
    Tr, Th, Heading, TableCaption, VStack, 
    useToast
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';
import { ethers } from 'ethers';

import abi from "abi/multisend_abi.json"

export default function Confirm() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();
    const toast = useToast()
    const toastID = 'toast'

    const [ isLoading, setIsLoading ] = useState()

    const { currentAccount, addresses, amount, isPro, setIsPro, 
        setAmount, setTokenAddress, setAddresses, contractAddr
    } = useAuth()

    const handleBackClick = () => {
        setIsPro(false)
        setAddresses()
        setAmount()
        setTokenAddress()
        navigate("/", { replace: false })
    }

    const sendTx = async() => {
        setIsLoading(true)
        if(!currentAccount) {
            toast({
                toastID,
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const multisendContract = new ethers.Contract(contractAddr, abi, signer);
            console.log(amount)
            console.log(addresses)
            console.log(isPro)
            if(isPro) {
                const options = {value: ethers.utils.parseEther((amount).toString())}
                let _amountArr = []
                let _addressArr = []
                for(let i=0; i<addresses.length; i++) {
                    _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                    _addressArr.push(addresses[i][0])
                }
                await multisendContract.ethSendDifferentValue(_addressArr, _amountArr, options)
            } else {
                const options = {value: ethers.utils.parseEther((amount*addresses.length).toString())}
                await multisendContract.ethSendSameValue(addresses, ethers.utils.parseEther(amount), options);
            }
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <Center bg={bg} h="90vh">
        <Box rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")} p="4" w="80vw">
            <Button variant="ghost" m="1" leftIcon={<ArrowBackIcon />} onClick={handleBackClick}>
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
                            <Center>{addresses ? addresses.length : ""}</Center>    
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            Total Amount to be Sent
                            <Center>{isPro ? amount : addresses ? addresses.length*amount : ""}</Center>
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">Est. Total Transaction Cost</Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">Cost Decreased By</Box>
                    </SimpleGrid>
                    <Button bg="brand.100" color="white"
                    size="md"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={sendTx}
                    isLoading={isLoading}
                    >
                        SEND
                    </Button>
                </VStack>
            </Center>
        </Box>
    </Center>
  )
}
