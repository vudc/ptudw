exports.add = (cart, CartItem) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].productID === CartItem.productID) {
            cart[i].quantity += CartItem.quantity;
            return;
        }
    }
    cart.push(CartItem);
}

exports.remove = (cart, productID) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (productID === cart[i].productID) {
            cart.splice(i, 1);
            return;
        }
    }
}