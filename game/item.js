function loadItems() {

  items = {

    infinityEdgePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    essenceReaverPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    stormRazorPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    starfireSpellbladePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    lastWhisperPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    frostMournePicture : loadImage("assets/pictures/infinityEdge.jpg"),

    rapidFirecannonPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    tohridalPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    staticShivPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    runnansHurricanePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    phantomDancerPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    nashorsToothPicture : loadImage("assets/pictures/infinityEdge.jpg"),

    ludensEchoePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    rabadonsDeathcapPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    voidStaffPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    lichBanePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    liandrysTormentPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    hextechGunbladePicture : loadImage("assets/pictures/infinityEdge.jpg"),

    deadmansPlatePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    randuinsOmenPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    thornMailPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    sunfireCapePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    zhonyasHourglassPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    thunderFuryPicture : loadImage("assets/pictures/infinityEdge.jpg"),

    asbyssalMaskPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    spiritVisagePicture : loadImage("assets/pictures/infinityEdge.jpg"),
    adaptiveHelmPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    bansheesVeilPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    hexDrinkerPicture : loadImage("assets/pictures/infinityEdge.jpg"),
    trinityForcePicture : loadImage("assets/pictures/infinityEdge.jpg"),

    infinityEdge : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    essenceReaver : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    stormRazor : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    starfireSpellblade : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    lastWhisper : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    frostMourne : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),

    rapidFirecannon : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    tohridal : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    staticShiv : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    runnansHurricane : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    phantomDancer : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    nashorsTooth : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),

    ludensEchoe : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    rabadonsDeathcap : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    voidStaff : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    lichBane : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    liandrysTorment : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    hextechGunblade : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),

    deadmansPlate : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    randuinsOmen : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    thornMail : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    sunfireCape : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    zhonyasHourglass : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    thunderFury : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),

    asbyssalMask : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    spiritVisage : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    adaptiveHelm : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    bansheesVeil : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    hexDrinker : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    trinityForce : new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, items.infinityEdgePicture, infinityEdgeFunction, 
      "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),

  };

  inGameShop = [[items.infinityEdge, items.essenceReaver, items.stormRazor, items.starfireSpellblade, items.lastWhisper, items.frostMourne], 
    [items.rapidFirecannon, items.thoridal, items.staticShiv, items.runnansHurricane, items.phantomDancer, items.nashorsTooth],
    [items.ludensEcho, items.rabadonsDeathcap, items.voidStaff, items.lichBane, items.liandrysTorment, items.hextechGunblade],
    [items.deadmansPlate, items.randuinsOmen, items.thornMail, items.sunfireCape, items.zhonyasHourglass, items.thunderfury],
    [items.abyssalMask, items.spiritVisage, items.adaptiveHelm, items.abyssalMask, items.hexDrinker, items.trinityForce]];

}  


function infinityEdgeFunction() {
  currentItem = 1;
}