/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let doorOpen = false; // état de la porte
const adminTag = "admin";

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    const isAdmin = WA.player.tags.includes(adminTag);

    // --- Horloge ---
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.area.onLeave('clock').subscribe(closePopup);

    // --- Porte ---
    function updateDoor() {
        if (doorOpen) {
            WA.room.showLayer("door_open");
            WA.room.hideLayer("door_closed");
        } else {
            WA.room.showLayer("door_closed");
            WA.room.hideLayer("door_open");
        }
    }

    updateDoor();

    WA.room.onEnterZone("doorButton", () => {
        if (isAdmin) {
            WA.ui.displayActionMessage({
                message: "Appuie sur E pour ouvrir/fermer la porte",
                callback: () => {
                    doorOpen = !doorOpen;
                    updateDoor();
                    WA.state.saveVariable("doorOpen", doorOpen);
                },
            });
        }
    });

    WA.room.onLeaveZone("doorButton", WA.ui.hideActionMessage);

    WA.state.onVariableChange("doorOpen").subscribe((value) => {
        if (typeof value === "boolean") {
            doorOpen = value;
            updateDoor();
        }
    });

    // --- Scripting API Extra ---
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
