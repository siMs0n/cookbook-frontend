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
  CircularProgress,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Recipe } from '../types/recipe';

const MotionInputGroup = motion.custom(InputGroup);

export default function HomePage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = React.useState<boolean>(true);
  const history = useHistory();

  if (!localStorage.getItem('token')) {
    history.push('/login');
  }

  React.useEffect(() => {
    async function fetchRecipes() {
      const recipesResponse = await fetch(
        'https://simon-cookbook-backend.herokuapp.com/recipes',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return recipesResponse.json();
    }

    const token = localStorage.getItem('token');

    if (token) {
      fetchRecipes().then((recipes) => {
        setRecipes(recipes);
        setLoadingRecipes(false);
      });
    }
  }, []);

  return (
    <Container centerContent>
      <Heading as="h1" size="4xl" mt="8">
        Kokboken
      </Heading>
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
      <Heading as="h2" size="2xl" mt={12} mb={6}>
        Våra recept
      </Heading>
      {loadingRecipes && (
        <CircularProgress isIndeterminate size="80px" color="cyan.400" mt={6} />
      )}
      {recipes.map((recipe: Recipe) => (
        <RecipeListItem recipe={recipe} key={recipe._id} />
      ))}
    </Container>
  );
}

interface RecipeListItemProps {
  recipe: Recipe;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <Box p={4} boxShadow="xl" rounded="xl">
      <Heading as="h3" size="lg" color="cyan.600">
        {recipe.name}
      </Heading>
      <Text>Servings: {recipe.servings}</Text>
    </Box>
  );
}
