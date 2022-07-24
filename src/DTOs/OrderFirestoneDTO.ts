import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { requestType } from "../shared/types";

export type OrderFirestoneDTO = {
    patrimony: string;
    description: string;
    status: requestType;
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp
    closed_at?: FirebaseFirestoreTypes.Timestamp
}