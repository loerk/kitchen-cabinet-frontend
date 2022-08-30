import React from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export const StyleProviderThemed = ({ children }) => (
    <StyleProvider style={ getTheme(material)}>{children}</StyleProvider>
);