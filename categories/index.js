const category = require('./category');
const asyncHandler = require('express-async-handler');
const product = require("../products/products");

const categories = (app) => {
    app.get('/api/v1/categories', asyncHandler(category.getCategory));
    app.post('/api/v1/categories', asyncHandler(category.categories));
    app.delete('/api/v1/categories/:id', asyncHandler(category.remove));
    app.get('/api/v1/categories/:id', asyncHandler(category.getCategoriesId));
    app.put('/api/v1/categories/:id', asyncHandler(category.putCategories));
    app.get('/api/v1/categories/featured/:count', asyncHandler(category.getCategoryFeaturedCount));
}

module.exports = categories;