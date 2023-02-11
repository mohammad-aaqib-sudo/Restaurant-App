import {Pressable, PressableProps} from 'react-native';

import {createBox} from '@shopify/restyle';

import {Theme} from '../assets/theme';

const CustomPressable = createBox<Theme, PressableProps>(Pressable);

export default CustomPressable;
