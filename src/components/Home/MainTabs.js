import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, useColorModeValue } from '@chakra-ui/react'

export default function MainTabs() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");

    return (
    <Center bg={bg} h="90vh">
        <Box rounded="xl" shadow="lg" bg={useColorModeValue("White", "gray.700")}>
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
        </Box>
    </Center>
  )
}
