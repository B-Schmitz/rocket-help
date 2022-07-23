import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, IconButton, Text, useTheme, VStack, Center } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order } from '../components/Order';
import { OrderProps, requestType } from '../shared/types';

export function Home() {
    const { colors } = useTheme();

    const [statusSelected, setStatusSelected] = useState<requestType>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '123456',
            when: '10/03 às 10:00',
            status: 'open'
        }
    ]);

    const navigation = useNavigation();

    const onPressFilterOpen = () => {
        setStatusSelected('open');
    };

    const onPressFilterClosed = () => {
        setStatusSelected('closed');
    };

    const handleOpenDetails = (orderId: string) => {
        navigation.navigate('details', { orderId });
    };

    const renderListEmptyComponent = () => {
        return (
            <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                    Você ainda não possui{'\n'} solicitações{' '}
                    {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
            </Center>
        );
    };

    const handleNewOrder = () => {
        navigation.navigate('new');
    };

    return (
        <VStack flex={1} pb={6} bg='gray.700'>
            <HStack
                w='full'
                justifyContent='space-between'
                alignItems='center'
                bg='gray.600'
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />

                <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>Solicitações</Heading>
                    <Text color='gray.200'>3 </Text>
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        title='Em andamento'
                        type='open'
                        onPress={onPressFilterOpen}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        title='Finalizados'
                        type='closed'
                        onPress={onPressFilterClosed}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Order data={item} onPress={() => handleOpenDetails(item.id)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={renderListEmptyComponent}
                />
                <Button title='Nova solicitação' onPress={handleNewOrder} />
            </VStack>
        </VStack>
    );
}
