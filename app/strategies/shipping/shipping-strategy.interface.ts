import {Order} from '../../models/order';

export interface IShippingStrategy {
    ship(order: Order) : void;
}
