all:

setup:
	yarn
	bin/fix-grpc-tools-binaries

##########
# common #
##########

.PHONY: format
format:
	yarn prettier --write .
	git ls-files "*.rs" | xargs rustfmt
	cargo tomlfmt
	git ls-files "*.nix" | xargs nixfmt

cleanup:
	rm -rf node_modules/ dist/ target/

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
	cargo build

servant.exec:
	cargo run --bin servant

servant.check:
	cargo check

servant.check.watch:
	cargo watch -x check

servant.lint:
	cargo clippy

servant.lint.watch:
	cargo watch -x clippy

protobuf.codegen:
	bin/compile-protos
