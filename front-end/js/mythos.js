var Mythos = {
    imagePath : "/files/images/",
    videoPath : "/files/images/",
    filePath : "/files/media/",
    fileUploadServiceUrl : "#",
    /**
     * Converts a string to URL friendly format
     * @param string str
     * @return string
     */
    toUrl : function(str) {
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;",
            to   = "aaaaaeeeeeiiiiooooouuuunc------";
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        return str;
    },
    /**
     * Dropzone image markup template
     * @return void
     */
    imageBoxTemplate : function () {
        var lastElement = $('#image-container').children('div.col-xs-4').last(),
            lastId = lastElement.length !== 0 ? lastElement.attr('data-image-id') : 1,
            id = parseInt(lastId) + 1,
            markup = '' +
            '<div class="col-xs-4" data-image-id="' + id + '">' +
            '   <input type="hidden" class="data-dz-name" name="file-name[]" />' +
            '   <div class="panel panel-default dz-preview dz-file-preview">' +
            '       <div class="panel-heading dz-filename">' +
            '           <span data-dz-name></span>' +
            '       </div>' +
            '       <div class="image-thumb-attachment panel-body">' +
            '           <img data-dz-thumbnail />' +
            '       </div>' +
            '       <div class="panel-footer clearfix">' +
            '           <div class="pull-right">' +
            //'               <a data-action="edit" data-image-id="' + id + '", data-image-path="http://localhost/path/img"><i class="fa fa-edit"></i></a>' +
            '               <a data-dz-remove data-action="remove" data-image-id="' + id + '" data-image-path="http://localhost/path/img"><i class="fa fa-times"></i> delete</a>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +                                                
            '</div>';
        return markup;
    }    
}

$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    })
})
