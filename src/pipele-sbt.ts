import { log, store } from "@graphprotocol/graph-ts";
import {
  PipeleSBT,
  ApprovalForAll,
  Attest,
  Revoke,
  TransferBatch,
  TransferSingle,
  URI,
} from "../generated/PipeleSBT/PipeleSBT";
import { PipeleEntity, PipeleShare, PipeleUser } from "../generated/schema";

function findUser(friends: string[], user: string): number {
  for (let i = 0; i < friends.length; i++) {
    if (friends[i] == user) {
      return i;
    }
  }
  return -1;
}

function handleShare(from: string, to: string, id: string): void {
  let share = PipeleShare.load(`${from}-${to}-${id}`);
  if (share === null) {
    share = new PipeleShare(`${from}-${to}-${id}`);
  }
  share.from = from;
  share.to = to;
  share.pipeleSBT = id;
  share.save();
  let owner = PipeleUser.load(from)!;
  let friend = PipeleUser.load(to);
  if (friend === null) {
    friend = new PipeleUser(to);
    friend.friends = [];
    friend.save();
  }
  if (findUser(owner.friends, to) == -1 && from != to) {
    owner.friends = owner.friends.concat([friend.id]);
  }
  owner.save();
}

export function handleAttest(event: Attest): void {
  let entity = PipeleEntity.load(event.params.tokenId.toString());
  if (entity === null) {
    entity = new PipeleEntity(event.params.tokenId.toString());
  }
  if (event.params.ownershipType.toString() == "1") {
    let user = PipeleUser.load(event.params.to.toHexString());
    if (user === null) {
      user = new PipeleUser(event.params.to.toHexString());
      user.friends = [];
      user.save();
    }
    entity.owner = user.id;
    entity.fileID = event.params.fileId.toString();
    entity.save();
  } else {
    handleShare(
      entity.owner,
      event.params.to.toHexString(),
      event.params.tokenId.toString()
    );
  }
}

export function handleRevoke(event: Revoke): void {
  let entity = PipeleEntity.load(event.params.tokenId.toString())!;
  if (event.params.to.toHexString() == entity.owner) {
    store.remove("PipeleEntity", entity.id);
  } else {
    store.remove(
      "PipeleShare",
      `${
        entity.owner
      }-${event.params.to.toHexString()}-${event.params.tokenId.toString()}`
    );
  }
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}
