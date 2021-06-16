import { Animated } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'

export const AnimatedIcon = Animated.createAnimatedComponent( AwesomeIcon )

const aniVal = new Animated.Value(0);


export const arrowAnimation = {
    transform:[
        {
            translateX: aniVal.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 5]
            })
        }
    ]
}


export const inputAnimationWidth = aniVal.interpolate({
    inputRange: [0, 1],
    outputRange: [ "100%", "90%" ]
}) ;

export const inputAnimation = {
    transform:[{
        translateX: aniVal.interpolate({
            inputRange: [0, 1],
            outputRange: [0,0]
        })
    }]
}

export const animatedTransition = Animated.spring( aniVal, {
    toValue: 1,
    useNativeDriver: false
} )

export const animatedTransitionReset = Animated.spring( aniVal, {
    toValue: 0,
    useNativeDriver: false
} )