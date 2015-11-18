/**
 * This is a modified version of PConfig
 * PConfig is copyright (c) 2013 Matthew Congrove (http://github.com/mcongrove)
 */
var PConfig = function(){
    this.init = function(){
        this.setFormValues();
    };
    this.getFormFields = function(){
        var field_ids = [];
        var fields_input = document.getElementsByTagName("input");
        var fields_select = document.getElementsByTagName("select");
        for(var i = 0, x = fields_input.length; i < x; i++){
            if(fields_input[i].id && fields_input[i].type != "submit"){
                field_ids.push(fields_input[i].id);
            }
        }
        for(var i = 0, x = fields_select.length; i < x; i++){
            field_ids.push(fields_select[i].id);
        }
        return field_ids;
    };
    this.getFormValues = function(){
        var fields = this.getFormFields();
        var values = {};
        for(var i = 0, x = fields.length; i < x; i++){
            var field = document.getElementById(fields[i]);
            var value = 0;
            if(field.type == "radio" || field.type == "checkbox"){
                value = field.checked ? 1 : 0;
            }
            else{
                value = field.value;
            }

            if(field.type == "number" || field.type == "range" || field.type == "select-one"){
                value = parseInt(value);
            }

            if(field.className.indexOf("item-color") === 0){
                value = textToColor(value);
            }

            values[fields[i]] = value;
        }
        console.log("Response data: " + JSON.stringify(values, null, 1));
        return values;
    };
    this.setFormValues = function(){
        try{
            var params = REPLACED_AT_RUNTIME;
        }
        catch(e){
            var params = {};
        }
        for(key in params){
            var field = document.getElementById(key);
            if(field != null){
                if(field.type == "checkbox"){
                    field.checked = params[key] == 1;
                }
                else if(field.className.indexOf("item-color") === 0){
                    field.value = colorToText(params[key]);
                }
                else if(field.className.indexOf("item-slider") === 0){
                    field.value = decodeURIComponent(params[key]);
                    var display = document.getElementById(key + "_display");
                    display.value = decodeURIComponent(params[key]);
                }
                else{
                    field.value = decodeURIComponent(params[key]);
                }
            }
        }
    };
};
PConfig = new PConfig();
