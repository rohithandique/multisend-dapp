import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, useColorModeValue, 
    Button 
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

export default function MainTabs() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();

    return (
    <Center bg={bg} h="90vh">
        <Box pb="4" rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")}>
            <Tabs variant='unstyled' >
            <TabList m={5} p={2} bg="brand.300" rounded="xl">
                <Tab ml={1} _selected={{ color: 'white', bg: 'brand.200' }} rounded="lg">
                    Send BNB
                </Tab>
                <Tab mr={1} _selected={{ color: 'white', bg: 'brand.200' }} rounded="lg">
                    Send Tokens
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <p>one!</p>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
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
