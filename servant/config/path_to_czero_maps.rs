use super::error::Error;
use std::env;
use std::path::PathBuf;

pub fn parse() -> Result<PathBuf, Error> {
    let key = "CZERO_MAPS";
    env::var(key).map(|s| PathBuf::from(s)).map_err(|_| Error {
        key: key.to_string(),
    })
}
