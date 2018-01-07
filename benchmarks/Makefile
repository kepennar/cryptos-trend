NB_INSTANCES=2

all: bench

bench:
	@./run 2s $(NB_INSTANCES) $@
	@./run 5s $(NB_INSTANCES) $@
	@./run 10s $(NB_INSTANCES) $@
	@./run 20s $(NB_INSTANCES) $@
	@echo

.PHONY: all bench