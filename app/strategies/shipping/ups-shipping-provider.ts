import {IShippingStrategy} from './shipping-strategy.interface';
import {Order} from '../../models/order';

export class UpsShippingProvider implements IShippingStrategy {
    public ship(order: Order): void {
        // Todo: Implement UPS Shipping Integration

        console.log('Order is shipped with UPS');
    }
}
