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
                    element.text(data[i][key]);    
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
    });
}
