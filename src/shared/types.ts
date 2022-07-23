export type requestType = 'open' | 'closed'

export type OrderProps = {
    id: string;
    patrimony: string;
    when: string
    status: requestType
}