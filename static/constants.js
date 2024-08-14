const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CLASSES = ["Death Knight", "Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"]
const AURAS_COLUMNS = ["ext", "self", "rekt", "cls"];

const BOSSES = {
  "Points": ["Points"],
  "Icecrown Citadel": [
    "The Lich King",
    "Lord Marrowgar", "Lady Deathwhisper", "Deathbringer Saurfang",
    "Festergut", "Rotface", "Professor Putricide",
    "Blood Prince Council", "Blood-Queen Lana'thel",
    "Valithria Dreamwalker",
    "Sindragosa"
  ],
  "The Ruby Sanctum": ["Halion", "Baltharus the Warborn", "Saviana Ragefire", "General Zarithrian"],
  "Trial of the Crusader": ["Anub'arak", "Northrend Beasts", "Lord Jaraxxus", "Faction Champions", "Twin Val'kyr"],
  "Vault of Archavon": ["Toravon the Ice Watcher", "Archavon the Stone Watcher", "Emalon the Storm Watcher", "Koralon the Flame Watcher"],
  "Onyxia's Lair": ["Onyxia"],
  "The Eye of Eternity": ["Malygos"],
  "The Obsidian Sanctum": ["Sartharion"],
  "Naxxramas": [
    "Anub'Rekhan", "Grand Widow Faerlina", "Maexxna", "Noth the Plaguebringer", "Heigan the Unclean",
    "Loatheb", "Patchwerk", "Grobbulus", "Gluth", "Thaddius", "Instructor Razuvious", "Gothik the Harvester",
    "The Four Horsemen", "Sapphiron", "Kel'Thuzad"
  ],
  "Ulduar": [
    "Ignis the Furnace Master", "Razorscale", "XT-002 Deconstructor",
    "Assembly of Iron", "Kologarn", "Auriaya", "Hodir", "Thorim", "Freya", "Mimiron",
    "General Vezax", "Yogg-Saron", "Algalon the Observer"
  ],
  "Magtheridon's Lair": ["Magtheridon"],
  "Karazhan": [
    "Servant Quarters", "Attumen the Huntsman", "Moroes",
    "Opera House", "Maiden of Virtue", "The Curator",
    "Chess Event", "Terestian Illhoof", "Shade of Aran",
    "Netherspite", "Nightbane", "Prince Malchezaar",
  ],
  "Gruul's Lair": [
    "High King Maulgar", "Gruul the Dragonkiller",
  ],
  "Serpentshrine Cavern": [
    "Hydross the Unstable", "The Lurker Below", "Leotheras the Blind",
    "Fathom-Lord Karathress", "Morogrim Tidewalker", "Lady Vashj",
  ],
  "The Eye": [
    "Void Reaver", "Al'ar", "High Astromancer Solarian", "Kael'thas Sunstrider",
  ],
  "Black Temple": [
    "High Warlord Naj'entus", "Supremus", "Shade of Akama", "Teron Gorefiend", "Gurtogg Bloodboil",
    "Reliquary of Souls", "Mother Shahraz", "The Illidari Council", "Illidan",
  ],
  "Mount Hyjal": [
    "Rage Winterchill", "Anetheron", "Kaz'rogal", "Azgalor", "Archimonde",
  ],
  "Zul'Aman": [
    "Akil'zon", "Nalorakk", "Jan'alai", "Halazzi", "Hex Lord Malacrass", "Zul'jin",
  ],
  "Sunwell Plateau": [
    "Kalecgos", "Sathrovarr",
    "Brutallus",
    "Felmyst",
    "Alythess", "Sacrolash",
    "M'uru", "Entropius",
    "Kil'jaeden",
  ],
  "Ahn'Qiraj": [
    "The Prophet Skeram", "Battleguard Sartura", "Fankriss the Unyielding",
    "Princess Huhuran", "Twin Emperors", "C'Thun",
    "Bug Trio", "Viscidus", "Ouro",
  ],
  "Molten Core": [
    "Lucifron", "Magmadar", "Gehennas", "Garr", "Shazzrah", "Baron Geddon",
    "Golemagg the Incinerator", "Sulfuron Harbinger", "Majordomo Executus", "Ragnaros",
  ],
  "Blackwing Lair": [
    "Razorgore the Untamed", "Vaelastrasz the Corrupt", "Broodlord Lashlayer",
    "Firemaw", "Ebonroc", "Flamegor", "Chromaggus", "Nefarian",
  ],
};

