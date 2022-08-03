import {IShippingStrategy} from './shipping-strategy.interface';
import {Order} from '../../models/order';

export class SwedishPostalServiceStrategy implements IShippingStrategy {
    public ship(order: Order): void {
        // Todo: Implement USPS Shipping Integration

        console.log('Order is shipped with USPS');
    }
}
