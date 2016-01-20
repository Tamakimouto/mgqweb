var imgNames = [
    "title.jpg"
];

var preload = new Array(imgNames.length);
for (var i = 0; i < preload.length; i++) {
    preload[i] = new Image();
    preload[i].src = "../img/" + imgNames[i];
}

var script;

var Luka, Alice, narrator, item;
var center, upperCenter, left, right;
var text;

function prepareNovel()
{
    novel.imagePath = "img/";
    novel.audioPath = "ost/";

    luka = new Character("Luka", {color: "rgb(169, 131, 189)"});
    alice = new Character("Alice", {color: "rgb(94, 86, 106)"});
    ilias = new Character("Ilias", {color: "rgb(255, 247, 214)"});
    narrator = new Character("");
    mystery = new Character("???");

    center = new Position(0.0, 0.0, 0.0, 0.0);
    upperCenter = new Position(0.5, 0.3, 0.5, 0.5);
    left = new Position(0.1, 0.7, 0.5, 0.5);
    right = new Position(0.9, 0.7, 0.5, 0.5);

    item = new Character("", {position: upperCenter});
    text = new TextBlock("");

    script = [
        label, "start",
        scene, "title.jpg",
        audio, {src: "title", format: ["ogg"], action: "play"},

        label, "titleMenu",
        menu, [
            "",
            "Start Game", [jump, "new"],
        ],

        label, "new",
        jsCall, {fcn: transStart, params: []},
        audio, {action: "stop"},
        scene, "heaven.jpg",
        jsCall, {fcn: transEnd, params: []},
        jsCall, {fcn: toggleDialog, params: []},
        narrator, "Where am I...?",
        narrator, "A soft light fills the area, giving the atmosphere a solemn feel.",
        narrator, "...Is this a dream?",
        mystery, "Luka...",
        mystery, "Oh brave Luka...",
        narrator, "I hear a beautiful voice begin to call out to me.",
        ilias, {image:"ch/ilias.png", position: center},
        audio, {src: "ilias", format: ["ogg"], action: "play"},
        narrator, "The goddess Ilias suddenly appears before me!",
        ilias, "Oh brave Luka...can you hear my voice?",

        label, "IliasMeeting",
        menu, [
            "",
            "I can!", [jump, "confirmVoice"],
            "Nope", [jump, "denyVoice"],
            "....", [jump, "ignoreVoice"],
        ],

        label, "confirmVoice",
        luka, "I can hear you, Ilias!",
        narrator, "I begin to tremble at the sound of Ilias' voice.",
        narrator, "The goddess whom created the world, who extends her love to Humanity.",
        narrator, "With such an amazing figure appearing before me, it makes me want to dance!",
        narrator, "Even if it's just a dream...",
        ilias, "Many, many years ago, in a time man cannot comprehend, I created this world.",
        ilias, "First was the earth, sky and sea. <br> Then the animals, birds, and insects. <br> Finally, I created Humanity.",
        ilias, "Howver, I am not perfect. <br> While creating Humanity, I also had many failures...",
        ilias, "Those failures are monsters...a truly detestable existence.",
        ilias, "Monsters are nothing but evil. <br> They will seduce humans to commit forbidden acts. Sometimes even committing great acts of violence.",
        ilias, "Even though humans are weak, I still love them... <br> So I hate these monsters that bring them only harm.",
        ilias, "And you, Luka, have finally come of age today, have you not?",
        luka, "Yes...I have long been looking forward to this day!",
        narrator, "Today, I shall finally receive the baptism in Ilias' name. <br> After being baptized, I will be recognized as a Hero!",
        narrator, "Being a Hero has always been my dream, and finally the long awaited day has arrived! <br> Even though my village has been peaceful, I devoted all of my time to training with a sword.",
        narrator, "And finally! <br> The day when I shall finally become a Hero has come at last!",
        ilias, "Up until now, I have given my blessing and protection to many men... <br> However, the monsters still have not been exterminated.",
        ilias, "Not since Heinrich, 500 years ago, has a man been able to defeat a Monster Lord.",
        narrator, "The Hero Heinrich... <br> 500 years ago he was able to defeat a horribly cruel Monster Lord.",
        narrator, "With an attack that split the earth itself, he was able to slay the evil being. <br> Truly, a Hero among Heroes.",
        ilias, "But Luka... <br> You, too, have the potential to be able to defeat a Monster Lord!",
        luka, "...Eh? <br> I... I do?",
        ilias, "Now go, Luka! <br> I will always be watching over you....",
        jsCall, {fcn: transStart, params: []},
        jump, "freshStart",

        label, "freshStart",
        scene, "lukaHouse.jpg",
        audio, {src: "iliasville", format: ["ogg"], action: "play"},
        jsCall, {fcn: transEnd, params: []},
        luka, "I open my eyes to the soft light of the morning sun coming through the window.",

    ]; //script
}

function toggleDialog(){
    if ($("#dialogDiv").css("opacity") == 0)
        $("#dialogDiv").css("opacity", "0.75");
    else
        $("#dialogDiv").css("opacity", "0");
}

function transStart(){
    $("#novelDiv").css("-webkit-animation", "fadeOut ease-out 1");
    $("#novelDiv").css("-moz-animation", "fadeOut ease-out 1");
    $("#novelDiv").css("animation", "fadeOut ease-out 1");

    $("#novelDiv").css("-webkit-animation-fill-mode", "forwards");
    $("#novelDiv").css("-moz-animation-fill-mode", "forwards");
    $("#novelDiv").css("animation-fill-mode", "forwards");

    $("#novelDiv").css("-webkit-animation-duration", "1s");
    $("#novelDiv").css("-moz-animation-duration", "1s");
    $("#novelDiv").css("animation-duration", "1s");
}

function transEnd(){
    $("#novelDiv").css("-webkit-animation", "fadeIn ease-in 1");
    $("#novelDiv").css("-moz-animation", "fadeIn ease-in 1");
    $("#novelDiv").css("animation", "fadeIn ease-in 1");

    $("#novelDiv").css("-webkit-animation-fill-mode", "forwards");
    $("#novelDiv").css("-moz-animation-fill-mode", "forwards");
    $("#novelDiv").css("animation-fill-mode", "forwards");

    $("#novelDiv").css("-webkit-animation-duration", "2s");
    $("#novelDiv").css("-moz-animation-duration", "2s");
    $("#novelDiv").css("animation-duration", "2s");
}
