pub mod error;

use error::Error;
use std::env;
use std::net;

pub struct Config {
    pub address: net::SocketAddr,
}

pub fn parse() -> Result<Config, Error> {
    let port = env::var("SERVANT_PORT").map_err(|_| Error::FailToGetPort)?;
    let address = format!("0.0.0.0:{}", port)
        .parse()
        .map_err(|_| Error::FailToParseURL)?;
    Ok(Config { address: address })
}
