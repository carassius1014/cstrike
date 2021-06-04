use std::error;
use std::fmt;

#[derive(Debug)]
pub struct Error {
    pub message: String,
}

impl Error {
    pub fn new(s: &str) -> Self {
        Error {
            message: String::from(s),
        }
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "use case error occurred: {}", self.message)
    }
}

impl error::Error for Error {}
