import { WA } from "@workadventure/scripting-api-extra";

WA.onInit().then(async () => {
    console.log("Contrôle d'accès salle de consultation activé");

    // nom exact de la zone dans Tiled
    const zoneName = "consultation1";

    // on récupère la variable "maxPlayers" définie dans Tiled
    const maxPlayers = parseInt(WA.room.area[zoneName]?.properties?.maxPlayers || 2);

    // écoute l'entrée dans la zone
    WA.room.onEnterZone(zoneName, async () => {
        const players = await WA.room.getPlayersInZone(zoneName);

        if (players.length > maxPlayers) {
            // avertir l'utilisateur
            WA.chat.sendChatMessage("⚠️ Salle de consultation déjà occupée.", "Système");

            // le replacer dehors (adapte les coordonnées à ta carte)
            WA.player.moveTo(160, 1400);
        }
    });
});
