import {ISalesTaxStrategy} from './sales-tax-strategy.interface';
import {Order} from '../../models/order';

export class SwedenSalesTaxStrategy implements ISalesTaxStrategy {
    getTaxFor(order: Order): number {
        const destination = order.shippingDetails?.destinationCountry?.toLowerCase();
        const origin = order.shippingDetails?.originCountry?.toLowerCase();

        if (destination == origin) {
            return order.totalPrice * 0.25;
        }

        return 0;
    }
}
