use crate::protos::cstrike::echo_server::{Echo, EchoServer};
use crate::protos::cstrike::{EchoRequest, EchoResponse};
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct EchoService {}

#[tonic::async_trait]
impl Echo for EchoService {
    async fn echo(&self, request: Request<EchoRequest>) -> Result<Response<EchoResponse>, Status> {
        println!("Got a request: {:?}", request);

        let response = EchoResponse {
            message: request.into_inner().message,
        };

        Ok(Response::new(response))
    }
}

pub fn create() -> EchoServer<EchoService> {
    EchoServer::new(EchoService::default())
}
