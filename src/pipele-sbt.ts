import { store } from "@graphprotocol/graph-ts"
import {
  PipeleSBT,
  ApprovalForAll,
  Attest,
  Revoke,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/PipeleSBT/PipeleSBT"
import { PipeleEntity, PipeleShare } from "../generated/schema"

function handleShare(from: string, to: string, id: string): void {
  let share = PipeleShare.load(`${from}-${to}`);

  if (share === null) {
    share = new PipeleShare(`${from}-${to}`);
  }

  share.from = from;
  share.to = to;
  share.pipeleSBT = id;

  share.save();
}

export function handleAttest(event: Attest): void {
  let entity = PipeleEntity.load(event.params.tokenId.toString());

  if (entity === null) {
    entity = new PipeleEntity(event.params.tokenId.toString());
  }

  if (event.params.ownershipType.toString() == "1") {
    entity.owner = event.params.to.toHexString();
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
  let entity = PipeleEntity.load(event.params.tokenId.toString());

  if (entity === null) {
    entity = new PipeleEntity(event.params.tokenId.toString());
  }

  if (event.params.to.toHexString() == entity.owner) {
    store.remove("PipeleEntity", entity.id);
  } else {
    store.remove("PipeleShare", `${entity.owner}-${event.params.to.toHexString()}`);
  }
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}
