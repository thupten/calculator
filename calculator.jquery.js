(function ($) {
    $.fn.calculator = function () {
        var self = this;
        var init = function () {
            //add the textbox
            $('<div/>').addClass("displayContainer").appendTo(self);
            $('<input/>').attr({id:'display',type:'input',disabled:'disabled'}).appendTo($('#calculator .displayContainer'));



            //Add the buttons for 1 to 9
            $('<div/>').addClass("numbersContainer").appendTo(self);
            var num = 7;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    $('<input/>')
                        .attr({'id':num, 'type':'button', 'value':num})
                        .addClass('regularSize')
                        .appendTo($('#calculator .numbersContainer'));
                    num++;
                }
                //$('<div class="clear"></div>').appendTo($('.numbersContainer'));
                num = num - 6;
            }

            //put 0 and . buttons in numbercontainer
            $('<input/>')
                .attr({type:'button', id:'0', value:'0'})
                .appendTo($('#calculator .numbersContainer'));
            $('<input/>')
                .attr({type:'button', id:'dot', value:'.'})
                .addClass('regularSize')
                .appendTo($('#calculator .numbersContainer'));

            //add the +-/* buttons
            $('<div/>').addClass("operatorsContainer").appendTo(self);
            var operators = [
                {id:'divide', value:'/'},
                {id:'multiply', value:'*'},
                {id:'subtract', value:'-'},
                {id:'add', value:'+'}

            ];
            for(var i=0; i<operators.length; i++){
                $('<input/>')
                    .attr({type:'button', id:operators[i].id, value:operators[i].value})
                    .appendTo($('#calculator .operatorsContainer'));
            }
        }

        init();
    };
})(jQuery);
