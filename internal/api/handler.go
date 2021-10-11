package api

import (
	"encoding/json"

	"github.com/abba18/webrtc-remote-desktop/internal/rtc"
)

func AgentSession(webrtc rtc.Service, reqDec *json.Decoder) (interface{}, error) {
	req := &newSessionRequest{}
	if err := reqDec.Decode(req); err != nil {
		return nil, err
	}
	peer, err := webrtc.CreateRemoteScreenConnection(req.Screen, 24)
	if err != nil {
		return nil, err
	}

	answer, err := peer.ProcessOffer(req.Offer)

	if err != nil {
		return nil, err
	}

	res := newSessionResponse{
		Answer: answer,
	}
	return res, nil
}
