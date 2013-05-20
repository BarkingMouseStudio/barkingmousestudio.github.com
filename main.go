package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir(".")))
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
	fmt.Println("Listening on :8000")
}
