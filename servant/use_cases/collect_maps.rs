use super::error::Error;
use crate::config::path_to_cstrike_maps;
use crate::config::path_to_czero_maps;
use std::collections::HashSet;
use std::ffi::OsStr;
use std::fs;
use std::os::unix::ffi::OsStrExt;
use std::path::PathBuf;

pub fn run() -> Result<Vec<String>, Error> {
    let path_to_cstrike_maps = path_to_cstrike_maps::parse().map_err(|e| Error {
        message: e.to_string(),
    })?;

    let path_to_czero_maps = path_to_czero_maps::parse().map_err(|e| Error {
        message: e.to_string(),
    })?;

    let cstrike_maps = collect_stems(&path_to_cstrike_maps)?;
    let czero_maps = collect_stems(&path_to_czero_maps)?;

    let mut maps: Vec<String> = cstrike_maps
        .union(&czero_maps)
        .into_iter()
        .map(String::from)
        .collect();

    maps.sort();

    Ok(maps)
}

fn collect_stems(path: &PathBuf) -> Result<HashSet<String>, Error> {
    let entries = get_or_else(fs::read_dir(path), path)?;

    let files: HashSet<PathBuf> = entries
        .filter_map(Result::ok)
        .map(|entry| entry.path())
        .filter(|file| file.extension() == Some(OsStr::from_bytes(b"bsp")))
        .collect();

    let mut filenames = HashSet::new();

    files.into_iter().for_each(|file| {
        if let Some(stem) = file.file_stem() {
            if let Some(filename) = stem.to_str() {
                let filename = filename.to_string();
                filenames.insert(filename);
            }
        }
    });

    Ok(filenames)
}

fn get_or_else<T, E>(value: Result<T, E>, path: &PathBuf) -> Result<T, Error> {
    let message = format!("Failed to read dir: {:?}", path);
    value.map_err(|_| Error::new(&message))
}
