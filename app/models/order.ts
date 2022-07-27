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

    public getTax(): number
    {
        const destination = this.shippingDetails?.destinationCountry?.toLowerCase();

        if(destination == "sweden")
        {
            if (destination == this.shippingDetails?.originCountry?.toLowerCase())
            {
                return this.totalPrice * 0.25;
            }

            //if (destination == ShippingDetails.OriginCountry.ToLowerInvariant())
            //{
            //    decimal totalTax = 0m;
            //    foreach (var item in LineItems)
            //    {
            //        switch (item.Key.ItemType)
            //        {
            //            case ItemType.Food:
            //                totalTax += (item.Key.Price * 0.06m) * item.Value;
            //                break;

            //            case ItemType.Literature:
            //                totalTax += (item.Key.Price * 0.08m) * item.Value;
            //                break;

            //            case ItemType.Service:
            //            case ItemType.Hardware:
            //                totalTax += (item.Key.Price * 0.25m) * item.Value;
            //                break;
            //        }
            //    }

            //    return totalTax;
            //}

            return 0;
        }

        if (destination == "us")
        {
            switch (this.shippingDetails?.destinationState?.toLowerCase())
            {
                case "la": return this.totalPrice * 0.095;
                case "ny": return this.totalPrice * 0.04;
                case "nyc": return this.totalPrice * 0.045;
                default: return 0;
            }
        }

        return 0;
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

    public constructor(amount: number, paymentProvider: PaymentProvider) {
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
