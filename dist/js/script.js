"use strict";

// =====================================================================================================================
// Global Variable Declaration

var selectBoxes = document.querySelectorAll(".selectBox");
var selects = document.querySelectorAll(".select");
var alternativeElements = document.querySelectorAll(".alternatives");
var gameModeAlts = document.querySelectorAll(".game-mode .wrapper div");
var gameMapsWrap = document.querySelector(".game-maps .wrapper");
var gameLengthAlts = document.querySelectorAll(".game-length .wrapper div");
var gameVetoWrap = document.querySelector(".game-veto .wrapper");
var startVetoBtn = document.querySelector(".veto-start .select");
var vetoData = [];

// =====================================================================================================================
// Arrays

var mapNames = [["1v1 Maps", "(2) Terenas Stand", "(2) Plunder Isle", "(2) The Two Rivers", "(2) Road To Stratholme", "(2) Echo Isles", "(2) Ancient Isles", "(2) Tirisfal Glades", "(2) Amazonia", "(2) Last Refuge", "(4) Floodplains 1v1", "(4) Twisted Meadows", "(4) Turtle Rock"], ["2v2 Maps", "(4) Phantom Grove", "(4) Avalanche", "(4) Turtle Rock", "(4) Duskwood", "(4) Bridge Too Near", "(4) Frozen Clover", "(4) Tidewater Glades", "(4) Lost Temple", "(4) Twisted Meadows", "(6) Duststorm", "(6) Gnoll Wood"], ["3v3 Maps", "(6) Thunder Lake", "(6) Gnoll Wood", "(6) Monsoon", "(6) Dark Forest", "(6) Upper Kingdom", "(6) Ruins Of Stratholme", "(6) Rolling Hills", "(6) Timbermaw Hold", "(6) Stranglethorn Vale", "(8) Battleground", "(8) Mur’gul Oasis"], ["4v4 Maps", "(8) Feralas", "(8) Northshire", "(8) Sanctuary", "(8) Twilight Ruins", "(8) Battleground", "(8) Deadlock", "(8) Golems In The Mist", "(8) Mur’gul Oasis", "(8) Market Square", "(8) Gold Rush", "(8) Friends", "(8) Blasted Lands"]];
var mapIDs = [["map_TerenasStand", "map_PlunderIsle", "map_TheTwoRivers", "map_RoadToStratholme", "map_EchoIsles", "map_AncientIsles", "map_TirisfalGlades", "map_Amazonia", "map_LastRefuge", "map_Floodplains1v1", "map_TwistedMeadows", "map_TurtleRock"], ["map_PhantomGrove", "map_Avalanche", "map_TurtleRock", "map_Duskwood", "map_BridgeTooNear", "map_FrozenClover", "map_TidewaterGlades", "map_LostTemple", "map_TwistedMeadows", "map_Duststorm", "map_GnollWood"], ["map_ThunderLake", "map_GnollWood", "map_Monsoon", "map_DarkForest", "map_UpperKingdom", "map_RuinsOfStratholme", "map_RollingHills", "map_TimbermawHold", "map_StranglethornVale", "map_Battleground", "map_MurgulOasis"], ["map_Feralas", "map_Northshire", "map_Sanctuary", "map_TwilightRuins", "map_Battleground", "map_Deadlock", "map_GolemsInTheMist", "map_MurgulOasis", "map_MarketSquare", "map_GoldRush", "map_Friends", "map_BlastedLands"]];

var vetoes = [["Ban | Ban | Ban | Last", "Ban | Ban | Random", "Ban | Random", "Random"], ["Ban | Ban | Pick | Last", "Ban | Pick | Ban | Last", "Ban | Pick | Random", "Ban | Ban | Random", "Ban | Random", "Random"], ["Ban | Pick | Pick | Last", "Pick | Ban | Pick | Last", "Pick | Pick | Ban | Last", "Random"]];

// =====================================================================================================================
// On click Events

