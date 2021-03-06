var imgNames = [
    "title.jpg", "black.jpg", "heaven.jpg", "hometown.jpg", "inn.jpg", "woods.jpg",
    "lukaHouse.jpg", "dialog.png", "hometown.jpg", "man.png", "slime1.png", "youngan.png",
    "obasan.png", "ilias.png"
];

var preload = new Array(imgNames.length);
for (var i = 0; i < preload.length; i++) {
    preload[i] = new Image();
    preload[i].src = "../img/" + imgNames[i];
}

var script;

var Luka, Alice, narrator, item;
var center, upperCenter, left, right, monDefault;
var codeBox, mSwitch = 0;
var loadTarget, input;

var hans, farmer, child, mystery, woman, betty;

var slime;

function prepareNovel()
{
    novel.imagePath = "img/";
    novel.audioPath = "ost/";

    luka = new Character("Luka", {color: "rgb(169, 131, 189)"});
    ilias = new Character("Ilias", {color: "rgb(255, 247, 214)"});
    villager = new Character("Villager", {color: "rgb(168, 30, 200)"});
    woman = new Character("Woman", {color: "pink"});
    man = new Character("Man", {color: "blue"});
    farmer = new Character("Farmer", {color: "blue"});
    child = new Character("Child", {color: "rgb(34, 76, 80)"});
    hans = new Character("Hans", {color: "blue"});
    betty = new Character("Betty", {color: "pink"});
    narrator = new Character("");
    mystery = new Character("???");

    alice = new Character("Alice", {color: "rgb(94, 86, 106)"});
    slime = new Character("Slime Girl", {color: "rgb(120, 42, 100)"});

    center = new Position(0.0, 0.0, 0.0, 0.0);
    upperCenter = new Position(0.5, 0.3, 0.5, 0.5);
    left = new Position(0.1, 0.7, 0.5, 0.5);
    right = new Position(0.9, 0.7, 0.5, 0.5);
    monDefault = new Position(0.5, 0.5, 0.5, 0.5);

    item = new Character("", {position: upperCenter});
    inputBox = new Input('continueCode',
                      {
                          position: new Position(0.25, 0.6),
                          width: 0.5,
                          text: "Insert Code Here"
                      });

    codeBox = new TextBlock("conCode",
                         {
                             color: "red",
                             font: "10pt Serif", align: "center",
                             width: 0.2,
                             position: new Position(0, 0)
                         });

    script = [
        label, "start",
        setVars, "loadTarget = 'start'",
        scene, "title.jpg",
        audio, {
            src: "title",
            format: ["ogg"],
            action: "play"
        },

        label, "titleMenu",
        menu, [
            "",
            "New Game", [jump, "new"],
            "Continue", [jump, "continue"],
        ],

        /* New Game */
        label, "new",
        setVars, "loadTarget = 'new'",
        audio, {action: "stop"},
        scene, {image: "heaven.jpg", effect: "fade"},
        codeBox, "Continue Code: {{loadTarget}}",
        jsCall, {
            fcn: toggleDialog,
            params: []
        },
        narrator, "Where am I...?",
        narrator, "A soft light fills the area, giving the atmosphere a solemn feel.",
        narrator, "...Is this a dream?",
        mystery, "Luka...",
        mystery, "Oh brave Luka...",
        narrator, "I hear a beautiful voice begin to call out to me.",
        ilias, {
            image:"ch/ilias.png",
            position: center
        },
        audio, {
            src: "ilias",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        narrator, "The goddess Ilias suddenly appears before me!",
        ilias, "Oh brave Luka...can you hear my voice?",
        jump, "IliasMeeting",

        /* Continue Code Option */
        label, "continue",
        ifStatement, "flip == 0",
        jsCall, {
            fcn: toggleDialog,
            params: []
        },
        endIf, "",
        narrator, "Enter the continue code in the area above.",
        inputBox, "",
        ifStatement, "typeof novel.labels[novel.userVar.continueCode] === 'undefined'",
        narrator, "That's not a valid code.",
        jump, "continue",
        elsePart, "",
        jump, "{{novel.userVar.continueCode}}",
        endIf, "",

        label, "IliasMeeting",
        hide, ilias,
        jsCall, {fcn: toggleDialog, params: []},
        menu, [
            "",
            "I can!", [jump, "confirmVoice"],
            "Nope", [jump, "denyVoice"],
            "....", [jump, "ignoreVoice"],
        ],

        label, "denyVoice",
        show, ilias,
        jsCall, {fcn: toggleDialog, params: []},
        ilias, "............... <br> Then why did you respond?",
        luka, "................",
        narrator, "She got me there...",
        jump, "confirm2",

        label, "ignoreVoice",
        ilias, {image:"ch/ilias2.png", position: center},
        show, ilias,
        jsCall, {fcn: toggleDialog, params: []},
        ilias, ".............",
        luka, ".............",
        ilias, "If you ignore me, I shall pass judgement on you. <br> Do you understand?",
        jsCall, {fcn: toggleDialog, params: []},
        hide, ilias,
        menu, [
            "",
            "Sorry", [jump, "confirm2"],
            ".....", [jump, "ignore2"],
        ],

        label, "ignore2",
        show, ilias,
        jsCall, {fcn: toggleDialog, params: []},
        ilias, "......",
        audio, {
            src: "se/spark",
            format: ["ogg"],
            action: "play",
            loop: false
        },
        narrator, "Lightning courses through my body, burning me all over.",
        narrator, "My consciousness slowly begins to fade...",
        jump, "reset1",

        label, "reset2",
        scene, {image: "black.jpg", effect: "fade"},
        setVars, "novel.userVar.runFlag = 0",
        jsCall, {fcn: toggleDialog, params: []},
        menu, [
            "",
            "Retry", [jump, "ignoreVoice"],
            "Title", [jump, "start"],
        ],

        label, "confirmVoice",
        show, ilias,
        jsCall, {fcn: toggleDialog, params: []},
        luka, "I can hear you, Ilias!",
        narrator, "I begin to tremble at the sound of Ilias' voice.",
        narrator, "The goddess whom created the world, who extends her love to Humanity.",
        narrator, "With such an amazing figure appearing before me, it makes me want to dance!",
        narrator, "Even if it's just a dream...",
        label, "confirm2",
        ilias, "Many, many years ago, in a time man cannot comprehend, I created this world.",
        ilias, "First was the earth, sky and sea. <br> Then the animals, birds, and insects. <br> Finally, I created Humanity.",
        ilias, "Howver, I am not perfect. <br> While creating Humanity, I also had many failures...",
        ilias, "Those failures are monsters...a truly detestable existence.",
        ilias, "Monsters are nothing but evil. <br> They will seduce humans to commit forbidden acts. Sometimes even committing great acts of violence.",
        ilias, "Even though humans are weak, I still love them... <br> So I hate these monsters that bring them only harm.",
        ilias, "And you, Luka, have finally come of age today, have you not?",
        luka, "Yes...I have long been looking forward to this day!",
        narrator, "Today, I shall finally receive the baptism in Ilias' name. <br> After being baptized, I will be recognized as a Hero!",
        narrator, "Being a Hero has always been my dream, and finally the long awaited day has arrived! Even though my village has been peaceful, I devoted all of my time to training with a sword.",
        narrator, "And finally! <br> The day when I shall finally become a Hero has come at last!",
        ilias, "Up until now, I have given my blessing and protection to many men... <br> However, the monsters still have not been exterminated.",
        ilias, "Not since Heinrich, 500 years ago, has a man been able to defeat a Monster Lord.",
        narrator, "The Hero Heinrich... <br> 500 years ago he was able to defeat a horribly cruel Monster Lord.",
        narrator, "With an attack that split the earth itself, he was able to slay the evil being. <br> Truly, a Hero among Heroes.",
        ilias, "But Luka... <br> You, too, have the potential to be able to defeat a Monster Lord!",
        luka, "...Eh? <br> I... I do?",
        ilias, "Now go, Luka! <br> I will always be watching over you....",
        jump, "freshStart",

        label, "freshStart",
        setVars, "loadTarget = 'freshStart'",
        scene, {image: "lukaHouse.jpg", effect: "fade"},
        codeBox, "Continue Code: {{loadTarget}}",
        audio, {
            src: "iliasville",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        narrator, "I open my eyes to the soft light of the morning sun coming through the window.",
        narrator, "Was that just a dream...? <br> There's no way that was just a normal dream!",
        narrator, "I definitely talked to Ilias!",
        luka, "Oh great Ilias...thank you! <br> Please watch over me.",
        narrator, "Like everyday, I start off with a prayer to Ilias.",
        narrator, "After my prayers have finished, I turn to the keepsake of my mother.",
        luka, "Good morning, Mother. <br> Today I will finally begin my journey as a Hero.",
        narrator, "With my morning routine finished, I begin to get ready for my trip. <br> It's a beautiful day outside, with the fresh morning scent filling the air.",
        narrator, "This morning, I will travel to Ilias Temple to receive my baptism. Once baptized, I will begin my journey to defeat the Monster Lord.",
        narrator, "I won't be returning to this house for a while. <br> With such a sad thought in my mind, I look around my small home.",
        narrator, "Well, until I defeat the Monster Lord, I won't be coming back here... <br> I better clean you so you look great when I come back!",
        narrator, "I start off by making my bed.",
        audio, {
            src: "se/steps",
            format: ["ogg"],
            action: "play",
            se: true
        },
        villager, "He...Help!",
        luka, "Hmm? What was that?",
        narrator, "While making my bed, I hear a man's scream. <br> It sounded like Hans, the lumberjack. <br> What's happening so early in the morning...?",
        hans, "Monster...A monster is in the forest!",
        audio, {
            src: "danger",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        luka, "W...What!?",
        narrator, "In Ilias Village? How can a monster appear in such a peaceful village...?",
        narrator, "Even though Ilias Village is small, it still has a gigantic temple. <br> The temple where the goddess is revered: Ilias Temple.",
        narrator, "With such a huge temple nearby, monsters dare not approach this village.",
        villager, "Everyone, hide in your houses! Quickly, before the monster comes into the village!",
        woman, "Ahhhhhh!",
        child, "Mommy!",
        narrator, "Such a peaceful village has quickly fallen into panic. <br> On the day of my baptism...why did this have to happen!?",
        luka, "Wh...What do I do!?",
        narrator, "I haven't ever fought a monster before...in fact, I've never even seen one.",
        narrator, "However, one day I will fight the Monster Lord. <br> If I can't fight a monster of this level, how can I expect to be a Hero!?",
        setVars, "novel.userVar.runFlag = 0",
        setVars, "mSwitch = 1",

        label, "runVfight",
        jsCall, {fcn: toggleDialog, params: []},
        menu, [
            "",
            "Fight", [jump, "defendVillage"],
            "Run", [jump, "hideVillage"],
        ],

        label, "hideVillage",
        scene, {image: "lukaHouse.jpg", effect: ""},
        setVars, "loadTarget = 'hideVillage'",
        codeBox, "Continue Code: {{loadTarget}}",
        ifStatement, "flip == 0",
        jsCall, {fcn: toggleDialog, params: []},
        endIf, "",
        ifStatement, "mSwitch == 0",
        audio, {
            src: "danger",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        endIf, "",
        ifStatement, "novel.userVar.runFlag == 0",
        luka, "I...don't want to.",
        narrator, "I muttered softly under my breath.",
        audio, {
            src: "ilias",
            format: ["ogg"],
            action: "play"
        },
        scene, {image: "heaven.jpg", effect: "fade"},
        codeBox, "Continue Code: {{loadTarget}}",
        ilias, {image:"ch/ilias.png", position: center},
        ilias, "Luka...pick up your sword. <br> You must defend your village!",
        scene, {image: "lukaHouse.jpg", effect: "fade"},
        audio, {
            src: "danger",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        codeBox, "Continue Code: {{loadTarget}}",
        luka, "Wh...what was that?",
        narrator, "For an instant, I saw a vision flash before my eyes. <br> Was that possibly...Ilias? <br> Is Ilias telling me to fight the monster...?",
        setVars, "novel.userVar.runFlag = 1",
        jump, "runVfight",
        elsePart, "",
        narrator, "Suddenly, a mysterious voice booms out.",
        hide, ilias,
        ilias, "It seems as though I made a mistake, Luka.",
        ilias, "You are no hero at all. <br> Receive my judgement.",
        audio, {
            src: "se/spark",
            format: ["ogg"],
            action: "play",
            loop: false
        },
        luka, "...Eh?",
        narrator, "Lightning courses through my body, causing me to go into convulsions.",
        narrator, "I slowly lose consciousness.",
        jump, "reset1",
        endIf, "",

        label, "reset1",
        scene, {image: "black.jpg", effect: "fade"},
        setVars, "novel.userVar.runFlag = 0",
        jsCall, {fcn: toggleDialog, params: []},
        menu, [
            "",
            "Retry", [jump, "runVfight"],
            "Title", [jump, "start"],
        ],

        label, "defendVillage",
        scene, "lukaHouse.jpg",
        setVars, "loadTarget = 'defendVillage'",
        codeBox, "Continue Code: {{loadTarget}}",
        audio, {
            src: "danger",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        ifStatement, "flip == 0",
        jsCall, {fcn: toggleDialog, params: []},
        endIf, "",
        luka, "Alright, here I go!",
        narrator, "I grab my sword and dash out of the house.",
        narrator, "The village where I was born and raised... <br> I will defend it!",
        scene, "hometown.jpg",
        codeBox, "Continue Code: {{loadTarget}}",
        farmer, {image:"ch/man.png", position: center},
        farmer, "Ahh! Run away!",
        hide, farmer,
        man, {image: "ch/youngan.png", position: center},
        man, "Ahh! What should I do!?",
        hide, man,
        narrator, "The village has fallen into chaos. <br> The villagers were working the fields are all rushing back into their homes.",
        narrator, "Running against the wave of people, I head towards the village entrance. <br> While pushing past the flood of people, I hear the booming voice of Betty, the old lady next door.",
        betty, {image: "ch/obasan.png", position: center},
        betty, "Stop, Luka! <br> Leave the monster to the soldiers at Ilias Temple!",
        luka, "It's ok, Betty...I'm a Hero!",
        betty, "'Hero', you say? You haven't even been baptized yet! <br> Come back here, don't go!",
        narrator, "It's true that I haven't received the baptism yet, and am not formally a Hero...",
        narrator, "But even so, I should be able to defeat a low level monster!",
        hide, betty,
        narrator, "Running past Betty, I continue through the village. <br> Finally, I reach the forest outside the village!",

        label, "sliEncounter",
        audio, {
            src: "danger",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        scene, {image: "woods.jpg", effect: "fade"},
        audio, {
            src: "se/steps",
            format: ["ogg"],
            action: "play",
            se: true
        },
        narrator, "I head off from the main road into the forest. <br> I stop running and look around the area.",
        luka, "Where are you, monster?",
        narrator, "Looking around at the eerily quiet forest, I begin to doubt rushing in with no information. <br> Perhaps I shouldn't have just blindly jumped into the forest...",
        narrator, "As I look around at my surroundings, I hear a noise come from behind me.",
        narrator, "Suddenly, a monster appears!",
        slime, {image: "ch/slime1.png", position: monDefault},
        audio, {
            src: "encounter",
            format: ["ogg"],
            action: "play",
            loop: false
        },
        narrator, "A Slime Girl appeared!",
        audio, {
            src: "battle",
            format: ["ogg"],
            action: "play",
            loop: true
        },
        slime, "Hahaha, a delicious looking boy showed up!",
        narrator, "The slime giggles as I stumble backwards, startled at her sudden appearance.",
        narrator, "Her viscous body jiggles as she laughs.",
        luka, "So this... is a monster.",
        narrator, "As I stare into the monster's eyes, my body feels paralyzed. <br> It's my first time seeing an actual monster in person after all. <br> It looks powerful... and strange... and surprisigly cute.",
        narrator, "Her body jiggles around with every movement she makes... it's nothing like a human.",
        narrator, "Can I really beat this thing? <br> All the confidence I had while rushing through the village starts to dissipate.",
        slime, "Ararara? <br> Am I the first monster you've seen by any chance?",
        luka, ".............",
        narrator, "Even though she guessed it right, I don't respond. <br> I don't want her to think I'm scared. <br> I grip my sword tighter to stop my hands from shaking.",
        luka, "Um.... <br> You're pretty close to a human village, you know? <br> Could you please go away?",
        narrator, "With my sword in front of me, I timidly try to talk to the slime. <br> There's no reason to be scared of it... hopefully.",
        narrator, "If I reason with her, I'm sure she'll understand. <br> Even if my enemy is a monster, I don't want a pointless fight.",
        luka, "Everyone in the village is scared of you... <br> But if you don't mean to harm anyone...",
        slime, "Hahaha, are you a pacifist or something? <br> I'm too hungry to go away, so there's no point asking me to leave.",
        slime, "Or... are you willing to treat me to some of your milk?",
        luka, "Uh...that... I can't do.",
        narrator, "Many monsters eat men's semen as food. <br> However, it is a serious taboo to give semen to a monster.",
        narrator, "One of Ilias' five commandments forbids sexual relations between human and monster. <br> Breaking this commandment brings about horrible consequences...",
        luka, "One of Ilias' five commandments forbids it, so I can't let you have any of my energy.",
        slime, "Well then... I guess I'll just have to forcibly squeeze it out of you!",
        luka, "Geh...",
        narrator, "It looks like I can't avoid fighting her.",
        narrator, "As I grip my sword tighter....",
        scene, {image: "heaven.jpg", effect: "dissolve"},
        ilias, {image:"ch/ilias.png", position: center},

    ]; //script
}

var flip = 0;
function toggleDialog(){
    if ($("#dialogDiv").css("opacity") == 0){
        $("#dialogDiv").css("opacity", "1");
        flip = 1;
    } else {
        $("#dialogDiv").css("opacity", "0");
        flip = 0;
    }
}

function sleep(){
    setTimeout(function(){}, 2000);
}

function transStart(){
    $("#novelDiv").css("-webkit-animation", "fadeOut ease-out 1");
    $("#novelDiv").css("-moz-animation", "fadeOut ease-out 1");
    $("#novelDiv").css("animation", "fadeOut ease-out 1");

    $("#novelDiv").css("-webkit-animation-fill-mode", "forwards");
    $("#novelDiv").css("-moz-animation-fill-mode", "forwards");
    $("#novelDiv").css("animation-fill-mode", "forwards");

    $("#novelDiv").css("-webkit-animation-duration", "2s");
    $("#novelDiv").css("-moz-animation-duration", "2s");
    $("#novelDiv").css("animation-duration", "2s");

    $("#novelDiv").css("-webkit-animation-delay", "0s");
    $("#novelDiv").css("-moz-animation-delay", "0s");
    $("#novelDiv").css("animation-delay", "0s");
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
