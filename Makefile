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

lint:
	yarn eslint --ext ts .

lint.fix:
	yarn eslint --ext ts --fix .

heroku.env.set:
	heroku config:set \
		SLACK_BOT_TOKEN="${SLACK_BOT_TOKEN}" \
		SLACK_SIGNING_SECRET="${SLACK_SIGNING_SECRET}" \
		NODE_ENV="production" \
		SLACK_CSTRIKE_CHANNEL="${SLACK_CSTRIKE_CHANNEL}" \
		SERVANT_PORT="${SERVANT_PORT}" \
		SERVANT_HOST="${SERVANT_HOST}"

heroku.logs:
	heroku logs --tail

deploy:
	git push --force-with-lease heroku master

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
		-v ${MAP}:/hlds/czero/start_map.txt \
		-v ${MAPCYCLE_TXT}:/hlds/czero/mapcycle.txt \
		-v ${SERVER_CFG}:/hlds/czero/server.cfg \
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
