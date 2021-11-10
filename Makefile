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
		-v ${CZERO_MAPS}:/hlds/czero/maps \
		-v ${CZERO_MAPCYCLE_TXT}:/hlds/czero/mapcycle.txt \
		-v ${CZERO_SERVER_CFG}:/hlds/czero/server.cfg \
		-v ${MAP}:/hlds/czero/start_map.txt \
		hlds:latest \
		> ${CONTAINER}

hlds.start:
	cat ${CONTAINER} | xargs docker start

hlds.stop:
	cat ${CONTAINER} | xargs docker stop

hlds.cleanup:
	docker system prune
