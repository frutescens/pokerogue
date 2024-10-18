import { Species } from "#enums/species";

export const POKERUS_STARTER_COUNT = 5;

// #region Friendship constants
export const CLASSIC_CANDY_FRIENDSHIP_MULTIPLIER = 2;
export const FRIENDSHIP_GAIN_FROM_BATTLE = 2;
export const FRIENDSHIP_GAIN_FROM_RARE_CANDY = 5;
export const FRIENDSHIP_LOSS_FROM_FAINT = 10;

/**
 * Function to get the cumulative friendship threshold at which a candy is earned
 * @param starterCost The cost of the starter, found in {@linkcode speciesStarterCosts}
 * @returns aforementioned threshold
 */
export function getStarterValueFriendshipCap(starterCost: number): number {
  switch (starterCost) {
  case 1:
    return 20;
  case 2:
    return 40;
  case 3:
    return 60;
  case 4:
    return 100;
  case 5:
    return 140;
  case 6:
    return 200;
  case 7:
    return 280;
  case 8:
  case 9:
    return 450;
  default:
    return 600;
  }
}

export const speciesStarterCosts = {
  [Species.BULBASAUR]: 3,
  [Species.CHARMANDER]: 3,
  [Species.SQUIRTLE]: 3,
  [Species.CATERPIE]: 2,
  [Species.WEEDLE]: 1,
  [Species.PIDGEY]: 1,
  [Species.RATTATA]: 1,
  [Species.SPEAROW]: 1,
  [Species.EKANS]: 2,
  [Species.PIKACHU]: 3,
  [Species.SANDSHREW]: 2,
  [Species.NIDORAN_F]: 3,
  [Species.NIDORAN_M]: 3,
  [Species.CLEFAIRY]: 3,
  [Species.VULPIX]: 3,
  [Species.JIGGLYPUFF]: 2,
  [Species.ZUBAT]: 3,
  [Species.ODDISH]: 3,
  [Species.PARAS]: 2,
  [Species.VENONAT]: 2,
  [Species.DIGLETT]: 2,
  [Species.MEOWTH]: 3,
  [Species.PSYDUCK]: 2,
  [Species.MANKEY]: 4,
  [Species.GROWLITHE]: 4,
  [Species.POLIWAG]: 2,
  [Species.ABRA]: 4,
  [Species.MACHOP]: 3,
  [Species.BELLSPROUT]: 2,
  [Species.TENTACOOL]: 3,
  [Species.GEODUDE]: 3,
  [Species.PONYTA]: 2,
  [Species.SLOWPOKE]: 3,
  [Species.MAGNEMITE]: 4,
  [Species.FARFETCHD]: 2,
  [Species.DODUO]: 3,
  [Species.SEEL]: 1,
  [Species.GRIMER]: 2,
  [Species.SHELLDER]: 5,
  [Species.GASTLY]: 4,
  [Species.ONIX]: 3,
  [Species.DROWZEE]: 2,
  [Species.KRABBY]: 3,
  [Species.VOLTORB]: 2,
  [Species.EXEGGCUTE]: 3,
  [Species.CUBONE]: 3,
  [Species.HITMONLEE]: 4,
  [Species.HITMONCHAN]: 4,
  [Species.LICKITUNG]: 3,
  [Species.KOFFING]: 2,
  [Species.RHYHORN]: 3,
  [Species.CHANSEY]: 3,
  [Species.TANGELA]: 3,
  [Species.KANGASKHAN]: 4,
  [Species.HORSEA]: 3,
  [Species.GOLDEEN]: 2,
  [Species.STARYU]: 3,
  [Species.MR_MIME]: 3,
  [Species.SCYTHER]: 5,
  [Species.JYNX]: 4,
  [Species.ELECTABUZZ]: 4,
  [Species.MAGMAR]: 4,
  [Species.PINSIR]: 4,
  [Species.TAUROS]: 4,
  [Species.MAGIKARP]: 4,
  [Species.LAPRAS]: 4,
  [Species.DITTO]: 2,
  [Species.EEVEE]: 3,
  [Species.PORYGON]: 4,
  [Species.OMANYTE]: 3,
  [Species.KABUTO]: 3,
  [Species.AERODACTYL]: 5,
  [Species.SNORLAX]: 5,
  [Species.ARTICUNO]: 6,
  [Species.ZAPDOS]: 6,
  [Species.MOLTRES]: 6,
  [Species.DRATINI]: 4,
  [Species.MEWTWO]: 8,
  [Species.MEW]: 6,

  [Species.CHIKORITA]: 2,
  [Species.CYNDAQUIL]: 3,
  [Species.TOTODILE]: 3,
  [Species.SENTRET]: 1,
  [Species.HOOTHOOT]: 2,
  [Species.LEDYBA]: 1,
  [Species.SPINARAK]: 1,
  [Species.CHINCHOU]: 2,
  [Species.PICHU]: 2,
  [Species.CLEFFA]: 2,
  [Species.IGGLYBUFF]: 1,
  [Species.TOGEPI]: 3,
  [Species.NATU]: 2,
  [Species.MAREEP]: 2,
  [Species.MARILL]: 4,
  [Species.SUDOWOODO]: 3,
  [Species.HOPPIP]: 2,
  [Species.AIPOM]: 2,
  [Species.SUNKERN]: 1,
  [Species.YANMA]: 3,
  [Species.WOOPER]: 2,
  [Species.MURKROW]: 3,
  [Species.MISDREAVUS]: 2,
  [Species.UNOWN]: 1,
  [Species.WOBBUFFET]: 2,
  [Species.GIRAFARIG]: 3,
  [Species.PINECO]: 2,
  [Species.DUNSPARCE]: 3,
  [Species.GLIGAR]: 3,
  [Species.SNUBBULL]: 2,
  [Species.QWILFISH]: 3,
  [Species.SHUCKLE]: 3,
  [Species.HERACROSS]: 5,
  [Species.SNEASEL]: 4,
  [Species.TEDDIURSA]: 4,
  [Species.SLUGMA]: 2,
  [Species.SWINUB]: 3,
  [Species.CORSOLA]: 2,
  [Species.REMORAID]: 2,
  [Species.DELIBIRD]: 2,
  [Species.MANTINE]: 3,
  [Species.SKARMORY]: 4,
  [Species.HOUNDOUR]: 3,
  [Species.PHANPY]: 3,
  [Species.STANTLER]: 3,
  [Species.SMEARGLE]: 1,
  [Species.TYROGUE]: 3,
  [Species.SMOOCHUM]: 3,
  [Species.ELEKID]: 3,
  [Species.MAGBY]: 3,
  [Species.MILTANK]: 4,
  [Species.RAIKOU]: 6,
  [Species.ENTEI]: 6,
  [Species.SUICUNE]: 6,
  [Species.LARVITAR]: 4,
  [Species.LUGIA]: 8,
  [Species.HO_OH]: 8,
  [Species.CELEBI]: 6,

  [Species.TREECKO]: 3,
  [Species.TORCHIC]: 4,
  [Species.MUDKIP]: 3,
  [Species.POOCHYENA]: 2,
  [Species.ZIGZAGOON]: 2,
  [Species.WURMPLE]: 1,
  [Species.LOTAD]: 3,
  [Species.SEEDOT]: 2,
  [Species.TAILLOW]: 3,
  [Species.WINGULL]: 2,
  [Species.RALTS]: 3,
  [Species.SURSKIT]: 2,
  [Species.SHROOMISH]: 3,
  [Species.SLAKOTH]: 4,
  [Species.NINCADA]: 4,
  [Species.WHISMUR]: 2,
  [Species.MAKUHITA]: 3,
  [Species.AZURILL]: 4,
  [Species.NOSEPASS]: 2,
  [Species.SKITTY]: 1,
  [Species.SABLEYE]: 2,
  [Species.MAWILE]: 3,
  [Species.ARON]: 3,
  [Species.MEDITITE]: 3,
  [Species.ELECTRIKE]: 2,
  [Species.PLUSLE]: 2,
  [Species.MINUN]: 2,
  [Species.VOLBEAT]: 2,
  [Species.ILLUMISE]: 2,
  [Species.ROSELIA]: 3,
  [Species.GULPIN]: 1,
  [Species.CARVANHA]: 3,
  [Species.WAILMER]: 2,
  [Species.NUMEL]: 2,
  [Species.TORKOAL]: 3,
  [Species.SPOINK]: 2,
  [Species.SPINDA]: 1,
  [Species.TRAPINCH]: 3,
  [Species.CACNEA]: 2,
  [Species.SWABLU]: 2,
  [Species.ZANGOOSE]: 4,
  [Species.SEVIPER]: 3,
  [Species.LUNATONE]: 3,
  [Species.SOLROCK]: 3,
  [Species.BARBOACH]: 2,
  [Species.CORPHISH]: 3,
  [Species.BALTOY]: 2,
  [Species.LILEEP]: 3,
  [Species.ANORITH]: 3,
  [Species.FEEBAS]: 4,
  [Species.CASTFORM]: 1,
  [Species.KECLEON]: 2,
  [Species.SHUPPET]: 2,
  [Species.DUSKULL]: 3,
  [Species.TROPIUS]: 3,
  [Species.CHIMECHO]: 3,
  [Species.ABSOL]: 4,
  [Species.WYNAUT]: 2,
  [Species.SNORUNT]: 2,
  [Species.SPHEAL]: 2,
  [Species.CLAMPERL]: 3,
  [Species.RELICANTH]: 3,
  [Species.LUVDISC]: 1,
  [Species.BAGON]: 4,
  [Species.BELDUM]: 4,
  [Species.REGIROCK]: 6,
  [Species.REGICE]: 6,
  [Species.REGISTEEL]: 6,
  [Species.LATIAS]: 7,
  [Species.LATIOS]: 7,
  [Species.KYOGRE]: 9,
  [Species.GROUDON]: 9,
  [Species.RAYQUAZA]: 9,
  [Species.JIRACHI]: 7,
  [Species.DEOXYS]: 7,

  [Species.TURTWIG]: 3,
  [Species.CHIMCHAR]: 3,
  [Species.PIPLUP]: 3,
  [Species.STARLY]: 3,
  [Species.BIDOOF]: 2,
  [Species.KRICKETOT]: 1,
  [Species.SHINX]: 2,
  [Species.BUDEW]: 3,
  [Species.CRANIDOS]: 3,
  [Species.SHIELDON]: 3,
  [Species.BURMY]: 2,
  [Species.COMBEE]: 2,
  [Species.PACHIRISU]: 2,
  [Species.BUIZEL]: 2,
  [Species.CHERUBI]: 1,
  [Species.SHELLOS]: 3,
  [Species.DRIFLOON]: 2,
  [Species.BUNEARY]: 2,
  [Species.GLAMEOW]: 2,
  [Species.CHINGLING]: 2,
  [Species.STUNKY]: 2,
  [Species.BRONZOR]: 3,
  [Species.BONSLY]: 2,
  [Species.MIME_JR]: 2,
  [Species.HAPPINY]: 2,
  [Species.CHATOT]: 2,
  [Species.SPIRITOMB]: 4,
  [Species.GIBLE]: 4,
  [Species.MUNCHLAX]: 4,
  [Species.RIOLU]: 3,
  [Species.HIPPOPOTAS]: 3,
  [Species.SKORUPI]: 3,
  [Species.CROAGUNK]: 2,
  [Species.CARNIVINE]: 2,
  [Species.FINNEON]: 1,
  [Species.MANTYKE]: 2,
  [Species.SNOVER]: 2,
  [Species.ROTOM]: 5,
  [Species.UXIE]: 6,
  [Species.MESPRIT]: 6,
  [Species.AZELF]: 6,
  [Species.DIALGA]: 8,
  [Species.PALKIA]: 8,
  [Species.HEATRAN]: 6,
  [Species.REGIGIGAS]: 7,
  [Species.GIRATINA]: 8,
  [Species.CRESSELIA]: 6,
  [Species.PHIONE]: 4,
  [Species.MANAPHY]: 7,
  [Species.DARKRAI]: 7,
  [Species.SHAYMIN]: 6,
  [Species.ARCEUS]: 9,

  [Species.VICTINI]: 7,
  [Species.SNIVY]: 3,
  [Species.TEPIG]: 3,
  [Species.OSHAWOTT]: 3,
  [Species.PATRAT]: 1,
  [Species.LILLIPUP]: 3,
  [Species.PURRLOIN]: 2,
  [Species.PANSAGE]: 2,
  [Species.PANSEAR]: 2,
  [Species.PANPOUR]: 2,
  [Species.MUNNA]: 2,
  [Species.PIDOVE]: 1,
  [Species.BLITZLE]: 2,
  [Species.ROGGENROLA]: 3,
  [Species.WOOBAT]: 3,
  [Species.DRILBUR]: 4,
  [Species.AUDINO]: 3,
  [Species.TIMBURR]: 4,
  [Species.TYMPOLE]: 3,
  [Species.THROH]: 4,
  [Species.SAWK]: 4,
  [Species.SEWADDLE]: 2,
  [Species.VENIPEDE]: 3,
  [Species.COTTONEE]: 3,
  [Species.PETILIL]: 3,
  [Species.BASCULIN]: 4,
  [Species.SANDILE]: 4,
  [Species.DARUMAKA]: 4,
  [Species.MARACTUS]: 2,
  [Species.DWEBBLE]: 2,
  [Species.SCRAGGY]: 3,
  [Species.SIGILYPH]: 4,
  [Species.YAMASK]: 3,
  [Species.TIRTOUGA]: 3,
  [Species.ARCHEN]: 3,
  [Species.TRUBBISH]: 2,
  [Species.ZORUA]: 3,
  [Species.MINCCINO]: 3,
  [Species.GOTHITA]: 3,
  [Species.SOLOSIS]: 3,
  [Species.DUCKLETT]: 2,
  [Species.VANILLITE]: 3,
  [Species.DEERLING]: 2,
  [Species.EMOLGA]: 2,
  [Species.KARRABLAST]: 3,
  [Species.FOONGUS]: 2,
  [Species.FRILLISH]: 3,
  [Species.ALOMOMOLA]: 4,
  [Species.JOLTIK]: 3,
  [Species.FERROSEED]: 3,
  [Species.KLINK]: 3,
  [Species.TYNAMO]: 2,
  [Species.ELGYEM]: 2,
  [Species.LITWICK]: 3,
  [Species.AXEW]: 4,
  [Species.CUBCHOO]: 2,
  [Species.CRYOGONAL]: 4,
  [Species.SHELMET]: 2,
  [Species.STUNFISK]: 3,
  [Species.MIENFOO]: 3,
  [Species.DRUDDIGON]: 4,
  [Species.GOLETT]: 3,
  [Species.PAWNIARD]: 4,
  [Species.BOUFFALANT]: 4,
  [Species.RUFFLET]: 3,
  [Species.VULLABY]: 3,
  [Species.HEATMOR]: 3,
  [Species.DURANT]: 4,
  [Species.DEINO]: 4,
  [Species.LARVESTA]: 4,
  [Species.COBALION]: 6,
  [Species.TERRAKION]: 6,
  [Species.VIRIZION]: 6,
  [Species.TORNADUS]: 7,
  [Species.THUNDURUS]: 7,
  [Species.RESHIRAM]: 8,
  [Species.ZEKROM]: 8,
  [Species.LANDORUS]: 7,
  [Species.KYUREM]: 8,
  [Species.KELDEO]: 6,
  [Species.MELOETTA]: 7,
  [Species.GENESECT]: 6,

  [Species.CHESPIN]: 3,
  [Species.FENNEKIN]: 3,
  [Species.FROAKIE]: 4,
  [Species.BUNNELBY]: 3,
  [Species.FLETCHLING]: 3,
  [Species.SCATTERBUG]: 2,
  [Species.LITLEO]: 2,
  [Species.FLABEBE]: 3,
  [Species.SKIDDO]: 2,
  [Species.PANCHAM]: 3,
  [Species.FURFROU]: 3,
  [Species.ESPURR]: 2,
  [Species.HONEDGE]: 4,
  [Species.SPRITZEE]: 2,
  [Species.SWIRLIX]: 3,
  [Species.INKAY]: 3,
  [Species.BINACLE]: 3,
  [Species.SKRELP]: 2,
  [Species.CLAUNCHER]: 3,
  [Species.HELIOPTILE]: 3,
  [Species.TYRUNT]: 3,
  [Species.AMAURA]: 3,
  [Species.HAWLUCHA]: 4,
  [Species.DEDENNE]: 2,
  [Species.CARBINK]: 2,
  [Species.GOOMY]: 4,
  [Species.KLEFKI]: 3,
  [Species.PHANTUMP]: 2,
  [Species.PUMPKABOO]: 2,
  [Species.BERGMITE]: 3,
  [Species.NOIBAT]: 3,
  [Species.XERNEAS]: 8,
  [Species.YVELTAL]: 8,
  [Species.ZYGARDE]: 8,
  [Species.DIANCIE]: 7,
  [Species.HOOPA]: 7,
  [Species.VOLCANION]: 6,
  [Species.ETERNAL_FLOETTE]: 4,

  [Species.ROWLET]: 3,
  [Species.LITTEN]: 3,
  [Species.POPPLIO]: 4,
  [Species.PIKIPEK]: 2,
  [Species.YUNGOOS]: 2,
  [Species.GRUBBIN]: 3,
  [Species.CRABRAWLER]: 3,
  [Species.ORICORIO]: 3,
  [Species.CUTIEFLY]: 3,
  [Species.ROCKRUFF]: 3,
  [Species.WISHIWASHI]: 2,
  [Species.MAREANIE]: 2,
  [Species.MUDBRAY]: 3,
  [Species.DEWPIDER]: 3,
  [Species.FOMANTIS]: 2,
  [Species.MORELULL]: 2,
  [Species.SALANDIT]: 3,
  [Species.STUFFUL]: 3,
  [Species.BOUNSWEET]: 3,
  [Species.COMFEY]: 4,
  [Species.ORANGURU]: 4,
  [Species.PASSIMIAN]: 4,
  [Species.WIMPOD]: 3,
  [Species.SANDYGAST]: 3,
  [Species.PYUKUMUKU]: 2,
  [Species.TYPE_NULL]: 5,
  [Species.MINIOR]: 4,
  [Species.KOMALA]: 3,
  [Species.TURTONATOR]: 4,
  [Species.TOGEDEMARU]: 3,
  [Species.MIMIKYU]: 4,
  [Species.BRUXISH]: 4,
  [Species.DRAMPA]: 4,
  [Species.DHELMISE]: 4,
  [Species.JANGMO_O]: 4,
  [Species.TAPU_KOKO]: 6,
  [Species.TAPU_LELE]: 6,
  [Species.TAPU_BULU]: 6,
  [Species.TAPU_FINI]: 6,
  [Species.COSMOG]: 7,
  [Species.NIHILEGO]: 6,
  [Species.BUZZWOLE]: 6,
  [Species.PHEROMOSA]: 7,
  [Species.XURKITREE]: 6,
  [Species.CELESTEELA]: 6,
  [Species.KARTANA]: 7,
  [Species.GUZZLORD]: 6,
  [Species.NECROZMA]: 8,
  [Species.MAGEARNA]: 7,
  [Species.MARSHADOW]: 7,
  [Species.POIPOLE]: 7,
  [Species.STAKATAKA]: 6,
  [Species.BLACEPHALON]: 7,
  [Species.ZERAORA]: 6,
  [Species.MELTAN]: 6,
  [Species.ALOLA_RATTATA]: 1,
  [Species.ALOLA_SANDSHREW]: 2,
  [Species.ALOLA_VULPIX]: 3,
  [Species.ALOLA_DIGLETT]: 2,
  [Species.ALOLA_MEOWTH]: 3,
  [Species.ALOLA_GEODUDE]: 3,
  [Species.ALOLA_GRIMER]: 3,

  [Species.GROOKEY]: 3,
  [Species.SCORBUNNY]: 4,
  [Species.SOBBLE]: 3,
  [Species.SKWOVET]: 2,
  [Species.ROOKIDEE]: 3,
  [Species.BLIPBUG]: 2,
  [Species.NICKIT]: 1,
  [Species.GOSSIFLEUR]: 2,
  [Species.WOOLOO]: 2,
  [Species.CHEWTLE]: 3,
  [Species.YAMPER]: 2,
  [Species.ROLYCOLY]: 3,
  [Species.APPLIN]: 3,
  [Species.SILICOBRA]: 3,
  [Species.CRAMORANT]: 3,
  [Species.ARROKUDA]: 3,
  [Species.TOXEL]: 3,
  [Species.SIZZLIPEDE]: 3,
  [Species.CLOBBOPUS]: 2,
  [Species.SINISTEA]: 3,
  [Species.HATENNA]: 3,
  [Species.IMPIDIMP]: 3,
  [Species.MILCERY]: 3,
  [Species.FALINKS]: 4,
  [Species.PINCURCHIN]: 3,
  [Species.SNOM]: 3,
  [Species.STONJOURNER]: 3,
  [Species.EISCUE]: 3,
  [Species.INDEEDEE]: 4,
  [Species.MORPEKO]: 3,
  [Species.CUFANT]: 3,
  [Species.DRACOZOLT]: 5,
  [Species.ARCTOZOLT]: 4,
  [Species.DRACOVISH]: 5,
  [Species.ARCTOVISH]: 4,
  [Species.DURALUDON]: 5,
  [Species.DREEPY]: 4,
  [Species.ZACIAN]: 9,
  [Species.ZAMAZENTA]: 8,
  [Species.ETERNATUS]: 10,
  [Species.KUBFU]: 6,
  [Species.ZARUDE]: 6,
  [Species.REGIELEKI]: 6,
  [Species.REGIDRAGO]: 6,
  [Species.GLASTRIER]: 6,
  [Species.SPECTRIER]: 7,
  [Species.CALYREX]: 8,
  [Species.GALAR_MEOWTH]: 3,
  [Species.GALAR_PONYTA]: 2,
  [Species.GALAR_SLOWPOKE]: 3,
  [Species.GALAR_FARFETCHD]: 3,
  [Species.GALAR_CORSOLA]: 3,
  [Species.GALAR_ZIGZAGOON]: 3,
  [Species.GALAR_DARUMAKA]: 4,
  [Species.GALAR_YAMASK]: 3,
  [Species.GALAR_STUNFISK]: 2,
  [Species.GALAR_MR_MIME]: 3,
  [Species.GALAR_ARTICUNO]: 6,
  [Species.GALAR_ZAPDOS]: 6,
  [Species.GALAR_MOLTRES]: 6,
  [Species.HISUI_GROWLITHE]: 4,
  [Species.HISUI_VOLTORB]: 3,
  [Species.HISUI_QWILFISH]: 4,
  [Species.HISUI_SNEASEL]: 5,
  [Species.HISUI_ZORUA]: 3,
  [Species.ENAMORUS]: 7,

  [Species.SPRIGATITO]: 4,
  [Species.FUECOCO]: 4,
  [Species.QUAXLY]: 4,
  [Species.LECHONK]: 2,
  [Species.TAROUNTULA]: 1,
  [Species.NYMBLE]: 3,
  [Species.PAWMI]: 3,
  [Species.TANDEMAUS]: 4,
  [Species.FIDOUGH]: 2,
  [Species.SMOLIV]: 3,
  [Species.SQUAWKABILLY]: 2,
  [Species.NACLI]: 4,
  [Species.CHARCADET]: 4,
  [Species.TADBULB]: 3,
  [Species.WATTREL]: 3,
  [Species.MASCHIFF]: 3,
  [Species.SHROODLE]: 2,
  [Species.BRAMBLIN]: 3,
  [Species.TOEDSCOOL]: 3,
  [Species.KLAWF]: 3,
  [Species.CAPSAKID]: 3,
  [Species.RELLOR]: 2,
  [Species.FLITTLE]: 3,
  [Species.TINKATINK]: 4,
  [Species.WIGLETT]: 2,
  [Species.BOMBIRDIER]: 3,
  [Species.FINIZEN]: 3,
  [Species.VAROOM]: 4,
  [Species.CYCLIZAR]: 4,
  [Species.ORTHWORM]: 4,
  [Species.GLIMMET]: 4,
  [Species.GREAVARD]: 3,
  [Species.FLAMIGO]: 4,
  [Species.CETODDLE]: 3,
  [Species.VELUZA]: 4,
  [Species.DONDOZO]: 4,
  [Species.TATSUGIRI]: 4,
  [Species.GREAT_TUSK]: 6,
  [Species.SCREAM_TAIL]: 6,
  [Species.BRUTE_BONNET]: 6,
  [Species.FLUTTER_MANE]: 7,
  [Species.SLITHER_WING]: 6,
  [Species.SANDY_SHOCKS]: 6,
  [Species.IRON_TREADS]: 6,
  [Species.IRON_BUNDLE]: 6,
  [Species.IRON_HANDS]: 6,
  [Species.IRON_JUGULIS]: 6,
  [Species.IRON_MOTH]: 6,
  [Species.IRON_THORNS]: 6,
  [Species.FRIGIBAX]: 4,
  [Species.GIMMIGHOUL]: 4,
  [Species.WO_CHIEN]: 6,
  [Species.CHIEN_PAO]: 7,
  [Species.TING_LU]: 6,
  [Species.CHI_YU]: 7,
  [Species.ROARING_MOON]: 6,
  [Species.IRON_VALIANT]: 6,
  [Species.KORAIDON]: 9,
  [Species.MIRAIDON]: 9,
  [Species.WALKING_WAKE]: 6,
  [Species.IRON_LEAVES]: 6,
  [Species.POLTCHAGEIST]: 4,
  [Species.OKIDOGI]: 6,
  [Species.MUNKIDORI]: 6,
  [Species.FEZANDIPITI]: 6,
  [Species.OGERPON]: 7,
  [Species.GOUGING_FIRE]: 7,
  [Species.RAGING_BOLT]: 6,
  [Species.IRON_BOULDER]: 7,
  [Species.IRON_CROWN]: 6,
  [Species.TERAPAGOS]: 8,
  [Species.PECHARUNT]: 6,
  [Species.PALDEA_TAUROS]: 5,
  [Species.PALDEA_WOOPER]: 3,
  [Species.BLOODMOON_URSALUNA]: 6,
};

