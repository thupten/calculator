(function ($) {
    $.fn.calculator = function () {
        var self = this;
        var MAX_DIGIT = 16;
        var wasLastButtonPressedOperand = false;

        var buttons = [
            {id:'escape', value:'AC', type:'button', classs:'func', keyDownWhich:[27], title:'Esc'},
            {id:'square', value:'Sq', type:'button', classs:'func', keyDownWhich:[]},
            {id:'squareRoot', value:'SqRt', type:'button', classs:'func', keyDownWhich:[]},
            {id:'back', value:'Back', type:'button', classs:'func', keyDownWhich:[8], title:'Backspace'},

            {id:'seven', value:'7', type:'button', classs:'reg', keyDownWhich:[103, 55]},
            {id:'eight', value:'8', type:'button', classs:'reg', keyDownWhich:[104, 56]},
            {id:'nine', value:'9', type:'button', classs:'reg', keyDownWhich:[105, 57]},
            {id:'divide', value:'/', type:'button', classs:'reg', keyDownWhich:[111, 191]},

            {id:'four', value:'4', type:'button', classs:'reg', keyDownWhich:[100, 52]},
            {id:'five', value:'5', type:'button', classs:'reg', keyDownWhich:[101, 53]},
            {id:'six', value:'6', type:'button', classs:'reg', keyDownWhich:[102, 54]},
            {id:'multiply', value:'*', type:'button', classs:'reg', keyDownWhich:[106, 56]},

            {id:'one', value:'1', type:'button', classs:'reg', keyDownWhich:[97, 49]},
            {id:'two', value:'2', type:'button', classs:'reg', keyDownWhich:[98, 50]},
            {id:'three', value:'3', type:'button', classs:'reg', keyDownWhich:[99, 51]},
            {id:'subtract', value:'-', type:'button', classs:'reg', keyDownWhich:[109, 189]},

            {id:'zero', value:'0', type:'button', classs:'reg', keyDownWhich:[96, 48]},
            {id:'dot', value:'.', type:'button', classs:'reg', keyDownWhich:[110, 190]},
            {id:'equal', value:'=', type:'button', classs:'reg', keyDownWhich:[13]},
            {id:'add', value:'+', type:'button', classs:'reg', keyDownWhich:[107, 187]}
        ];

        function trimNumber(expressionInString) {
            var zerosInFront = new RegExp('^0+');
            var ret;
            ret = expressionInString.replace(zerosInFront, '');
            ret.toFixed(2);
            return ret;
        }

        function calculate(expressionInString) {
            //if expression ends with + - / *, remove it
            var expression = expressionInString;
            var lastOperatorRegex = new RegExp('[+-/*]$');
            expression = expression.replace(lastOperatorRegex, '');

            //find all division sign and then find left and right operator, do a division and replace with the result.
            // keep doing this until no division left. ..then move to multiply, add and then subtract.
            var divisionRegex = new RegExp('(\d+)/(\d+)');
            var matchDivision = divisionRegex.exec(expression);
            expression = expression.replace(divisionRegex, divide(matchDivision[1], matchDivision[2]));


            var result = eval(expression);
            return result;


        }

        function multiply(x, y) {
            return x * y;
        }

        function divide(nominator, denominator) {
            return nominator / denominator;
        }

        function add(x, y) {
            return x + y;
        }

        function subtract(from, value) {
            return from - value;
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
                    newBottomDisplayContent = calculate(currentTopDisplayContent + currentBottomDisplayContent);
                    newTopDisplayContent = '';
                    newTransaction = true;
                    wasLastButtonPressedOperand = true;
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
                        if (wasLastButtonPressedOperand == true) {
                            newBottomDisplayContent = buttonObject.value;
                        } else {
                            newBottomDisplayContent = currentBottomDisplayContent + buttonObject.value;
                        }

                    }
                    wasLastButtonPressedOperand = false;
                    break;
                case '.':
                    newBottomDisplayContent = currentBottomDisplayContent + buttonObject.value;
                    wasLastButtonPressedOperand = false;
                    break;
                case '/':
                case '*':
                case '+':
                case '-':
                    if (currentTopDisplayContent == '' && currentBottomDisplayContent != '') {
                        //user likes to continue operating on previous result.
                        newTopDisplayContent = currentBottomDisplayContent + buttonObject.value;
                        wasLastButtonPressedOperand = true;
                        break;
                    }
                    if (wasLastButtonPressedOperand != true) {
                        newTopDisplayContent = currentTopDisplayContent + currentBottomDisplayContent + buttonObject.value;
                    } else {
                        //two operands pressed consecutively, last operand overwrites older operand. eg. if user press 2*/2, divide rules.
                        //replace last operand with new operand
                        newTopDisplayContent = currentTopDisplayContent.replace(new RegExp('.$'), buttonObject.value);
                    }
                    console.log('calculating next ..' + newTopDisplayContent);
                    newBottomDisplayContent = calculate(newTopDisplayContent);
                    wasLastButtonPressedOperand = true;
                    break;


                case 'Back':
                    //BACK button pressed, remove a char from right
                    console.log(wasLastButtonPressedOperand);
                    if (wasLastButtonPressedOperand == true) {
                        newTopDisplayContent = currentTopDisplayContent.replace(new RegExp('.$'), '');
                        newBottomDisplayContent = currentBottomDisplayContent;
                    } else {
                        var lastDigitRegex = new RegExp('\\d\\D*$');
                        newBottomDisplayContent = currentBottomDisplayContent.replace(lastDigitRegex, '');
                    }
                    wasLastButtonPressedOperand = false;
                    break;
                case 'AC':
                    newTopDisplayContent = '';
                    newBottomDisplayContent = '0';
                    break;
                case 'Sq':
                    newTopDisplayContent = 'Square(' + currentBottomDisplayContent + ')';
                    newBottomDisplayContent = currentBottomDisplayContent * currentBottomDisplayContent;
                    wasLastButtonPressedOperand = true;
                    break;
                case 'SqRt':
                    newTopDisplayContent = 'SquareRoot(' + currentBottomDisplayContent + ')';
                    newBottomDisplayContent = Math.sqrt(currentBottomDisplayContent);
                    wasLastButtonPressedOperand = true;
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

            $('#calculator input').keydown(function (e) {
                var buttonPressed;

                //e.which returns 0 for esc, tab and some other keys. in this key check keyCode
                buttonPressed = _.find(buttons, function (button) {
                    if (_.contains(button.keyDownWhich, e.which)) {
                        return button;
                    }
                });
                console.log(e.which + '-->' + buttonPressed.value);

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
