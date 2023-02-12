/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInputProps,
} from 'react-native';

import {Formik} from 'formik';
import {useDispatch} from 'react-redux';

import CustomView from '../../components/CustomView';
import {globalStyles} from '../../utils/globalStyles';
import CustomTextInput from '../../components/CustomTextIput';
import {theme} from '../../assets/theme';
import {signInSchema} from '../../validations/validations';
import {InputType, user} from '../../utils/constants';
import CustomText from '../../components/CustomText';
import {AppFonts} from '../../assets/AppFonts';
import PrimaryButton from '../../components/PrimaryButton';
import {FormikValues} from '../../../node_modules/formik/dist/types.d';
import {LOGIN_FAIL, LOGIN_SUCCESS} from '../../utils/actionTypes';
import Message from '../../components/Message';

type LoginProps = {};

const Login: React.FC<LoginProps> = ({}) => {
  const [error, setError] = useState(false);
  const emailRef = useRef<TextInputProps | any>();
  const passwordRef = useRef<TextInputProps | any>();
  const dispatch = useDispatch();

  const handleSignin = async (values: FormikValues) => {
    setError(false);
    if (values.email === user.email && values.password === user.password) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: values,
      });
    } else {
      setError(true);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  return (
    <>
      <SafeAreaView style={globalStyles.safeAreaContainer} />
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={globalStyles.container}
          contentContainerStyle={[
            globalStyles.scrollContainer,
            {
              paddingHorizontal: theme.spacing.l,
              backgroundColor: theme.colors.gray50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: theme.spacing.l,
            },
          ]}
          keyboardShouldPersistTaps={'always'}>
          <Formik
            validationSchema={signInSchema}
            initialValues={{
              email: '',
              password: '',
            }}
            enableReinitialize
            onSubmit={handleSignin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              values,
              isSubmitting,
            }) => (
              <CustomView
                backgroundColor={'globalWhite'}
                paddingHorizontal={'m'}
                paddingVertical={'xl'}
                elevation={1}
                borderRadius={'m'}>
                <CustomView rowGap={'xs'}>
                  <CustomText
                    fontSize={16}
                    lineHeight={36}
                    fontFamily={AppFonts.MulishBold}
                    color={'globalBlack'}
                    textAlign={'center'}>
                    Login to your account
                  </CustomText>
                  <CustomTextInput
                    inputProps={{
                      ref: emailRef,
                      placeholder: 'jason@gmail.com',
                      keyboardType: 'email-address',
                      textContentType: 'emailAddress',
                      autoCapitalize: 'none',
                      returnKeyType: 'next',
                      blurOnSubmit: false,
                      labelText: 'Email',

                      onSubmitEditing: () => passwordRef?.current?.focus(),
                      value: values.email,
                      onChangeText: handleChange('email'),
                      onBlur: handleBlur('email'),
                      error:
                        errors.email && touched.email ? errors.email : null,
                    }}
                    textBoxStyle={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: theme.colors.globalWhite,
                      borderRadius: theme.borderRadii.xs,
                    }}
                  />
                  <CustomTextInput
                    inputProps={{
                      ref: passwordRef,
                      placeholder: '******',
                      textContentType: 'password',
                      autoCapitalize: 'none',
                      returnKeyType: 'done',
                      blurOnSubmit: false,
                      labelText: 'Password',

                      onSubmitEditing: () => Keyboard.dismiss(),
                      value: values.password,
                      onChangeText: handleChange('password'),
                      onBlur: handleBlur('password'),
                      error:
                        errors.password && touched.password
                          ? errors.password
                          : null,
                    }}
                    type={InputType.WITH_ICON}
                    textBoxStyle={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: theme.colors.globalWhite,
                      borderRadius: theme.borderRadii.xs,
                    }}
                  />

                  <CustomView alignSelf="flex-end">
                    <CustomText
                      color="primary"
                      textAlign="right"
                      fontSize={12}
                      fontFamily={AppFonts.MulishRegular}>
                      Forgot Password?
                    </CustomText>
                  </CustomView>
                  <CustomView paddingTop={'xl'}>
                    <CustomView>
                      <PrimaryButton
                        onPress={handleSubmit}
                        text="Login"
                        loader={isSubmitting}
                      />
                    </CustomView>
                  </CustomView>
                </CustomView>
              </CustomView>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      {error && <Message message={'Invalid Credentials'} />}
    </>
  );
};

export default Login;
