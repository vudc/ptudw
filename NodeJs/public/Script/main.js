
$(document).ready(function () {
    $('.my-datatable').DataTable({
        "autoWidth": true
    });
    
});
function FillPromotionPrice(price) {
    document.getElementById("PromotionPrice").value = price;
}
