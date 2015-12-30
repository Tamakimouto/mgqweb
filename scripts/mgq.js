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

    Luka = new Character("Luka", {color: "rgb(169, 131, 189)"});
    Alice = new Character("Alice", {color: "rgb(94, 86, 106)"});
    narrator = new Character("");

    center = new Position(0.5, 0.7, 0.5, 0.5);
    upperCenter = new Position(0.5, 0.3, 0.5, 0.5);
    left = new Position(0.1, 0.7, 0.5, 0.5);
    right = new Position(0.9, 0.7, 0.5, 0.5);

    item = new Character("", {position: upperCenter});
    text = new TextBlock("");

    script = [
        label, "start",
        scene, "title.jpg",
        audio, {src: "title", format: ["ogg", "wav"], action: "play"},

        label, "titleMenu",
        menu, [
            "MGQ - The Web Version",
            "New Game", [jump, "new"],
            "Load Game", [jump, "notNew"],
        ],

        label, "new",
        scene, "title.jpg",

        label, "notNew",
        scene, "title.jpg",
    ];
}
