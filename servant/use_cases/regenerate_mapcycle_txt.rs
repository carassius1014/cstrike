use super::error::Error;
use crate::config::path_to_map_cycle_txt;
use std::fs;
use std::io::Write;
use std::path;

pub fn run(maps: &Vec<String>) -> Result<(), Error> {
    let path = get_or_throw(path_to_map_cycle_txt::parse())?;

    let path_exists = path::Path::new(&path).exists();

    if path_exists {
        get_or_throw(fs::remove_file(&path))?
    }

    let mut file = get_or_throw(fs::File::create(path))?;
    let maps_str = maps.join("\n");
    get_or_throw(file.write_all(maps_str.as_bytes()))?;

    Ok(())
}

fn get_or_throw<A, E: std::error::Error>(value: Result<A, E>) -> Result<A, Error> {
    value.map_err(|e| Error::new(e.to_string().as_ref()))
}
