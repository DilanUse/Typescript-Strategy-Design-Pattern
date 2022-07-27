const {EOL} = require('os');
import {IInvoiceStrategy} from './invoice-strategy.interface';
import {Order} from '../../models/order';

export abstract class InvoiceStrategy implements IInvoiceStrategy {
    public abstract generate(order: Order): void;


    public generateTextInvoice(order: Order): string {
        let invoice = `INVOICE DATE: ${new Date().toUTCString()}\n`;

        invoice += 'ID|NAME|PRICE|QUANTITY\n';

        for (const item of order.lineItems)
        {
            invoice += `${item[0].id}|${item[0].name}|${item[0].price}|${item[1]}\n`;
        }

        invoice += '\n\n';

        const tax = order.getTax();
        const total = order.totalPrice + tax;

        invoice += `TAX TOTAL: ${tax}\n`;
        invoice += `TOTAL: ${total}\n`;

        return invoice;
    }
}
