use servant::config;
use servant::services;
use tonic::transport::Server;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = config::parse()?;

    Server::builder()
        .add_service(services::echo::create())
        .serve(config.address)
        .await?;

    Ok(())
}
