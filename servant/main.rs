use servant::config;
use servant::services;
use tonic::transport::Server;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address = config::address::parse()?;

    Server::builder()
        .add_service(services::echo::create())
        .add_service(services::servant::create())
        .serve(address)
        .await?;

    Ok(())
}