const SPECS = [
  ["Death Knight", "class_deathknight", "death-knight"],
  ["Blood", "spell_deathknight_bloodpresence", "death-knight"],
  ["Frost", "spell_deathknight_frostpresence", "death-knight"],
  ["Unholy", "spell_deathknight_unholypresence", "death-knight"],
  ["Druid", "class_druid", "druid"],
  ["Balance", "spell_nature_starfall", "druid"],
  ["Feral Combat", "ability_racial_bearform", "druid"],
  ["Restoration", "spell_nature_healingtouch", "druid"],
  ["Hunter", "class_hunter", "hunter"],
  ["Beast Mastery", "ability_hunter_beasttaming", "hunter"],
  ["Marksmanship", "ability_marksmanship", "hunter"],
  ["Survival", "ability_hunter_swiftstrike", "hunter"],
  ["Mage", "class_mage", "mage"],
  ["Arcane", "spell_holy_magicalsentry", "mage"],
  ["Fire", "spell_fire_firebolt02", "mage"],
  ["Frost", "spell_frost_frostbolt02", "mage"],
  ["Paladin", "class_paladin", "paladin"],
  ["Holy", "spell_holy_holybolt", "paladin"],
  ["Protection", "spell_holy_devotionaura", "paladin"],
  ["Retribution", "spell_holy_auraoflight", "paladin"],
  ["Priest", "class_priest", "priest"],
  ["Discipline", "spell_holy_wordfortitude", "priest"],
  ["Holy", "spell_holy_guardianspirit", "priest"],
  ["Shadow", "spell_shadow_shadowwordpain", "priest"],
  ["Rogue", "class_rogue", "rogue"],
  ["Assassination", "ability_rogue_eviscerate", "rogue"],
  ["Combat", "ability_backstab", "rogue"],
  ["Subtlety", "ability_stealth", "rogue"],
  ["Shaman", "class_shaman", "shaman"],
  ["Elemental", "spell_nature_lightning", "shaman"],
  ["Enhancement", "spell_nature_lightningshield", "shaman"],
  ["Restoration", "spell_nature_magicimmunity", "shaman"],
  ["Warlock", "class_warlock", "warlock"],
  ["Affliction", "spell_shadow_deathcoil", "warlock"],
  ["Demonology", "spell_shadow_metamorphosis", "warlock"],
  ["Destruction", "spell_shadow_rainoffire", "warlock"],
  ["Warrior", "class_warrior", "warrior"],
  ["Arms", "ability_rogue_eviscerate", "warrior"],
  ["Fury", "ability_warrior_innerrage", "warrior"],
  ["Protection", "ability_warrior_defensivestance", "warrior"]
]


const SPECS_SELECT_OPTIONS = {
  "Death Knight": ["Blood", "Frost", "Unholy"],
  "Druid": ["Balance", "Feral Combat", "Restoration"],
  "Hunter": ["Beast Mastery", "Marksmanship", "Survival"],
  "Mage": ["Arcane", "Fire", "Frost"],
  "Paladin": ["Holy", "Protection", "Retribution"],
  "Priest": ["Discipline", "Holy", "Shadow"],
  "Rogue": ["Assassination", "Combat", "Subtlety"],
  "Shaman": ["Elemental", "Enhancement", "Restoration"],
  "Warlock": ["Affliction", "Demonology", "Destruction"],
  "Warrior": ["Arms", "Fury", "Protection"]
}

