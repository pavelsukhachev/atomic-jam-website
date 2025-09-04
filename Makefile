.PHONY: install dev test lint

install:
	@echo "No dependencies to install"

dev:
	python3 -m http.server 5173 --directory src

test:
	@echo "No tests configured yet"

lint:
	@echo "No linters configured yet"

