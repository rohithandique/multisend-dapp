import React, { useState, useEffect, useCallback } from 'react'
import AddressesList from './Confirm/AddressesList';
import { Center, Box, useColorModeValue, 
    Button, Table, Thead, SimpleGrid,
    Tr, Th, Heading, TableCaption, VStack, 
    useToast, chakra, Link
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';
import { ethers } from 'ethers';

import multisend_abi from "abi/multisend_abi.json"
import erc20_abi from "abi/erc20_abi.json"
import DonationBox from './Confirm/DonationBox';
import ApproveSend from './Confirm/ApproveSend';

export default function Confirm() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();
    const toast = useToast()
    const toastID = 'toast'

    const [ isLoading, setIsLoading ] = useState()
    const [ isApproved, setIsApproved ] = useState(false)
    const [ tokenSymbol, setTokenSymbol ] = useState()
    const [ coinGas, setCoinGas ] = useState()
    const [ contractGas, setContractGas ] = useState()
    const [ isSent, setIsSent ] = useState(false)

    const { currentAccount, addresses, tokenAddress, amount, isPro, setIsPro, 
        setAmount, setTokenAddress, setAddresses, contractAddr, currentNetwork,
        setContractAddr, setTabIndex, tabIndex
    } = useAuth()

    const getTokenSymbol = useCallback(async() => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
            setTokenSymbol(await tokenContract.symbol());
        } catch(err) {
            console.log(err)
        }
    }, [tokenAddress])

    const getCoinGasPrice = useCallback(() => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            provider.getGasPrice().then((currentPrice)=> {
                if(addresses) {
                    setCoinGas(addresses.length*21000*ethers.utils.formatUnits(currentPrice, "gwei"))
                }
            })
            
        } catch(err) {
            console.log(err)
        }
    }, [addresses])

    const getContractGasPrice = useCallback(async() => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            let _currentPrice;
            provider.getGasPrice().then((currentPrice)=> {
                _currentPrice = ethers.utils.formatUnits(currentPrice, "gwei")
            })
            const multisend_contract = new ethers.Contract(contractAddr, multisend_abi , signer);
            let estimation;
            if(isPro) {
                if(tabIndex===1) {
                    let _amountArr = []
                    let _addressArr = []
                    for(let i=0; i<addresses.length; i++) {
                        _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                        _addressArr.push(addresses[i][0])
                    }
                    try {
                        estimation = await multisend_contract.estimateGas.sendDifferentValue(tokenAddress, _addressArr, _amountArr)
                        setContractGas(parseInt(estimation["_hex"], 16)*_currentPrice)
                    } catch(err) {
                        console.log(err)
                    }
                } else {
                    const options = {value: ethers.utils.parseEther((amount).toString())}
                    let _amountArr = []
                    let _addressArr = []
                    for(let i=0; i<addresses.length; i++) {
                        _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                        _addressArr.push(addresses[i][0])
                    }
                    estimation = await multisend_contract.estimateGas.ethSendDifferentValue(_addressArr, _amountArr, options)
                    setContractGas(parseInt(estimation["_hex"], 16)*_currentPrice)
                }
            } else {
                if(tabIndex===1) {
                    try {
                        estimation = await multisend_contract.estimateGas.sendSameValue(tokenAddress, addresses, ethers.utils.parseEther((amount).toString()))
                        setContractGas(parseInt(estimation["_hex"], 16)*_currentPrice)
                    } catch(err) {
                        console.log(err)
                    }
                } else {
                    const options = {value: ethers.utils.parseEther((amount*addresses.length).toString())}
                    estimation = await multisend_contract.estimateGas.ethSendSameValue(addresses, ethers.utils.parseEther((amount).toString()), options)
                    console.log(_currentPrice)
                    setContractGas(parseInt(estimation["_hex"], 16)*_currentPrice)
                }
            }
            console.log(parseInt(estimation["_hex"], 16))
        } catch(err) {
            console.log(err)
        }
    }, [addresses, amount, contractAddr, tokenAddress, isPro, tabIndex])

    useEffect(() => {
        if(currentNetwork === 56 ) {
            setContractAddr("0x83cC30e1E5f814883B260CE32A2a13D3493E5439")
        } else if(currentNetwork === 128) {
            setContractAddr("0xF104c1F8346F6BfF0565106B15e1bC989d10216d");
        } else if(currentNetwork === 97) {
            setContractAddr("0x4e7369474301364B6348F0660a87A6D5557e6F9f");
        } else setContractAddr()
        if(tabIndex===0) {
            getCoinGasPrice()
            getContractGasPrice()
        }
        if(tokenAddress) {
            getTokenSymbol()
        }
    }, [currentNetwork, setContractAddr, getTokenSymbol, tokenAddress, 
        getContractGasPrice, getCoinGasPrice, tabIndex])

    const handleBackClick = () => {
        setIsPro(false)
        setAddresses()
        setAmount()
        setTokenAddress()
        setTabIndex(0)
        navigate("/", { replace: false })
    }

    const sendTx = async() => {
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
        if(currentNetwork!==56 && currentNetwork!==128 && currentNetwork!==97) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        setIsLoading(true)
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const multisendContract = new ethers.Contract(contractAddr, multisend_abi, signer);
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
                await multisendContract.ethSendSameValue(addresses, ethers.utils.parseEther((amount).toString()), options);
            }
            setTimeout(() => {
                setIsSent(true)
            }, 5000);
            toast({
                toastID,
                title: 'Transaction Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
        }
    }

    const sendTokenTx = async() => {
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
        if(currentNetwork!==56 && currentNetwork!==128 && currentNetwork!==97) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
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
            const multisendContract = new ethers.Contract(contractAddr, multisend_abi, signer);
            if(isPro) {
                let _amountArr = []
                let _addressArr = []
                for(let i=0; i<addresses.length; i++) {
                    _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                    _addressArr.push(addresses[i][0])
                }
                await multisendContract.sendDifferentValue(tokenAddress, _addressArr, _amountArr)
            } else {
                await multisendContract.sendSameValue(tokenAddress, addresses, ethers.utils.parseEther((amount).toString()));
            }
            setTimeout(() => {
                setIsSent(true)
            }, 5000);
            toast({
                toastID,
                title: 'Transaction Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
        }
    }

    const approveTx = async() => {
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
        if(currentNetwork!==56 && currentNetwork!==128 && currentNetwork!==97) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
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
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
            const _amount = ethers.utils.parseEther((((addresses.length*10*amount)/10).toString()))
            await tokenContract.approve(contractAddr, _amount);
            setTimeout(() => {
                setIsApproved(true)
            }, 5000);
            toast({
                toastID,
                title: 'Approval Request Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
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
                    {tokenAddress ?
                    <>
                    <Heading as="h2" size="sm" my="2">
                        Token Contract Address:
                    </Heading>
                    <chakra.h2>
                        <Link href={"https://testnet.bscscan.com/address/"+tokenAddress} isExternal>
                        {tokenAddress.substring(0, 5)+"..."+tokenAddress.substring(36, 42)}
                        </Link>
                        <ExternalLinkIcon ml="1"/>
                    </chakra.h2>
                    </>
                    
                    :
                    <></>
                    }
                    
                    <SimpleGrid columns={[1, null, 2]} spacing={4}>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            Total Number Of Addresses
                            <Center>{addresses ? addresses.length : ""}</Center>    
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            <Center>
                            Total Amount to be Sent
                            </Center>
                            <Center>{isPro 
                                ? tokenAddress ? amount + " " + tokenSymbol :  amount
                                : addresses 
                                ? tokenAddress ? (addresses.length*10*amount)/10 + " " + tokenSymbol : (addresses.length*10*amount)/10
                                : ""}
                            </Center>
                        </Box>
                        {tabIndex === 1 ?
                        <></>
                        :
                        <>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Est. Total Transaction Cost
                                </Center>
                                <Center>
                                    { contractGas } gwei 
                                </Center>
                            </Box>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Cost Decreased By
                                </Center>
                                <Center>
                                    {contractGas ? Math.round(((coinGas-contractGas)/coinGas)*100)+" %" : ""}
                                </Center>
                            </Box>
                        </>
                        }
                        
                    </SimpleGrid>
                    <DonationBox />
                    {tokenAddress ?
                    isApproved ?
                    <Button bg="brand.100" color="white"
                    size="md"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={sendTokenTx}
                    isLoading={isLoading}
                    >
                        SEND
                    </Button>
                    :
                    <Button bg="brand.100" color="white"
                    size="md"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={approveTx}
                    isLoading={isLoading}
                    >
                        SEND
                    </Button>
                    :
                    <Button bg="brand.100" color="white"
                    size="md"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={sendTx}
                    isLoading={isLoading}
                    isDisabled={isSent}
                    >
                        SEND
                    </Button>
                    }
                    {tabIndex === 1 ?
                    <ApproveSend isApproved={isApproved} isSent={isSent}/>
                    :
                    <></>}
                </VStack>
            </Center>
        </Box>
    </Center>
  )
}
