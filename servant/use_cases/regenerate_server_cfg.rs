use crate::config::path_to_server_cfg;
use crate::domain_objects::server_config::ServerConfig;
use std::path;
use std::{fs, io::Write};

pub struct Error {
    pub message: String,
}

impl Error {
    fn new(s: &str) -> Self {
        Error {
            message: String::from(s),
        }
    }
}

pub fn run(config: &ServerConfig) -> Result<(), Error> {
    let path = path_to_server_cfg::parse().map_err(|e| Error::new(e.to_string().as_ref()))?;
    let path_exists = path::Path::new(&path).exists();

    if path_exists {
        get_or_throw(fs::remove_file(&path))?
    }

    let mut file = get_or_throw(fs::File::create(path))?;

    let config_str = stringify_server_config(config);
    get_or_throw(file.write_all(config_str.as_bytes()))?;

    Ok(())
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}

fn stringify_server_config(config: &ServerConfig) -> String {
    [
        format!("bot_allow_shield {}", config.bot_allow_shield as i32),
        format!("bot_auto_vacate {}", config.bot_auto_vacate as i32),
        format!("bot_difficulty {}", config.bot_difficulty.to_string()),
        format!(
            "bot_join_after_player {}",
            config.bot_join_after_player as i32
        ),
        format!("bot_quota {}", config.bot_quota),
        format!("bot_quota_mode {}", config.bot_quota_mode.to_string()),
        format!("hostname {}", config.hostname),
        format!("mp_winlimit {}", config.mp_winlimit),
        format!("mp_timelimt {}", config.mp_timelimit),
        format!("mp_autoteambalance {}", config.mp_autoteambalance as i32),
        format!("pausable {}", config.pausable as i32),
        format!("sv_aim {}", config.sv_aim as i32),
        format!("sv_cheats {}", config.sv_cheats as i32),
        format!("sv_password {}", config.sv_password),
        format!("sv_maxspeed {}", config.sv_maxspeed),
    ]
    .join("\n")
}
