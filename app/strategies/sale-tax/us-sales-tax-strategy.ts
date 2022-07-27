import {ISalesTaxStrategy} from './sales-tax-strategy.interface';
import {Order} from '../../models/order';

export class UsSalesTaxStrategy implements ISalesTaxStrategy {
    getTaxFor(order: Order): number {
        switch (order.shippingDetails?.destinationState?.toLowerCase())
        {
            case "la": return order.totalPrice * 0.095;
            case "ny": return order.totalPrice * 0.04;
            case "nyc": return order.totalPrice * 0.045;
            default: return 0;
        }
    }

}
