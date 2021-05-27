use std::error;
use std::fmt;

#[derive(Debug)]
pub struct Error {
    pub key: String,
}

impl error::Error for Error {}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Fail to parse key: {}", self.key)
    }
}
