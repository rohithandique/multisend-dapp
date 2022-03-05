import React from 'react'
import { Center, Box, useColorModeValue, 
    Button 
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Confirm() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();

    return (
    <Center bg={bg} h="90vh">
        <Box rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")}>
            <Button leftIcon={<ArrowBackIcon />} onClick={()=>{navigate("/", { replace: false })}}>
                Back
            </Button>
            <p>
                Hello
            </p>
        </Box>
    </Center>
  )
}
