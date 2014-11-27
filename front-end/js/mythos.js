var Mythos = {
    settings : {
        defaultLanguage: 'sk'  
    },
    imagePath : "/files/images/",
    videoPath : "/files/images/",
    filePath : "/files/media/",
    fileUploadServiceUrl : "#",
    /**
     * Removes all HTML tags from a string except p and br
     * @param string input
     * @return string
     */
    stripTags : function (input) {
        html = input.replace(/<(?!br|\s*\/?p\s*\/?)[^>]+>/g, '').replace(/<\s*(\w+).*?>/g, '<$1>');
        return html;
    },
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
     * @return string
     */
    imageBoxTemplate : function () {
        var lastElement = $('#image-container').children('div.col-xs-4').last(),
            lastId = lastElement.length !== 0 ? lastElement.attr('data-image-id') : 1,
            id = parseInt(lastId) + 1,
            markup = '' +
            '<div class="col-xs-4" data-image-id="' + id + '">' +
            '   <input type="hidden" class="data-dz-name" name="image-name[]" />' +
            '   <div class="panel panel-default dz-preview dz-file-preview">' +
            '       <div class="panel-heading dz-filename">' +
            '           <span data-dz-name></span>' +
            '       </div>' +
            '       <div class="image-thumb-attachment panel-body">' +
            '           <img data-dz-thumbnail />' +
            '       </div>' +
            '       <div class="panel-footer clearfix">' +
            '           <div class="pull-right">' +
            '               <a data-dz-remove data-action="remove" data-image-id="' + id + '" data-image-path="http://localhost/path/img"><i class="fa fa-times"></i> delete</a>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +                                                
            '</div>';
        return markup;
    },
    /**
     * Dropzone file markup template
     * @return string
     */
    fileRowTemplate : function () {
        var lastElement = $('#file-container').children('div.col-xs-4').last(),
            lastId = lastElement.length !== 0 ? lastElement.attr('data-image-id') : 1,
            id = parseInt(lastId) + 1,         
            markup = '' +
            '<tr data-file-id="' + id + '">' +
            '   <td class="col-md-8">' +
            '       <input type="hidden" class="data-dz-name" name="file-name[]" />' +
            '       <span data-dz-name></span>' +
            '   </td>' +
            '   <td class="col-md-3">' +
            '       <span data-dz-size></span>' +
            '   </td>' +
            '   <td class="col-md-1">' +
            '       <a data-dz-remove' +
            '          data-action="remove-file"' +
            '          data-file-id="' + id + '">'+
            '           <i class="fa fa-times"></i>' +
            '       </a>' +
            '   </td>' +                                                
            '</tr>';
        return markup;        
    },
    /**
     * Displays a confirmation modal
     * @param function confClbk - confirmation callback
     * @param function cancClbk - cancel callback callback
     */
    confirmationModal : function (caller, confClbk, cancClbk) {
        $('#confirmation-modal').modal({ backdrop: 'static', keyboard: false }).one('click', '.confirm', function (e) {
            $('#confirmation-modal').modal('hide');
            if (typeof window[confClbk] === "function") {
                return window[confClbk](caller);
            }
        }).one('click', '.cancel', function (e) {
            if (typeof window[cancClbk] === "function") {
                return window[cancClbk](caller);
            }
        });
    }
}


// Global bindings
$(document).ready(function() {
    
    var ctx = Mythos;
    
    /* ===========================================
     * Modals
     * =========================================== */
    $('.show-confirmation-modal').on('click', function() {
        var confClbk = $(this).attr('data-confirm-fn-name'),
            cancClbk = $(this).attr('data-cancel-fn-name'),
            caller = $(this);
        ctx.confirmationModal(caller, confClbk, cancClbk);
        console.log('test call');
        console.log('another test call');
    });
   
//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $('#side-menu').metisMenu();
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
});    
    
});
