import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { resizeCanvas, newRTCInfo } from '../../services/webrtc'
import { connectDevice } from '../../services/api'
import Draggable from 'react-draggable';
import vFile from '../../assets/test.mp4'
import './index.css';


// monitor size change
function useUpdateSize() {
    const [[height, width], setState] = useState([0, 0])
    useEffect(() => {
        function updateSize() {
            const [h, w] = [window.innerHeight, window.innerWidth]
            // console.log("h,w", h, w)
            setState([h, w])
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [])
    return [height, width]
}

// 
function useMouseMove() {
    const [[x, y], setState] = useState([0, 0])
    useEffect(() => {
        function updateMousePos(evt) {
            // console.log("mouse evt", evt)
            setState([evt.clientX, evt.clientY])
        }
        // updateMousePos();
        window.addEventListener('mousemove', updateMousePos);
        return () => window.removeEventListener('mousemove', updateMousePos);
    }, [])
    return [x, y]
}

function Monitor() {
    const nodeRef = useRef(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [h, w] = useUpdateSize()
    let [mouseX, mouseY] = useMouseMove()
    let [canvasPos, setCanvasPos] = useState({ x: 0, y: 0 })
    // useReducer()

    // rtc connect
    useEffect(() => {
        const videoNode = videoRef.current;
        videoNode.onplaying = () => {
            videoNode.pause()
        };

        videoNode.src = vFile
        // const rtc = connect()
        // const run = async () => {
        //     rtc.pc.ontrack = (evt) => {
        //         videoNode.srcObject = evt.streams[0];
        //         videoNode.play().catch(error => {
        //             console.log("play error", error)
        //         })
        //     };
        //     await rtc.run()
        // }
        // try {
        //     run()
        //     // videoNode.style.setProperty("visibility", "visible");
        // }
        // catch (error) {
        //     console.log("run error", error)
        // }
    }, [])

    // window resize
    useEffect(() => {
        resize(h, w)
    }, [w, h])

    // mouse move
    useEffect(() => {
        const canvasNode = canvasRef.current
        const pos = canvasNode.getBoundingClientRect()
        // console.log("canvas pos x,y", pos, mouseX, mouseY)
        const x = mouseX - pos.left
        const y = mouseY - pos.top
        // console.log("x,y", x, y)
        setCanvasPos({ x: x, y: y })
    }, [mouseX, mouseY, setCanvasPos])

    function mouseClickHandle(evt) {
        // console.log("evt", evt)
        evt.preventDefault()
        const canvasNode = canvasRef.current
        const ctx = canvasNode.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(canvasPos.x, canvasPos.y, 2, 2);
    }
    function ctxMenuHandle(evt) {
        evt.preventDefault()
    }

    function resize(height, width) {
        const oh = 1440
        const ow = 2304
        const videoNode = videoRef.current
        const canvasNode = canvasRef.current
        videoNode.height = height
        videoNode.width = width

        // calc canvas area and position
        let w = width
        let h = height
        if (height / width < oh / ow) {
            w = (h * ow / oh).toFixed(0)
            let offset = w - width
            offset = offset < 0 ? -offset : offset
            const px = (offset / 2).toFixed(0) + 'px'
            canvasNode.style.setProperty("top", "0px");
            canvasNode.style.setProperty("left", px);
        } else {
            h = (w * oh / ow).toFixed(0)
            let offset = h - height
            offset = offset < 0 ? -offset : offset
            const px = (offset / 2).toFixed(0) + 'px'
            canvasNode.style.setProperty("top", px);
            canvasNode.style.setProperty("left", '0px');
        }
        canvasNode.height = h
        canvasNode.width = w
    }

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
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className="top-btn">
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                </div>
            </Draggable>
            <video ref={videoRef} className='remote-video' autoPlay muted playsInline></video>
            <canvas ref={canvasRef} className='remote-canvas' onMouseDown={mouseClickHandle} onContextMenu={ctxMenuHandle} />
        </>
    );
}

export default Monitor;