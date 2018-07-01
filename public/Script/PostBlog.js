tinymce.init({
    selector: "#blogID-textarea",
    theme: "modern",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern imagetools"
    ],
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "responsivefilemanager print preview media | forecolor backcolor emoticons | ltr rtl",
    image_advtab: true,
    templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
    ],
    external_filemanager_path: "/filemanager/",
    external_plugins: { "filemanager": "/filemanager/plugin.min.js" },
    filemanager_title: "Responsive File Manager",
    image_title: true,
    paste_data_images: true,
    images_upload_url: 'Upload',
    images_upload_base_path: '../../Content/Uploads/Images',
    file_browser_callback: function (cb, value, meta) {
    }
});