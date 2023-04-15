const product = require('./products');
const asyncHandler = require('express-async-handler');

const products = (app) => {
    app.get('/api/products', asyncHandler(product.getProduct));
    app.get('/api/products/:id', asyncHandler(product.getProductById));
    app.post('/api/products', product.uploadOption, asyncHandler(product.products));
    app.put('/api/products/gallery-images/:id', product.uploadGalleryImage, asyncHandler(product.updateGalleryImage));
    app.put('/api/products/:id', product.uploadOption, asyncHandler(product.updatedProductById));
    app.delete('/api/products/:id', asyncHandler(product.deleteProductById));
    app.get('/api/products/get/count', asyncHandler(product.getProductCounts));
    app.get('/api/products/get/featured/:count', asyncHandler(product.getProductFeaturedCount));
};

module.exports = products;