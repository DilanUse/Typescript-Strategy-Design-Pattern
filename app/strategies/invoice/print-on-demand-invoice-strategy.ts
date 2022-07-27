import axios from 'axios';
import {InvoiceStrategy} from './invoice-strategy';
import {Order} from '../../models/order';

export class PrintOnDemandInvoiceStrategy extends InvoiceStrategy {
    public override generate(order: Order): void {
        axios.post('http://localhost:8080/print-on-demand', order).then(() => {
            console.log('Printed invoice!');
        });
    }
}
