import { SortByValues, OrderType } from '.';

export interface FindByFilterRequest {
    filters: {
        title?: string,
        genre?: string,
        year?: number
    },
    sortBy?: SortByValues,
    orderType?: OrderType
}