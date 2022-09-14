import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const DateTimePicker = ({ onSelectedChange }) => {
  return (
    <DatePicker
      onSelectedChange={onSelectedChange}
      options={{
        backgroundColor: '#090C08',
        textHeaderColor: '#FFA25B',
        textDefaultColor: '#F6E7C1',
        selectedTextColor: '#fff',
        mainColor: '#F4722B',
        textSecondaryColor: '#D6C7A1',
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      /*             current='2020-07-13'
                        selected='2020-07-23' */
      mode="calendar"
      minuteInterval={30}
      style={{ borderRadius: 10 }}
    />
  );
};

export default DateTimePicker;
