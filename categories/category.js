const category = require('../schemas/category');

const getCategory = async (req, res) => {
    const categoryList = await category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
}

const getCategoriesId = async (req, res) => {
    const categoryItem = await category.findById(req.params.id);

    if (!categoryItem) {
        res.status(500).json({
            Message: 'The category with the given ID was not found.'
        })
    }
    res.status(200).send(categoryItem);
}

const categories = async (req, res) => {

    let categoryList = new category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    categoryList = await categoryList.save();

    if (!categoryList)
        return res.status(404).send('The category cannot be created!');
    res.status(200).send(categoryList);

}

const putCategories = async (req, res) => {
    const categories = await category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {
            new: true
        }
    )

    if (!categories)
        return res.status(400).send('The category cannot be created');
    res.send(categories);
}

const remove = async (req, res) => {
    category.findByIdAndRemove(req.params.id).then(categories => {
        let response = {
            Message: 'The category is deleted!',
            Success: true
        }
        if (categories) {
            return res.status(200).json(response);
        } else {

            let response = {
                Message: 'Category not found!',
                Success: false
            }
            return res.status(404).json(response);
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
}

module.exports = {
    getCategory: getCategory,
    categories: categories,
    remove: remove,
    getCategoriesId: getCategoriesId,
    putCategories: putCategories
}