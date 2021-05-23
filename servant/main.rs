use tonic::{transport::Server, Request, Response, Status};

use servant::echo_server::{Echo, EchoServer};
use servant::{EchoRequest, EchoResponse};

mod servant {
    tonic::include_proto!("servant");
}

#[derive(Debug, Default)]
struct EchoService {}

#[tonic::async_trait]
impl Echo for EchoService {
    async fn echo(
        &self,
        request: Request<EchoRequest>
    ) -> Result<Response<EchoResponse>, Status> {
        println!("Got a request: {:?}", request);
        let response = EchoResponse {
            message: request.into_inner().message
        };

        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:50051".parse()?;
    let service = EchoService::default();

    Server::builder()
        .add_service(EchoServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
