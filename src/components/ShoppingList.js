import {
  Center,
  Checkbox,
  Divider,
  HStack,
  ScrollView,
  StatusBar,
  Text,
  useColorMode,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const ShoppingList = () => {
  const { colorMode } = useColorMode();
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <View>
      <SafeAreaView>
        <StatusBar
          barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Text size={'md'} bold textAlign={'center'}>
          10 items to buy
        </Text>
        <Center>
          <ScrollView mt={4}>
            <VStack>
              <HStack>
                <Checkbox.Group
                  onChange={setGroupValues}
                  value={groupValues}
                  accessibilityLabel="choose numbers"
                >
                  <Checkbox value="one" my={2}>
                    UX Research
                  </Checkbox>
                  <Checkbox value="two">Software Development</Checkbox>
                </Checkbox.Group>
              </HStack>
            </VStack>
          </ScrollView>
        </Center>
      </SafeAreaView>
    </View>
  );
};

export default ShoppingList;
