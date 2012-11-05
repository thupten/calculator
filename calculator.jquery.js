(function ($) {
    $.fn.calculator = function () {
        var self = this;

        var buttons = [
            {id:'escape', value:'AC', type:'button', classs:'func', keyWhich:0},
            {id:'reverseSign', value:'+/-', type:'button', classs:'func', keyWhich:null},
            {id:'squareRoot', value:'SqRt', type:'button', classs:'func', keyWhich:null},
            {id:'back', value:'<-', type:'button', classs:'func', keyWhich:8},

            {id:'seven', value:'7', type:'button', classs:'reg', keyWhich:55},
            {id:'eight', value:'8', type:'button', classs:'reg', keyWhich:56},
            {id:'nine', value:'9', type:'button', classs:'reg', keyWhich:57},
            {id:'divide', value:'/', type:'button', classs:'reg', keyWhich:47},

            {id:'four', value:'4', type:'button', classs:'reg', keyWhich:52},
            {id:'five', value:'5', type:'button', classs:'reg', keyWhich:53},
            {id:'six', value:'6', type:'button', classs:'reg', keyWhich:54},
            {id:'multiply', value:'*', type:'button', classs:'reg', keyWhich:42},

            {id:'one', value:'1', type:'button', classs:'reg', keyWhich:49},
            {id:'two', value:'2', type:'button', classs:'reg', keyWhich:50},
            {id:'three', value:'3', type:'button', classs:'reg', keyWhich:51},
            {id:'subtract', value:'-', type:'button', classs:'reg', keyWhich:45},

            {id:'zero', value:'0', type:'button', classs:'reg', keyWhich:48},
            {id:'dot', value:'.', type:'button', classs:'reg', keyWhich:46},
            {id:'equal', value:'=', type:'button', classs:'reg', keyWhich:13},
            {id:'add', value:'+', type:'button', classs:'reg', keyWhich:43}
        ];


        function calculate(expressionInString) {
            //if expression ends with
            return eval(expressionInString);
            //return ret;
        }

        function displayCalculator() {
            //add the textbox
            $('<input/>').attr({id:'lcdDisplay',
                type:'text',
                value:'0',
                maxLength:11,
                readOnly:'readonly'}).
                appendTo(self);
            $('<br/>').appendTo(self);

            for (var i = 0; i < buttons.length; i++) {
                $('<input/>')
                    .attr({ type:buttons[i].type,
                        id:buttons[i].id,
                        value:buttons[i].value})
                    .addClass(buttons[i].classs)
                    .appendTo(self);
                if ((i + 1) % 4 == 0) {
                    $('<br/>').appendTo(self);
                }
            }
        }

        function handleButtonPressed(buttonObject) {
            var prevDisplayContent = $('#lcdDisplay').val();
            var newDisplayContent = '';
            var newTransaction = false;
            switch (buttonObject.value) {
                case '=':
                    //evaluate the expression
                    newDisplayContent = calculate(prevDisplayContent);
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
                    if (newTransaction == true) {
                        prevDisplayContent = '';
                    }
                    newDisplayContent = prevDisplayContent + buttonObject.value;
                    break;
                case '.':
                case '/':
                case '*':
                case '+':
                case '-':
                    newDisplayContent = prevDisplayContent + buttonObject.value;
                    break;
                case '+/-':
            }
            var $buttonToHighlight = 'input[value="' + buttonObject.value + '"]';
            var $button = $('#calculator').find($buttonToHighlight).fadeOut(100).fadeIn(100);
            $('#lcdDisplay').val(newDisplayContent);
        }

        var init = function () {
            //add handlers for the buttons
            $('#calculator input[type=button]').bind('click', function () {
                var valueOfKeyPressed = this.value;
                var buttonPressed = _.find(buttons, function (button) {
                    return button.value == valueOfKeyPressed;
                });
                handleButtonPressed(buttonPressed);
            });

            //any time a button is pressed, change the focus back to the lcd display
            $('#calculator input').bind('click', function () {
                $('#lcdDisplay').focus();
            });

            $('#calculator input').keypress(function (e) {
                var buttonPressed = _.find(buttons, function (button) {
                    return button.keyWhich == e.which;
                });
                handleButtonPressed(buttonPressed);
            });
        };


        displayCalculator();
        init();
        $('#lcdDisplay').focus();
        return this;
    };
})
    (jQuery);
