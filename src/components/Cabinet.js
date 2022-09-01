import React, { useState } from "react";
import { VStack, Image, Input, Icon, Box, Divider, Center } from "native-base";
import { Animated, SafeAreaView, StatusBar } from "react-native";

// components
import Header from "./Header";
import Loader from "./Loader";
/* import Search from './Search'; */

const Cabinet = () => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      new Animated.Value(0)
    ),
    0,
    50
  );
  const array = [1, 2, 3, 4, 5];
  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header header="Cabinet" />
        <Center>
          <VStack
            my="4"
            space={5}
            w="100%"
            maxW="300px"
            divider={
              <Box px="2">
                <Divider />
              </Box>
            }
          >
            <Input
              placeholder="Search"
              variant="filled"
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
              InputLeftElement={<Icon ml="2" size="4" color="gray.400" />}
            />
          </VStack>
        </Center>
        <Image
          source={require("../../assets/images/cabinet.jpg")}
          /* borderRadius={30} */ alt="Kitchen Cabinet"
          resizeMode="cover"
        />

        {/* <Search clampedScroll={clampedScroll} /> */}
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            backgroundColor: "white",
            paddingTop: 55,
          }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => {} // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          {array.map((item) => (
            <Loader key={item} />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default Cabinet;
