(function ($) {
    $.fn.calculator = function () {
        var self = this;
        var operation = undefined;
        var num = 0;


        function calculate(number1, number2, operation) {
            var num1 = number1;
            var num2 = number2;

            var ret = 0;
            if (operation === undefined) {
                return number1;
            } else if (operation == 'add') {
                console.log('calculating ' + number1 + ' ' + number2 + ' with ' + operation)
                ret = num1 + num2;
            }
            else if (operation == 'subtract') {
                console.log('calculating ' + number1 + ' ' + number2 + ' with ' + operation)
                ret = num1 - num2;
            }
            else if (operation == 'multiply') {
                console.log('calculating ' + number1 + ' ' + number2 + ' with ' + operation)
                ret = num1 * num2;
            }
            else if (operation == 'divide') {
                console.log('calculating ' + number1 + ' ' + number2 + ' with ' + operation)
                ret = num1 / num2;
            }
            console.log(ret);
            return ret;
        }

        function displayCalculator() {
            //add the textbox
            $('<input/>').attr({id:'display', type:'text', value:'0',maxLength:11}).appendTo(self);
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

            $('#calculator input').click(function () {
                if ((this.id == 'divide') || (this.id == 'multiply') ||
                    (this.id == 'add') || (this.id == 'subtract') || (this.id == 'equal')) {
                    num = $('#display').val();
                    operation = this.id;
                    if (this.id == 'equal') {
                        num = calculate(num, $('#display').val(), operation);
                        $('#display').val(num);
                        console.log('equal pressed');
                        operation = undefined;
                    }
                } else {
                    console.log('a number key was press. check if operation is null, keep concatenating, other wise write a new number.' + operation);
                    if (operation === undefined) {
                        if ($('#display').val() == '0') {
                            $('#display').val(this.value);
                        } else {
                            $('#display').val($('#display').val() + this.value);
                        }

                    }else{

                        $('#display').val($('#display').val() + this.value);
                    }
                }
                console.log(operation);
            });
        };


        displayCalculator();
        init();
    };
})
    (jQuery);
