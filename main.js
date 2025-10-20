import { WA } from "@workadventure/scripting-api-extra";

WA.onInit().then(() => {
    WA.chat.sendChatMessage("👋 Bonjour, ton script est bien chargé !", "Système");
    console.log("✅ Script WorkAdventure initialisé !");
});
