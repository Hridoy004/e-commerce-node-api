const Order = require('../schemas/order');
const OrderItems = require('../schemas/orderItem');

const getOrder = async (req, res) => {
    const orderList = await Order.find()
        .populate('user', 'Email')
        .sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
}

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'Email')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        });

    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order);
}

const Orders = async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItems({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItems.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if (!order)
        return res.status(400).send('the order cannot be created!')

    res.send(order);
}


const updateOrderById = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be update!')

    res.send(order);
}


const deleteOrderById = (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItems.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({ success: true, message: 'the order is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}

const getTotalSales = async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales || totalSales.length === 0) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({ totalsales: totalSales[0].totalsales })
}

const getOrderCount = async (req, res) => {
    try {
        const orderCount = await Order.countDocuments({})

        if (!orderCount) {
            return res.status(500).json({ success: false })
        }

        res.send({ orderCount })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false })
    }
}

const userOderByUserId = async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid }).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    }).sort({ 'dateOrdered': -1 });

    if (!userOrderList) {
        res.status(500).json({ success: false })
    }
    res.send(userOrderList);
}


module.exports = {
    getOrder: getOrder,
    Orders: Orders,
    getOrderById: getOrderById,
    updateOrderById: updateOrderById,
    deleteOrderById: deleteOrderById,
    getTotalSales: getTotalSales,
    getOrderCount: getOrderCount,
    userOderByUserId: userOderByUserId,
}