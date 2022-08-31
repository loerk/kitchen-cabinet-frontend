import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Heading, HStack, Link } from 'native-base';

const Header = ({ header }) => {

    const {width, height} = Dimensions.get('screen');
    const styles = StyleSheet.create({
        headerContainer: {
            width: width,
            height: 0.1 * height,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20
        },
        filterContainer: {
            
        }
    });
  return (
    <HStack style={styles.headerContainer}>
      <Link href="#">
        Favorites
      </Link>
      <Heading>{ header }</Heading>
            <TouchableOpacity onPress={() => {}} style={styles.filterContainer}>
        <Text>Filter</Text>
      </TouchableOpacity>
    </HStack>
  )
};


export default Header;