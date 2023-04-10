const order = require('./orders');
const asyncHandler = require('express-async-handler');

const orders = (app) => {
    app.get('/api/order', asyncHandler(order.getOrder));
    app.get('/api/order/:id', asyncHandler(order.getOrderById));
    app.get('/api/order/total/sales', asyncHandler(order.getTotalSales));
    app.get('/api/order/get/count', asyncHandler(order.getOrderCount));
    app.get('/api/order/userorders/:userid', asyncHandler(order.userOderByUserId));
    app.post('/api/order', asyncHandler(order.Orders));
    app.put('/api/order/:id', asyncHandler(order.updateOrderById));
    app.delete('/api/order/:id', asyncHandler(order.deleteOrderById));
};

module.exports = orders;