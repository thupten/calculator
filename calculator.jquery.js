(function ($) {
    $.fn.calculator = function () {
        var self = this;
        var MAX_DIGIT = 16;

        var buttons = [
            {id:'escape', value:'AC', type:'button', classs:'func', keyCode:27, title:'Esc'},
            {id:'square', value:'Sq', type:'button', classs:'func', keyWhich:null},
            {id:'squareRoot', value:'SqRt', type:'button', classs:'func', keyWhich:null},
            {id:'back', value:'<-', type:'button', classs:'func', keyWhich:8, title:'Backspace'},

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

        function trimNumber(expressionInString){
            var zerosInFront = new RegExp('^0+');
            var ret;
            ret = expressionInString.replace(zerosInFront, '');
            ret.toFixed(2);
            return ret;
        }

        function calculate(expressionInString) {
            //if expression ends with + - / *, remove it
            var lastOperatorRegex = new RegExp('[+-/*]$');

            console.log(expressionInString);
            expressionInString = expressionInString.replace(lastOperatorRegex, '');
            var result = eval(expressionInString);
            
            return ;
        }

        function displayCalculator() {
            //add the textbox
            $('<input/>').attr({id:'lcdTopDisplay',
                type:'text',
                value:'',
                maxLength:MAX_DIGIT,
                readOnly:'readonly'}).
                appendTo(self);
            $('<br/>').appendTo(self);
            $('<input/>').attr({id:'lcdBottomDisplay',
                type:'text',
                value:'0',
                maxLength:MAX_DIGIT,
                readOnly:'readonly'}).
                appendTo(self);
            $('<br/>').appendTo(self);

            for (var i = 0; i < buttons.length; i++) {
                $('<input/>')
                    .attr({ type:buttons[i].type,
                        id:buttons[i].id,
                        value:buttons[i].value,
                        title:buttons[i].title})
                    .addClass(buttons[i].classs)
                    .appendTo(self);
                if ((i + 1) % 4 == 0) {
                    $('<br/>').appendTo(self);
                }
            }
        }

        function handleButtonPressed(buttonObject) {
            var currentTopDisplayContent = $('#lcdTopDisplay').val();
            var currentBottomDisplayContent = $('#lcdBottomDisplay').val();
            var newTopDisplayContent, newBottomDisplayContent = '';
            var newTransaction = false;
            switch (buttonObject.value) {
                case '=':
                    //evaluate the expression
                    newBottomDisplayContent = calculate(currentTopDisplayContent);
                    newTopDisplayContent = '';
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
                    if (currentBottomDisplayContent.length >= MAX_DIGIT) {
                        newBottomDisplayContent = currentBottomDisplayContent;
                        $('#lcdBottomDisplay').fadeOut(10,function () {
                            $(this).css('background-color', 'red');
                        }).fadeIn(50, function () {
                                $(this).css('background-color', 'white');
                            });
                        break;
                    }
                    if (newTransaction == true) {
                        currentTopDisplayContent = '';
                    }
                    if (currentBottomDisplayContent == '0') {
                        newBottomDisplayContent = buttonObject.value;
                    } else {
                        newTopDisplayContent = currentTopDisplayContent;
                        newBottomDisplayContent = currentBottomDisplayContent + buttonObject.value;
                    }
                    break;
                case '.':
                    newBottomDisplayContent = currentBottomDisplayContent + buttonObject.value;
                    break;
                case '/':
                    console.log(currentTopDisplayContent);
                    console.log(currentBottomDisplayContent);
                    console.log(buttonObject.value);
                    newTopDisplayContent = currentTopDisplayContent + currentBottomDisplayContent + buttonObject.value;
                    newBottomDisplayContent = calculate(newTopDisplayContent);
                    break;
                case '*':
                    newTopDisplayContent = currentTopDisplayContent + currentBottomDisplayContent + buttonObject.value;
                    newBottomDisplayContent = calculate(newTopDisplayContent);
                    break;
                case '+':
                    newTopDisplayContent = currentTopDisplayContent + currentBottomDisplayContent + buttonObject.value;
                    newBottomDisplayContent = calculate(newTopDisplayContent);
                    break;
                case '-':
                    newTopDisplayContent = currentTopDisplayContent + currentBottomDisplayContent + buttonObject.value;
                    newBottomDisplayContent = calculate(newTopDisplayContent);
                    break;
                case '<-':
                    //BACK button pressed, remove a char from right
                    var lastDigitRegex = new RegExp('\\d\\D*$');
                    newBottomDisplayContent = currentBottomDisplayContent.replace(lastDigitRegex, '');
                    break;
                case 'AC':
                    newTopDisplayContent = '';
                    newBottomDisplayContent = '0';
                    break;
                case 'Sq':
                    newBottomDisplayContent = currentBottomDisplayContent * currentBottomDisplayContent;
                    newTopDisplayContent = 'Square('+ currentTopDisplayContent +')';
                    break;
                case 'SqRt':
                    newBottomDisplayContent = Math.sqrt(currentBottomDisplayContent);
                    break;
                default:
                    console.log('invalid key');
            }
            var $buttonToHighlight = 'input[value="' + buttonObject.value + '"]';
            var $button = $('#calculator').find($buttonToHighlight).fadeOut(20).fadeIn(20);
            $('#lcdTopDisplay').val(newTopDisplayContent);
            $('#lcdBottomDisplay').val(newBottomDisplayContent);
        }

        var init = function () {
            //add handlers for the buttons
            $('#calculator input[type=button]').bind('click', function () {
                var valueOfKeyPressed = this.value;
                var buttonPressed = _.find(buttons, function (button) {
                    return button.value == valueOfKeyPressed;
                });
                if (buttonPressed != undefined) {
                    handleButtonPressed(buttonPressed);
                }
            });

            //any time a button is pressed, change the focus back to the lcd display
            $('#calculator input').bind('click', function () {
                $('#lcdTopDisplay').focus();
            });

            $('#calculator input').keypress(function (e) {
                var buttonPressed;
                //e.which returns 0 for esc, tab and some other keys. in this key check keyCode
                if (e.which == 0) {
                    buttonPressed = _.find(buttons, function (button) {
                        return button.keyCode == e.keyCode;
                    });
                } else {
                    buttonPressed = _.find(buttons, function (button) {
                        return button.keyWhich == e.which;
                    });
                }

                console.log(buttonPressed);
                if (buttonPressed != undefined) {
                    handleButtonPressed(buttonPressed);
                }
            });
        };


        displayCalculator();
        init();
        $('#lcdTopDisplay').focus();
        return this;
    };
})(jQuery);
