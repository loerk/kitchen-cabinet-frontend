import {
  Actionsheet,
  AspectRatio,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { RecipeDetails } from '../recipes/RecipeDetails';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

//divider={<Divider />}
export const RecipeCard = ({ item }) => {
  console.log(item);
  const missingIngredientsNames = item.missedIngredients?.map(
    (ingredient) => ingredient.name
  );
  const usedIngredientsNames = item.usedIngredients?.map(
    (ingredient) => ingredient.name
  );
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box alignItems="center" m={3}>
      <Pressable onPress={onOpen}>
        <Box
          maxW="80"
          minH="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                alt="recipe image"
              />
            </AspectRatio>
            <HStack
              bg="black"
              opacity={0.7}
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
              alignItems={'flex-end'}
            >
              <AntDesign name="like2" size={22} color="white" />
              <Text pl={4} bold size={'md'} color={'white'}>
                {item.likes}
              </Text>
            </HStack>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md">{item.title}</Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              ></Text>
            </Stack>
            <HStack space={4} justifyContent="space-around">
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  size={24}
                  color="black"
                />
                <Text>{item.usedIngredientCount}</Text>
              </HStack>
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={24}
                  color="black"
                />
                <Text>{item.missedIngredientCount}</Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <RecipeDetails
            missingIngredientsNames={missingIngredientsNames}
            usedIngredientsNames={usedIngredientsNames}
            id={item.id}
            isOpen={isOpen}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

// return (
//   <Box>
//     <Pressable onPress={onOpen} mx={6}>
//       <Divider
//         my="2"
//         _light={{
//           bg: 'muted.800',
//         }}
//         _dark={{
//           bg: 'muted.50',
//         }}
//       />
//       <VStack space="4" bg={'amber.100'}>
//         <Box px="4" pt="4">
//           <HStack>
//             <Image
//               source={{
//                 uri: `${item.image}`,
//               }}
//               alt="Alternate Text"
//               size="sm"
//             />
//             <Text bold noOfLines={2} isTruncated maxW="200" w="80%" px="4">
//               {item.title}
//             </Text>
//           </HStack>
//         </Box>
//         <Box px="4">
//           <HStack>
//             <VStack px={6}>
//               <Text>Used Ingredients:</Text>
//               <Text>{item.usedIngredientCount}</Text>
//             </VStack>
//             <VStack>
//               <Text>Missing Ingredients:</Text>
//               <Text>{item.missedIngredientCount}</Text>
//             </VStack>
//           </HStack>
//         </Box>
//       </VStack>
//     </Pressable>
// <Actionsheet isOpen={isOpen} onClose={onClose}>
//   <Actionsheet.Content>
//     <RecipeDetails
//       missingIngredientsNames={missingIngredientsNames}
//       usedIngredientsNames={usedIngredientsNames}
//       id={item.id}
//       isOpen={isOpen}
//     />
//   </Actionsheet.Content>
// </Actionsheet>
//   </Box>
// );
