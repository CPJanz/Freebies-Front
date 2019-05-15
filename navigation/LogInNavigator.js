// Creates Login stack to be used by the AppNavigator.js
import { createStackNavigator } from 'react-navigation';

import LogInScreen from '../screens/LogInScreen';

const LogInStack = createStackNavigator({
    LogIn: {
      screen: LogInScreen,
      navigationOptions: {
        header: null
      }
    },
  });

  export default LogInStack;