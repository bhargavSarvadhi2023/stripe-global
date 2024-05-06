"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE = void 0;
const dotenv = __importStar(require("dotenv"));
const logger_1 = require("../logger/logger");
dotenv.config();
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class STRIPE {
    addNewCustomer(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield stripe.customers.create({
                    name,
                    email,
                });
                return customer;
            }
            catch (error) {
                logger_1.logger.error('strip customer create error', error);
            }
        });
    }
    buySubscription(customerId, priceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield stripe.subscriptions.create({
                    customer: customerId,
                    items: [{ price: priceId }],
                    expand: ['latest_invoice.payment_intent'],
                });
                const status = subscription['latest_invoice']['payment_intent']['status'];
                const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];
                return { status: status, client_secret: client_secret };
            }
            catch (error) {
                logger_1.logger.error('strip buy error', error);
            }
        });
    }
    createPaymentMethod(type, card) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield stripe.paymentMethods.create({
                    type,
                    card: {
                        exp_month: card.exp_month,
                        number: card.number,
                        exp_year: card.exp_year,
                        cvc: card.cvc,
                    },
                });
                return paymentMethod;
            }
            catch (error) {
                logger_1.logger.error('strip payment method error', error);
            }
        });
    }
    createCheckoutSession(customer, price, token, currency, mode, payment_method_types) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield stripe.checkout.sessions.create({
                    mode: mode,
                    payment_method_types: payment_method_types,
                    customer,
                    line_items: [
                        {
                            price,
                            quantity: 1,
                        },
                    ],
                    currency: currency,
                    success_url: `${process.env.SUCCESS_URL}/${token}?&customerId=${customer}`,
                    cancel_url: `${process.env.CANCLE_URL}`,
                });
                return session;
            }
            catch (error) {
                logger_1.logger.error('strip checkout sessions error', error);
                return error;
            }
        });
    }
    retrievesessions(csId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield stripe.checkout.sessions.retrieve(csId);
                return session;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve sessions error', error);
            }
        });
    }
    getSubscriptionDetails(subcriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield stripe.subscriptions.retrieve(subcriptionId);
                return subscription;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve sessions error', error);
            }
        });
    }
    attachPaymentToCustomer(res, paymentMethodId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield stripe.paymentMethods.attach(paymentMethodId, {
                    customer: customerId,
                });
                return paymentMethod;
            }
            catch (error) {
                logger_1.logger.error('strip attach payment method to customer error', error);
                return error;
            }
        });
    }
    listOfPayments(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethods = yield stripe.customers.listPaymentMethods(customerId, { type: 'card' });
                return paymentMethods;
            }
            catch (error) {
                logger_1.logger.error('strip list of payment method error', error);
            }
        });
    }
    deletePaymentMethod(paymentMethodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedpaymentMethod = yield stripe.paymentMethods.detach(paymentMethodId);
                return deletedpaymentMethod;
            }
            catch (error) {
                logger_1.logger.error('strip delete payment method error', error);
            }
        });
    }
    listOfSubscription(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield stripe.subscriptions.list({
                    status: 'active',
                    customer: customerId,
                });
                return subscriptions;
            }
            catch (error) {
                logger_1.logger.error('strip list of subscription error', error);
            }
        });
    }
    addpaymentMethod(res, card) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield stripe.paymentMethods.create({
                    type: 'card',
                    card: card,
                });
                return paymentMethod;
            }
            catch (error) {
                logger_1.logger.error('strip add payment method error', error);
                return error;
            }
        });
    }
    updateSubscription(subcriptionId, paymentMethodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield stripe.subscriptions.update(subcriptionId, {
                    default_payment_method: paymentMethodId,
                });
                return subscription;
            }
            catch (error) {
                logger_1.logger.error('strip update subscription error', error);
            }
        });
    }
    retrievePaymentMethod(methodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethod = yield stripe.paymentMethods.retrieve(methodId);
                return paymentMethod;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve payment method error', error);
            }
        });
    }
    getInvoices(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield stripe.invoices.list({
                    customer,
                });
                return invoices;
            }
            catch (error) {
                logger_1.logger.error('strip get invoices error', error);
            }
        });
    }
    getUserCards(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentMethods = yield stripe.customers.listPaymentMethods(customerId, { type: 'card' });
                let cards;
                if (paymentMethods) {
                    cards = paymentMethods.data.reduce((acc, element) => {
                        element.id;
                        acc.push({ id: element.id, card: element.card });
                        return acc;
                    }, []);
                }
                return cards;
            }
            catch (error) {
                logger_1.logger.error("strip get user's card error", error);
                return error;
            }
        });
    }
    retrieveProduct(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield stripe.products.retrieve(planId);
                return product;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve product error', error);
            }
        });
    }
    retrievePrice(priceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const price = yield stripe.prices.retrieve(priceId);
                return price;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve price error', error);
            }
        });
    }
    retrieveCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield stripe.customers.retrieve(customerId);
                return customer;
            }
            catch (error) {
                logger_1.logger.error('strip retrieve customer error', error);
            }
        });
    }
    cancelAtPeriodEnd(subcriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield stripe.subscriptions.update(subcriptionId, {
                    cancel_at_period_end: true,
                });
                return subscription;
            }
            catch (error) {
                logger_1.logger.error('strip cancle at period end error', error);
            }
        });
    }
    listOfProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield stripe.products.list({ active: true });
                return products;
            }
            catch (error) {
                logger_1.logger.error('strip  list of product error', error);
            }
        });
    }
    listOfPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prices = yield stripe.prices.list({
                    active: true,
                    type: 'recurring',
                });
                return prices;
            }
            catch (error) {
                logger_1.logger.error('strip  list of price error', error);
            }
        });
    }
    product_details(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield stripe.products.retrieve(product_id);
                return product;
            }
            catch (error) {
                logger_1.logger.error('strip product details error', error);
            }
        });
    }
    create_product(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield stripe.products.create({
                    name: name,
                });
                return product;
            }
            catch (error) {
                logger_1.logger.error('strip product details error', error);
            }
        });
    }
    update_product(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield stripe.products.update(id, {
                    name: name,
                });
                console.log(product);
                return product;
            }
            catch (error) {
                logger_1.logger.error('strip product details update error', error);
            }
        });
    }
    create_price(currency, unit_amount, recurring, product_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const price = yield stripe.prices.create({
                    currency: currency,
                    unit_amount: unit_amount,
                    recurring: {
                        interval: recurring,
                    },
                    product_data: {
                        name: product_name,
                    },
                });
                return price;
            }
            catch (error) {
                logger_1.logger.error('strip product price details error', error);
            }
        });
    }
    update_price(id, unit_amount, name, currency, interval) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const price = yield stripe.prices.create({
                    currency: currency,
                    unit_amount: unit_amount,
                    recurring: {
                        interval: interval,
                    },
                    product_data: {
                        name: name,
                    },
                });
                return price;
            }
            catch (error) {
                logger_1.logger.error('strip product price details update  error', error);
            }
        });
    }
}
exports.STRIPE = STRIPE;
