export interface Blueprint {
  index: number,
  oreCost: {
    ore: number,
  },
  clayCost: {
    ore: number,
  },
  obsidianCost: {
    ore: number,
    clay: number,
  },
  geodeCost: {
    ore: number,
    obsidian: number,
  }
}

export interface Materials {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

export interface Robots {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

export const initializeBlueprints = (lines: string[]) => {
  return lines.map((line) => {
    const regex = /[0-9]+/g;
    const matches = line.match(regex).map((el) => parseInt(el, 10));

    return {
      index: matches[0],
      oreCost: { ore: matches[1] },
      clayCost: { ore: matches[2] },
      obsidianCost: { ore: matches[3], clay: matches[4] },
      geodeCost: { ore: matches[5], obsidian: matches[6] },
    } as Blueprint;
  });
}

export const mostGeodes = (robots: Robots, materials: Materials, blueprint: Blueprint, minutesLeft: number): number => {
  if (minutesLeft === 1) {
    return materials.geode + robots.geode;
  }

  const newMaterials: Materials = {
    ore: materials.ore + robots.ore,
    clay: materials.clay + robots.clay,
    obsidian: materials.obsidian + robots.obsidian,
    geode: materials.geode + robots.geode,
  };

  // Always buy Geode robot if possible
  if (materials.ore >= blueprint.geodeCost.ore && materials.obsidian >= blueprint.geodeCost.obsidian) {
    const nextRobots: Robots = { ...robots, geode: robots.geode + 1 };
    const nextMaterials: Materials = { ...newMaterials, ore: newMaterials.ore - blueprint.geodeCost.ore, obsidian: newMaterials.obsidian - blueprint.geodeCost.obsidian }
    return mostGeodes(nextRobots, nextMaterials, blueprint, minutesLeft - 1);
  }

  let best = materials.geode;

  // Ore robot
  if (robots.ore < Math.max(blueprint.oreCost.ore, blueprint.clayCost.ore, blueprint.obsidianCost.ore) && materials.ore >= blueprint.oreCost.ore) {
    const nextRobots: Robots = { ...robots, ore: robots.ore + 1 };
    const nextMaterials: Materials = { ...newMaterials, ore: newMaterials.ore - blueprint.oreCost.ore }
    best = Math.max(mostGeodes(nextRobots, nextMaterials, blueprint, minutesLeft - 1), best);
  }

  // Clay robot
  if (robots.clay < blueprint.obsidianCost.clay && materials.ore >= blueprint.clayCost.ore) {
    const nextRobots: Robots = { ...robots, clay: robots.clay + 1 };
    const nextMaterials: Materials = { ...newMaterials, ore: newMaterials.ore - blueprint.clayCost.ore }
    best = Math.max(mostGeodes(nextRobots, nextMaterials, blueprint, minutesLeft - 1), best);
  }

  // Obsidian robot
  if (robots.obsidian < blueprint.geodeCost.obsidian && materials.ore >= blueprint.obsidianCost.ore && materials.clay >= blueprint.obsidianCost.clay) {
    const nextRobots: Robots = { ...robots, obsidian: robots.obsidian + 1 };
    const nextMaterials: Materials = { ...newMaterials, ore: newMaterials.ore - blueprint.obsidianCost.ore, clay: newMaterials.clay - blueprint.obsidianCost.clay }
    best = Math.max(mostGeodes(nextRobots, nextMaterials, blueprint, minutesLeft - 1), best);
  }

  // All robots need ore. Wait until we don't have as many ore as the most expensive robot requires
  if (materials.ore < Math.max(blueprint.oreCost.ore, blueprint.clayCost.ore, blueprint.obsidianCost.ore, blueprint.geodeCost.ore)) {
    best = Math.max(mostGeodes(robots, newMaterials, blueprint, minutesLeft - 1), best);
  }

  return best;
}
