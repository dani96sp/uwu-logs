import os
from collections import defaultdict
from time import perf_counter

import file_functions
import logs_dmg_heals
import logs_dmg_useful
import logs_main
from constants import LOGGER_REPORTS, TOP_FILE_NAME, get_ms_str, running_time
from logs_spell_info import AURAS_BOSS_MECHANICS, AURAS_CONSUME, AURAS_EXTERNAL, MULTISPELLS_D

try:
    import _validate
except ImportError:
    _validate = None


Z_SPELLS = [AURAS_EXTERNAL, AURAS_CONSUME, AURAS_BOSS_MECHANICS]

HUNGER_FOR_BLOOD = "63848"
FOCUS_MAGIC = "54646"
BATTLE_SQUAWK = "23060"
SPECS_NO_USE_FOR_CHICKEN = {*range(12, 16), *range(20, 24), 29, 31, 33, 35}

def f_auras(auras: dict[str, tuple[int, float]], spec: int):
    if HUNGER_FOR_BLOOD in auras and spec == 25:
        del auras[HUNGER_FOR_BLOOD]
    if FOCUS_MAGIC in auras and spec in range(12, 16):
        del auras[FOCUS_MAGIC]
    if BATTLE_SQUAWK in auras and spec in SPECS_NO_USE_FOR_CHICKEN:
        del auras[BATTLE_SQUAWK]
    
    zz: dict[str, list[int, float, int]] = {}
    for spell_id, (count, uptime) in auras.items():
        spell_id = MULTISPELLS_D.get(spell_id, spell_id)
        for n, auras_dict in enumerate(Z_SPELLS):
            if spell_id not in auras_dict:
                continue
            uptime = round(uptime*100, 1)
            if spell_id in zz:
                count += zz[spell_id][0]
                uptime += zz[spell_id][1]
            zz[spell_id] = [count, uptime, n]
            break

    return [
        [int(spell_id), *spell_data]
        for spell_id, spell_data in zz.items()
    ]

def find_kill(segments):
    for segment_info in segments:
        if segment_info['attempt_type'] == 'kill' and segment_info['diff'] != "TBD":
            yield segment_info

def get_vali_heal(logs_slice: list[str]):
    data = defaultdict(lambda: defaultdict(int))
    for line in logs_slice:
        if "_H" not in line:
            continue
        _line = line.split(',', 11)
        data[_line[4]][_line[2]] += int(_line[9]) - int(_line[10])
    return data

@running_time
def make_boss_top(report: logs_main.THE_LOGS, boss_name: str, kill_segment: dict):
    def is_player(guid):
        if guid in PLAYERS:
            return True
        # LOGGER_REPORTS.error(f"{report.NAME} {boss_name} Missing player {report.guid_to_name(guid)}")
    
    S = kill_segment['start']
    F = kill_segment['end']
    SLICE = report.get_logs(S, F)
    GUIDS = report.get_all_guids()
    PLAYERS = report.get_players_guids()
    SPECS = report.get_players_specs_in_segments(S, F)
    DURATION = report.get_slice_duration(S, F)
    AURAS = report.auras_info(S, F)

    if boss_name == "Valithria Dreamwalker":
        vali_data = get_vali_heal(SLICE)
        dmg_useful = defaultdict(int)
        dmg_total = defaultdict(int)
        for tguid, sources in vali_data.items():
            # totems worked until ~21-12-20
            # if tguid[5:12] == "0008FB5":
            #     for sguid, v in sources.items():
            #         dmg_useful[_sguid] += v
            if tguid[5:12] == "0008FB5":
                dmg_useful = sources
            for sguid, v in sources.items():
                _sguid = report.get_master_guid(sguid)
                dmg_total[_sguid] += v

    else:
        boss_guid_id = report.name_to_guid(boss_name)
        targets = logs_dmg_useful.get_all_targets(boss_name, boss_guid_id)
        targets_all = targets["all"]
        targets_useful = targets["useful"]

        data = report.useful_damage(S, F, targets_all, boss_name)
        for target_name in data["useful"]:
            targets_useful[target_name] = target_name
        
        useful_damage = data["damage"] | data["useful"]
        all_data_useful = logs_dmg_useful.combine_pets_all(useful_damage, GUIDS, trim_non_players=True, ignore_abom=True)
        dmg_useful = logs_dmg_useful.get_total_damage(all_data_useful, targets_useful)

        pp = report.get_players_and_pets_guids()
        dmg_total = logs_dmg_heals.parse_dmg_all_no_friendly(SLICE, pp)
        dmg_total = logs_dmg_useful.combine_pets(dmg_total, GUIDS, trim_non_players=True)

    return [
        {
            'r': report.NAME,
            't': DURATION,
            'i': guid[-7:],
            'n': PLAYERS[guid],
            'u': useful,
            'd': dmg_total[guid],
            's': SPECS[guid],
            'a': f_auras(AURAS[guid], SPECS[guid])
        }
        for guid, useful in dmg_useful.items()
        if is_player(guid)
    ]

def make_report_top(report_id: str, rewrite=False):
    report = logs_main.THE_LOGS(report_id)
    top_path = report.relative_path(TOP_FILE_NAME)
    if not rewrite and os.path.isfile(top_path):
        return
    
    pc = perf_counter()
    if _validate and _validate.pure_dog_water(report):
        LOGGER_REPORTS.debug(f'{get_ms_str(pc)} | {report_id:50} | Dog water')
        return

    report_top = defaultdict(dict)
    for boss_name, boss_segments in report.SEGMENTS.items():
        for kill_segment in find_kill(boss_segments):
            diff = kill_segment['diff']
            report_top[boss_name][diff] = make_boss_top(report, boss_name, kill_segment)

    file_functions.json_write(top_path, report_top, indent=None)
    LOGGER_REPORTS.debug(f'{get_ms_str(pc)} | {report_id:50} | Done top')
    return report_top

def make_report_top_wrap(name, rewrite=False):
    try:
        return make_report_top(name, rewrite=rewrite)
    except Exception:
        LOGGER_REPORTS.exception(name)
