import {Item, ItemType, Order} from './models/order';
import {SwedenSalesTaxStrategy} from './strategies/sale-tax/sweden-sales-tax-strategy';
import {UsSalesTaxStrategy} from './strategies/sale-tax/us-sales-tax-strategy';

const order = new Order();
order.shippingDetails = {
    originCountry: "Sweden",
    destinationCountry: "Sweden"
};

order.lineItems.push([
    new Item(
        "CSHARP_SMORGASBORD",
        "C# Smorgasbord",
        100,
        ItemType.Literature),
    1,
]);
order.lineItems.push([
    new Item(
        "CONSULTING",
        "Building a website",
        100,
        ItemType.Service),
    1,
]);

const destination = order.shippingDetails?.destinationCountry?.toLowerCase();

if (destination === 'sweden') {
    order.salesTaxStrategy = new SwedenSalesTaxStrategy();
} else if (destination === 'us') {
    order.salesTaxStrategy = new UsSalesTaxStrategy();
}

console.log(order.getTax());
