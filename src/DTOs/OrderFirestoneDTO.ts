import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { RequestType } from "../shared/types";

export type OrderFirestoneDTO = {
    patrimony: string;
    description: string;
    status: RequestType;
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp
    closed_at?: FirebaseFirestoreTypes.Timestamp
}