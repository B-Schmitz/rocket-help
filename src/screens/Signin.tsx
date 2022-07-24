import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import Logo from '../assets/logo_primary.svg';
import { Envelope, Key } from 'phosphor-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

export default function SignIn() {
    const { colors } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = () => {
        if (!email || !password) {
            return Alert.alert('Atenção,', 'E-mail, ou senha não podem ser vazios.');
        }
        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
                setIsLoading(false);

                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    return Alert.alert('Atenção', 'E-mail ou senha inválida.');
                }

                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Atenção', 'E-mail não cadastrado.');
                }

                return Alert.alert('Falha', 'Não foi possível acessar');
            });
    };

    return (
        <VStack flex={1} alignItems={'center'} bg='gray.600' px={8} pt={24}>
            <Logo />
            <Heading color={'gray.100'} fontSize='xl' mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                mb={5}
                placeholder='E-mail'
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />
            <Input
                mb={8}
                onChangeText={setPassword}
                secureTextEntry
                placeholder='Senha'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
            />

            <Button title='Entrar' w={'full'} onPress={handleSignIn} isLoading={isLoading} />
        </VStack>
    );
}