const AURAS_ICONS = {
  10060: "spell_holy_powerinfusion",
  12292: "spell_shadow_deathpact",
  16886: "spell_nature_naturesblessing",
  19753: "spell_nature_timestop",
  20572: "racial_orc_berserkerstrength",
  23060: "inv_misc_birdbeck_01",
  23881: "spell_nature_bloodlust",
  26297: "racial_troll_berserk",
  2825: "spell_nature_bloodlust",
  28494: "inv_potion_109",
  28507: "inv_potion_108",
  28714: "inv_misc_herb_flamecap",
  29166: "spell_nature_lightning",
  31884: "spell_holy_avenginewrath",
  32182: "ability_shaman_heroism",
  44335: "spell_arcane_arcane04",
  47241: "spell_shadow_demonform",
  48108: "ability_mage_hotstreak",
  48517: "ability_druid_eclipseorange",
  48518: "ability_druid_eclipse",
  49016: "spell_deathknight_bladedarmor",
  50213: "ability_mount_jungletiger",
  51605: "spell_shadow_shadowworddominate",
  51777: "spell_arcane_teleportironforge",
  51800: "inv_misc_head_dragon_blue",
  53365: "spell_holy_blessingofstrength",
  53434: "ability_druid_kingofthejungle",
  53762: "inv_alchemy_elixir_empty",
  53908: "inv_alchemy_elixir_04",
  53909: "inv_alchemy_elixir_01",
  54646: "spell_arcane_studentofmagic",
  54758: "spell_shaman_elementaloath",
  55637: "spell_arcane_prismaticcloak",
  57933: "ability_rogue_tricksofthetrade",
  63167: "spell_fire_fireball02",
  63848: "ability_rogue_hungerforblood",
  64371: "ability_warlock_eradication",
  66197: "spell_fire_felimmolation",
  66283: "spell_shadow_shadowmend",
  66334: "spell_shadow_soothingkiss",
  67108: "ability_mage_netherwindpresence",
  67215: "spell_shadow_darkritual",
  67218: "spell_holy_searinglightpriest",
  67905: "spell_shadow_soothingkiss",
  67906: "spell_shadow_soothingkiss",
  67907: "spell_shadow_soothingkiss",
  68123: "spell_fire_felimmolation",
  68124: "spell_fire_felimmolation",
  68125: "spell_fire_felimmolation",
  69065: "inv_misc_bone_03",
  69240: "ability_creature_cursed_01",
  69279: "spell_shadow_creepingplague",
  69674: "ability_creature_disease_02",
  69762: "spell_arcane_focusedpower",
  70157: "spell_frost_frozencore",
  70447: "ability_warlock_chaosbolt",
  70672: "spell_holiday_tow_spicecloud",
  70721: "spell_shadow_burningspirit",
  70728: "ability_hunter_piercingshots",
  70747: "spell_nature_invisibilty",
  70753: "spell_fire_elementaldevastation",
  70840: "spell_shadow_spectralsight",
  70853: "inv_misc_herb_evergreenmoss",
  70855: "spell_shadow_bloodboil",
  70867: "ability_warlock_improvedsoulleech",
  70879: "ability_warlock_improvedsoulleech",
  70911: "spell_shadow_corpseexplode",
  71007: "ability_poisonarrow",
  71218: "ability_creature_cursed_01",
  71224: "ability_creature_disease_02",
  71237: "ability_creature_cursed_03",
  71265: "ability_rogue_shadowdance",
  71278: "ability_creature_cursed_01",
  71279: "ability_creature_cursed_01",
  71289: "inv_belt_18",
  71340: "spell_shadow_destructivesoul",
  71473: "ability_warlock_improvedsoulleech",
  71484: "achievement_character_tauren_male",
  71485: "achievement_boss_kingymiron_03",
  71486: "achievement_character_tauren_male",
  71487: "achievement_dungeon_ulduarraid_irondwarf_01",
  71491: "achievement_dungeon_ulduarraid_irondwarf_01",
  71492: "achievement_boss_kingymiron_03",
  71525: "ability_warlock_improvedsoulleech",
  71530: "ability_warlock_improvedsoulleech",
  71531: "ability_warlock_improvedsoulleech",
  71532: "ability_warlock_improvedsoulleech",
  71533: "ability_warlock_improvedsoulleech",
  71556: "achievement_boss_kingymiron_03",
  71557: "achievement_dungeon_ulduarraid_irondwarf_01",
  71558: "achievement_character_tauren_male",
  71559: "achievement_dungeon_ulduarraid_irondwarf_01",
  71560: "achievement_boss_kingymiron_03",
  71561: "achievement_character_tauren_male",
  71601: "inv_jewelry_trinket_01",
  71605: "inv_jewelry_trinket_03",
  71636: "inv_jewelry_trinket_03",
  71644: "inv_jewelry_trinket_01",
  72272: "ability_creature_cursed_01",
  72273: "ability_creature_cursed_01",
  72297: "inv_misc_herb_evergreenmoss",
  72412: "inv_jewelry_ring_81",
  72416: "inv_jewelry_ring_83",
  72455: "spell_holiday_tow_spicecloud",
  72458: "inv_misc_herb_evergreenmoss",
  72459: "ability_creature_cursed_01",
  72460: "ability_creature_cursed_01",
  72548: "inv_misc_herb_evergreenmoss",
  72549: "inv_misc_herb_evergreenmoss",
  72550: "inv_misc_herb_evergreenmoss",
  72553: "achievement_boss_festergutrotface",
  72619: "ability_creature_cursed_01",
  72620: "ability_creature_cursed_01",
  72621: "ability_creature_cursed_01",
  72622: "ability_creature_cursed_01",
  72832: "spell_holiday_tow_spicecloud",
  72833: "spell_holiday_tow_spicecloud",
  72836: "ability_warlock_chaosbolt",
  72837: "ability_warlock_chaosbolt",
  72838: "ability_warlock_chaosbolt",
  72854: "spell_shadow_corpseexplode",
  72855: "spell_shadow_corpseexplode",
  72856: "spell_shadow_corpseexplode",
  72873: "inv_misc_herb_evergreenmoss",
  72874: "inv_misc_herb_evergreenmoss",
  73019: "ability_creature_cursed_01",
  73020: "ability_creature_cursed_01",
  73022: "ability_creature_disease_02",
  73023: "ability_creature_disease_02",
  73070: "spell_shadow_deathscream",
  73762: "inv_bannerpvp_02",
  73816: "spell_fire_incinerate",
  73818: "spell_fire_incinerate",
  73819: "spell_fire_incinerate",
  73820: "spell_fire_incinerate",
  73821: "spell_fire_incinerate",
  73822: "spell_fire_incinerate",
  73824: "inv_bannerpvp_02",
  73825: "inv_bannerpvp_02",
  73826: "inv_bannerpvp_02",
  73827: "inv_bannerpvp_02",
  73828: "inv_bannerpvp_02",
  74118: "inv_inscription_inkgreen03",
  74119: "inv_inscription_inkorange01",
  74297: "spell_deathknight_strangulate",
  74384: "ability_golemthunderclap",
  74456: "inv_misc_orb_05",
  74509: "spell_fire_playingwithfire",
  74531: "ability_criticalstrike",
  74567: "spell_fire_sealoffire",
  74795: "spell_shadow_seedofdestruction",
  75456: "inv_misc_rubysanctum4",
  75458: "inv_misc_rubysanctum4",
  75466: "inv_misc_rubysanctum2",
  75473: "inv_misc_rubysanctum2",
}

export {
  BOSSES,
  CLASSES,
  SPECS,
  SPECS_SELECT_OPTIONS,
  AURAS_COLUMNS,
  AURAS_ICONS,
  MONTHS,
}
