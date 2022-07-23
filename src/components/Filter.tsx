import { Text, Button, IButtonProps, useTheme } from 'native-base';
import { requestType } from '../shared/types';

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: requestType;
};

export function Filter({ title, isActive = false, type, ...rest }: Props) {
    const { colors } = useTheme();

    const colorType = type === 'open' ? colors.secondary[700] : colors.green[300];

    return (
        <Button
            variant={'outline'}
            color=''
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor='gray.600'
            flex={1}
            size='sm'
            {...rest}
        >
            <Text
                color={isActive ? colorType : 'gray.300'}
                fontSize='xs'
                textTransform={'uppercase'}
            >
                {title}
            </Text>
        </Button>
    );
}
