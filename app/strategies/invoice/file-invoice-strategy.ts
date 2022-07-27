import {writeFileSync} from 'fs';
import {InvoiceStrategy} from './invoice-strategy';
import {Order} from '../../models/order';

export class FileInvoiceStrategy extends InvoiceStrategy {
    public override generate(order: Order): void {
        const data = this.generateTextInvoice(order);

        writeFileSync(`invoice_${Date.now()}.txt`, data, {
            encoding: 'utf-8',
        });
    }
}
