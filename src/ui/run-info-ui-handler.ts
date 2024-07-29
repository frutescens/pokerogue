import BattleScene from "../battle-scene";
import { GameModes } from "../game-mode";
import UiHandler from "./ui-handler";
import { SessionSaveData } from "../system/game-data";
import { TextStyle, addTextObject, addBBCodeTextObject } from "./text";
import { Mode } from "./ui";
import { addWindow } from "./ui-theme";
import * as Utils from "../utils";
import PokemonData from "../system/pokemon-data";
import i18next from "i18next";
import {Button} from "../enums/buttons";
import { BattleType } from "../battle";
import { TrainerVariant } from "../field/trainer";
import { Challenges } from "#enums/challenges";
import { getLuckString, getLuckTextTint } from "../modifier/modifier-type";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import { Type, getTypeRgb } from "../data/type";
import { starterPassiveAbilities } from "../data/pokemon-species";
import { getNatureStatMultiplier, getNatureName } from "../data/nature";
import { allAbilities } from "../data/ability";
import { getVariantTint } from "#app/data/variant";
import { PokemonHeldItemModifier } from "../modifier/modifier";
import {modifierSortFunc} from "../modifier/modifier";

/*
enum Page {
  GENERAL,
  STATS,
  HALL_OF_FAME
}
*/


export enum RunVictory {
  DEFEATED,
  VICTORY
}

export default class GameInfoUiHandler extends UiHandler {
  private runInfo: SessionSaveData;
  private victory: Boolean;

  private gameStatsContainer: Phaser.GameObjects.Container;
  private statsContainer: Phaser.GameObjects.Container;

  private runResultContainer: Phaser.GameObjects.Container;
  private runInfoContainer: Phaser.GameObjects.Container;
  private partyContainer: Phaser.GameObjects.Container;
  private partyHeldItemsContainer: Phaser.GameObjects.Container;
  private statsBgWidth: integer;
  private partyContainerHeight: integer;
  private partyContainerWidth: integer;

  private hallofFameContainer: Phaser.GameObjects.Container;

  private partyInfo: Phaser.GameObjects.Container[];
  private partyVisibility: Boolean;
  private modifiersModule: any;

  private statValues: Phaser.GameObjects.Text[];

  constructor(scene: BattleScene) {
    super(scene, Mode.RUN_INFO);
  }

  	async setup() {
 		//const page = 0;
 		this.gameStatsContainer = this.scene.add.container(1, -(this.scene.game.canvas.height / 6) + 1);
    this.modifiersModule = await import("../modifier/modifier");
    this.gameStatsContainer.setVisible(false);
 	}

