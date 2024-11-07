import { Abilities } from "#enums/abilities";
import { Moves } from "#enums/moves";
import { Species } from "#enums/species";
import { MoveResult } from "#app/field/pokemon";
import GameManager from "#test/utils/gameManager";
import Phaser from "phaser";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { StatusEffect } from "#app/enums/status-effect";
import { BattlerIndex } from "#app/battle";

describe("Moves - Sketch", () => {
  let phaserGame: Phaser.Game;
  let game: GameManager;

  beforeAll(() => {
    phaserGame = new Phaser.Game({
      type: Phaser.HEADLESS,
    });
  });

  afterEach(() => {
    game.phaseInterceptor.restoreOg();
  });

  beforeEach(() => {
    game = new GameManager(phaserGame);
    game.override
      .ability(Abilities.BALL_FETCH)
      .battleType("single")
      .disableCrits()
      .enemySpecies(Species.SHUCKLE)
      .enemyAbility(Abilities.BALL_FETCH)
      .enemyMoveset(Moves.SPLASH);
  });

  it("Sketch should not fail even if a previous Sketch failed to retrieve a valid move and ran out of PP", async () => {
    game.override.moveset([ Moves.SKETCH, Moves.SKETCH ]);

    await game.classicMode.startBattle([ Species.REGIELEKI ]);
    const playerPokemon = game.scene.getPlayerPokemon();

    game.move.select(Moves.SKETCH);
    await game.phaseInterceptor.to("TurnEndPhase");
    expect(playerPokemon?.getLastXMoves()[0].result).toBe(MoveResult.FAIL);
    const moveSlot0 = playerPokemon?.getMoveset()[0];
    expect(moveSlot0?.moveId).toBe(Moves.SKETCH);
    expect(moveSlot0?.getPpRatio()).toBe(0);

    await game.toNextTurn();
    game.move.select(Moves.SKETCH);
    await game.phaseInterceptor.to("TurnEndPhase");
    expect(playerPokemon?.getLastXMoves()[0].result).toBe(MoveResult.SUCCESS);
    // Can't verify if the player Pokemon's moveset was successfully changed because of overrides.
  });

  it("Sketch should retrieve the most recent valid move from its target history", async () => {
    game.override
      .moveset([ Moves.SKETCH, Moves.GROWL ])
      .enemyStatusEffect(StatusEffect.PARALYSIS);

    await game.classicMode.startBattle([ Species.REGIELEKI ]);
    const playerPokemon = game.scene.getPlayerPokemon();
    const enemyPokemon = game.scene.getEnemyPokemon();

    game.move.select(Moves.GROWL);
    await game.setTurnOrder([ BattlerIndex.ENEMY, BattlerIndex.PLAYER ]);
    await game.move.forceStatusActivation(false);
    await game.phaseInterceptor.to("TurnEndPhase");
    expect(enemyPokemon?.getLastXMoves()[0].result).toBe(MoveResult.SUCCESS);

    await game.toNextTurn();
    game.move.select(Moves.SKETCH);
    await game.setTurnOrder([ BattlerIndex.ENEMY, BattlerIndex.PLAYER ]);
    await game.move.forceStatusActivation(true);
    await game.phaseInterceptor.to("TurnEndPhase");
    expect(playerPokemon?.getLastXMoves()[0].result).toBe(MoveResult.SUCCESS);
    // Can't verify if the player Pokemon's moveset was successfully changed because of overrides.
  });
});
