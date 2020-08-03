function juegofizz() {
    
    while(valor<= 100){

    
    if(valor%3 === 0 && valor%5 === 0){
        juego.push("fizzbuzz");
    }
    if(valor%3 === 0){
        juego.push("fizz");
        
    }else if(valor%5 === 0){
        juego.push("buzz");
       
    
    }else{
        juego.push(valor);
        
    }
    valor ++;
    }
    console.log(juego); 
    }
    
      var juego=[];
      var valor=1;