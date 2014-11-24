if (typeof Mythos !== "undefined") {
    Mythos.translator = {
        //Constants
        TRANSLATION_BASE_PATH : 'js/translations/',
        /**
         * Public properties
         */
        selectedLang : 'en',
        translations : [],
        /**
         * Returns the browser language
         * @return void 
         */
        getBrowserLanguage : function () {
            var ctx = Mythos.translator;
            if (typeof window.navigator.language !== "undefined") {
                ctx.selectedLang = window.navigator.language.substring(0,2);   
            }
        },
        /**
         * Returns a translation pack for a specific language
         * @param string lang
         * @return void
         */
        getTranslations : function (lang, callback) {
            var ctx = Mythos.translator;
            $.ajax({
                type : 'GET',
                cache : false,
                url : ctx.TRANSLATION_BASE_PATH + lang + '/translations.json',
                success : function (data) {   
                    if (typeof callback === "function") {
                        callback(data);   
                    }
                },
                error : function (xhr, status) {
                    console.log('The following file can\'t be loaded: ' + ctx.TRANSLATION_BASE_PATH + lang + '/translations.json. Error code:' + xhr.status);   
                }
            });
        },
        /**
         * Checks the type of an element and translates it
         * @param {} elem
         * @return void
         */
        translateElement : function (elem, translation) {
            var type = elem.get(0).tagName;
            // Inputs & textarea
            if (type === "INPUT" || type === "TEXTAREA") {
                if (elem.attr('placeholder') !== "undefined") {
                    elem.attr('placeholder', translation);
                } else {
                    elem.val(translation);   
                }
            // Textarea
            } else {
                elem.text(translation);
            }
        },
        /**
         * General translation method
         * @param {} data
         * @return void
         */
        translate : function (data) {
            var ctx = Mythos.translator,
                i = 0,
                key = "",
                element = "";
            while (i < data.length) {
                key = Object.keys(data[i])[0];
                ctx.translations[key] = data[i][key];
                element = $('[data-translate="' + key + '"]');
                if (element.length !== 0) {
                    ctx.translateElement(element, data[i][key]);
                    //element.text();    
                }
                i += 1;
            }
        },
        /**
         * Initialisation function
         */
        init : function (langOverride) {
            var ctx = Mythos.translator;
            if (typeof langOverride !== "undefined") {
                ctx.selectedLang = langOverride;
            } else {
                ctx.getBrowserLanguage();   
            }
            ctx.getTranslations(ctx.selectedLang, ctx.translate);
        }
    };
    $(document).ready(function() {
        Mythos.translator.init(Mythos.settings.defaultLanguage);
        $('body').on('DOMSubtreeModified', function() {
            Mythos.translator.translate(Mythos.translator.translations);
        });
    });
}
