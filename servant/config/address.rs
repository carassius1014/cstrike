use super::error::Error;
use std::env;
use std::net::SocketAddr;

pub fn parse() -> Result<SocketAddr, Error> {
    let key = "SERVANT_PORT";
    let port = env::var(key).map_err(|_| Error {
        key: key.to_string(),
    })?;
    format!("0.0.0.0:{}", port).parse().map_err(|_| Error {
        key: key.to_string(),
    })
}
