package api

import (
	"encoding/json"

	"github.com/abba18/webrtc-remote-desktop/internal/rtc"
)

type newSessionRequest struct {
	Offer  string `json:"offer"`
	Screen int    `json:"screen"`
}

type newSessionResponse struct {
	Answer string `json:"answer"`
}

type screenPayload struct {
	Index int `json:"index"`
}

type screensResponse struct {
	Screens []screenPayload `json:"screens"`
}

type APIHandler func(webrtc rtc.Service, reqDec *json.Decoder) (interface{}, error)
