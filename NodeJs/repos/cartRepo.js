exports.add = (cart, product) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].productID === product.ID) {
            cart[i].Quantity += product.Quantity;
            return;
        }
    }

    cart.push(item);
}

exports.remove = (cart, productID) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (productID === cart[i].productID) {
            cart.splice(i, 1);
            return;
        }
    }
}