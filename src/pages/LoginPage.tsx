import { useForm } from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const { handleSubmit, errors, register, formState } = useForm();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const history = useHistory();

  function validateUserName(value: string) {
    if (!value) {
      return 'Du måste ange ett användarnamn';
    } else return true;
  }

  function validatePassword(value: string) {
    if (!value) {
      return 'Du måste ange ett lösenord';
    } else if (value.length < 4) {
      return 'Lösenordet måste vara minst 4 tecken långt';
    } else return true;
  }

  function onSubmit(values: { username: string; password: string }) {
    return fetch('https://simon-cookbook-backend.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 401) {
          setServerError('Användarnamnet och/eller lösenordet stämmer inte');
        }
        return response.json();
      })
      .then((data: { access_token: string } | undefined) => {
        if (data) {
          // Vulnerable to XSS, consider changing
          localStorage.setItem('token', data.access_token);
          history.push('/');
        }
      });
  }

  return (
    <Container centerContent>
      <Box mt={8} p={8} boxShadow="xl" rounded="lg" w="100%" maxW="400px">
        <Heading as="h1" size="2xl" mt="8">
          Logga in
        </Heading>
        <Box mt={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Användarnamn</FormLabel>
              <Input
                name="username"
                placeholder="Användarnamn"
                ref={register({ validate: validateUserName })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel htmlFor="password">Lösenord</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="********"
                ref={register({ validate: validatePassword })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={8}
              colorScheme="orange"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Logga in
            </Button>
            {serverError && (
              <Box mt={4}>
                <Text color="red.500">{serverError}</Text>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Container>
  );
}
