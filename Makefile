stack-build := stack build --fast

all:

##########
# common #
##########

.PHONY: format
format:
	yarn prettier --write .
	git ls-files "*.hs" | xargs brittany --config-file ./brittany.yaml --write-mode=inplace
	git ls-files "*.nix" | xargs nixfmt

cleanup:
	rm -rf node_modules/ dist/
	stack clean

##########
# butler #
##########

butler.build:
	yarn webpack

.PHONY: butler.start
butler.start:
	node dist/bundle.js

.PHONY: butler.lint
butler.lint:
	yarn eslint --ext ts .

.PHONY: butler.lint.fix
butler.lint.fix:
	yarn eslint --ext ts --fix .

.PHONY: butler.heroku.env.set
butler.heroku.env.set:
	heroku config:set \
		SLACK_BOT_TOKEN="${SLACK_BOT_TOKEN}" \
		SLACK_SIGNING_SECRET="${SLACK_SIGNING_SECRET}" \
		NODE_ENV="production"

.PHONY: butler.heroku.logs
butler.heroku.logs:
	heroku logs --tail

.PHONY: butler.deploy
butler.deploy:
	git push --force-with-lease heroku master

###########
# servant #
###########

servant.build:
	$(stack-build)

servant.build.watch:
	$(stack-build) --file-watch

servant.exec:
	$(stack-build) && stack exec -- servant

.PHONY: servant.repl
servant.repl:
	stack ghci
