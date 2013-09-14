package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
)

func main() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)

	go func() {
		http.Handle("/", http.FileServer(http.Dir(".")))
		err := http.ListenAndServe(":8000", nil)
		if err != nil {
			panic(err)
		}
	}()

	fmt.Println("Listening on :8000")
	<-sig
}
