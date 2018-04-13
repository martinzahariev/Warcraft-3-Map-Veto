// =====================================================================================================================
// Global Variable Declaration

const selectBoxes = document.querySelectorAll(".selectBox");
const selects = document.querySelectorAll(".select");
const alternativeElements = document.querySelectorAll(".alternatives");
const gameModeAlts = document.querySelectorAll(".game-mode .wrapper div");
const gameMapsWrap = document.querySelector(".game-maps .wrapper");
const gameLengthAlts = document.querySelectorAll(".game-length .wrapper div");
const gameVetoWrap = document.querySelector(".game-veto .wrapper");
const startVetoBtn = document.querySelector("#startVeto");
let vetoData = [];
let mapData = [];

// =====================================================================================================================
// Arrays

const mapNames =
    [
        ["1v1 Maps", "(2) Terenas Stand", "(2) Plunder Isle", "(2) The Two Rivers", "(2) Road To Stratholme", "(2) Echo Isles", "(2) Ancient Isles", "(2) Tirisfal Glades", "(2) Amazonia", "(2) Last Refuge", "(4) Foodplains 1v1", "(4) Twisted Meadows", "(4) Turtle Rock"],
        ["2v2 Maps", "(4) Phantom Grove", "(4) Avalanche", "(4) Turtle Rock", "(4) Duskwood", "(4) Bridge Too Near", "(4) Frozen Clover", "(4) Tidewater Glades", "(4) Lost Temple", "(4) Twisted Meadows", "(6) Duststorm", "(6) Gnoll Wood"],
        ["3v3 Maps", "(6) Thunder Lake", "(6) Gnoll Wood", "(6) Monsoon", "(6) Dark Forest", "(6) Upper Kingdom", "(6) Ruins Of Stratholme", "(8) Mur’gul Oasis", "(6) Rolling Hills", "(6) Timbermaw Hold", "(6) Stranglethorn Vale", "(8) Battleground"],
        ["4v4 Maps", "(8) Feralas", "(8) Northshire", "(8) Sanctuary", "(8) Twilight Ruins", "(8) Battleground", "(8) Deadlock", "(8) Golems In The Mist", "(8) Mur’gul Oasis", "(8) Market Square", "(8) Gold Rush", "(8) Friends", "(8) Blasted Lands"]
    ];
const mapIDs =
    [
        ["map_TerenasStand", "map_PlunderIsle", "map_TheTwoRivers", "map_RoadToStratholme", "map_EchoIsles", "map_AncientIsles", "map_TirisfalGlades", "map_Amazonia", "map_LastRefuge", "map_Foodplains1v1", "map_TwistedMeadows", "map_TurtleRock"],
        ["map_PhantomGrove", "map_Avalanche", "map_TurtleRock", "map_Duskwood", "map_BridgeTooNear", "map_FrozenClover", "map_TidewaterGlades", "map_LostTemple", "map_TwistedMeadows", "map_Duststorm", "map_GnollWood"],
        ["map_ThunderLake", "map_GnollWood", "map_Monsoon", "map_DarkForest", "map_UpperKingdom", "map_RuinsOfStratholme", "map_MurgulOasis", "map_RollingHills", "map_TimbermawHold", "map_StranglethornVale", "map_Battleground   "],
        ["map_Feralas", "map_Northshire", "map_Sanctuary", "map_TwilightRuins", "map_Battleground", "map_Deadlock", "map_GolemsInTheMist", "map_MurgulOasis", "map_MarketSquare", "map_GoldRush", "map_Friends", "map_BlastedLands"]
    ];

const vetoes =
    [
        ["Ban | Ban | Ban | Last", "Ban | Ban | Random", "Ban | Random", "Random"],
        ["Ban | Ban | Pick | Last", "Ban | Pick | Ban | Last", "Ban | Pick | Random", "Ban | Ban | Random", "Ban | Random", "Pick | Random", "All Random"],
        ["Ban | Pick | Pick | Last", "Pick | Ban | Pick | Last", "Pick | Pick | Ban | Last", "Pick | Pick | Random", "All Random"]
    ];

// =====================================================================================================================
// On click Events

selectBoxes[0].addEventListener("click", () =>
{
    showAlternatives(alternativeElements[0], selects[0]);
    for(let i = 0; i < gameModeAlts.length; i++) {gameModeAlts[i].onclick = () => {gameMapsWrap.innerHTML = gameModeSelect(gameModeAlts[i], mapNames[i], mapIDs[i], selects[0], alternativeElements[0]);}}
});
selectBoxes[1].addEventListener("click", () =>
{
    showAlternatives(alternativeElements[1], selects[1]);
    for(let i = 0; i < vetoes.length; i++) {gameLengthAlts[i].onclick = () => {gameVetoWrap.innerHTML = gameLengthSelect(gameLengthAlts[i], vetoes[i], selects[1], alternativeElements[1])}}
});
selectBoxes[2].addEventListener("click", () =>
{
    showAlternatives(alternativeElements[2], selects[2]);
    for(let i = 0; i < document.querySelectorAll(".game-maps .wrapper label").length; i++)
    {
        const elements = document.querySelectorAll(".game-maps .wrapper label");
        elements[i].onclick = () => {gameMapSelect(selects[2], alternativeElements[2])}
    }
});

