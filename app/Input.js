import React, { useState, useCallback, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const Input = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [eye, setEye] = useState(props.password ? true : false);
  const handleFocus = useCallback(() => {
    props.onFocus();
    setIsFocused(true);
  }, [props.onFocus]);

  const handleBlur = useCallback(() => {
    props.onBlur();
    setIsFocused(false);
  }, [props.onBlur]);

  return (
    <View style={styles.container}>
      {props.label ? ( <Text style={styles.label}>{props.label}</Text>) : null}
      <View style={[styles.inputContainer, props.error ? styles.error : styles.default, isFocused ? styles.focused : styles.unfocused]}>
        <TextInput
          label={props.label}
          autoCorrect={false}
          autoCapitalize={props.caps ? props.caps : "none"}
          secureTextEntry={eye}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit={props.blurOnSubmit}
          returnKeyType={props.returnKeyType}
          style={styles.input}
          value={props.value? props.value : ""}
          onSubmitEditing={props.onSubmitEditing}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          {...props}
        />
        {props.iconName && eye && (
          <Icon
            name={props.iconName}
            size={24}
            color="#16927D"
            onPress={() => setEye(!eye)}
          />
        )}
        {props.iconName && !eye && (
          <Icon
            name={"eye-off"}
            size={24}
            color="#16927D"
            onPress={() => setEye(!eye)}
          />
        )}
      </View>
      {props.error && (
        <Text style={styles.errorText}>{props.error}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: "#021D1D",
  },
  inputContainer: {
      height: 55,
      flexDirection: 'row',
      paddingHorizontal: 15,
      backgroundColor: "white",
      borderRadius: 5,
      alignItems: 'center',
  },
  error: {
    borderColor: "red",
  },
  default: {
    borderColor: "#16927D",
  },
  focused: {
    borderWidth: 3,
  },
  unfocused: {
    borderWidth: 1,
  },
  input: {
    flex: 1,
    textAlign: "center",
    color: "#021D1D",
    fontSize: 24,
    ...Platform.select({web: {outlineStyle: 'none'}}),
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 7,
  },
});

export default Input;