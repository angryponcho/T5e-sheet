# Attribute map: D&D 5E (Classic) by Roll20 → T5e

Draft, 2026-11-01. Built from the attribute list of one real Classic character. Rows marked **(verify)** need a value dump (`dump-character.js`) to confirm how Classic stores them. Repeating sections don't appear in the Attributes tab, so their field names are from memory until a dump confirms them.

## Basics

| Classic | T5e | Notes |
|---|---|---|
| character name | `character_name` | |
| `race` (+ `subrace`) | `race` | Joined as "Subrace Race" when a subrace is set |
| `background` | `character_bg` | |
| `alignment` | `alignment` | |
| `level` | `level` | Total character level |
| `class`, `subclass`, `base_level` | `repeating_classlevel` row: `class`, `subclass`, `classlevel` | One row per class. Multiclass rows need checking **(verify)** |
| `age`, `size`, `height`, `weight`, `eyes`, `hair`, `skin` | same names | |
| `personality_traits` | `trait` | |
| `ideals` | `ideal` | |
| `bonds` | `bond` | |
| `flaws` | `flaw` | |
| `allies_and_organizations` | `repeating_feature` row named "Allies & Organizations" | T5e has no field for it |

## Abilities, saves, combat

| Classic | T5e | Notes |
|---|---|---|
| `strength` … `charisma` | `str` `dex` `con` `int` `wis` `cha` | Final scores, including racial bonuses. `*_base` holds the typed value **(verify which to use)** |
| `<ability>_save_prof` (set = proficient) | `<abil>saveprof` = "on" | |
| `hp` / `hp` max | `current_hp` / `max_hp` | |
| `hp_temp` | `temp_hp` | |
| `ac` | `ac` | Copied as a number. T5e doesn't calculate AC |
| `speed` | `speed` | |
| `hit_dice` + `hitdietype` | `hit_dice` | Written as e.g. "5d8" **(verify)** |
| `inspiration` | `insp` = "1" when set | |
| `deathsave_succ1–3`, `deathsave_fail1–3` | same names | Already match |
| `spellcasting_ability` (e.g. `@{wisdom_mod}+`) | `spellcastingstat` = `WIS` | |
| `lvlN_slots_total` | `slmxN` | |
| `lvlN_slots_total` − `lvlN_slots_expended` | `slncN` (slots left) | |
| `cp` `sp` `gp` `pp` | `copper` `silver` `gold` `platinum` | |
| `ep` | **decide** | T5e has no electrum. Suggest converting 1 ep = 5 sp |
| Calculated values (`*_mod`, `*_bonus`, `pb`, `initiative_bonus`, `spell_save_dc`, …) | none | T5e recalculates these itself |

## Skills

Classic stores proficiency as `<skill>_prof` (present = proficient) and expertise as `<skill>_type` = 2 **(verify)**. When two Classic skills map to one T5e skill, the best one wins: proficient in either means proficient, and expertise in either means expertise.

| Classic skill | T5e | Prefix |
|---|---|---|
| Acrobatics | Acrobatics | `acro` |
| Athletics | Athletics | `athl` |
| Animal Handling | Animal Handling | `anhn` |
| Insight | Insight | `insi` |
| Intimidation | Intimidation | `inti` |
| Medicine | Medicine | `medi` |
| Nature, **Survival** | Nature | `natr` |
| Stealth | Stealth | `stlh` |
| **Arcana** | Knowledge 1 ("Arcana") | `know1` |
| **History** | Knowledge 2 ("History") | `know2` |
| **Religion** | Knowledge 3 ("Religion") | `know3` |
| **Investigation**, **Perception** | Search | `srch` |
| **Deception**, **Persuasion**, **Performance** | Speechcraft | `spcf` |
| **Sleight of Hand** | Thieves' Tools | `thvs` |
| — | Swimming | `swim` (no source, starts untrained) |

Every T5e skill also has an ability dropdown (`<prefix>ability`). The converter sets it to the 5e default ability for that skill. For merged skills it uses the first one listed, for example Search → INT (from Investigation), and Speechcraft → CHA.

Jack of All Trades (`jack`) has no T5e equivalent. It gets flagged in the report.

## Tools