selectBoxes[3].addEventListener("click", () =>
{
    showAlternatives(alternativeElements[3], selects[3]);
    for(let i = 0; i < document.querySelectorAll(".game-veto .wrapper div").length; i++)
    {
        const elements = document.querySelectorAll(".game-veto .wrapper div");
        elements[i].onclick = () => {gameVetoSelect(elements[i], selects[3], alternativeElements[3])}
    }
});

startVetoBtn.addEventListener("click", () =>
{
    startVeto(vetoData, mapData);
});

// =====================================================================================================================
// Show Alternatives

function showAlternatives(alternatives, select)
{
    if (alternatives.style.display === "none" || alternatives.style.display === "")
    {
        alternatives.style.display = "block";
        select.style.background = "#AC2226";
        select.style.color = "#F2EFE4";
    }
    else if (alternatives.style.display === "block")
    {
        alternatives.style.display = "none";
        select.style.background = "transparent";
        select.style.color = "#5E473D";
    }
}
// =====================================================================================================================
// Game Mode Select

function gameModeSelect(e, names, ids, btn, alternatives)
{
        btn.textContent = `Mode: ${e.textContent}`;
        let output = `<div class="groups">${names[0]}</div>`;
        for(let i = 1; i < names.length; i++)
        {
            output += `<label for="${ids[i-1]}"><input type="checkbox" id="${ids[i-1]}"> ${names[i]}</label>`;
        }
        output += `<div class="groups">Please select 7 maps to create a map pool.</div>`;
        alternatives.style.display = "none";
        btn.style.background = "transparent";
        btn.style.color = "#5E473D";
        vetoData[0] = e.textContent;
        return output;
}

// =====================================================================================================================
// Game Length Select

function gameLengthSelect(e, vetoes, btn, alternatives)
{
    btn.textContent = `Length: ${e.textContent}`;
    let output = "";
    for(let i = 0; i < vetoes.length; i++)
    {
        output += `<div>${vetoes[i]}</div>`;
    }
    alternatives.style.display = "none";
    btn.style.background = "transparent";
    btn.style.color = "#5E473D";
    vetoData[1] = e.textContent;
    return output;
}

// =====================================================================================================================
// Game Map Select

function gameMapSelect(btn, alternatives)
{
    const messageBox = document.querySelectorAll(".game-maps .wrapper div")[1];
    btn.textContent = `Maps: ${document.querySelectorAll(".game-maps .wrapper input:checked").length}/7`;
    if(document.querySelectorAll(".game-maps .wrapper input:checked").length < 7)
    {
        messageBox.textContent = `Please select 7 maps to create a map pool.`;
        messageBox.style.color = "#CB8C1D";
    }
    else if(document.querySelectorAll(".game-maps .wrapper input:checked").length === 7)
    {
        messageBox.textContent = `You have selected 7 maps for your map pool.`;
        messageBox.style.color = "green";
        alternatives.style.display = "none";
        btn.style.background = "transparent";
        btn.style.color = "#5E473D";
        let tempArray = [];
        for(let i = 0; i < document.querySelectorAll(".game-maps .wrapper input:checked").length; i++)
        {
            tempArray.push(document.querySelectorAll(".game-maps .wrapper input:checked")[i].parentElement.textContent);
            tempArray.push(document.querySelectorAll(".game-maps .wrapper input:checked")[i].id);
        }
        vetoData[2] = tempArray;
    }
    else if(document.querySelectorAll(".game-maps .wrapper input:checked").length > 7)
    {
        messageBox.textContent = `You have selected too many maps. Please select only 7 to create a map pool.`;
        messageBox.style.color = "#CB8C1D";
    }

}

// =====================================================================================================================
// Game Veto Select

function gameVetoSelect(e, btn, alternatives)
{
    const elements = document.querySelectorAll(".game-veto .wrapper div");
    for(let i = 0; i < elements.length; i++)
    {
        elements[i].style.background = "#F2EFE4";
        elements[i].style.color = "#5E473D";
    }
    e.style.background = "#AC2226";
    e.style.color = "#F2EFE4";
    alternatives.style.display = "none";
    btn.style.background = "transparent";
    btn.style.color = "#5E473D";
    btn.textContent = "Veto: Selected";
    vetoData[3] = e.textContent.split(" | ");
}

function startVeto (data)
{
    console.log(data)
}