selectBoxes[0].addEventListener("click", function () {
    showAlternatives(alternativeElements[0], selects[0]);

    var _loop = function _loop(i) {
        gameModeAlts[i].onclick = function () {
            gameMapsWrap.innerHTML = gameModeSelect(gameModeAlts[i], mapNames[i], mapIDs[i], selects[0], alternativeElements[0]);
        };
    };

    for (var i = 0; i < gameModeAlts.length; i++) {
        _loop(i);
    }
});
selectBoxes[1].addEventListener("click", function () {
    showAlternatives(alternativeElements[1], selects[1]);

    var _loop2 = function _loop2(i) {
        gameLengthAlts[i].onclick = function () {
            gameVetoWrap.innerHTML = gameLengthSelect(gameLengthAlts[i], vetoes[i], selects[1], alternativeElements[1]);
        };
    };

    for (var i = 0; i < vetoes.length; i++) {
        _loop2(i);
    }
});
selectBoxes[2].addEventListener("click", function () {
    showAlternatives(alternativeElements[2], selects[2]);
    for (var i = 0; i < document.querySelectorAll(".game-maps .wrapper label").length; i++) {
        var elements = document.querySelectorAll(".game-maps .wrapper label");
        elements[i].onclick = function () {
            gameMapSelect(selects[2], alternativeElements[2]);
        };
    }
});

selectBoxes[3].addEventListener("click", function () {
    showAlternatives(alternativeElements[3], selects[3]);

    var _loop3 = function _loop3(i) {
        var elements = document.querySelectorAll(".game-veto .wrapper div");
        elements[i].onclick = function () {
            gameVetoSelect(elements[i], selects[3], alternativeElements[3]);
        };
    };

    for (var i = 0; i < document.querySelectorAll(".game-veto .wrapper div").length; i++) {
        _loop3(i);
    }
});

startVetoBtn.addEventListener("click", function () {
    startVeto(vetoData);
});

// =====================================================================================================================
// Show Alternatives

function showAlternatives(alternatives, select) {
    if (alternatives.style.display === "none" || alternatives.style.display === "") {
        alternatives.style.display = "block";
        select.style.background = "#AC2226";
        select.style.color = "#F2EFE4";
    } else if (alternatives.style.display === "block") {
        alternatives.style.display = "none";
        select.style.background = "transparent";
        select.style.color = "#5E473D";
    }
}
// =====================================================================================================================
// Game Mode Select

function gameModeSelect(e, names, ids, btn, alternatives) {
    btn.textContent = "Mode: " + e.textContent;
    var output = "<div class=\"groups\">" + names[0] + "</div>";
    for (var i = 1; i < names.length; i++) {
        output += "<label for=\"" + ids[i - 1] + "\"><input type=\"checkbox\" id=\"" + ids[i - 1] + "\"> " + names[i] + "</label>";
    }
    output += "<div class=\"groups\">Please select 7 maps to create a map pool.</div>";
    alternatives.style.display = "none";
    btn.style.background = "transparent";
    btn.style.color = "#5E473D";
    return output;
}

// =====================================================================================================================
// Game Length Select

function gameLengthSelect(e, vetoes, btn, alternatives) {
    btn.textContent = "Length: " + e.textContent;
    var output = "";
    for (var i = 0; i < vetoes.length; i++) {
        output += "<div>" + vetoes[i] + "</div>";
    }
    alternatives.style.display = "none";
    btn.style.background = "transparent";
    btn.style.color = "#5E473D";
    vetoData[2] = +e.textContent.split("")[2];
    return output;
}

// =====================================================================================================================
// Game Map Select

function gameMapSelect(btn, alternatives) {
    var messageBox = document.querySelectorAll(".game-maps .wrapper div")[1];
    btn.textContent = "Maps: " + document.querySelectorAll(".game-maps .wrapper input:checked").length + "/7";
    if (document.querySelectorAll(".game-maps .wrapper input:checked").length < 7) {
        messageBox.textContent = "Please select 7 maps to create a map pool.";
        messageBox.style.color = "#CB8C1D";
    } else if (document.querySelectorAll(".game-maps .wrapper input:checked").length === 7) {
        messageBox.textContent = "You have selected 7 maps for your map pool.";
        messageBox.style.color = "green";
        alternatives.style.display = "none";
        btn.style.background = "transparent";
        btn.style.color = "#5E473D";
        var tempArray = [];
        for (var i = 0; i < document.querySelectorAll(".game-maps .wrapper input:checked").length; i++) {
            tempArray.push(document.querySelectorAll(".game-maps .wrapper input:checked")[i].id);
        }
        vetoData[0] = tempArray;
    } else if (document.querySelectorAll(".game-maps .wrapper input:checked").length > 7) {
        messageBox.textContent = "You have selected too many maps. Please select only 7 to create a map pool.";
        messageBox.style.color = "#CB8C1D";
    }
}

// =====================================================================================================================
// Game Veto Select

