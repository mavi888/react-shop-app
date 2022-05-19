const { Product } = require("../models/Product");

addProduct = async (productData) => {
    const product = new Product(productData);
    return product.save();
}

findProductsWithQuery = async (order, sortBy, limit, skip, findArgs, term) => {
    if (term) {
        return Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec() 
    } else {
        return Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec()
    }
}

findProductById = async (productIds) => {
    return Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec()
}

updateProductQuantity = async (productId, quantity) => {
    await Product.updateOne({ _id: productId }, 
        {
            $inc: {
                "sold": quantity
            }
        },
        { new: false })
}

module.exports = {
    addProduct,
    findProductsWithQuery,
    findProductById,
    updateProductQuantity
}