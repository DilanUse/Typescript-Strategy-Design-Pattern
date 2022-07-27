import {Order} from '../../models/order';

export interface ISalesTaxStrategy {
    getTaxFor(order: Order): number;
}
