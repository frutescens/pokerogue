import { Variant, getVariantTint } from "#app/data/variant";
import { argbFromRgba } from "@material/material-color-utilities";
import i18next from "i18next";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import BattleScene, { starterColors } from "../battle-scene";
import { allAbilities } from "../data/ability";
import { speciesEggMoves } from "../data/egg-moves";
import { Moves } from "../data/enums/moves";
import { Species } from "../data/enums/species";
import { GrowthRate, getGrowthRateColor } from "../data/exp";
import { Gender, getGenderColor, getGenderSymbol } from "../data/gender";
import { allMoves } from "../data/move";
import { Nature, getNatureName } from "../data/nature";
import { pokemonFormChanges } from "../data/pokemon-forms";
import { LevelMoves, pokemonFormLevelMoves, pokemonSpeciesLevelMoves } from "../data/pokemon-level-moves";
import PokemonSpecies, { allSpecies, getPokemonSpecies, getPokemonSpeciesForm, getStarterValueFriendshipCap, speciesStarters, starterPassiveAbilities } from "../data/pokemon-species";
import { Type } from "../data/type";
import { Button } from "../enums/buttons";
import { GameModes } from "../game-mode";
import { AbilityAttr, DexAttr, DexAttrProps, DexEntry, StarterFormMoveData, StarterMoveset } from "../system/game-data";
import { Passive as PassiveAttr } from "#app/data/enums/passive";
import { Tutorial, handleTutorial } from "../tutorial";
import * as Utils from "../utils";
import { OptionSelectItem } from "./abstact-option-select-ui-handler";
import MessageUiHandler from "./message-ui-handler";
import { TextStyle, addBBCodeTextObject, addTextObject } from "./text";
import { Mode } from "./ui";
import { addWindow } from "./ui-theme";
import {SettingKeyboard} from "#app/system/settings/settings-keyboard";
import {Device} from "#app/enums/devices";


export default class BattleFactoryUiHandler extends MessageUiHandler {
  private starterSelectContainer: Phaser.GameObjects.Container;
  private shinyOverlay: Phaser.GameObjects.Image;
  private pokemonSprite: Phaser.GameObjects.Sprite;
  private pokemonNameText: Phaser.GameObjects.Text;
  private type1Icon: Phaser.GameObjects.Sprite;
  private type2Icon: Phaser.GameObjects.Sprite;
  private pokemonGenderText: Phaser.GameObjects.Text;
  private pokemonUncaughtText: Phaser.GameObjects.Text;
  private pokemonAbilityLabelText: Phaser.GameObjects.Text;
  private pokemonAbilityText: Phaser.GameObjects.Text;
  private pokemonPassiveLabelText: Phaser.GameObjects.Text;
  private pokemonPassiveText: Phaser.GameObjects.Text;
  private pokemonNatureLabelText: Phaser.GameObjects.Text;
  private pokemonNatureText: BBCodeText;
  private pokemonMovesContainer: Phaser.GameObjects.Container;
  private pokemonMoveContainers: Phaser.GameObjects.Container[];
  private genOptionsText: Phaser.GameObjects.Text;
  private instructionsContainer: Phaser.GameObjects.Container;
  private instructionsText: Phaser.GameObjects.Text;
  private starterSelectMessageBox: Phaser.GameObjects.NineSlice;
  private starterSelectMessageBoxContainer: Phaser.GameObjects.Container;
  private statsContainer: StatsContainer;
  private pokemonFormText: Phaser.GameObjects.Text;
  private moveInfoOverlay : MoveInfoOverlay;

  private genMode: boolean;
  private statsMode: boolean;
  private dexAttrCursor: bigint = 0n;
  private starterMoveset: StarterMoveset;

  private genSpecies: PokemonSpecies[][] = [];
  private lastSpecies: PokemonSpecies;
  private speciesLoaded: Map<Species, boolean> = new Map<Species, boolean>();
  public starterGens: integer[] = [];
  public starterCursors: integer[] = [];
  private pokerusGens: integer[] = [];
  private pokerusCursors: integer[] = [];
  private starterAttr: bigint[] = [];
  private starterAbilityIndexes: integer[] = [];
  private starterNatures: Nature[] = [];
  private starterMovesets: StarterMoveset[] = [];
  private speciesStarterDexEntry: DexEntry;
  private speciesStarterMoves: Moves[];
  private value: integer = 0;
  private canAddParty: boolean;

  private assetLoadCancelled: Utils.BooleanHolder;
  public cursorObj: Phaser.GameObjects.Image;
  private starterCursorObjs: Phaser.GameObjects.Image[];
  private pokerusCursorObjs: Phaser.GameObjects.Image[];
  private starterIcons: Phaser.GameObjects.Sprite[];
  private genCursorObj: Phaser.GameObjects.Image;
  private genCursorHighlightObj: Phaser.GameObjects.Image;
  private startCursorObj: Phaser.GameObjects.NineSlice;

  //variables to keep track of the dynamically rendered list of instruction prompts for starter select
  private instructionRowX = 0;
  private instructionRowY = 0;
  private instructionRowTextOffset = 12;

  private starterSelectCallback: StarterSelectCallback;

  protected blockInput: boolean = false;

  constructor(scene: BattleScene) {
  	super(scene, Mode.BATTLE_FACTORY);
  }

  setup() {
  	const ui = this.getUi();
  	
  	this.battleFactoryContainer = this.scene.add.container(0, -this.scene.game.canvas.height / 6);
  	this.battleFactoryContainer.setVisible(false);
  	ui.add(this.battleFactoryContainer);

  	const bgColor = this.scene.add.rectangle(0, 0, this.scene.game.canvas.width / 6, this.scene.game.canvas.height / 6, 0x006860);
  	bgColor.setOrigin(0, 0);
  	this.battleFactoryContainer.add(bgColor);

  	const battleFactoryBg = this.scene.add.image(0, 0, "battle_factory");
  	battleFactoryBg.setOrigin(0, 0);
  	this.battleFactoryContainer.add(battleFactoryBg);  
  }
 }