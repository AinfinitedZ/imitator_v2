import {
  CollectibleType,
  EntityType,
  PickupVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  hasCollectible,
  smeltTrinket,
  spawnCollectible,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupLarry() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  smeltTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimesis"));

  if (postMimic !== "Not found" && postMimic !== "LarryMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("LarryMimic", true);
  isNotFirstUse = false;
}

export function postBossLarryDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("LarryMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("LarryMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function larryMimesisOnUse(): boolean {
  Isaac.GetPlayer().UseActiveItem(CollectibleType.WHITE_PONY);
  return true;
}
