import {ISalesTaxStrategy} from './sales-tax-strategy.interface';
import {ItemType, Order} from '../../models/order';

export class SwedenSalesTaxStrategy implements ISalesTaxStrategy {
    getTaxFor(order: Order): number {
        let totalTax = 0;

        for (const lineItem of order.lineItems) {
            switch (lineItem[0].itemType) {
                case ItemType.Food:
                    totalTax += (lineItem[0].price * 0.06) * lineItem[1];
                    break;

                case ItemType.Literature:
                    totalTax += (lineItem[0].price * 0.08) * lineItem[1];
                    break;

                case ItemType.Service:
                case ItemType.Hardware:
                    totalTax += (lineItem[0].price * 0.25) * lineItem[1];
                    break;
            }
        }

        return totalTax;
    }
}
