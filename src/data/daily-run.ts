import { PartyMemberStrength } from "#enums/party-member-strength";
import { Species } from "#enums/species";
import BattleScene from "../battle-scene";
import { PlayerPokemon } from "../field/pokemon";
import { Starter } from "../ui/starter-select-ui-handler";
import * as Utils from "../utils";
import PokemonSpecies, { PokemonSpeciesForm, getPokemonSpecies, getPokemonSpeciesForm, speciesStarters } from "./pokemon-species";
import { allChallenges, initChallenges, Challenge, ChallengeType, copyChallenge } from "../data/challenge";
import { Challenges } from "#app/enums/challenges";

export interface DailyRunConfig {
  seed: integer;
  starters: Starter;
}

export function fetchDailyRunSeed(): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    Utils.apiFetch("daily/seed").then(response => {
      if (!response.ok) {
        resolve(null);
        return;
      }
      return response.text();
    }).then(seed => resolve(seed ?? null))
      .catch(err => reject(err));
  });
}

export function setDailyChallengeModifiers(scene: BattleScene, seed: string) {
  const eligibleChallenges = [Challenges.SINGLE_GENERATION, Challenges.SINGLE_TYPE, Challenges.INVERSE_BATTLE, Challenges.NONE];
  const challengeSelected = Utils.randSeedItem(eligibleChallenges);
  let challengeValue: integer = 0;
  switch (challengeSelected) {
  case Challenges.SINGLE_GENERATION:
    challengeValue = Utils.randSeedInt(9, 1);
    break;
  case Challenges.SINGLE_TYPE:
    challengeValue = Utils.randSeedInt(18, 1);
    break;
  case Challenges.INVERSE_BATTLE:
    challengeValue = 1;
  }
  scene.gameMode.challenges.forEach(c => {
    if (c.id === challengeSelected) {
      c.value = challengeValue;
    }
  });
}

export function getDailyRunStarters(scene: BattleScene, seed: string): Starter[] {
  const starters: Starter[] = [];

  scene.executeWithSeedOffset(() => {
    const startingLevel = scene.gameMode.getStartingLevel();

    if (/\d{18}$/.test(seed)) {
      for (let s = 0; s < 3; s++) {
        const offset = 6 + s * 6;
        const starterSpeciesForm = getPokemonSpeciesForm(parseInt(seed.slice(offset, offset + 4)) as Species, parseInt(seed.slice(offset + 4, offset + 6)));
        starters.push(getDailyRunStarter(scene, starterSpeciesForm, startingLevel));
      }
      return;
    }

    const starterCosts: integer[] = [];
    starterCosts.push(Math.min(Math.round(3.5 + Math.abs(Utils.randSeedGauss(1))), 8));
    starterCosts.push(Utils.randSeedInt(9 - starterCosts[0], 1));
    starterCosts.push(10 - (starterCosts[0] + starterCosts[1]));
    console.log(starterCosts);
    let c = 0;
    while (c < starterCosts.length) {
      const cost = starterCosts[c];
      const costSpecies = Object.keys(speciesStarters)
        .map(s => parseInt(s) as Species)
        .filter(s => speciesStarters[s] === cost);
      if (costSpecies.length === 0) {
        c += 1;
      } else {
        const randPkmSpecies = getPokemonSpecies(Utils.randSeedItem(costSpecies));
        const starterSpecies = getPokemonSpecies(randPkmSpecies.getTrainerSpeciesForLevel(startingLevel, true, PartyMemberStrength.STRONGER));
        const starter = getDailyRunStarter(scene, starterSpecies, startingLevel);
        if (starter) {
          starters.push(starter);
          c += 1;
        }
      }
    }
  }, 0, seed);

  return starters;
}

function getDailyRunStarter(scene: BattleScene, starterSpeciesForm: PokemonSpeciesForm, startingLevel: integer): Starter | undefined {
  const starterSpecies = starterSpeciesForm instanceof PokemonSpecies ? starterSpeciesForm : getPokemonSpecies(starterSpeciesForm.speciesId);
  const formIndex = starterSpeciesForm instanceof PokemonSpecies ? undefined : starterSpeciesForm.formIndex;
  const pokemon = new PlayerPokemon(scene, starterSpecies, startingLevel, undefined, formIndex, undefined, undefined, undefined, undefined, undefined, undefined);
  if (pokemon.isAllowedInBattle()) {
    const starter: Starter = {
      species: starterSpecies,
      dexAttr: pokemon.getDexAttr(),
      abilityIndex: pokemon.abilityIndex,
      passive: false,
      nature: pokemon.getNature(),
      pokerus: pokemon.pokerus
    };
    pokemon.destroy();
    return starter;
  } else {
    pokemon.destroy();
    return;
  }
}
