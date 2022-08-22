setup:
	yarn

format:
	yarn prettier --write .
	git ls-files "*.nix" | xargs nixfmt

cleanup:
	rm -rf node_modules/ dist/

build:
	yarn webpack

start:
	node dist/bundle.js

process.restart:
	pm2 kill && \
		make build && \
		pm2 start dist/bundle.js

lint:
	yarn eslint --ext ts .

lint.fix:
	yarn eslint --ext ts --fix .

hlds.build:
	docker build -t hlds .

hlds.create:
	docker create \
		--name hlds \
		-p 27015:27015/udp \
		-p 27015:27015 \
		-v ${CSTRIKE_DIR}/gfx:/hlds/cstrike/gfx \
		-v ${CSTRIKE_DIR}/maps:/hlds/cstrike/maps \
		-v ${CSTRIKE_DIR}/models:/hlds/cstrike/models \
		-v ${CSTRIKE_DIR}/overviews:/hlds/cstrike/overviews \
		-v ${CZERO_DIR}/gfx:/hlds/czero/gfx \
		-v ${CZERO_DIR}/maps:/hlds/czero/maps \
		-v ${CZERO_DIR}/models:/hlds/czero/models \
		-v ${CZERO_DIR}/overviews:/hlds/czero/overviews \
		-v ${CZERO_DIR}/sound:/hlds/czero/sound \
		-v ${CZERO_DIR}/sprites:/hlds/czero/sprites \
		-v ${CZERO_DIR}/de_nifan_LG.wad:/hlds/czero/de_nifan_LG.wad \
		-v ${CZERO_DIR}/de_nust2.wad:/hlds/czero/de_nust2.wad \
		-v ${CZERO_DIR}/de_plaka.wad:/hlds/czero/de_plaka.wad \
		-v ${CZERO_DIR}/de_sweat.wad:/hlds/czero/de_sweat.wad \
		-v ${MAP}:/hlds/czero/start_map.txt \
		-v ${CZERO_MAPCYCLE_TXT}:/hlds/czero/mapcycle.txt \
		-v ${CZERO_SERVER_CFG}:/hlds/czero/server.cfg \
		hlds:latest \
		> ${CONTAINER}

hlds.start:
	cat ${CONTAINER} | xargs docker start

hlds.stop:
	cat ${CONTAINER} | xargs docker stop

hlds.restart:
	@make hlds.stop
	@make hlds.start

hlds.cleanup:
	docker system prune
