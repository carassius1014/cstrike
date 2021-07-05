use super::error::Error;
use std::process::Command;

pub fn run() -> Result<(), Error> {
    get_or_throw(Command::new("stack").args(&["run", "--", "stop"]).output())?;
    Ok(())
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}
