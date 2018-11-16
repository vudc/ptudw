
$(document).ready(function () {
    $('.my-datatable').DataTable({
        "autoWidth": true
    });
    
});
function FillPromotionPrice(price) {
    document.getElementById("PromotionPrice").value = price;
}
function replaceStringQuote(text){
    var newText = text.value.replace("\""," ");
    newText = text.replace("\'"," ");
    text.value = newText;
}