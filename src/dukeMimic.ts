import {
  CollectibleType,
  EntityType,
  FamiliarVariant,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getRandomInt,
  hasCollectible,
  spawn,
  spawnCollectible,
} from "isaacscript-common";

import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupDuke() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.SKATOLE);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DukeMimesis"));

  if (postMimic !== "Not found" && postMimic !== "DukeMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("DukeMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossDukeDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("DukeMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DukeMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("DukeMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function dukeMimesisOnUse() {
  const numberOfFlies = getRandomInt(4, 8, undefined);
  for (let i = 0; i < numberOfFlies; i++) {
    const typeOfFly = getRandomInt(0, 5, undefined);
    spawn(
      EntityType.FAMILIAR,
      FamiliarVariant.BLUE_FLY,
      typeOfFly,
      findFreePosition(Isaac.GetPlayer().Position),
    );
  }
  return true;
}
