// --- main.js ---
// Script porte simple, conforme à la doc WorkAdventure (Scripting Extra)

console.log("main.js chargé ✅");

WA.onInit().then(async () => {
    console.log("WorkAdventure prêt 🟢");

    const isAdmin = WA.player.tags.includes("admin");
    let doorOpen = false;

    // Met à jour les calques selon l'état de la porte
    function updateDoor() {
        if (doorOpen) {
            WA.room.showLayer("door_open");
            WA.room.hideLayer("door_closed");
        } else {
            WA.room.showLayer("door_closed");
            WA.room.hideLayer("door_open");
        }
        console.log("🚪 État porte :", doorOpen ? "ouverte" : "fermée");
    }

    updateDoor();

    // Quand un admin entre dans la zone du bouton
    WA.room.onEnterZone("doorButton", () => {
        if (!isAdmin) return;

        WA.ui.displayActionMessage({
            message: "Appuie sur O pour ouvrir/fermer la porte",
            key: "O",
            callback: () => {
                doorOpen = !doorOpen;
                updateDoor();
                WA.state.saveVariable("doorOpen", doorOpen);
            }
        });
    });

    // Cache le message quand on sort de la zone
    WA.room.onLeaveZone("doorButton", () => {
        WA.ui.hideActionMessage();
    });

    // Synchronisation de la variable entre tous les joueurs
    WA.state.onVariableChange("doorOpen").subscribe((value) => {
        if (typeof value === "boolean") {
            doorOpen = value;
            updateDoor();
        }
    });

}).catch(e => console.error("Erreur init WA :", e));
