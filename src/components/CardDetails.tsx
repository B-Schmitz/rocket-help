import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    iconColor?: string;
    children?: ReactNode;
};

export function CardDetails({
    title,
    description,
    footer = null,
    icon: Icon,
    iconColor,
    children
}: Props) {
    const { colors } = useTheme();

    return (
        <VStack bg='gray.600' p={5} mt={5} rounded='sm'>
            <HStack alignItems='center' mb={4}>
                <Icon color={iconColor ? iconColor : colors.primary[700]} />
                <Text ml={2} color='gray.300' fontSize='sm' textTransform='uppercase'>
                    {title}
                </Text>
            </HStack>
            {description ? (
                <Text color='gray.100' fontSize='md'>
                    {description}
                </Text>
            ) : null}
            {children}

            {footer ? (
                <Box borderTopWidth={1} borderTopColor='gray.400' mt={3}>
                    <Text mt={3} color='gray.300' fontSize='sm'>
                        {footer}
                    </Text>
                </Box>
            ) : null}
        </VStack>
    );
}
