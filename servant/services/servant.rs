use crate::protos::cstrike::servant_server::{Servant, ServantServer};
use crate::protos::cstrike::{GetMapsResponse, StartServerRequest, StartServerResponse, Unit};
use crate::use_cases::collect_maps;
use tonic::{Code, Request, Response, Status};

#[derive(Debug, Default)]
pub struct Service {}

#[tonic::async_trait]
impl Servant for Service {
    async fn get_maps(&self, _: Request<Unit>) -> Result<Response<GetMapsResponse>, Status> {
        let maps = get_or_else(collect_maps::run())?;

        let response = GetMapsResponse { maps };

        Ok(Response::new(response))
    }

    async fn start_server(
        &self,
        request: Request<StartServerRequest>,
    ) -> Result<Response<StartServerResponse>, Status> {
        println!("Got a request: {:?}", request);

        let response = StartServerResponse {
            success: true,
            error_message: String::from("nothing"),
        };

        Ok(Response::new(response))
    }
}

pub fn create() -> ServantServer<Service> {
    ServantServer::new(Service::default())
}

fn get_or_else<T, E>(value: Result<T, E>) -> Result<T, Status> {
    value.map_err(|_| Status::new(Code::Unknown, "unknown error occurred"))
}
