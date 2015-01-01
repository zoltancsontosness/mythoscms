mythosApp.directive('articleBindings', function() {
    return function(scope, element, attrs) {
        /* ===========================================================
         * Articles general functionality
         * =========================================================== */             
        // Process title to url
        $('input[name="title"]').on('change', function() {
            var urlValue = '',
                lang = $(this).attr('data-lang'),
                urlHolder = $('input[name="url"][data-lang="' + lang + '"]').length !== 0 ? $('input[name="url"][data-lang="' + lang + '"]') : null;
            if (typeof Mythos !== "undefined") {
                urlValue = Mythos.toUrl($(this).val());
                if (urlHolder !== null) {
                    urlHolder.val(urlValue);   
                }
            }
        });                  

        /* ===========================================================
         * Videos
         * =========================================================== */              
        //Duplicate video element
        $('.add-video').on('click', function() {
            var videoWrapper = $('.video-holder'),
                firstRow = videoWrapper.children('div').first(),
                newRow = firstRow.clone();
            newRow.appendTo(videoWrapper);
            newRow.find('input[name="video-url[]"]').val('');
        });

        // Remove video element
        $(document).on("click", ".remove-video-field", function(e) {
            var parentRow = $(this).parent(),
                parentIndex = parentRow.index();
            if (parentIndex !== 0) {
                parentRow.remove();
            } else {
                parentRow.find('input').val('');
            }
        });

        /* ===========================================================
         * Image dropzone
         * =========================================================== */
        var imageFilesDropzone = new Dropzone("div.image-drop-area", { 
            url: "#",
            thumbnailWidth : "300",
            thumbnailHeight : "300",
            previewsContainer : "#image-container",
            previewTemplate : Mythos.imageBoxTemplate(),
            acceptedFiles : 'image/*'
        });

        imageFilesDropzone.on('thumbnail', function(e, url) {
            var img = $('img[src="' + url + '"]'),
                title = img.attr('alt');
            img.wrap('<a data-toggle="lightbox" data-gallery="multiimages" data-title="' + title + '" href="' + url + '"></a>');
        });

        imageFilesDropzone.on("addedfile", function(file) {
            $('#error-text').parent().removeClass('show');
            $('#image-container').children().last().find('input[type="hidden"]').val(file.name);
        });

        imageFilesDropzone.on("uploadprogress", function(e, progress) {
            $('.loader .progress').css('width', progress + "%");
            if (progress === 100) {
                $('.loader .progress').css('width', 0);
            }
        });

        imageFilesDropzone.on("removedfile", function() {
            console.log('removed');
        });

        imageFilesDropzone.on("error", function(e, errorMessage) {
            $('#error-text').html(errorMessage);
            $('#error-text').parent().addClass('show');
            $('.col-xs-4.dz-error').remove();
        });

        /* ===========================================================
         * File dropzone
         * =========================================================== */
        var filesDropzone = new Dropzone("div.file-drop-area", { 
            url: "#",
            previewsContainer : "#file-container",
            previewTemplate : Mythos.fileRowTemplate(),
            acceptedFiles : '.doc,.docx,.xlsx,.pdf,.zip',
            createElementWrapper : 'tbody'
        });

        filesDropzone.on("addedfile", function(file) {
            $('#error-text').parent().removeClass('show');
            $('#file-container').children().last().find('input[type="hidden"]').val(file.name);
        });

        filesDropzone.on("uploadprogress", function(e, progress) {
            $('.loader .progress').css('width', progress + "%");
            if (progress === 100) {
                $('.loader .progress').css('width', 0);
            }
        });

        filesDropzone.on("removedfile", function() {
            console.log('removed');
        });

        filesDropzone.on("error", function(e, errorMessage) {
            $('#error-text').html(errorMessage);
            $('#error-text').parent().addClass('show');
            $('.col-xs-4.dz-error').remove();
        });

    }
});
