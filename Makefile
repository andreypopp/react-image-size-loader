.DELETE_ON_ERROR:

BIN           = ./node_modules/.bin
TESTS         = $(shell find lib -path '*/__tests__/*.js')
MOCHA					= NODE_ENV=test $(BIN)/mocha

lint:
	@$(BIN)/eslint lib

test:
	@$(MOCHA) -- $(TESTS)

ci:
	@$(MOCHA) --watch -- $(TESTS)

version-major version-minor version-patch: test lint
	@npm version $(@:version-%=%)

publish:
	@git push --tags origin HEAD:master
	@npm publish --access public
