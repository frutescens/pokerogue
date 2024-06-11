import BattleScene from "./battle-scene";
import { TextStyle, addTextObject } from "./ui/text";
import { Mode } from "./ui/ui";
import UiHandler from "./ui/ui-handler";
import { addWindow } from "./ui/ui-theme";
import { Phase } from "./phase";
import * as Utils from "./utils";
import { argbFromRgba } from "@material/material-color-utilities";
import {Button} from "./enums/buttons";
import i18next from "./plugins/i18n";
import { OptionSelectConfig, OptionSelectItem } from "./ui/abstact-option-select-ui-handler";



export enum FrontierFacility {
	BATTLE_FRONTIER,
	BATTLE_FACTORY,
	BATTLE_TOWER,
	BATTLE_PIKE
}

const frontierOptions: OptionSelectItem[] = [
  {
    label: i18next.t("battleFrontier:BattleFactory"),
    onhover: () => {
      console.log("hello");
    },
    handler: () => {
      this.scene.ui.setMode(Mode.MESSAGE);
      this.scene.ui.clearText();
      showFrontierOptions(FrontierFacility.BATTLE_FACTORY);
    }
  	},
  	{
    label: i18next.t("battleFrontier:BattleTower"),
    handler: () => {
      this.scene.ui.setMode(Mode.MESSAGE);
      this.scene.ui.clearText();
      showFrontierOptions(FrontierFacility.BATTLE_TOWER);
      return true;
    }
  },
  {
    label:i18next.t("battleFrontier:BattlePike"),
    handler: () => {
      this.scene.ui.setMode(Mode.MESSAGE);
      this.scene.ui.clearText();
      showFrontierOptions(FrontierFacility.BATTLE_PIKE);
      return true;
    }
  }
];

const factoryOptions: OptionSelectItem[] = [
  {
    label: i18next.t("battleFrontier:battleFactoryNewGame"),
    handler: () => {
      showFrontierOptions(FrontierFacility.BATTLE_FACTORY);
      return true;
    }
  	},
  	{
    label: i18next.t("battleFrontier:battleFactoryLoadSeed"),
    handler: () => {
      showFrontierOptions(FrontierFacility.BATTLE_TOWER);
      return true;
    }
  }
];

const towerOptions: OptionSelectItem[] = [];
const pikeOptions: OptionSelectItem[] = [];

export class FrontierMenu extends Phase {
  constructor(scene: BattleScene) {
    super(scene);
  }

  start(): void {
    super.start();
    const ui = this.getUI();
  }

  showFrontierOptions(facility: FrontierFacility): void {
    switch (facility) {
  	 case FrontierFacility.BATTLE_FRONTIER:
  	   this.scene.ui.showText(i18next.t("battleFrontier:selectFrontierFacility"), null, () => this.scene.ui.setOverlayMode(Mode.OPTION_SELECT, { options: frontierOptions }));
  	   break;
  	 case FrontierFacility.BATTLE_FACTORY:
  		  this.scene.ui.showText(i18next.t("battleFrontier:chooseFactoryOptions"), null, () => this.scene.ui.setOverlayMode(Mode.OPTION_SELECT, { options: factoryOptions }));
  		  break;
  	 default:
  		  break;
    }
    return true;
  }
}
