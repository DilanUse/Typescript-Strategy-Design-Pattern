import {IShippingStrategy} from './shipping-strategy.interface';
import {Order} from '../../models/order';

export class DhlShippingStrategy implements IShippingStrategy {
    public ship(order: Order): void {
        // Todo: Implement DHL Shipping Integration

        console.log('Order is shipped with DHL');
    }
}
