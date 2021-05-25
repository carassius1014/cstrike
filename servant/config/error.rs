use std::error;
use std::fmt;

#[derive(Debug)]
pub enum Error {
    FailToGetPort,
    FailToParseURL,
}

impl error::Error for Error {}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Error::FailToGetPort => write!(f, "Fail to get SERVANT_PORT"),
            Error::FailToParseURL => write!(f, "Fail to parse URL"),
        }
    }
}
