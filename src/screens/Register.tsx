import { useTheme, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ToastSuccess } from '../shared/types';
import { CircleWavyCheck } from 'phosphor-react-native';

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');

    const [showError, setShowError] = useState(false);

    const { colors } = useTheme();

    const navigation = useNavigation();

    const handleNewOrderRegister = () => {
        if (!patrimony || !description) {
            setShowError(true);
            return;
        }
        setIsLoading(true);
        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                toast.show('Solicitação registrada com sucesso.', {
                    icon: <CircleWavyCheck color={colors.green[200]} />,

                    ...ToastSuccess
                });
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                Alert.alert('Falha', 'Não foi possível registrar a solicitação.');
            });
    };

    return (
        <VStack flex={1} p={6} bg='gray.600'>
            <Header title='Nova solicitação'></Header>

            <Input
                error={!patrimony}
                showError={showError}
                placeholder='Número do patrimônio'
                mt={4}
                onChangeText={setPatrimony}
            />

            <Input
                error={!description}
                showError={showError}
                placeholder='Descrição do problema'
                flex={1}
                mt={5}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
            />

            <Button
                title='Cadastrar'
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />
        </VStack>
    );
}
