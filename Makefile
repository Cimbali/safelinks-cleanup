XPI := safelinks-cleanup.xpi
SRC := LICENSE README.md manifest.json $(wildcard src/*)

$(XPI): $(SRC)
	@zip -r $@ $^

clean:
	@rm -fv $(XPI)

.PHONY: clean
