export type Packets = number | number[] | Packets[];

export enum MatchResult {
  MATCH, NO_MATCH, CONTINUE_CHECKING,
}

export const packetsMatch = (left: Packets, right: Packets): MatchResult => {
  if (typeof left === "number" && typeof right === "number") {
    if (left === right) {
      return MatchResult.CONTINUE_CHECKING;
    }

    return left < right ? MatchResult.MATCH : MatchResult.NO_MATCH;
  }

  if (typeof left === "number") {
    return packetsMatch([left], right);
  }

  if (typeof right === "number") {
    return packetsMatch(left, [right]);
  }

  if (left.length === 0 && right.length === 0) {
    return MatchResult.CONTINUE_CHECKING;
  }

  if (left.length === 0) {
    return MatchResult.MATCH;
  }

  if (right.length === 0) {
    return MatchResult.NO_MATCH;
  }

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const result = packetsMatch(left[i], right[i]);

    if ([MatchResult.MATCH, MatchResult.NO_MATCH].includes(result)) {
      return result;
    }
  }

  return packetsMatch(left.slice(1), right.slice(1));
}
