$(document).ready(function () {
    $(window).scroll(function () {

        /* Check the location of each desired element */
        $('.hideme').each(function (i) {

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > bottom_of_object - 200) {

                $(this).animate({ 'opacity': '1' }, 500);

            }

        });

    });
    var quantitiy = 0;
    $('.quantity-right-plus').click(function (e) {

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

        $('#quantity').val(quantity + 1);


        // Increment

    });

    $('.quantity-left-minus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

        // Increment
        if (quantity > 1) {
            $('#quantity').val(quantity - 1);
        }
    });

});
$(function () {
    $('#addcart').click(function () {
        var ipvalue = $("#quantity").val();
        this.href = this.href.replace("xxx", ipvalue);
    });
});
$(document).ready(function ($) {
    $('#btnPayment').on('click',function(){
        $('#payCart').submit();
    });
    setTimeout(function () {
        $('.trans--grow').addClass('hr-grow');
    }, 500);
});

function addCart(productID){
    $('#addCartItem').val(productID);
    $('#formAddCart').submit();
}
$('#txtDoB').datepicker({
    container: '#xDoBContainer',
    format: 'd/m/yyyy',
    autoclose: true
});