import {Order} from '../../models/order';

export interface IInvoiceStrategy {
    generate(order: Order): void;
}
