import { useNavigation, useRoute } from '@react-navigation/native';
import { HStack, useTheme, VStack, Text, ScrollView, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { OrderProps, ToastSuccess } from '../shared/types';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoneDTO } from '../DTOs/OrderFirestoneDTO';
import { dateFormat } from '../utils/firestoreDateFormats';
import Loading from '../components/Loading';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

type RouteParams = {
    orderId: string;
};

type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;
};

export function Details() {
    const [solution, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
    const route = useRoute();
    const { orderId } = route.params as RouteParams;

    const [showError, setShowError] = useState(false);

    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleOrderClose = () => {
        if (!solution) {
            setShowError(true);
            return;
        }

        firestore()
            .collection<OrderFirestoneDTO>('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                toast.show('Solicitação encerrada com sucesso.', {
                    icon: <CircleWavyCheck color={colors.green[200]} />,

                    ...ToastSuccess
                });
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Erro', 'Não foi possível encerrar a solicitação.');
            });
    };

    useEffect(() => {
        firestore()
            .collection<OrderFirestoneDTO>('orders')
            .doc(orderId)
            .get()
            .then(doc => {
                const { patrimony, description, status, created_at, closed_at, solution } =
                    doc.data();

                const closed = closed_at ? dateFormat(closed_at) : null;

                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed
                });

                setIsLoading(false);
            });
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <VStack flex={1} bg='gray.700'>
            <Box bg='gray.600' px={6}>
                <Header title='Solicitação' />
            </Box>
            <HStack bg='gray.500' justifyContent='center' p={4}>
                {order.status === 'closed' ? (
                    <CircleWavyCheck size={22} color={colors.green[300]} />
                ) : (
                    <Hourglass size={22} color={colors.secondary[700]} />
                )}
                <Text
                    fontSize='sm'
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform='uppercase'
                >
                    {order.status === 'closed' ? 'finalizado' : 'em andamento'}
                </Text>
            </HStack>

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title={'Equipamento'}
                    description={`Patrimônio ${order.patrimony}`}
                    icon={DesktopTower}
                ></CardDetails>
                <CardDetails
                    title={'Descrição do problema'}
                    description={order.description}
                    icon={ClipboardText}
                    iconColor={'white'}
                    footer={`Registrado em ${order.when}`}
                ></CardDetails>
                <CardDetails
                    title={'Solução'}
                    description={order.solution}
                    icon={CircleWavyCheck}
                    iconColor={colors.green[300]}
                    footer={order.closed && `Encerado em ${order.closed}`}
                >
                    {order.status === 'open' && (
                        <Input
                            error={!solution}
                            showError={showError}
                            placeholder='Descrição da solução...'
                            onChangeText={setSolution}
                            h={24}
                            textAlignVertical='top'
                            multiline
                        />
                    )}
                </CardDetails>
            </ScrollView>
            {order.status === 'open' && (
                <Button title='Encerrar solicitação' onPress={handleOrderClose} m={5} />
            )}
        </VStack>
    );
}
