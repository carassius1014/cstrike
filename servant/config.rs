pub mod error;

use error::Error;
use std::env;
use std::net;
use std::path;

#[derive(Debug)]
pub struct Config {
    pub address: net::SocketAddr,
    pub path_to_maps: path::PathBuf,
    pub path_to_mapcycle_txt: path::PathBuf,
    pub path_to_server_cfg: path::PathBuf,
}

pub fn parse() -> Result<Config, Error> {
    fn parse_env(key: &str) -> Result<String, Error> {
        env::var(key).map_err(|_| Error {})
    }

    fn parse_env_as_path(key: &str) -> Result<path::PathBuf, Error> {
        parse_env(key).map(|s| path::PathBuf::from(s))
    }

    let port = parse_env("SERVANT_PORT")?;
    let address = format!("0.0.0.0:{}", port).parse().map_err(|_| Error {})?;
    let path_to_maps = parse_env_as_path("CSTRIKE_MAPS")?;
    let path_to_mapcycle_txt = parse_env_as_path("CSTRIKE_MAPCYCLE_TXT")?;
    let path_to_server_cfg = parse_env_as_path("CSTRIKE_SERVER_CFG")?;

    Ok(Config {
        address,
        path_to_maps,
        path_to_mapcycle_txt,
        path_to_server_cfg,
    })
}
