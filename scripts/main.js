//Exchange Rates (If there would be more than 2 Currencies it makes sense to create a table/JSON/2D-Array)
var EuroToUSD = 1.08078;
var USDToEuro = 1/1.08078;


//Save the previous values from currency selection
var prevValFrom = $("#selectFrom").val();
var prevValTo = $("#selectTo").val();


$( document ).ready(function() {

    /*--Navigation--*/

    //Shrink Navigation on scroll
    shrinkNav();

    //Show and Hide Mobile Menu
    toggleMobileMenu();



    /*--Calculator--*/

    //If the "From" or "To" field have the same value, the other should get the old one of the selected one
    checkCurrencySelection();

    //Convert on Click
    $("#convert").click(function(){
        convertCurrency();
    });

    //Also convert if you are inside amount input and click Enter
    $("#amount").on('keypress',function(e) {

        $(".amountIssue").removeClass("amountIssue");//It will remove the Issue Class if you type

        if(e.which == 13) {//if pressed enter
            convertCurrency();
        }
    });

    //Remove the Issue Class of the amount input, if the user clicks in it
    $("#amount").click(function(){
        $(".amountIssue").removeClass("amountIssue");
    });


});




/*-Methods for Navigation-*/

function shrinkNav(){
    $(document).scroll(function(){

        //Check if header is moved down, so the header-top is not visible anymore
        if($(".header").offset().top>$(".header-top").height()){
            $(".header-bottom").addClass("scrollShrink");
        }
        else{
            $(".header-bottom").removeClass("scrollShrink");
        }

    });
}


function toggleMobileMenu(){
    $(".mobileMenuBtn").click(function(){
        $(".mobileMenu").toggleClass("mobieMenuHidden");

        //Change the word "Menu" to "Close", if it is open
        if($('.mobileMenuBtn').html() =="Menu"){
            $('.mobileMenuBtn').html("Close");
        }
        else{
            $('.mobileMenuBtn').html("Menu");
        }

    });
}




/*-Methods for Calculator-*/

function checkCurrencySelection(){

    //Check if one of the dropdowns have changed
    $("select").change(function(){

        //Check if they have the same value
        if($("#selectFrom").val()==$("#selectTo").val()){

            //check which Dropdown it is and send the other the previous value
            if($(this).attr('id')=="selectFrom"){
                $("#selectTo").val(prevValFrom);
            }
            else{
                $("#selectFrom").val(prevValTo);
            }
            
        }

        //Save again the new values
        prevValFrom = $("#selectFrom").val();
        prevValTo = $("#selectTo").val();

    });
}

//Get the exchange rate based on selection
function getCurrentExcangeRate() {
    if(prevValFrom == "EUR" && prevValTo=="USD"){
        return EuroToUSD;
    }
    else if(prevValFrom == "USD" && prevValTo=="EUR"){
        return USDToEuro;
    }
}

//If convert button is triggered or pressed Enter, currency will be converted
function convertCurrency(){
    var result = $("#amount").val()*getCurrentExcangeRate();

    //Check if Result is a number. Otherwise clear input and mark it as issue
    if($.isNumeric($("#amount").val())==false){
        $("#amount").val("");
        $("#amount").addClass("amountIssue");
    }

    printResults(result);
}


function printResults(result){
    $("#convertedNumber").html(result.toFixed(2));
    $("#currency").html($("#selectTo").val());
    $("#exchangeRate").html("Exchange rate: 1 "+$("#selectFrom").val()+" = "+getCurrentExcangeRate().toFixed(5)+" "+$("#selectTo").val());
}




/* iOS Hover Fix - To make active style is working*/
var iOSHoverFix = function () {

    $('*').on('touchstart', function () {
        $(this).trigger('hover');

    });
    $('*').on('touchend', function () {
        $(this).trigger('mouseleave');

    });
};

iOSHoverFix();