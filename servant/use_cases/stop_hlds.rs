use super::error::Error;
use std::process::Command;

pub fn run() -> Result<(), Error> {
    let status = get_or_throw(Command::new("stack").args(&["run", "--", "stop"]).status())?;

    match status.code() {
        Some(22) => Err(Error::new(
            "Unknown docker error",
        )),
        Some(44) => Err(Error::new(
            "Container is not running"
        )),
        Some(55) => Err(Error::new(
            "Failed to stop container"
        )),
        _ => Ok(()),
    }
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}
