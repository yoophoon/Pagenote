import { styled } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Picker = styled('canvas')(() => ({

}))

export const PickerCanvas = React.forwardRef((props: any, ref: any) => {
    const { id, color, setSliderRGB } = props
    const [canvasRGB, setCanvasRGB] = useState({
        r: color.RGB.r,
        g: color.RGB.g,
        b: color.RGB.b,
    })
    const pickercanvas: HTMLCanvasElement | null = document.querySelector(`#${id}`)

    useImperativeHandle(ref, () => ({
        setCanvasRGB: (t: { r: number, g: number, b: number }) => {
            setCanvasRGB(t)
        }
    }))

    useEffect(() => {
        createColor()
    }, [canvasRGB])

    function createColor() {
        if (pickercanvas == null) return
        const ctx = pickercanvas.getContext("2d");
        if (ctx == null) return
        ctx.clearRect(0, 0, 300, 110)
        const lgrd = ctx.createLinearGradient(0, 0, 300, 1,)
        lgrd.addColorStop(0, 'white')
        lgrd.addColorStop(1, `RGB(${canvasRGB.r},${canvasRGB.g},${canvasRGB.b})`)
        ctx.fillStyle = lgrd;
        ctx.fillRect(0, 0, 300, 1)

        const imageData = ctx.getImageData(0, 0, 300, 1)
        for (let x = 0; x < 300; x++) {
            const lgrdx = ctx.createLinearGradient(x, 1, x + 1, 110,)
            const r = imageData.data[x * 4 + 0]
            const g = imageData.data[x * 4 + 1]
            const b = imageData.data[x * 4 + 2]
            lgrdx.addColorStop(0, `rgb(${r},${g},${b})`)
            lgrdx.addColorStop(1, `black`)
            ctx.fillStyle = lgrdx;
            ctx.fillRect(x, 1, x + 1, 110)
        }
    }

    useEffect(() => {
        setCanvasRGB({
            r: canvasRGB.r,
            g: canvasRGB.g,
            b: canvasRGB.b,
        })
    }, [])

    const handlerPickerCanvasClick = (e: React.MouseEvent) => {
        if (pickercanvas == null) return
        const bcr = pickercanvas.getBoundingClientRect()
        const XInCanvas = e.pageX - bcr.left
        const YInCanvas = e.pageY - bcr.top
        const ctx = pickercanvas.getContext("2d");
        if (ctx == undefined) return
        const colorInCanvas = ctx.getImageData(XInCanvas, YInCanvas, 1, 1)
        setSliderRGB({
            r: colorInCanvas.data[0],
            g: colorInCanvas.data[1],
            b: colorInCanvas.data[2],
        })
        //设置点击过后的位置图标
        ctx.clearRect(0, 0, 300, 110)
        createColor()
        ctx.beginPath()
        ctx.arc(XInCanvas, YInCanvas, 6, 0, 2 * Math.PI)
        ctx.fillStyle = `RGB(${255 - colorInCanvas.data[0]},${255 - colorInCanvas.data[1]},${255 - colorInCanvas.data[2]})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(XInCanvas, YInCanvas, 4, 0, 2 * Math.PI)
        ctx.fillStyle = `RGB(${colorInCanvas.data[0]},${colorInCanvas.data[1]},${colorInCanvas.data[2]})`
        ctx.fill()

    }

    return (
        <Picker id={`${id}`} width={300} height={110} onClick={e => handlerPickerCanvasClick(e)}></Picker>
    )
})