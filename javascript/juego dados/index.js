var randomNumber1= Math.floor(Math.random()*6);
randomNumber1 +=1;

var fuente1="images/dice"+randomNumber1+".png";
document.querySelector(".img1").setAttribute("src",fuente1);

var randomNumber2= Math.floor(Math.random()*6);
randomNumber2 +=1;
var fuente2="images/dice"+randomNumber2+".png";
document.querySelector(".img2").setAttribute("src",fuente2);

///Seleccion ganador 

if(randomNumber1>randomNumber2){
    document.querySelector("h1").textContent="🚩Jugador 1 Gana";
}
else if(randomNumber2>randomNumber1){
    document.querySelector("h1").textContent="Jugador 2 Gana🚩";
}
else{
    document.querySelector("h1").textContent="Empate";
}