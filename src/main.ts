declare const WA: any;

WA.onInit().then(async () => {
    console.log("Scripting API initialisée !");
    console.log("Player tags:", WA.player.tags);

    // Charger la Scripting API Extra (obligatoire pour les fonctions de calques)
    try {
        await WA.loadExtraLib("https://play.workadventu.re/extra/wa.js");
        console.log("Scripting API Extra chargée !");
    } catch (e: unknown) {
        console.error("Erreur lors du chargement de la Scripting API Extra :", e);
    }

    // === ZONE "buttons" ===
    WA.room.area.onEnter("buttons").subscribe(() => {
        console.log("Entrée dans la zone 'buttons'");
        WA.room.hideLayer("door_closed"); // Masque le calque
    });

    WA.room.area.onLeave("buttons").subscribe(() => {
        console.log("Sortie de la zone 'buttons'");
        WA.room.showLayer("door_closed"); // Réaffiche le calque
    });
});