function gameVetoSelect(e, btn, alternatives) {
    var elements = document.querySelectorAll(".game-veto .wrapper div");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background = "#F2EFE4";
        elements[i].style.color = "#5E473D";
    }
    e.style.background = "#AC2226";
    e.style.color = "#F2EFE4";
    alternatives.style.display = "none";
    btn.style.background = "transparent";
    btn.style.color = "#5E473D";
    btn.textContent = "Veto: Selected";
    vetoData[1] = e.textContent.split(" | ");
}

// =====================================================================================================================
// Start Veto

function startVeto(data) {
    console.log(data);
    var output = "";
    for (var i = 0; i < data[0].length; i++) {
        output += "<div class=\"maps\"><div></div></div>";
    }
    document.querySelector(".vetoes").innerHTML = output;
    var maps = document.querySelectorAll(".vetoes .maps");
    for (var _i = 0; _i < document.querySelectorAll(".vetoes .maps").length; _i++) {
        maps[_i].style.background = "url(img/" + data[0][_i] + ".png)";
        maps[_i].style.webkitBackgroundSize = "cover";
        maps[_i].style.backgroundSize = "cover";
    }
    var vetoCount = 0;

    var _loop4 = function _loop4(_i2) {
        maps[_i2].addEventListener("click", function () {
            if (vetoCount < 2) {
                if (data[1][0] === "Random") {
                    selectRandom();
                } else {
                    maps[_i2].childNodes[0].className += " " + data[1][0];
                    maps[_i2].childNodes[0].innerHTML = "" + data[1][0];
                }
            } else if (vetoCount < 4) {
                if (data[1][1] === "Random") {
                    selectRandom();
                } else {
                    maps[_i2].childNodes[0].className += " " + data[1][1];
                    maps[_i2].childNodes[0].innerHTML = "" + data[1][1];
                }
            } else if (vetoCount < 6) {
                if (data[1][2] === "Random") {
                    selectRandom();
                } else {
                    maps[_i2].childNodes[0].className += " " + data[1][2];
                    maps[_i2].childNodes[0].innerHTML = "" + data[1][2];
                }
            }
            vetoCount++;
            if (vetoCount === 6) {
                for (var _i6 = 0; _i6 < maps.length; _i6++) {
                    if (maps[_i6].childNodes[0].innerHTML === "") {
                        maps[_i6].childNodes[0].className += " Pick";
                        maps[_i6].childNodes[0].innerHTML = "Pick";
                    }
                }
            }
        });
    };

    for (var _i2 = 0; _i2 < maps.length; _i2++) {
        _loop4(_i2);
    }
    function selectRandom() {
        var nums = [];
        for (var _i3 = 0; _i3 < maps.length; _i3++) {
            if (maps[_i3].childNodes[0].innerHTML === "") {
                nums.push(_i3);
                maps[_i3].childNodes[0].className += " Ban";
                maps[_i3].childNodes[0].innerHTML = "Ban";
            }
        }
        if (data[2] === 1) {
            var rdm = nums[Math.floor(Math.random() * nums.length)];
            maps[rdm].childNodes[0].className += " Pick";
            maps[rdm].childNodes[0].innerHTML = "Pick";
        }
        if (data[2] === 3) {
            if (nums.length === 5 || nums.length === 7) {
                for (var _i4 = 0; _i4 < 3; _i4++) {
                    var _rdm = nums[Math.floor(Math.random() * nums.length)];
                    if (maps[_rdm].childNodes[0].innerHTML === "Pick") {
                        _i4--;continue;
                    }
                    maps[_rdm].childNodes[0].className += " Pick";
                    maps[_rdm].childNodes[0].innerHTML = "Pick";
                }
            } else if (nums.length === 3) {
                var _rdm2 = nums[Math.floor(Math.random() * nums.length)];
                maps[_rdm2].childNodes[0].className += " Pick";
                maps[_rdm2].childNodes[0].innerHTML = "Pick";
            }
        }
        if (data[2] === 5) {
            if (nums.length === 7) {
                for (var _i5 = 0; _i5 < 5; _i5++) {
                    var _rdm3 = nums[Math.floor(Math.random() * nums.length)];
                    if (maps[_rdm3].childNodes[0].innerHTML === "Pick") {
                        _i5--;continue;
                    }
                    maps[_rdm3].childNodes[0].className += " Pick";
                    maps[_rdm3].childNodes[0].innerHTML = "Pick";
                }
            }
        }
    }
}
//# sourceMappingURL=script.js.map