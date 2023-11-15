//let's start by importing my create deck and shuffle functions!
class Card{
    constructor(num, suit, Cname, Fname, cVer){
        this.num = num;
        this.suit = suit;
        this.Cname = Cname;
        this.Fname = Fname;
        this.cVer = cVer;
    }

}
let deck = [];
function newDeck(){
    for (let suit = 0; suit < 4; suit++){
        for(let number = 0; number < 13; number++){
            let suit1;
            if(suit == 0){
                suit1 = "Spades";
            } else if (suit == 1){
                suit1 = "Clubs";
            } else if (suit == 2){
                suit1 = "Hearts";
            } else if (suit == 3){
                suit1 = "Diamonds";
            }
            let name;
            let num = number+1;
            if (num == 1){
                name = "Ace";
            } else if (num == 11){
                name = "Jack";
            } else if (num == 12){
                name = "Queen";
            } else if (num == 13){
                name = "King";
            } else {
                name = num;
            }

            let Fname = `${name} of ${suit1}`;
            let card = new Card(num, suit1, name, Fname, true);
            deck.push(card);
        }
    }
    console.log(deck);
}

function shuffle(){
    let temp = [];
    for(let i = 0; i < 52; i++){
        let rand = Math.floor(Math.random()*(deck.length));
        temp.push(deck[rand]);
        let x = deck.splice(rand, 1);
        console.log(x, rand);
        if (x == undefined){
            console.log(x);
        }
    }
    deck = temp;
    console.log(deck);
}

//easy! now let's put in the two versions, and impliment the hooking software!

//HTML variables

let textBox = document.getElementById("textBox");
let displayID = document.getElementById("displayID");
let hostEle = document.getElementById("host");
let clientEle = document.getElementById("client");
let startEle = document.getElementById("start");
let cribBoard = document.getElementById("cribBoard");
let startCard = document.getElementById("startCard");
let SCInfo = document.getElementById("SCInfo");
let SCoppenentsCard = document.getElementById("SCoppenentsCard");
let startingCard = document.getElementById("startingCard");
let SCButton = document.getElementById("SCButton");
let connButton = document.getElementById("connButton");

//declaring hook application variables
var peer = new Peer();
let varid;
let conn;
let isHost;

//just getting the id :D
peer.on('open', function(id) {
    //puts the id into a variable to use later
    varid = id;
});

//is it the katie or papa version?
function userSelect(x){
    if (x == 1){
        isHost = true;
        away(startEle);
        here(hostEle);
        setUp();
    } else if (x == 2){
        isHost = false;
        away(startEle);
        here(clientEle);
        displayID.textContent = varid;
    }
}


function connect(x){
    if(isHost == true){
        let clID = textBox.value;
        conn = peer.connect(clID);
        away(connButton);
        hookem();
    } else if(isHost == false){
        conn = peer.connect(x);
        setInterval(ping(), 1000);
    }
    console.log("outgoing connection succesful!");
}

let isHook = 0;
let cliCard;
let hostCard;


//receive part
peer.on('connection', function(conn) {
    console.log("incoming connection!");
    conn.on('open', function() {
        // Receive messages
        conn.on('data', function(data) {
            if(isHost == true){
                console.log(data);
                if (data == "ping!"){
                    console.log("connection secure");
                    conn.send("pong!");
                    away(host);
                    here(startCard);
                    console.log("sent data");
                    sendData();
                } else if (data == "please"){
                    conn.send(gameData);

                }

                
            } else if (isHost == false){
                if (isHook == 0){
                    console.log("ID recived!");
                    //important!!!
                    connect(data);
                    isHook++;
                    away(displayID);
                    here(startCard);
                } else if (isHook == 1){
                    if(data == "pong!"){
                        away(client);
                        away(clID);
                        here(startCard);
                        conn.send("please");
                    }
                }
                
            }
            if (data.verify){
                gameData = data;
                console.log("gameData recieved");
                directory();
            } else {
                console.log("not data");
            }
            console.log(data);

            if (gameData.marker = "deal"){
                SCInfo.textContent = gameData.dealer;
                gameData.marker = "";
            }
        });
    });

});

