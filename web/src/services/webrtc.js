import adapter from 'webrtc-adapter';

export function resizeCanvas(canvas, video, resolutionMap) {
    const w = video.offsetWidth;
    const h = video.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    resolutionMap.canvasHeight = h;
    resolutionMap.canvasWidth = w;
}


export function newRTCInfo(send) {
    let rtcInfo = {}
    let pc = new RTCPeerConnection()
    let dc = pc.createDataChannel("messages");
    pc.onicecandidate = function (evt) {
        // console.log("evt", evt)
    }
    // pc.addIceCandidate
    rtcInfo.run = async () => {
        return pc.createOffer({
            offerToReceiveAudio: false,
            offerToReceiveVideo: true,
        }).then((ld) => {
            pc.setLocalDescription(ld);
            const { sdp: offer } = ld
            return send(offer)
        }).then((answer) => {
            return answer.answer
        }).then((answer) => {
            return pc.setRemoteDescription(
                new RTCSessionDescription({
                    sdp: answer,
                    type: "answer",
                })
            );
        }).catch(error => {
            throw error
        })
    }
    rtcInfo.pc = pc
    rtcInfo.dc = dc

    return rtcInfo
}
