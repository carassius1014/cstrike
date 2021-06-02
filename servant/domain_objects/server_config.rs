use std::default::Default;
use std::string::ToString;

pub struct ServerConfig {
    pub bot_allow_shield: bool,
    pub bot_auto_vacate: bool,
    pub bot_join_after_player: bool,
    pub bot_difficulty: BotDifficulty,
    pub bot_quota: u8,
    pub bot_quota_mode: BotQuotaMode,
    pub hostname: String,
    pub mp_winlimit: u8,
    pub mp_timelimit: u8,
    pub mp_autoteambalance: bool,
    pub pausable: bool,
    pub sv_aim: bool,
    pub sv_password: String,
    pub sv_maxspeed: u16,
    pub sv_cheats: bool,
}

impl Default for ServerConfig {
    fn default() -> Self {
        ServerConfig {
            bot_allow_shield: false,
            bot_auto_vacate: true,
            bot_difficulty: BotDifficulty::Expert,
            bot_join_after_player: true,
            bot_quota: 7,
            bot_quota_mode: BotQuotaMode::Fill,
            hostname: String::from("Counter-Strike: Condition Zero"),
            mp_winlimit: 11,
            mp_timelimit: 120,
            mp_autoteambalance: true,
            pausable: false,
            sv_aim: false,
            sv_password: String::from("123456"),
            sv_maxspeed: 320,
            sv_cheats: false,
        }
    }
}

pub enum BotQuotaMode {
    Normal,
    Fill,
    Match,
}

impl ToString for BotQuotaMode {
    fn to_string(&self) -> String {
        let s = match &self {
            BotQuotaMode::Normal => "normal",
            BotQuotaMode::Fill => "fill",
            BotQuotaMode::Match => "match",
        };
        String::from(s)
    }
}

pub enum BotDifficulty {
    Easy,
    Normal,
    Hard,
    Expert,
}

impl ToString for BotDifficulty {
    fn to_string(&self) -> String {
        let s = match &self {
            BotDifficulty::Easy => "0",
            BotDifficulty::Normal => "1",
            BotDifficulty::Hard => "2",
            BotDifficulty::Expert => "3",
        };
        String::from(s)
    }
}
