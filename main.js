import { WA } from "@workadventure/scripting-api-extra";

WA.onInit().then(() => {
    console.log("Contrôle d'accès activé pour la salle de consultation");

    const zoneName = "consultation1";  // nom exact de la zone dans Tiled
    const maxPlayers = 1;              // limite de personnes dans la salle
    const fallbackX = 160;             // coordonnées de sortie
    const fallbackY = 1400;

    // Quand un joueur entre dans la zone
    WA.room.onEnterZone(zoneName, async () => {
        const players = await WA.room.getPlayersInZone(zoneName);

        console.log(`➡️ ${players.length} joueur(s) dans ${zoneName}`);

        if (players.length > maxPlayers) {
            WA.chat.sendChatMessage("⚠️ Salle pleine (1 personne max).", "Système");
            WA.player.moveTo(fallbackX, fallbackY);
        }
    });
});
