import {Item, ItemType, Order, Payment, PaymentProvider} from './models/order';
import {SwedenSalesTaxStrategy} from './strategies/sale-tax/sweden-sales-tax-strategy';
import {UsSalesTaxStrategy} from './strategies/sale-tax/us-sales-tax-strategy';
import {FileInvoiceStrategy} from './strategies/invoice/file-invoice-strategy';
import {EmailInvoiceStrategy} from './strategies/invoice/email-invoice-strategy';

const order = new Order();
order.shippingDetails = {
    originCountry: "Sweden",
    destinationCountry: "Sweden"
};
order.salesTaxStrategy = new SwedenSalesTaxStrategy();

order.lineItems.push([
    new Item(
        "CSHARP_SMORGASBORD",
        "C# Smorgasbord",
        100,
        ItemType.Literature),
    1,
]);

order.selectedPayments.push(new Payment(
    PaymentProvider.Invoice,
))

console.log(order.getTax());

// order.invoiceStrategy = new FileInvoiceStrategy();
order.invoiceStrategy = new EmailInvoiceStrategy();
order.finalizeOrder();