//the actual hooking
function hookem(){
    setTimeout(() => {conn.send(varid)},2000);
    console.log("ID sent!");
}

//assuration of connection
function ping(){
    setTimeout(() => {conn.send("ping!")},2000);
    console.log("ping sent!");
}


function sendData(){
setTimeout(() => {conn.send(gameData), 2000});
}
//time saving stuff

//makes things appear
function here(x){
    x.style.display = "block";
}

//makes them dispear
function away(x){
    x.style.display = "none";
}


//make everything disapear at the start
away(clientEle);
away(hostEle);

//alright so now it's time for a point of no return, i'm at a section where i need to implement multiple systems at once, i can't test or debug until they're all complete so it's a point where i can't take any breaks and i just have to figure things out!

let gameData = {
    kPoints: 0,
    wPoints: 0,
    //stating the point counter
    deck: [],
    kHand: [],
    wHand: [],
    crib: [],
    cutCard: 0,
    //storing our hands
    dealer: "",
    //who's the dealer?
    gameState: 0,
    //what part of the game is it?
    kPeggingDeck: [],
    wPeggingDeck: [],
    peggingSum: 0,
    hData: "",
    cData: "",
    verify: true,
    instructions: 0,
    dealersTurn: true,
    marker: ""
 
}

function setUp(){
    newDeck();
    shuffle();
    shuffle();
    gameData.deck = deck;

}


//garbage, replace it, make a new system, add instructions to gameData, make it based on logic rather than a weird path of gussing
//make a translation thingy which decides what happens
/*
function drawOne(){
    if (isHost == true){
        let rand = deck[Math.round(Math.random()*52)];
        conn.send(rand);
    } else {
        let rand = deck[Math.round(Math.random()*52)];
        let cliCard = rand;
        if(hostCard){
            if (hostCard.num > cliCard.num){
                deal();
                gameData.dealer = "Katie";
                gameData.gameState = 1;
                conn.send(gameData);
            } else if (hostCard.num < cliCard.num){
                deal();
                gameData.dealer = "Papa";
                gameData.gameState = 1;
                conn.send(gameData);
            } else if (hostCard.num == cliCard.num){
                deal();
                gameData.dealer = "Papa";
                gameData.gameState = 1;
                conn.send(gameData);
            }

        }
    }
}

*/
//basically it will figure out what to do
function directory(){
    let instruct = gameData.instructions;

    if (instruct == 1){
        if (isHost == true){
            if(gameData.cData.cVer == true){
                SCoppenentsCard.textContent = gameData.cData.Fname;
            } 
        } else if (isHost == false){
            if(gameData.hData.cVer == true){
                SCoppenentsCard.textContent = gameData.hData.Fname;
            }
        }
        if (gameData.cData.cVer == true && gameData.hData.cVer == true){

            if (gameData.cData.num > gameData.hData.num){
                gameData.dealer = "Papa";
                SCInfo.textContent = "Papa is dealer";
            } else if (gameData.cData.num < gameData.hData.num){
                gameData.dealer = "Katie";
                SCInfo.textContent = "Katie is dealer";
            } else if (gameData.cData.num == gameData.hData.num){
                instruct = 0.5;
                gameData.cData = "";
                gameData.hData = "";
                conn.send(gameData);
                directory();
            }

        }
        if (gameData.dealer == "Papa" || gameData.dealer == "Katie"){
            gameData.marker = "deal";
            conn.send(gameData);
            gameData.marker = "";
        }
    }

    if(instruct == 0.5){
        //this means they tied, somehow reset it?
        SCInfo.textContent = "cards match, draw again.";
    }
}
function drawOne(){
    let rand = Math.round(Math.random()*gameData.deck.length);
    console.log(rand);
    if(isHost == true){
        hostCard = gameData.deck[rand];
        gameData.hData = hostCard;
        console.log(hostCard);
        startingCard.textContent = hostCard.Fname;
    } else if (isHost == false){
        cliCard = gameData.deck[rand];
        gameData.cData = cliCard;
        startingCard.textContent = cliCard.Fname;

    }
    gameData.instructions = 1;
    conn.send(gameData);
    away(SCButton);
}

away(startCard);