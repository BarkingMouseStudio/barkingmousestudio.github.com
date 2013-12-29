package main

import (
	"github.com/codegangsta/martini"
	"os"
	"os/signal"
)

func main() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)

	m := martini.Classic()
	m.Use(martini.Static("."))
	go m.Run()

	<-sig
}
