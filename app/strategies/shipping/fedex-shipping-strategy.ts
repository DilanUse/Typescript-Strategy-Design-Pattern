import {IShippingStrategy} from './shipping-strategy.interface';
import {Order} from '../../models/order';

export class FedexShippingStrategy implements IShippingStrategy {
    public ship(order: Order): void {
        // Todo: Implement Fedex Shipping Integration

        console.log('Order is shipped with Fedex');
    }
}
