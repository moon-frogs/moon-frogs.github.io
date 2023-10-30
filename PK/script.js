let director = 0;
let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");
let oppName = document.getElementById("oppName");
let oppLevel = document.getElementById("oppLevel");
let oppBar = document.getElementById("oppBar");
let oppHealth = document.getElementById("oppHealth");
let oppImg = document.getElementById("oppImg");
let bImg = document.getElementById("bImg");
let bName = document.getElementById("bName");
let bLevel = document.getElementById("bLevel");
let bBar = document.getElementById("bBar");
let bHealth = document.getElementById("bHealth");
let battleScreen = document.getElementById("battle");

battleScreen.style.display = "none";
let temp = document.getElementById("temp");

function tempRender(){
    TestpokemonBuilder();
    let player = party[ps];
    oppName.textContent = oppenent.name;
    oppLevel.textContent = `level: ${oppenent.level}`;
    oppBar.ariaValueMax = oppenent.maxhp;
    oppBar.value = Math.round(oppenent.hp/oppenent.maxhp*100);
    oppHealth.textContent = `${oppenent.hp}/${oppenent.maxhp}`;
    bName.textContent = player.name;
    bBar.ariaValueMax = player.maxhp;
    bBar.value = Math.round(player.hp/player.maxhp*100);
    bHealth.textContent = `${player.hp}/${player.maxhp}`;


    temp.style.display = "none";
    battleScreen.style.display = "block";

}

class Move {
    constructor(name, type, effect, damage, accuracy){
        this.name = name;
        this.type = type;
        this.effect = effect;
        this.damage = damage;
        this.accuracy = accuracy;
    }

}
let oppenent;
let ps = 0;
let party = [];
function TestpokemonBuilder(){
    let tackle = new Move("tackle", "normal","damage", 40, 100);
    let nuzzle = new Move("nuzzle", "eletric", "damage", 20, 100);
    let eMoveset = [tackle];
    let ehealth = Math.floor(0.01*2*65*6)+6+10;
    let phealth = Math.floor(0.01*2*35*5)+5+10;
    let pMoveset = [nuzzle];
    let eevee = new Pokemon("Eevee", 6, eMoveset, ehealth, "normal");
    let pikachu = new Pokemon("Pikachu", 5, pMoveset, phealth, "electric");
    oppenent = pikachu;
    party.push(eevee);

}

class Pokemon {
    constructor(name, level, moves, maxhp, type){
        this.name = name;
        this.level = level;
        this.moves = moves;
        this.maxhp = maxhp;
        this.hp = maxhp;
        this.type = type;
    }
}


function buttons(x){
    if (x == 0){
        if (director == 0){
            b1.textContent = "";
            b2.textContent = "";
            b3.textContent = "";
            b4.textContent = "";
            b1.textContent = party[ps].moves[0].name;
            b2.textContent = party[ps].moves[1].name;
            b2.textContent = party[ps].moves[2].name;
            b2.textContent = party[ps].moves[3].name;
        }
    } else if (x == 1){

    } else if (x ==2){
            
    } else if (x ==3){
            
    }
}