const starterCandyCosts: { passive: number; costReduction: [number, number]; egg: number; }[] = [
  { passive: 40, costReduction: [ 25, 60 ], egg: 30 }, // 1 Cost
  { passive: 40, costReduction: [ 25, 60 ], egg: 30 }, // 2 Cost
  { passive: 35, costReduction: [ 20, 50 ], egg: 25 }, // 3 Cost
  { passive: 30, costReduction: [ 15, 40 ], egg: 20 }, // 4 Cost
  { passive: 25, costReduction: [ 12, 35 ], egg: 18 }, // 5 Cost
  { passive: 20, costReduction: [ 10, 30 ], egg: 15 }, // 6 Cost
  { passive: 15, costReduction: [ 8, 20 ], egg: 12 }, // 7 Cost
  { passive: 10, costReduction: [ 5, 15 ], egg: 10 }, // 8 Cost
  { passive: 10, costReduction: [ 5, 15 ], egg: 10 }, // 9 Cost
  { passive: 10, costReduction: [ 5, 15 ], egg: 10 }, // 10 Cost
];

/**
 * Getter for {@linkcode starterCandyCosts} for passive unlock candy cost based on initial point cost
 * @param starterCost the default point cost of the starter found in {@linkcode speciesStarterCosts}
 * @returns the candy cost for passive unlock
 */
export function getPassiveCandyCount(starterCost: number): number {
  return starterCandyCosts[starterCost - 1].passive;
}

/**
 * Getter for {@linkcode starterCandyCosts} for value reduction unlock candy cost based on initial point cost
 * @param starterCost the default point cost of the starter found in {@linkcode speciesStarterCosts}
 * @returns respective candy cost for the two cost reductions as an array 2 numbers
 */
export function getValueReductionCandyCounts(starterCost: number): [number, number] {
  return starterCandyCosts[starterCost - 1].costReduction;
}

/**
 * Getter for {@linkcode starterCandyCosts} for egg purchase candy cost based on initial point cost
 * @param starterCost the default point cost of the starter found in {@linkcode speciesStarterCosts}
 * @returns the candy cost for the purchasable egg
 */
export function getSameSpeciesEggCandyCounts(starterCost: number): number {
  return starterCandyCosts[starterCost - 1].egg;
}

