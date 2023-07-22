const Product = require('../schemas/products');

const stripe = require('stripe')('sk_test_51NWMUuE4Ic1YAnIMm2uLvS8YccGKFGnSTqTmooBLEDkwLyKM28Gwdt79pcma7HQPociXbOjRZEQKWto332u0Y7uC00STgRjnN3');

const checkoutSessoin = async (req, res) => {
    const orderItems = req.body;

    if (!orderItems) {
        return res.status(400).send('checkout session cannot be created - check the order items');
    }

    const lineItems = await Promise.all(
        orderItems.map(async (orderItem) => {
            const product = await Product.findById(orderItem.product);
            return {
                price_data: {
                    currency: 'BDT',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100
                },
                quantity: orderItem.quantity
            };
        })
    );
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancel_url: 'http://localhost:4200/error'
    })
    res.json({ id: session.id });
}

module.exports = checkoutSessoin;