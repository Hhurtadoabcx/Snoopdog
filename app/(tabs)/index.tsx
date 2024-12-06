import * as React from 'react';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import PetApp from '../../components/PetApp';


const App = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <PetApp/>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default App;