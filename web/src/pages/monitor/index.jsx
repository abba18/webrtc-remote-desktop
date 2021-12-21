import React, { useEffect } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { resizeCanvas, newRTCInfo } from '../../services/webrtc'
import { connectDevice } from '../../services/api'


function Monitor() {

    const [resolutionMap, setResolutionMap] = React.useState({
        screenWidth: 0,
        screenHeight: 0,
        canvasWidth: 0,
        canvasHeight: 0,
    })
    useEffect(() => {
        const remoteVideo = document.querySelector("#rtc-video");
        const remoteCanvas = document.querySelector("#rtc-canvas");
        remoteVideo.onplaying = () => {
            setInterval(() => {
                resizeCanvas(remoteCanvas, remoteVideo, resolutionMap);
                setResolutionMap(resolutionMap)
            }, 1000);
        };

        const rtc = connect()
        const run = async () => {
            rtc.pc.ontrack = (evt) => {
                remoteVideo.srcObject = evt.streams[0];
                remoteVideo.play().catch(error => {
                    console.log("play error", error)
                })
            };
            await rtc.run()
        }
        try {
            run()
            remoteVideo.style.setProperty("visibility", "visible");
        }
        catch (error) {
            console.log("run error", error)
        }
    })

    function fullScreen() {
        let element = document.querySelector("#root");
        element.requestFullscreen()
            .then(function () {
                console.log("full")
            })
            .catch(function (error) {
                alert("full err", error)
            });
    }
    function exitFullscreen() {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen()
                .then(function () {
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        } else {
            alert("already exit")
        }
    }
    function connect() {
        let param = {
            "screen": 0,
            "offer": "",
        }
        let send = (offer) => {
            param.offer = offer
            return connectDevice(param)
        }
        return newRTCInfo(send)
    }
    return (
        <>
            {/* <Button type="primary" shape="circle" icon={<SearchOutlined />} /> */}
            <video id="rtc-video" autoplay muted playsinline></video>
            <canvas id="rtc-canvas" />
        </>
    );
}

export default Monitor;