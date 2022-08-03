import {ISalesTaxStrategy} from '../strategies/sale-tax/sales-tax-strategy.interface';
import {IInvoiceStrategy} from '../strategies/invoice/invoice-strategy.interface';
import {IShippingStrategy} from '../strategies/shipping/shipping-strategy.interface';

export class Order
{
    public readonly lineItems: [Item, number][] = [];

    public readonly selectedPayments = new Array<Payment>();

    public readonly finalizedPayments = new Array<Payment>();

    public get amountDue(): number {
        return this.totalPrice - this.finalizedPayments.reduce((total, payment) => total + payment.amount, 0);
    }

    public get totalPrice(): number {
        return this.lineItems.reduce((total, line) => total + (line[0].price * line[1]), 0);
    }

    public shippingStatus: ShippingStatus = ShippingStatus.WaitingForPayment;

    public shippingDetails?: ShippingDetails;

    public salesTaxStrategy?: ISalesTaxStrategy;

    public invoiceStrategy?: IInvoiceStrategy;

    public shippingStrategy?: IShippingStrategy;

    public getTax(salesTaxStrategy?: ISalesTaxStrategy): number
    {
        const strategy = salesTaxStrategy ?? this.salesTaxStrategy;

        return strategy?.getTaxFor(this) ?? 0;
    }

    public finalizeOrder(): void {
        if (this.selectedPayments.some((payment) => payment.paymentProvider === PaymentProvider.Invoice)
            && this.amountDue > 0
            && this.shippingStatus === ShippingStatus.WaitingForPayment
        ) {
            this.invoiceStrategy?.generate(this);
            this.shippingStatus = ShippingStatus.ReadyForShippment;
        } else if (this.amountDue > 0) {
            throw new Error('Unable to finalize order');
        }

        this.shippingStrategy?.ship(this);
    }
}

export class ShippingDetails
{
    public receiver?: string;

    public addressLine1?: string;
    public addressLine2?: string;

    public postalCode?: string;

    public destinationCountry?: string;
    public destinationState?: string;

    public originCountry?: string;
    public originState?: string;
}

export enum ShippingStatus
{
    WaitingForPayment,
    ReadyForShippment,
    Shipped
}

export enum PaymentProvider
{
    Paypal,
    CreditCard,
    Invoice
}

export class Payment
{
    public amount: number;
    public paymentProvider: PaymentProvider;

    public constructor(paymentProvider: PaymentProvider, amount: number = 0) {
        this.amount = amount;
        this.paymentProvider = paymentProvider;
    }
}

export class Item
{
    public readonly id: string;
    public readonly name: string;
    public readonly price: number;
    public itemType: ItemType;

    public constructor(id: string, name: string, price: number, type: ItemType)
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.itemType = type;
    }

    public getTax(): number
    {
        switch (this.itemType)
        {
            case ItemType.Service:
            case ItemType.Food:
            case ItemType.Hardware:
            case ItemType.Literature:
            default:
                return 0;
        }
    }
}

export enum ItemType
{
    Service,
    Food,
    Hardware,
    Literature
}
