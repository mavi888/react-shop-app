const { User } = require("../models/User");
const productController = require('../controllers/productController')

addProductToCart = async (userId, productId) => {

    const userInfo = await User.findOne({ _id: userId });

    let duplicate = false;
    
    userInfo.cart.forEach((item) => {
        if (item.id == productId) {
            duplicate = true;
        }
    })
    
    if (duplicate) {
        const userUpdated = await User.findOneAndUpdate(
                { _id: userId, "cart.id": productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true })
                
        return userUpdated;

    } else {
        const userUpdated = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        cart: {
                            id: productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true })

        return userUpdated;
    }
}

removeFromCart = async (userId, itemIdToRemove) => {
    const userUpdated = await User.findOneAndUpdate(
        { _id: userId },
        {
            "$pull":
                { "cart": { "id": itemIdToRemove } }
        },
        { new: true })

    let cart = userUpdated.cart;

    let array = cart.map(item => {
        return item.id
    })

    const cartDetail = await productController.findProductById(array);

    const r = {
        cartDetail, 
        cart
    }
    return r;
}

getCartInfo = async (userId) => {
    const userInfo = await User.findOne({ _id: userId });

    let cart = userInfo.cart;
    let array = cart.map(item => {
        return item.id
    })

    const cartDetail = await productController.findProductById(array);

    const r = {
        cartDetail, 
        cart
    }
    return r;
}

buyAnItem = async () => {

}

getHistory = async(userId) => {
    const user = await User.findOne({ _id: userId });

    const history = user.history;
    return history;
}

module.exports = {
    addProductToCart,
    removeFromCart,
    getCartInfo,
    buyAnItem,
    getHistory,
}
