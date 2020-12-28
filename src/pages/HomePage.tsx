import * as React from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionInputGroup = motion.custom(InputGroup);

export default function HomePage() {
  const [apiOK, setApiOK] = React.useState<boolean>(false);

  React.useEffect(() => {
    /* fetch('https://simon-cookbook-backend.herokuapp.com/')
      .then((res) => res.text())
      .then((text) => {
        if (text) {
          setApiOK(true);
        }
      }); */
  });

  return (
    <Container centerContent>
      <Heading as="h1" size="4xl" mt="8">
        Kokboken
      </Heading>
      <Text
        fontSize="sm"
        color={apiOK ? 'green.400' : 'red.400'}
        pos="absolute"
        top="4"
        right="4"
      >
        API {apiOK ? 'OK' : 'not OK'}
      </Text>
      <Box mt="8" p="4" boxShadow="xl" borderRadius="0.5rem" w="100%">
        <MotionInputGroup
          alignItems="center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transformOrigin="left"
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        >
          <Input
            placeholder="Sök recept"
            size="lg"
            color="orange.400"
            fontWeight="500"
            borderRadius="2rem"
          />
          <InputRightElement
            h="100%"
            mr="1rem"
            children={
              <Icon as={FiSearch} w="1.5rem" h="1.5rem" color="orange.400" />
            }
          />
        </MotionInputGroup>
      </Box>
    </Container>
  );
}
