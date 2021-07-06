use super::error::Error;
use std::process::Command;

pub fn run() -> Result<(), Error> {
    let status = get_or_throw(Command::new("stack").args(&["run", "--", "stop"]).status())?;

    match status.code() {
        Some(88) => Err(Error::new(
            "Pid file doesn't exist. Maybe server is not running.",
        )),
        Some(_) => Err(Error::new("Unknown error")),
        None => Ok(()),
    }
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}
