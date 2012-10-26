(function ($) {
    $.fn.calculator = function () {
        var self = this;
        var init = function () {
            //add the textbox
            $('<input/>').attr({id:'display',type:'input',disabled:'disabled',value:'88888888888.'}).appendTo(self);
            $('<br/>').appendTo(self);

            var buttons = [
                {id:'seven',value:'7',type:'button', classs:'reg'},
                {id:'eight',value:'8',type:'button', classs:'reg'},
                {id:'nine',value:'9',type:'button', classs:'reg'},
                {id:'divide',value:'/',type:'button', classs:'reg'},
                {id:'four',value:'4',type:'button', classs:'reg'},
                {id:'five',value:'5',type:'button', classs:'reg'},
                {id:'six',value:'6',type:'button', classs:'reg'},
                {id:'multiply',value:'*',type:'button', classs:'reg'},
                {id:'one',value:'1',type:'button', classs:'reg'},
                {id:'two',value:'2',type:'button', classs:'reg'},
                {id:'three',value:'3',type:'button', classs:'reg'},
                {id:'subtract',value:'-',type:'button', classs:'reg'},
                {id:'zero',value:'0',type:'button', classs:'notreg'},
                {id:'dot',value:'.',type:'button', classs:'reg'},
                {id:'add',value:'+',type:'button', classs:'reg'}
            ];

            for(var i = 0; i < buttons.length; i++){
                $('<input/>')
                    .attr({type:buttons[i].type, id:buttons[i].id, value:buttons[i].value}).addClass(buttons[i].classs)
                    .appendTo(self);
                if((i+1)%4 == 0){
                    $('<br/>').appendTo(self);
                }
            }

        }

        init();
    };
})(jQuery);
