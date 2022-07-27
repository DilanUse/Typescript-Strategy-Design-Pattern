import {SentMessageInfo} from 'nodemailer';

const nodemailer = require("nodemailer");
import {Order} from '../../models/order';
import {InvoiceStrategy} from './invoice-strategy';

export class EmailInvoiceStrategy extends InvoiceStrategy {
    public override generate(order: Order): void {
        const body =  this.generateTextInvoice(order);

        // Implementation to send invoice by email, for example with sendgrid
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "56874d0e68a9e6",
                pass: "c53a993d3ac643"
            }
        });

        // send mail with defined transport object
        transport.sendMail({
            from: '"Dilan Foo 👻" <dilan_8-10@hotmail.com>', // sender address
            to: "dilan8810@gmail.com", // list of receivers
            subject: "We've created an invoice for your order", // Subject line
            text: body, // plain text body
        }).then((info: SentMessageInfo) => {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }
}
