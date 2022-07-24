import { Input as NativeBaseInput, IInputProps, useTheme } from 'native-base';

type Props = IInputProps & {
    error?: boolean;
    showError?: boolean;
};

export function Input({ error, showError, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <NativeBaseInput
            bg='gray.700'
            h={14}
            size='md'
            borderWidth={error && showError ? 1 : 0}
            borderColor={error && showError ? colors.red[500] : 'none'}
            fontSize='md'
            fontFamily='body'
            color='white'
            placeholderTextColor='gray.300'
            _focus={{
                borderWidth: 1,
                borderColor: error && showError ? colors.red[500] : 'green.500',
                bg: 'gray.700'
            }}
            {...rest}
        ></NativeBaseInput>
    );
}
