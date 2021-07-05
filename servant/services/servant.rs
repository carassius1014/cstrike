use crate::domain_objects::server_config::ServerConfig;
use crate::protos::cstrike::servant_server::{Servant, ServantServer};
use crate::protos::cstrike::{
    GetMapsResponse, StartServerRequest, StartServerResponse, StopServerResponse, Unit,
};
use crate::use_cases::collect_maps;
use crate::use_cases::regenerate_mapcycle_txt;
use crate::use_cases::regenerate_server_cfg;
use crate::use_cases::start_hlds;
use crate::use_cases::stop_hlds;
use nonempty::NonEmpty;
use tonic::{Code, Request, Response, Status};

#[derive(Debug, Default)]
pub struct Service {}

#[tonic::async_trait]
impl Servant for Service {
    async fn get_maps(&self, _: Request<Unit>) -> Result<Response<GetMapsResponse>, Status> {
        let maps = get_or_throw(collect_maps::run())?;

        let response = GetMapsResponse { maps };

        Ok(Response::new(response))
    }

    async fn start_server(
        &self,
        request: Request<StartServerRequest>,
    ) -> Result<Response<StartServerResponse>, Status> {
        println!("Got a request: {:?}", request);

        let StartServerRequest {
            name,
            password,
            players,
            maps,
        } = request.into_inner();

        let config = ServerConfig {
            hostname: name,
            sv_password: password,
            bot_quota: 10 - players.len() as u8,
            ..ServerConfig::default()
        };

        let maps = NonEmpty::from_vec(maps).unwrap();

        let run_use_case = || {
            regenerate_server_cfg::run(&config)?;
            regenerate_mapcycle_txt::run(&maps.tail)?;
            start_hlds::run(&maps.head)
        };

        let response = match run_use_case() {
            Ok(_) => StartServerResponse {
                success: true,
                error_message: String::from("nothing wrong"),
            },
            Err(why) => StartServerResponse {
                success: false,
                error_message: why.message,
            },
        };

        Ok(Response::new(response))
    }

    async fn stop_server(&self, _: Request<Unit>) -> Result<Response<StopServerResponse>, Status> {
        let response = match stop_hlds::run() {
            Ok(_) => StopServerResponse {
                success: true,
                error_message: String::from("nothing wrong"),
            },
            Err(why) => StopServerResponse {
                success: false,
                error_message: why.message,
            },
        };

        Ok(Response::new(response))
    }
}

pub fn create() -> ServantServer<Service> {
    ServantServer::new(Service::default())
}

fn get_or_throw<T, E>(value: Result<T, E>) -> Result<T, Status> {
    value.map_err(|_| Status::new(Code::Unknown, "unknown error occurred"))
}
