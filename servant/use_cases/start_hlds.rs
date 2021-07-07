use super::error::Error;
use std::process::Command;

pub fn run(start_map: &String) -> Result<(), Error> {
    let status = get_or_throw(
        Command::new("stack")
            .args(&["run", "--", "start", "--startMap", start_map])
            .status(),
    )?;

    match status.code() {
        Some(99) => Err(Error::new(
            "Pid file already exists. Maybe server is running.",
        )),
        _ => Ok(()),
    }
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}
