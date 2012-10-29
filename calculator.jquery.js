(function ($) {
    $.fn.calculator = function () {
        var self = this;
        /**
         * operation: 'number' || 'add' ||'subtract' ||'multiply' || 'divide' || 'equal' || 'none'
         */

        var newTransaction = false;

        function calculate(expressionInString) {
            //if expression ends with
            return eval(expressionInString);
            //return ret;
        }

        function displayCalculator() {
            //add the textbox
            $('<input/>').attr({id:'display', type:'text', value:'0', maxLength:11}).appendTo(self);
            $('<br/>').appendTo(self);

            var buttons = [
                {id:'seven', value:'7', type:'button', classs:'reg'},
                {id:'eight', value:'8', type:'button', classs:'reg'},
                {id:'nine', value:'9', type:'button', classs:'reg'},
                {id:'divide', value:'/', type:'button', classs:'reg'},
                {id:'four', value:'4', type:'button', classs:'reg'},
                {id:'five', value:'5', type:'button', classs:'reg'},
                {id:'six', value:'6', type:'button', classs:'reg'},
                {id:'multiply', value:'*', type:'button', classs:'reg'},
                {id:'one', value:'1', type:'button', classs:'reg'},
                {id:'two', value:'2', type:'button', classs:'reg'},
                {id:'three', value:'3', type:'button', classs:'reg'},
                {id:'subtract', value:'-', type:'button', classs:'reg'},
                {id:'zero', value:'0', type:'button', classs:'reg'},
                {id:'dot', value:'.', type:'button', classs:'reg'},
                {id:'equal', value:'=', type:'button', classs:'reg'},
                {id:'add', value:'+', type:'button', classs:'reg'}
            ];

            for (var i = 0; i < buttons.length; i++) {
                $('<input/>')
                    .attr({type:buttons[i].type, id:buttons[i].id, value:buttons[i].value}).addClass(buttons[i].classs)
                    .appendTo(self);
                if ((i + 1) % 4 == 0) {
                    $('<br/>').appendTo(self);
                }
            }
        }


        var init = function () {
            $('#calculator input').bind('click', function () {
                var buttonPressed = this.value;
                switch (buttonPressed) {
                    case '=':
                        var prevDisplayContent = $('#display').val();
                        //evaluate the expression
                        var result = calculate(prevDisplayContent);
                        $('#display').val(result);
                        newTransaction = true;
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '0':
                    case '.':
                    case '/':
                    case '*':
                    case '+':
                    case '-':
                        //do something
                        var prevDisplayContent;
                        if(newTransaction == true){
                            prevDisplayContent = '';
                        }else{
                           prevDisplayContent = $('#display').val();
                        }
                        var newDisplayContent = prevDisplayContent + this.value;
                        $('#display').val(newDisplayContent);
                        newTransaction = false;
                        break;
                }
            });

            $('#calculator input').click(function () {
                $('#display').focus();
            });
            $('#calculator #display').keypress(function (e) {
                var keyPressed;
                if(e.keyCode == 13){
                    //enter pressed
                    keyPressed = '=';
                    var prevDisplayContent = $('#display').val();
                    //evaluate the expression
                    var result = calculate(prevDisplayContent);
                    $('#display').val(result);
                }else{
                    keyPressed = String.fromCharCode(e.keyCode);
                }
                var $buttonToHighlight = 'input[value="' + keyPressed + '"]';
                var $button = $('#calculator').find($buttonToHighlight).fadeOut(100).fadeIn(100);

                var displayContent = $('#display').val();
                //remove leading zero,divide and multiply
                displayContent = displayContent.replace(new RegExp('^0|^=$|^\\/$|^\\*$'), '');
                //remove double operator
                displayContent = displayContent.replace(new RegExp('([/*+])+'), '$1');
                //remove double - sign
                displayContent = displayContent.replace(new RegExp('(-)+'), '$1');
                $('#display').val(displayContent);
            });


        };


        displayCalculator();
        init();
        $('#display').focus();
        return this;
    };
})
    (jQuery);
