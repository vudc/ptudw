var cart = {
    init: function () {
        cart.regEvents();
    },
    regEvents: function () {
        $('#btnContinue').off('click').on('click', function () {
            window.location.href = "/";
        });
        $('#btnPayment').off('click').on('click', function () {
            window.location.href = "/thanh-toan";
        });
        $('#btnUpdateCart').off('click').on('click', function () {
            window.location.href = "/";
            var listProduct = $('.itemQuantity');
            var listCart = [];
            $.each(listProduct, function (i, item) {
                listCart.push({
                    Quanity: $(item).val(),
                    ID: $(item).data('id')
                });
            });

            $.ajax({
                url: '/Cart/Update',
                data: { cartModel: JSON.stringify(listCart) },
                dataType: 'json',
                type: 'POST',
                success: function (result) {
                    if (result.status == true) {
                        window.location.href = '/gio-hang';
                    }
                }
            });
        });

        $('#btnDeleteCart').off('click').on('click', function () {
            $.ajax({
                url: '/Cart/DeleteAll',
                dataType: 'json',
                type: 'POST',
                success: function (result) {
                    if (result.status == true) {
                        window.location.href = '/gio-hang';
                    }
                }
            });
        });
        $('.btnDelete').off('click').on('click', function () {
            $.ajax({
                data: { id: $(this).data('id') },
                url: '/Cart/DeleteItem',
                dataType: 'json',
                type: 'POST',
                success: function (result) {
                    if (result.status == true) {
                        window.location.href = '/gio-hang';
                    }
                }
            });
        });
    }
}
cart.init();