Classic tool proficiencies (`repeating_tool`: `toolname`, plus the `other_tool` text) are matched by name to T5e tools. Anything that doesn't match goes in the report and in `repeating_proflist` as OTHER.

| Classic tool name contains | T5e | Prefix |
|---|---|---|
| climb | Climber's Kit | `clmb` |
| disguise | Disguise Kit | `disg` |
| forg | Forgery Kit | `forg` |
| herbal | Herbalism Kit | `herb` |
| navigat | Navigator's Tools | `navg` |
| poison | Poisoner's Kit | `psnr` |
| thie | Thieves' Tools | `thvs` |
| alchem | Alchemist's Supplies | `alch` |
| brew | Brewer's Supplies | `brew` |
| callig | Calligrapher's Supplies | `clig` |
| carpent | Carpenter's Tools | `cpnt` |
| cartog | Cartographer's Tools | `crtg` |
| cobbl | Cobbler's Tools | `cobb` |
| cook | Cook's Utensils | `cook` |
| glass | Glassblower's Tools | `glbw` |
| jewel | Jeweler's Tools | `jwlr` |
| leather | Leatherworker's Tools | `lthr` |
| mason | Mason's Tools | `masn` |
| instrument, or any instrument name (lute, flute, drum, …) | Musical Instrument | `musc` |
| paint | Painter's Supplies | `pntr` |
| potter | Potter's Tools | `pttr` |
| smith | Smith's Tools | `smth` |
| tinker | Tinker's Tools | `tnkr` |
| weav | Weaver's Tools | `wevr` |
| woodcarv | Woodcarver's Tools | `wcrv` |

Gaming sets and vehicles have no T5e tool. They go to `repeating_proflist` as OTHER.

## Repeating sections (verify all field names with a dump)

| Classic | T5e |
|---|---|
| `repeating_proficiencies` (`prof_type`, `name`) + `other_languages`/`other_armor`/`other_weapon`/`other_other` text | `repeating_proflist` (`proftype`: WEAPON/ARMOR/LANGUAGE/OTHER, `profname`) |
| `repeating_traits` (`name`, `source`, `description`) | `repeating_feature` (`featurename`, `featuresource`, `featuretext`) |
| `repeating_attack` (`atkname`, `atkattr_base`, `atkbonus`, `atkprofflag`, `dmgbase`, `dmgattr`, `dmgmod`, `dmgtype`, `saveflag`, `saveattr`, `savedc`/`saveflat`, `saveeffect`) | `repeating_shortcut` (`attackname`, `attackstat`, `attackbonus`, `attackprof`, `attackroll`, `damagestat`, `damagebonus`, `damagetype`, `damagesavestat`, `attacksaveeffect`, `attacksavedc`) |
| `repeating_spell-cantrip`, `repeating_spell-1` … `-9` (`spellname`, `spellschool`, `spellcastingtime`, `spellrange`, `spellduration`, `spellcomp_v/s/m`, `spellcomp_materials`, `spellconcentration`, `spellritual`, `spellprepared`, `spelldescription`) | `repeating_spell` (`spellname`, `spellschool`, `spellcastingtime`, `spellrange`, `spellduration`, `spellverbal/somatic/material`, `spellmaterialdesc`, `spellconcentration`, `spellritual`, `spellprepped`, `spelldescription`) — **T5e has no spell level field; decide** |
| `repeating_inventory` (`itemname`, `itemcount`, `itemweight`, `itemcontent`) + `treasure` | `inventory` text: one line per item, e.g. "Rope (50 ft) x1" |

## Dropped (no T5e equivalent)

`jack` (Jack of All Trades), `hero_points`, `class_resource`/`other_resource` (name + value), `global_damage_mod_*`, `globalmagicmod`, encumbrance and weights, the Kingmaker attributes (`kingdom_*`, `army_*`), `honor`/`sanity` saves, and sheet bookkeeping (`version`, `appliedUpdates`, `mancer_*`, `tab`, `drop_*`, `options-*`). Class resources could become `repeating_feature` rows so the data isn't lost.

## Decisions still open

1. Spell level: add a level field to T5e spells, or write the level into the name?
2. Electrum: convert to silver, or drop it?
3. Class resources and hero points: keep them as feature notes, or drop them?
