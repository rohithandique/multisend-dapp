import React from 'react'
import Amounts from './FormTabs/Amounts';
import Addresses from './FormTabs/Addresses';
import Token from './FormTabs/Token';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, useColorModeValue, 
    Button, Switch, FormControl, FormLabel, Tooltip, Grid, GridItem 
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function MainTabs() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();

    return (
    <Center bg={bg} h="90vh">
        <Box px="2" pb="4" rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")} w={{base:'90vw', md:"60vw"}}>
            <Tabs isFitted variant='unstyled' >
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={4}>
                    <TabList mx={4} mt="8" p={2} bg="brand.300" rounded="xl" w={{base:"92.5%", md:"60%"}} color="black">
                    <Tab _selected={{ color: 'black', bg: 'brand.200' }} rounded="lg">
                        Send BNB
                    </Tab>
                    <Tab _selected={{ color: 'black', bg: 'brand.200' }} rounded="lg">
                        Send Tokens
                    </Tab>
                    </TabList>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl display='flex' alignItems='flex-end' justifyContent='flex-end' mt="8" pr="4">
                    <FormLabel htmlFor='pro' mb='0'>
                        PRO
                        <Tooltip label='In Pro Mode, you can set different amounts of token to be sent to each address' 
                        fontSize='sm' rounded="md">
                            <InfoOutlineIcon ml="2"/>
                        </Tooltip>
                    </FormLabel>
                    <Switch id='pro'/>
                    </FormControl>
                </GridItem>
            </Grid>
            <TabPanels>
                <TabPanel>
                    <Amounts />
                    <Addresses />
                </TabPanel>
                <TabPanel>
                    <Token />
                    <Amounts />
                    <Addresses />
                </TabPanel>
            </TabPanels>
            </Tabs>
            <Center>
                <Button bg="brand.100" color="white" 
                size="md"
                _hover={{
                    backgroundColor: "brand.200"
                }}
                onClick={()=>{navigate("/confirm", { replace: false })}}
                >
                    NEXT
                </Button>
            </Center>
        </Box>
    </Center>
  )
}
