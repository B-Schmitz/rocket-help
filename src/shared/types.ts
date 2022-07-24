
import { ToastOptions } from "react-native-toast-notifications/lib/typescript/toast";

export type RequestType = 'open' | 'closed'

export type OrderProps = {
    id: string;
    patrimony: string;
    when: string
    status: RequestType
}

const ToastDefault = {
    placement: 'top',
    duration: 4000,
    animationType: 'slide-in',
} as ToastOptions;

export const ToastSuccess = {
    ...ToastDefault,
    type: 'success',
    successColor: '#00B37E',
} as ToastOptions