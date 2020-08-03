function bmiCalculator (weight, height) {
    
    var bmi=weight/Math.pow(height,2);
    var interpretation;
    if(bmi<18.5){
        var mensage1="Your BMI is"+ bmi + ", so you are underweight.";
        interpretation = mensage1;
    }
    if(bmi>=18.5 && bmi <= 24.9){
        var mensage2="Your BMI is"+ bmi + ", so you have a normal weight.";
        interpretation = mensage2;
    }
    if(bmi>24.9){
        var mensage3="Your BMI is"+ bmi + ", so you are overweight.";
        interpretation = mensage3;    
    }
    
    return interpretation;
}