 	show(args: any[]): boolean {
 		super.show(args);

    const gameStatsBg = this.scene.add.rectangle(0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height, 0x006860);
    gameStatsBg.setOrigin(0, 0);
    this.gameStatsContainer.add(gameStatsBg);

    const headerBg = addWindow(this.scene, 0, 0, (this.scene.game.canvas.width / 6) - 2, 24);
    headerBg.setOrigin(0, 0);

    const downButtonContainer = this.scene.add.container(0, 0);
    const downButtonText = addTextObject(this.scene, 8, 0, i18next.t("runHistory:viewHeldItems"), TextStyle.WINDOW, {fontSize:"34px"});
    const downButtonElement = new Phaser.GameObjects.Sprite(this.scene, 0, 2, "keyboard", "KEY_ARROW_DOWN.png");
    downButtonContainer.add([downButtonText, downButtonElement]);
    downButtonContainer.setPositionRelative(headerBg, 275, 10);
    const headerText = addTextObject(this.scene, 0, 0, i18next.t("runHistory:runInfo"), TextStyle.SETTINGS_LABEL);
    headerText.setOrigin(0, 0);
    headerText.setPositionRelative(headerBg, 8, 4);
    this.gameStatsContainer.add(headerBg);
    this.gameStatsContainer.add(downButtonContainer);
    this.gameStatsContainer.add(headerText);

    const run = args[0];
    this.runInfo = this.scene.gameData.parseSessionData(JSON.stringify(run.entry));
    this.victory = run.victory;

    this.statsBgWidth = ((this.scene.game.canvas.width / 6) - 2) / 3;

    this.runResultContainer = this.scene.add.container(0, 24);
    const runResultWindow = addWindow(this.scene, 0, 0, this.statsBgWidth-11, 65);
    runResultWindow.setOrigin(0, 0);
    this.runResultContainer.add(runResultWindow);
    this.parseRunResult(this.runInfo, this.victory);

    this.partyContainer = this.scene.add.container(this.statsBgWidth-10, 23);
    this.partyHeldItemsContainer = this.scene.add.container(this.statsBgWidth-10, 23);
    this.partyHeldItemsContainer.setVisible(false);

    this.setCursor(0);

    this.runInfoContainer = this.scene.add.container(0, 89);
    const runInfoWindow = addWindow(this.scene, 0, 0, this.statsBgWidth-11, 90);
    this.runInfoContainer.add(runInfoWindow);
 		this.parseRunInfo(this.runInfo, this.victory);

    const partyData = this.runInfo.party;
    this.parsePartyInfo(partyData);
    this.showParty(true);

    this.gameStatsContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.scene.game.canvas.width / 6, this.scene.game.canvas.height / 6), Phaser.Geom.Rectangle.Contains);

    this.getUi().bringToTop(this.hallofFameContainer);
    this.getUi().bringToTop(this.gameStatsContainer);
    this.gameStatsContainer.setVisible(true);

    this.setCursor(0);

    this.getUi().add(this.gameStatsContainer);
    //this.updateStats();

    this.getUi().hideTooltip();

    return true;
 	}

  async parseRunResult(runData: any, runResult: boolean) {
    const runResultText = addBBCodeTextObject(this.scene, 6, 4, `${(runResult ? i18next.t("runHistory:victory") : i18next.t("runHistory:defeated")+" - Wave "+runData.waveIndex)}`, TextStyle.WINDOW, {fontSize : "65px", lineSpacing: 0.1});
    this.runResultContainer.add(runResultText);

    if (runResult) {
      this.hallofFameContainer = this.scene.add.container(0, 0);
      //const hallofFameBg = new Phaser.GameObjects.Image(this.scene, 0, 0, "hall_of_fame.png");
      const hallofFameBg = this.scene.add.rectangle(0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height, 0x005460);
      this.hallofFameContainer.add(hallofFameBg);
      const hallofFameText = addTextObject(this.scene, 0, 0, i18next.t("runHistory:hallofFameText"), TextStyle.WINDOW);
      hallofFameText.setPosition(this.scene.game.canvas.width/2, 120);
      this.hallofFameContainer.add(hallofFameText);
      runData.party.forEach((poke, i) => {
        const pokemon = poke.toPokemon(this.scene);
        const pokemonSprite = this.scene.addPokemonSprite(pokemon, 0, 0, 0, 0);
        console.log(pokemonSprite);        
        pokemonSprite.play(pokemon.getSpriteKey(true));
        pokemonSprite.setPipelineData("teraColor", getTypeRgb(pokemon.getTeraType()));
        pokemonSprite.setPipelineData("ignoreTimeTint", true);
        pokemonSprite.setPipelineData("spriteKey", pokemon.getSpriteKey());
        pokemonSprite.setPipelineData("shiny", pokemon.shiny);
        pokemonSprite.setPipelineData("variant", pokemon.variant);
        [ "spriteColors", "fusionSpriteColors" ].map(k => {
          delete pokemonSprite.pipelineData[`${k}Base`];
          if (pokemon.summonData?.speciesForm) {
            k += "Base";
          }
        pokemonSprite.pipelineData[k] = pokemon.getSprite().pipelineData[k];
        });
        this.hallofFameContainer.add(pokemonSprite);
        pokemon.destroy();
      });
      this.hallofFameContainer.setVisible(false);

      this.gameStatsContainer.add(this.hallofFameContainer);
    }

    if (!runResult) {
      const enemyContainer = this.scene.add.container(0, 0);

      //Wild - Single and Doubles
      if (runData.battleType === BattleType.WILD) {
        switch (runData.enemyParty.length) {
        case 1:
          //Wild - Singles
          const enemyIconContainer = this.scene.add.container(0, 0);
          const enemyData = runData.enemyParty[0];
          const bossStatus = enemyData.boss;
          enemyData.boss = false;
          //addPokemonIcon() throws an error if the Pokemon used is a boss
          const enemy = enemyData.toPokemon(this.scene);
          const enemyIcon = this.scene.addPokemonIcon(enemy, 0, 0, 0, 0);
          const enemyLevel = addTextObject(this.scene, 36, 26, `${i18next.t("saveSlotSelectUiHandler:lv")}${Utils.formatLargeNumber(enemy.level, 1000)}`, bossStatus ? TextStyle.PARTY_RED : TextStyle.PARTY, { fontSize: "44px", color: "#f8f8f8" });
          enemyLevel.setShadow(0, 0, null);
          enemyLevel.setStroke("#424242", 14);
          enemyLevel.setOrigin(1, 0);
          enemyIconContainer.add(enemyIcon);
          enemyIconContainer.add(enemyLevel);
          enemyContainer.add(enemyIconContainer);
          enemyContainer.setPosition(27, 10);
          enemy.destroy();
          break;
        case 2:
          runData.enemyParty.forEach((enemyData, e) => {
            const enemyIconContainer = this.scene.add.container(0, 0);
            const bossStatus = enemyData.boss;
            enemyData.boss = false;
            const enemy = enemyData.toPokemon(this.scene);
            const enemyIcon = this.scene.addPokemonIcon(enemy, 0, 0, 0, 0);
            const enemyLevel = addTextObject(this.scene, 36, 26, `${i18next.t("saveSlotSelectUiHandler:lv")}${Utils.formatLargeNumber(enemy.level, 1000)}`, bossStatus ? TextStyle.PARTY_RED : TextStyle.PARTY, { fontSize: "44px", color: "#f8f8f8" });
            enemyLevel.setShadow(0, 0, null);
            enemyLevel.setStroke("#424242", 14);
            enemyLevel.setOrigin(1, 0);
            enemyIconContainer.add(enemyIcon);
            enemyIconContainer.add(enemyLevel);
            enemyIconContainer.setPosition(e*35, 0);
            enemyContainer.add(enemyIconContainer);
            enemy.destroy();
          });
          enemyContainer.setPosition(8, 14);
          break;
        }
      //Trainer - Single and Double
      } else if (runData.battleType === BattleType.TRAINER) {
        const tObj = runData.trainer.toTrainer(this.scene);
        const tObjSpriteKey = tObj.config.getSpriteKey(runData.trainer.variant === TrainerVariant.FEMALE, false);
        const tObjSprite = this.scene.add.sprite(0, 0, tObjSpriteKey);
        if (runData.trainer.variant === TrainerVariant.DOUBLE) {
          const doubleContainer = this.scene.add.container(5, 8);
          tObjSprite.setPosition(-3, -3);
          const tObjPartnerSpriteKey = tObj.config.getSpriteKey(true, true);
          const tObjPartnerSprite = this.scene.add.sprite(5, -3, tObjPartnerSpriteKey);
          tObjPartnerSprite.setScale(0.20);
          tObjSprite.setScale(0.20);
          doubleContainer.add(tObjSprite);
          doubleContainer.add(tObjPartnerSprite);
          enemyContainer.add(doubleContainer);
        } else {
          tObjSprite.setScale(0.25, 0.25);
          tObjSprite.setPosition(9, 23);
          enemyContainer.add(tObjSprite);
        }

        const teraPokemon = {};
        runData.enemyModifiers.forEach((m) => {
          if (m.className === "TerastallizeModifier") {
            teraPokemon[m.args[0]] = m.args[1];
          }
        });

        const enemyPartyContainer = this.scene.add.container(0, 0);
        runData.enemyParty.forEach((enemyData, e) => {
          const pokemonRowHeight = Math.floor(e/3);
          const enemyIconContainer = this.scene.add.container(0, 0);
          enemyIconContainer.setScale(0.6);
          const isBoss = enemyData.boss;
          enemyData.boss = false;
          const enemy = enemyData.toPokemon(this.scene);
          const enemyIcon = this.scene.addPokemonIcon(enemy, 0, 0, 0, 0);
          const enemySprite1 = enemyIcon.list[0] as Phaser.GameObjects.Sprite;
          const enemySprite2 = (enemyIcon.list.length > 1) ? enemyIcon.list[1] as Phaser.GameObjects.Sprite : null;
          if (teraPokemon[enemyData.id]) {
            const teraTint = getTypeRgb(teraPokemon[enemyData.id]);
            const teraColor = new Phaser.Display.Color(teraTint[0], teraTint[1], teraTint[2]);
            enemySprite1.setTint(teraColor.color);
            if (enemySprite2) {
              enemySprite2.setTint(teraColor.color);
            }
          }
          enemyIcon.setPosition(39*(e%3), (35*pokemonRowHeight));
          const enemyLevel = addTextObject(this.scene, 43*(e%3), (27*(pokemonRowHeight+1)), `${i18next.t("saveSlotSelectUiHandler:lv")}${Utils.formatLargeNumber(enemy.level, 1000)}`, isBoss ? TextStyle.PARTY_RED : TextStyle.PARTY, { fontSize: "54px" });
          enemyLevel.setShadow(0, 0, null);
          enemyLevel.setStroke("#424242", 14);
          enemyLevel.setOrigin(0, 0);

          enemyIconContainer.add(enemyIcon);
          enemyIconContainer.add(enemyLevel);
          enemyPartyContainer.add(enemyIconContainer);
          enemy.destroy();
        });
        enemyPartyContainer.setPosition(25, 18);
        enemyContainer.add(enemyPartyContainer);
      }
      this.runResultContainer.add(enemyContainer);
    }
    this.gameStatsContainer.add(this.runResultContainer);
  }

  async parseRunInfo(runData:any) {
    const modeText = addBBCodeTextObject(this.scene, 7, 0, "", TextStyle.WINDOW, {fontSize : "50px", lineSpacing:3});
    modeText.setPosition(7, 5);
    modeText.appendText(i18next.t("runHistory:mode")+": ", false);
    switch (runData.gameMode) {
    case GameModes.DAILY:
      modeText.appendText(`${i18next.t("gameMode:dailyRun")}`, false);
      break;
    case GameModes.SPLICED_ENDLESS:
      modeText.appendText(`${i18next.t("gameMode:endlessSpliced")}`, false);
      if (runData.waveIndex === gameData.gameStats.highestEndlessWave) {
        modeText.appendText(` [${i18next.t("runHistory:personalBest")}]`, false);
        modeText.setTint(0xffef5c, 0x47ff69, 0x6b6bff, 0xff6969);
      }
      break;
    case GameModes.CHALLENGE:
      modeText.appendText(`${i18next.t("gameMode:challenge")}`, false);
      modeText.appendText(`\t\t${i18next.t("runHistory:challengeRules")}: `);
      const runChallenges = runData.challenges;
      const rules = [];
      for (let i = 0; i < runChallenges.length; i++) {
        if (runChallenges[i].id === Challenges.SINGLE_GENERATION && runChallenges[i].value !== 0) {
          rules.push(i18next.t(`runHistory:challengeMonoGen${runChallenges[i].value}` as const));
        } else if (runChallenges[i].id === Challenges.SINGLE_TYPE && runChallenges[i].value !== 0) {
          rules.push(i18next.t(`pokemonInfo:Type.${Type[runChallenges[i].value-1]}` as const));
        }
      }
      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          if (i > 0) {
            modeText.appendText(" + ", false);
          }
          modeText.appendText(rules[i], false);
        }
      }
      break;
    case GameModes.ENDLESS:
      modeText.appendText(`${i18next.t("gameMode:endless")}`, false);
      if (runData.waveIndex === this.scene.gameData.gameStats.highestEndlessWave) {
        modeText.appendText(` [${i18next.t("runHistory:personalBest")}]`, false);
        modeText.setTint(0xffef5c, 0x47ff69, 0x6b6bff, 0xff6969);
      }
      break;
    case GameModes.CLASSIC:
      modeText.appendText(`${i18next.t("gameMode:classic")}`, false);
      break;
    }

    const runInfoTextContainer = this.scene.add.container(0, 0);
    const runInfoText = addBBCodeTextObject(this.scene, 7, 0, "", TextStyle.WINDOW, {fontSize : "50px", lineSpacing:3});
    const runTime = Utils.getPlayTimeString(runData.playTime);
    runInfoText.appendText(`${i18next.t("runHistory:runLength")}: ${runTime}`, false);
    runInfoText.appendText(`[color=#e8e8a8]\u20BD${Utils.formatLargeNumber(runData.money, 1000)}[/color]`);
    const luckText = addBBCodeTextObject(this.scene, 0, 0, "", TextStyle.WINDOW, {fontSize: "55px"});
    const luckValue = Phaser.Math.Clamp(runData.party.map(p => p.toPokemon(this.scene).getLuck()).reduce((total: integer, value: integer) => total += value, 0), 0, 14);
    let luckInfo = i18next.t("runHistory:luck")+": "+getLuckString(luckValue);
    if (luckValue < 14) {
      luckInfo = "[color=#"+(getLuckTextTint(luckValue)).toString(16)+"]"+luckInfo+"[/color]";
    } else {
      luckText.setTint(0xffef5c, 0x47ff69, 0x6b6bff, 0xff6969);
    }
    luckText.appendText("[align=right]"+luckInfo+"[/align]", false);
    runInfoText.setPosition(7, 70);
    luckText.setPosition(62,77);
    runInfoTextContainer.add(runInfoText);
    runInfoTextContainer.add(luckText);


    if (runData.modifiers.length) {
      let visibleModifierIndex = 0;

      const modifierIconsContainer = this.scene.add.container(8, (runData.gameMode === GameModes.CHALLENGE) ? 20 : 15);
      modifierIconsContainer.setScale(0.45);
      for (const m of runData.modifiers) {
        const modifier = m.toModifier(this.scene, this.modifiersModule[m.className]);
        if (modifier instanceof PokemonHeldItemModifier) {
          continue;
        }
        const item = this.scene.add.sprite(0, 12, "items");
        item.setFrame(modifier.type.iconImage);

        item.setOrigin(0, 0.5);
        const rowHeightModifier = Math.floor(visibleModifierIndex/7);
        item.setPosition(24 * (visibleModifierIndex%7), 20+(35*rowHeightModifier));

        modifierIconsContainer.add(item);
        const maxStackCount = modifier.getMaxStackCount(this.scene);
        if (maxStackCount > 1) {
          const itemStackCount = addTextObject(this.scene, (24*(visibleModifierIndex%7))+22, 22+(35*rowHeightModifier), modifier.stackCount, TextStyle.PARTY, {fontSize:"64px"});
          if (modifier.stackCount === maxStackCount) {
            itemStackCount.setColor("#f89890");
          }
          modifierIconsContainer.add(itemStackCount);
        }

        if (++visibleModifierIndex === 20) {
          const maxItems = addTextObject(this.scene, 45, 90, "+", TextStyle.WINDOW);
          maxItems.setPositionRelative(modifierIconsContainer, 70, 45);
          this.runInfoContainer.add(maxItems);
          break;
        }
      }
      this.runInfoContainer.add(modifierIconsContainer);
    }

    this.runInfoContainer.add(modeText);
    this.runInfoContainer.add(runInfoTextContainer);
    this.gameStatsContainer.add(this.runInfoContainer);
  }

 	parsePartyInfo(party: any): void {

    const currentLanguage = i18next.resolvedLanguage;
 		const windowHeight = ((this.scene.game.canvas.height / 6) - 23)/6;

 		party.forEach((p: PokemonData, i: integer) => {
      const pokemonInfoWindow = new RoundRectangle(this.scene, 0, 14, (this.statsBgWidth*2)+10, windowHeight-2, 3);

 			const pokemon = p.toPokemon(this.scene);
 			const pokemonInfoContainer = this.scene.add.container(this.statsBgWidth+5, (windowHeight-0.5)*i);

 			const types = pokemon.getTypes();
 			let typeColor = getTypeRgb(types[0]);
 			const type1Color = new Phaser.Display.Color(typeColor[0], typeColor[1], typeColor[2]);

 			const bgColor = type1Color.clone().darken(45);
      pokemonInfoWindow.setFillStyle(bgColor.color);

      const iconContainer = this.scene.add.container(0, 0);
      const icon = this.scene.addPokemonIcon(pokemon, 0, 0, 0, 0);
      icon.setScale(0.75);
      icon.setPosition(-99, 1);
      typeColor = types[1] ? getTypeRgb(types[1]) : null;
      const type2Color = typeColor ? new Phaser.Display.Color(typeColor[0], typeColor[1], typeColor[2]) : null;
      type2Color ? pokemonInfoWindow.setStrokeStyle(1, type2Color.color, 0.95) : pokemonInfoWindow.setStrokeStyle(1, type1Color.color, 0.95);

      this.getUi().bringToTop(icon);

      const pokeInfoTextContainer = this.scene.add.container(-85, 3.5);
      const textContainerFontSize = "34px";
      const pSpecies = pokemon.species;
      const pNature = getNatureName(pokemon.nature);
      const pName = pokemon.fusionSpecies ? pokemon.name : pSpecies.name;
      const passiveLabel = (currentLanguage==="ko"||currentLanguage==="zh_CN"||currentLanguage==="zh_TW") ? i18next.t("starterSelectUiHandler:passive") : i18next.t("starterSelectUiHandler:passive").charAt(0);
      const abilityLabel = (currentLanguage==="ko"||currentLanguage==="zh_CN"||currentLanguage==="zh_TW") ? i18next.t("starterSelectUiHandler:ability") : i18next.t("starterSelectUiHandler:ability").charAt(0);
      const pPassiveInfo = pokemon.passive ? `${passiveLabel+": "+allAbilities[starterPassiveAbilities[pSpecies.speciesId]].name}` : "";
      const pAbilityInfo = abilityLabel + ": " + pokemon.getAbility().name;
      const pokeInfoText = addBBCodeTextObject(this.scene, 0, 0, pName, TextStyle.SUMMARY, {fontSize: textContainerFontSize, lineSpacing:3});
      pokeInfoText.appendText(`${i18next.t("saveSlotSelectUiHandler:lv")}${Utils.formatFancyLargeNumber(pokemon.level, 1)} - ${pNature}`);
      pokeInfoText.appendText(pAbilityInfo);
      pokeInfoText.appendText(pPassiveInfo);
      pokeInfoTextContainer.add(pokeInfoText);

      const pokeStatTextContainer = this.scene.add.container(-35, 6);
      const pStats = [];
      pokemon.stats.forEach((element) => pStats.push(Utils.formatFancyLargeNumber(element,1)));

      for (let i = 0; i < pStats.length; i++) {
        const isMult = getNatureStatMultiplier(pokemon.nature, i);
        pStats[i] = (isMult < 1) ? pStats[i] + "[color=#40c8f8]↓[/color]" : pStats[i];
        pStats[i] = (isMult > 1) ? pStats[i] + "[color=#f89890]↑[/color]" : pStats[i];
      }

      const hp = i18next.t("pokemonInfo:Stat.HPshortened")+": "+pStats[0];
      const atk = i18next.t("pokemonInfo:Stat.ATKshortened")+": "+pStats[1];
      const def = i18next.t("pokemonInfo:Stat.DEFshortened")+": "+pStats[2];
      const spatk = i18next.t("pokemonInfo:Stat.SPATKshortened")+": "+pStats[3];
      const spdef = i18next.t("pokemonInfo:Stat.SPDEFshortened")+": "+pStats[4];
      const speedLabel = (currentLanguage==="es"||currentLanguage==="pt_BR") ? i18next.t("runHistory:SPDshortened") : i18next.t("pokemonInfo:Stat.SPDshortened");
      const speed = speedLabel+": "+pStats[5];

      //Column 1: HP Atk Def
      const pokeStatText1 = addBBCodeTextObject(this.scene, -5, 0, hp, TextStyle.SUMMARY, {fontSize: textContainerFontSize, lineSpacing:3});
      pokeStatText1.appendText(atk);
      pokeStatText1.appendText(def);
      pokeStatTextContainer.add(pokeStatText1);
      //Column 2: SpAtk SpDef Speed
      const pokeStatText2 = addBBCodeTextObject(this.scene, 25, 0, spatk, TextStyle.SUMMARY, {fontSize: textContainerFontSize, lineSpacing:3});
      pokeStatText2.appendText(spdef);
      pokeStatText2.appendText(speed);
      pokeStatTextContainer.add(pokeStatText2);

      const marksContainer = this.scene.add.container(0, 0);

      if (pokemon.fusionSpecies) {
        const splicedIcon = this.scene.add.image(0, 0, "icon_spliced");
        splicedIcon.setScale(0.35);
        splicedIcon.setOrigin(0, 0);
        pokemon.shiny ? splicedIcon.setPositionRelative(pokeInfoTextContainer, 35, 0) : splicedIcon.setPositionRelative(pokeInfoTextContainer, 28, 0);
        marksContainer.add(splicedIcon);
        this.getUi().bringToTop(splicedIcon);
      }

      if (pokemon.isShiny()) {
        const doubleShiny = pokemon.isFusion() && pokemon.shiny && pokemon.fusionShiny;

        const shinyStar = this.scene.add.image(0, 0, `shiny_star_small${doubleShiny ? "_1" : ""}`);
        shinyStar.setOrigin(0, 0);
        shinyStar.setScale(0.65);
        shinyStar.setPositionRelative(pokeInfoTextContainer, 28, 0);
        shinyStar.setTint(getVariantTint(!doubleShiny ? pokemon.getVariant() : pokemon.variant));
        marksContainer.add(shinyStar);
        this.getUi().bringToTop(shinyStar);

        if (doubleShiny) {
          const fusionShinyStar = this.scene.add.image(0, 0, "shiny_star_small_2");
          fusionShinyStar.setOrigin(0, 0);
          fusionShinyStar.setScale(0.5);
          fusionShinyStar.setPosition(shinyStar.x, shinyStar.y);
          fusionShinyStar.setTint(getVariantTint(pokemon.fusionVariant));
          marksContainer.add(fusionShinyStar);
          this.getUi().bringToTop(fusionShinyStar);
        }
      }

      const pokemonMoveset = pokemon.getMoveset();
      const movesetContainer = this.scene.add.container(70, -29);
      const pokemonMoveBgs = [];
      const pokemonMoveLabels = [];
      const movePos = [[-6.5,35.5],[37,35.5],[-6.5,43.5],[37,43.5]];
      for (let m = 0; m < pokemonMoveset.length; m++) {
      	const moveContainer = this.scene.add.container(movePos[m][0], movePos[m][1]);
        moveContainer.setScale(0.5);

      	const moveBg = this.scene.add.nineslice(0, 0, "type_bgs", "unknown", 85, 15, 2, 2, 2, 2);
      	moveBg.setOrigin(1, 0);

      	const moveLabel = addTextObject(this.scene, -moveBg.width / 2, 2, "-", TextStyle.PARTY);
      	moveLabel.setOrigin(0.5, 0);
      	moveLabel.setName("text-move-label");

      	pokemonMoveBgs.push(moveBg);
      	pokemonMoveLabels.push(moveLabel);

      	moveContainer.add(moveBg);
      	moveContainer.add(moveLabel);

      	movesetContainer.add(moveContainer);

      	const move = m < pokemonMoveset.length ? pokemonMoveset[m].getMove() : null;
        pokemonMoveBgs[m].setFrame(Type[move ? move.type : Type.UNKNOWN].toString().toLowerCase());
        pokemonMoveLabels[m].setText(move ? move.name : "-");
    	}

      const heldItemsScale = (this.runInfo.gameMode === GameModes.SPLICED_ENDLESS || this.runInfo.gameMode === GameModes.ENDLESS) ? 0.25 : 0.5;
      const heldItemsContainer = this.scene.add.container(-82, 6);
      const heldItemsList = [];
      if (this.runInfo.modifiers.length) {
        for (const m of this.runInfo.modifiers) {
          const modifier = m.toModifier(this.scene, this.modifiersModule[m.className]);
          if (modifier instanceof PokemonHeldItemModifier && modifier.pokemonId === pokemon.id) {
            modifier.stackCount = m.stackCount;
            heldItemsList.push(modifier);
          }
        }
        if (heldItemsList.length > 0) {
          (heldItemsList as PokemonHeldItemModifier[]).sort(modifierSortFunc);
          let row = 0;
          for (const [index, item] of heldItemsList.entries()) {
            if ( index > 36 ) { 
              const overflowIcon = addTextObject(this.scene, 182, 4, "+", TextStyle.WINDOW);
              heldItemsContainer.add(overflowIcon);
              break;
            }
            const itemIcon = item.getIcon(this.scene, true);
            //itemIcon.setFrame(item.type.iconImage);
            itemIcon.setScale(heldItemsScale);
            itemIcon.setPosition((index%19)*10, row*10);
            heldItemsContainer.add(itemIcon);
            if (index !== 0 && index%18 == 0) {
              row++;
            }
          }
        }
      }
      heldItemsContainer.setName("heldItems");
      heldItemsContainer.setVisible("false");

      pokemonInfoContainer.add(pokemonInfoWindow);
      iconContainer.add(icon);
      pokemonInfoContainer.add(iconContainer);
      marksContainer.setName("PkmnMarks");
      pokemonInfoContainer.add(marksContainer);
      movesetContainer.setName("PkmnMoves"); 
      pokemonInfoContainer.add(movesetContainer);
      pokeInfoTextContainer.setName("PkmnInfoText");
      pokemonInfoContainer.add(pokeInfoTextContainer);
      pokeStatTextContainer.setName("PkmnStatsText");
      pokemonInfoContainer.add(pokeStatTextContainer);
      pokemonInfoContainer.add(heldItemsContainer);
      pokemonInfoContainer.setName("PkmnInfo");
      this.partyContainer.add(pokemonInfoContainer);
      pokemon.destroy();
 		});
    this.gameStatsContainer.add(this.partyContainer);
 	}

  async parsePartyHeldItems(id: integer): Phaser.GameObjects.Container {
    
    //tempContainer.setVisible(false);
    return tempContainer; 
  }

  showParty(partyVisible: boolean): void {
    const allContainers = this.partyContainer.getAll("name", "PkmnInfo");
    allContainers.forEach((c: Phaser.GameObjects.Container) => {
      c.getByName("PkmnMoves").setVisible(partyVisible);
      c.getByName("PkmnInfoText").setVisible(partyVisible);
      c.getByName("PkmnStatsText").setVisible(partyVisible);
      c.getByName("PkmnMarks").setVisible(partyVisible);
      c.getByName("heldItems").setVisible(!partyVisible);
      this.partyVisibility = partyVisible; 
    });
  }

  showHallofFame(visibility: boolean): void {
    this.hallofFameContainer = this.scene.add.container(0, 0);
      //const hallofFameBg = new Phaser.GameObjects.Image(this.scene, 0, 0, "hall_of_fame.png");
      const hallofFameBg = this.scene.add.rectangle(0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height, 0x005460);
      this.hallofFameContainer.add(hallofFameBg);
      const hallofFameText = addTextObject(this.scene, 0, 0, i18next.t("runHistory:hallofFameText"), TextStyle.WINDOW);
      hallofFameText.setPosition(this.scene.game.canvas.width/2, 120);
      this.hallofFameContainer.add(hallofFameText);
      this.runInfo.party.forEach((poke, i) => {
        const pokemon = poke.toPokemon(this.scene);
        const pokemonSprite = this.scene.initPokemonSprite(this.scene.add.sprite(56, -106, pokemon.getSpriteKey(true)), null, false, true);
        this.hallofFameContainer.add(pokemonSprite);       
        pokemonSprite.play(pokemon.getSpriteKey(true));
        pokemonSprite.setPipelineData("teraColor", getTypeRgb(pokemon.getTeraType()));
        pokemonSprite.setPipelineData("ignoreTimeTint", true);
        pokemonSprite.setPipelineData("spriteKey", pokemon.getSpriteKey());
        pokemonSprite.setPipelineData("shiny", pokemon.shiny);
        pokemonSprite.setPipelineData("variant", pokemon.variant);
        [ "spriteColors", "fusionSpriteColors" ].map(k => {
          delete pokemonSprite.pipelineData[`${k}Base`];
          if (pokemon.summonData?.speciesForm) {
            k += "Base";
          }
      pokemonSprite.pipelineData[k] = pokemon.getSprite().pipelineData[k];
      });
      console.log(pokemonSprite);
      pokemon.destroy();
    });
    this.hallofFameContainer.setVisible(visibility);

    this.gameStatsContainer.add(this.hallofFameContainer);
  }

 	processInput(button: Button): boolean {
    const ui = this.getUi();

    let success = false;
    const error = false;

    if (button === Button.CANCEL) {
      success = true;
      this.runInfoContainer.removeAll(true);
      this.runResultContainer.removeAll(true);
      this.partyContainer.removeAll(true);
      this.partyHeldItemsContainer.removeAll(true);
      this.gameStatsContainer.removeAll(true);
      super.clear();
      this.gameStatsContainer.setVisible(false);
      ui.revertMode();
    } else {
      switch (button) {
      case Button.DOWN:
        if (this.partyVisibility) {
        this.showParty(false);
        this.partyHeldItemsContainer.setVisible(true);
      } else {
        this.showParty(true);
        this.partyHeldItemsContainer.setVisible(false);
      }
      break;
      case Button.UP:
        if (this.victory) {
          this.hallofFameContainer.visible ? this.showHallofFame(false) : this.showHallofFame(true);
          //this.hallofFameContainer.visible ? this.hallofFameContainer.setVisible(false) : this.hallofFameContainer.setVisible(true);
          break;
        }
        break;
      }
    }
    if (success) {
      ui.playSelect();
    } else if (error) {
      ui.playError();
    }
    return success || error;
  }
}

