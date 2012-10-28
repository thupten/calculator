(function ($) {
    $.fn.calculator = function () {
        var self = this;
        /**
         * operation: 'number' || 'add' ||'subtract' ||'multiply' || 'divide' || 'equal' || 'none'
         */
        var transactions = [
            {n:'', operation:'none', result:'0'}
        ];

        var lastButton = {button:'none', buttonType:'none'};


        function calculate(number1, number2, operation) {
            var num1 = new Number(number1);
            var num2 = new Number(number2);

            var ret = 0;
            if (operation === 'none') {
                return number1;
            } else if (operation == 'add') {
                ret = num1 + num2;
            }
            else if (operation == 'subtract') {
                ret = num1 - num2;
            }
            else if (operation == 'multiply') {
                ret = num1 * num2;
            }
            else if (operation == 'divide') {
                ret = num1 / num2;
            }
            return ret;
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
                var buttonPressed = this.id;
                switch (buttonPressed) {
                    case 'divide':
                    case 'multiply':
                    case 'add':
                    case 'subtract':
                    case 'equal':
                        //do something
                        //calculate and save transaction.
                        var displayedNumber = $('#display').val();

                        var pastOperations = _(transactions).filter(function(transaction){
                            return ((transaction.operation == 'add' ||transaction.operation == 'subtract' ||
                                    transaction.operation == 'multiply' ||transaction.operation == 'divide'
                                    ||transaction.operation == 'equal'));
                        });



                        //if first time operation key is pressed
                        if (pastOperations.length <= 0) {
                            //console.log('first time add subtract multiply or divide');
                            if (buttonPressed == 'equal') {
                                buttonPressed = 'none';
                            }
                            transactions.push({n:displayedNumber, operation:buttonPressed, result:displayedNumber});
                        }
                        if (pastOperations.length > 0) {
                            var lastTransaction = _(transactions).last();
                            if (buttonPressed == 'equal') {
                                buttonPressed = lastTransaction.operation;
                            }

                            var result = calculate(lastTransaction.result, displayedNumber, lastTransaction.operation);
                            transactions.push({n:displayedNumber, operation:buttonPressed, result:result});
                            $('#display').val(result);
                        }
                        break;
                    case 'one':
                    case 'two':
                    case 'three':
                    case 'four':
                    case 'five':
                    case 'six':
                    case 'seven':
                    case 'eight':
                    case 'nine':
                    case 'zero':
                    case 'dot':
                        //do something
                        if (lastButton.buttonType == 'number' || lastButton.buttonType == 'none') {
                            var prevDisplayContent = $('#display').val();
                            if (prevDisplayContent == '0') {
                                prevDisplayContent = '';
                            }
                            var newDisplayContent = prevDisplayContent + this.value;
                            $('#display').val(newDisplayContent);
                        } else if (lastButton.buttonType == 'operation') {
                            $('#display').val('');
                            $('#display').val(this.value);

                        }
                        break;
                }
            });

            //set the lastButton.
            $('#calculator input').bind('click', function () {
                lastButton.button = this.id;
                if (this.id == 'one' || this.id == 'two' || this.id == 'three' || this.id == 'four' || this.id == 'five' ||
                    this.id == 'nine' || this.id == 'eight' || this.id == 'seven' || this.id == 'six' || this.id == 'zero' || this.id == 'dot') {
                    lastButton.buttonType = 'number';
                }
                if (this.id == 'equal' || this.id == 'add' || this.id == 'subtract' || this.id == 'divide' || this.id == 'multiply') {
                    lastButton.buttonType = 'operation';
                    console.log(_(transactions).last().n  +' ' + _(transactions).last().result+' '+ _(transactions).last().operation);
                }

            });

        };


        displayCalculator();
        init();
    };
})
    (jQuery);
