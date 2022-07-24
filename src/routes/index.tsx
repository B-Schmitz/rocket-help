import { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import SignIn from '../screens/Signin';
import { AppRoutes } from './app.routes';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Loading from '../components/Loading';

export function Routes() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
        });

        return subscriber;
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <NavigationContainer theme={DarkTheme}>
            {user ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
    );
}
