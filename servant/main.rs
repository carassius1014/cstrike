use tonic::{transport::Server, Request, Response, Status};

use cstrike::echo_server::{Echo, EchoServer};
use cstrike::{EchoRequest, EchoResponse};

mod cstrike {
    tonic::include_proto!("cstrike");
}

#[derive(Debug, Default)]
struct EchoService {}

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

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let port = std::env::var("SERVANT_PORT")?;
    let addr = format!("0.0.0.0:{}", port).parse()?;
    let service = EchoService::default();

    Server::builder()
        .add_service(EchoServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
