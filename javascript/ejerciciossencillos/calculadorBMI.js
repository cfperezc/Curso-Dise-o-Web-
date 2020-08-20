function bmiCalculator (weight, height) {
    
    var bmi=weight/Math.pow(height,2);
    var interpretation;
    if(bmi<18.5){
        var mensaje1="Su BMI es"+ bmi + ", esta por debajo de su peso ideal.";
        interpretation = mensaje1;
    }
    if(bmi>=18.5 && bmi <= 24.9){
        var mensaje2="Su BMI es"+ bmi + ", esta en peso normal.";
        interpretation = mensaje2;
    }
    if(bmi>24.9){
        var mensaje3="Su BMI es"+ bmi + ", tiene Sobrepeso.";
        interpretation = mensaje3;    
    }
    
    return interpretation;
}
