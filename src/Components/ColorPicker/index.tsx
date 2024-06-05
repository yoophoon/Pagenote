import { forwardRef, useEffect, useRef, useState } from 'react'
import { Box, Slider, SliderThumb, Stack, TextField, styled } from '@mui/material'
import SquareIcon from '@mui/icons-material/Square';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ColorizeIcon from '@mui/icons-material/Colorize';
import { PickerCanvas } from './PickerCanvas';

export const ColorPicker = forwardRef((props: any) => {
  const { setColor } = props
  const [opacity, setOpacity] = useState(255)
  const [sliderRGB, setSliderRGB] = useState({
    r: 0,
    g: 156,
    b: 255,
  })

  const PickerCanvasRef = useRef({ setCanvasRGB: (t: { r: number, g: number, b: number }) => { } })

  const handlerPaletteClick = (e: React.MouseEvent, color: string) => {
    console.log(color)
    setOpacity(255);
    if (colorCode[color as keyof typeof colorCode] != undefined) {
      const rgbCode = colorCode[color as keyof typeof colorCode].rgbCode
      setSliderRGB({
        r: parseInt(rgbCode.split(',')[0]),
        g: parseInt(rgbCode.split(',')[1]),
        b: parseInt(rgbCode.split(',')[2])
      })
    }
  }
  const handleSliderColorChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      let r = newValue <= 255 ? 255 : (newValue <= 510 ? 510 - newValue : (newValue <= 1020 ? 0 : (newValue <= 1275 ? newValue - 1020 : 255)))
      let g = newValue <= 510 ? 0 : (newValue <= 765 ? newValue - 510 : (newValue <= 1275 ? 255 : 1530 - newValue))
      let b = newValue <= 255 ? newValue : newValue <= 765 ? 255 : (newValue <= 1020 ? 1020 - newValue : 0)
      setSliderRGB({ r, g, b })
      PickerCanvasRef.current.setCanvasRGB({ r, g, b })

    }
  };

  const handleOpacityChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setOpacity(newValue);
    }
  };

  const handlerColorSniffer = () => {
    setOpacity(255);
    //@ts-ignore
    if (!window.EyeDropper) {
      return;
    }
    //@ts-ignore
    const eyeDropper = new EyeDropper();
    eyeDropper
      .open()
      //@ts-ignore
      .then((result) => {
        const r = parseInt(result.sRGBHex.slice(1, 3), 16)
        const g = parseInt(result.sRGBHex.slice(3, 5), 16)
        const b = parseInt(result.sRGBHex.slice(5), 16)
        PickerCanvasRef.current.setCanvasRGB({ r, g, b })
        setSliderRGB({ r, g, b })
        //update the colorCode
        if (colorCode[result.sRGBHex as keyof typeof colorCode] == undefined) {
          colorCode = {
            ...colorCode,
            [result.sRGBHex]: {
              cnColorName: result.sRGBHex,
              hexCode: result.sRGBHex,
              rgbCode: r + ',' + g + ',' + b
            }
          }
        }
        newPaletteColors.unshift(result.sRGBHex)
        setNewPaletteColors(newPaletteColors.slice(0, 8))
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  const handlerResetPaletteColor = () => {
    setNewPaletteColors(PaletteColors)
  }

  const PaletteColors = ['Blue', 'Pink', 'Violet', 'Purple', 'RoyalBlue', 'Teal', 'Orange', 'Yellow'];
  const [newPaletteColors, setNewPaletteColors] = useState(PaletteColors)
  const r = sliderRGB.r
  const g = sliderRGB.g
  const b = sliderRGB.b

  useEffect(() => {
    setColor(`rgba(${sliderRGB.r},${sliderRGB.g},${sliderRGB.b},${opacity/255})`)
  }, [sliderRGB,opacity])

  return (
    <Box
      id='colorpicker'
      bgcolor='background.default'
      sx={{
        '--r': r,
        '--g': g,
        '--b': b,
        '--opacity': opacity,
        p: 2,
        position: 'absolute',
        top: 'calc(100% + 4px)',
      }}>
      <PickerCanvas id='colorpickercanvas' color={{ RGB: { r, g, b } }} setSliderRGB={setSliderRGB} ref={PickerCanvasRef}></PickerCanvas>
      <Box display="flex" gap={1.5} sx={{ alignItems: 'center',mt:1.5 }} >
        <UserSquareIcon title='当前颜色' />
        <TextField
          id="colorHex"
          label="HEXA"
          variant="standard"
          value={`#${('0' + r.toString(16).toUpperCase()).slice(-2) +
            ('0' + g.toString(16).toUpperCase()).slice(-2) +
            ('0' + b.toString(16).toUpperCase()).slice(-2) +
            ('0' + opacity.toString(16).toUpperCase()).slice(-2)}`}
          sx={{ width: 90 }}
        />
        <TextField
          id="colorRGB"
          label="RGBA"
          variant="standard"
          value={r + ',' + g + ',' + b + ',' + opacity}
          sx={{ width: 120 }}
        />
      </Box>
      <Box display="flex" gap={1.5} sx={{ alignItems: 'center' }}>
        <ColorizeIcon
          onClick={handlerColorSniffer}
          sx={{
            color: 'text.primary',
            width: 50,
            height: 50,
            borderStyle: 'solid',
            borderWidth: 1,
          }}
          titleAccess='拾色器'
        />
        <Box>
          <UserSlider
            aria-label="sliderColor"
            defaultValue={666}
            max={1530}
            onChange={handleSliderColorChange}
            slots={{
              rail: UserRGBSliderRail,
              track: UserRGBSliderTrack,
              thumb: UserRGBSliderThumb,
            }}
          />
          <UserSlider
            aria-label="sliderOpacity"
            defaultValue={opacity}
            value={opacity}
            max={255}
            onChange={handleOpacityChange}
            slots={{
              rail: UserOpacitySliderRail,
              track: UserOpacitySliderTrack,
              thumb: UserOpacitySliderThumb,
            }}
          />
        </Box>
      </Box>
      <Stack direction="row" spacing='auto' >
        {newPaletteColors.map((color) => (
          <SquareIcon sx={{ color: color, width: 30, height: 30, cursor: 'pointer' }} id={`colorplette-${color}`} titleAccess={color} key={color} onClick={e => handlerPaletteClick(e, color)} />
        ))}
        <RestartAltIcon sx={{ width: 30, height: 30, color: 'text.primary' }} onClick={handlerResetPaletteColor} />
      </Stack>
    </Box >
  )
})





const UserSquareIcon = styled('span')(() => ({
  width: 52,
  height: 52,
  position: 'relative',
  '&::before': {
    content: `""`,
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
    backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
    backgroundSize: '8px 8px',
    backgroundColor: 'text.primary',
    zIndex: 0,
  },
  '&::after': {
    content: `""`,
    position: 'absolute',
    inset: 0,
    background: 'rgba(var(--r),var(--g),var(--b),calc(var(--opacity) / 255))',
    zIndex: 1,
  },
}))

const UserSlider = styled(Slider)(() => ({
  display: 'block',
  width: 200,
  height: 20,
  padding: 9
}))

const UserRGBSliderRail = styled('span')(() => ({
  display: 'inline-block',
  width: '100%',
  height: '30%',
  position: 'absolute',
  top: '35%',
  left: 0,
  background: 'linear-gradient(to right,#F00,#F0F,#00F,#0FF,#0F0,#FF0,#F00)'
}))

const UserRGBSliderTrack = styled('span')(() => ({}))

const UserRGBSliderThumb = styled(SliderThumb)(() => ({
  color: 'rgba(var(--r),var(--g),var(--b),calc(var(--opacity) / 100))',
  '&:hover': {
    // boxShadow: '0px 0px 0px 8px rgba(var(--r),var(--g),var(--b), 0.16)'
  }
}))



const UserOpacitySliderRail = styled('span')(() => ({
  display: 'inline-block',
  width: '100%',
  height: '30%',
  position: 'absolute',
  top: '35%',
  left: 0,
  '&::before': {
    content: `""`,
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
    backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
    backgroundSize: '8px 8px',
    backgroundColor: 'text.primary',
    zIndex: 0,
  },
  '&::after': {
    content: `""`,
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right,rgba(var(--r),var(--g),var(--b),0),rgba(var(--r),var(--g),var(--b),1))',
    zIndex: 1,
  },

}))

const UserOpacitySliderTrack = styled('span')(() => ({

}))

const UserOpacitySliderThumb = styled(SliderThumb)(() => ({
  color: 'rgba(var(--r),var(--g),var(--b),calc(var(--opacity) / 255))',
  left: `var(--opacity)%`
}))



let colorCode = {
  'LightPink': {
    cnColorName: '浅粉红',
    hexCode: '#FFB6C1',
    rgbCode: '255,182,193',
  },
  'Pink': {
    cnColorName: '粉红',
    hexCode: '#FFC0CB',
    rgbCode: '255,192,203',
  },
  'Crimson': {
    cnColorName: '猩红',
    hexCode: '#DC143C',
    rgbCode: '220,20,60',
  },
  'LavenderBlush': {
    cnColorName: '脸红的淡紫色',
    hexCode: '#FFF0F5',
    rgbCode: '255,240,245',
  },
  'PaleVioletRed': {
    cnColorName: '苍白的紫罗兰红色',
    hexCode: '#DB7093',
    rgbCode: '219,112,147',
  },
  'HotPink': {
    cnColorName: '热情的粉红',
    hexCode: '#FF69B4',
    rgbCode: '255,105,180',
  },
  'DeepPink': {
    cnColorName: '深粉色',
    hexCode: '#FF1493',
    rgbCode: '255,20,147',
  },
  'MediumVioletRed': {
    cnColorName: '适中的紫罗兰红色',
    hexCode: '#C71585',
    rgbCode: '199,21,133',
  },
  'Orchid': {
    cnColorName: '兰花的紫色',
    hexCode: '#DA70D6',
    rgbCode: '218,112,214',
  },
  'Thistle': {
    cnColorName: '蓟',
    hexCode: '#D8BFD8',
    rgbCode: '216,191,216',
  },
  'plum': {
    cnColorName: '李子',
    hexCode: '#DDA0DD',
    rgbCode: '221,160,221',
  },
  'Violet': {
    cnColorName: '紫罗兰',
    hexCode: '#EE82EE',
    rgbCode: '238,130,238',
  },
  'Magenta': {
    cnColorName: '洋红',
    hexCode: '#FF00FF',
    rgbCode: '255,0,255',
  },
  'Fuchsia': {
    cnColorName: '灯笼海棠(紫红色)',
    hexCode: '#FF00FF',
    rgbCode: '255,0,255',
  },
  'DarkMagenta': {
    cnColorName: '深洋红色',
    hexCode: '#8B008B',
    rgbCode: '139,0,139',
  },
  'Purple': {
    cnColorName: '紫色',
    hexCode: '#800080',
    rgbCode: '128,0,128',
  },
  'MediumOrchid': {
    cnColorName: '适中的兰花紫',
    hexCode: '#BA55D3',
    rgbCode: '186,85,211',
  },
  'DarkVoilet': {
    cnColorName: '深紫罗兰色',
    hexCode: '#9400D3',
    rgbCode: '148,0,211',
  },
  'DarkOrchid': {
    cnColorName: '深兰花紫',
    hexCode: '#9932CC',
    rgbCode: '153,50,204',
  },
  'Indigo': {
    cnColorName: '靛青',
    hexCode: '#4B0082',
    rgbCode: '75,0,130',
  },
  'BlueViolet': {
    cnColorName: '深紫罗兰的蓝色',
    hexCode: '#8A2BE2',
    rgbCode: '138,43,226',
  },
  'MediumPurple': {
    cnColorName: '适中的紫色',
    hexCode: '#9370DB',
    rgbCode: '147,112,219',
  },
  'MediumSlateBlue': {
    cnColorName: '适中的板岩暗蓝灰色',
    hexCode: '#7B68EE',
    rgbCode: '123,104,238',
  },
  'SlateBlue': {
    cnColorName: '板岩暗蓝灰色',
    hexCode: '#6A5ACD',
    rgbCode: '106,90,205',
  },
  'DarkSlateBlue': {
    cnColorName: '深岩暗蓝灰色',
    hexCode: '#483D8B',
    rgbCode: '72,61,139',
  },
  'Lavender': {
    cnColorName: '熏衣草花的淡紫色',
    hexCode: '#E6E6FA',
    rgbCode: '230,230,250',
  },
  'GhostWhite': {
    cnColorName: '幽灵的白色',
    hexCode: '#F8F8FF',
    rgbCode: '248,248,255',
  },
  'Blue': {
    cnColorName: '纯蓝',
    hexCode: '#0000FF',
    rgbCode: '0,0,255',
  },
  'MediumBlue': {
    cnColorName: '适中的蓝色',
    hexCode: '#0000CD',
    rgbCode: '0,0,205',
  },
  'MidnightBlue': {
    cnColorName: '午夜的蓝色',
    hexCode: '#191970',
    rgbCode: '25,25,112',
  },
  'DarkBlue': {
    cnColorName: '深蓝色',
    hexCode: '#00008B',
    rgbCode: '0,0,139',
  },
  'Navy': {
    cnColorName: '海军蓝',
    hexCode: '#000080',
    rgbCode: '0,0,128',
  },
  'RoyalBlue': {
    cnColorName: '皇军蓝',
    hexCode: '#4169E1',
    rgbCode: '65,105,225',
  },
  'CornflowerBlue': {
    cnColorName: '矢车菊的蓝色',
    hexCode: '#6495ED',
    rgbCode: '100,149,237',
  },
  'LightSteelBlue': {
    cnColorName: '淡钢蓝',
    hexCode: '#B0C4DE',
    rgbCode: '176,196,222',
  },
  'LightSlateGray': {
    cnColorName: '浅石板灰',
    hexCode: '#778899',
    rgbCode: '119,136,153',
  },
  'SlateGray': {
    cnColorName: '石板灰',
    hexCode: '#708090',
    rgbCode: '112,128,144',
  },
  'DoderBlue': {
    cnColorName: '道奇蓝',
    hexCode: '#1E90FF',
    rgbCode: '30,144,255',
  },
  'AliceBlue': {
    cnColorName: '爱丽丝蓝',
    hexCode: '#F0F8FF',
    rgbCode: '240,248,255',
  },
  'SteelBlue': {
    cnColorName: '钢蓝',
    hexCode: '#4682B4',
    rgbCode: '70,130,180',
  },
  'LightSkyBlue': {
    cnColorName: '淡蓝色',
    hexCode: '#87CEFA',
    rgbCode: '135,206,250',
  },
  'SkyBlue': {
    cnColorName: '天蓝色',
    hexCode: '#87CEEB',
    rgbCode: '135,206,235',
  },
  'DeepSkyBlue': {
    cnColorName: '深天蓝',
    hexCode: '#00BFFF',
    rgbCode: '0,191,255',
  },
  'LightBLue': {
    cnColorName: '淡蓝',
    hexCode: '#ADD8E6',
    rgbCode: '173,216,230',
  },
  'PowDerBlue': {
    cnColorName: '火药蓝',
    hexCode: '#B0E0E6',
    rgbCode: '176,224,230',
  },
  'CadetBlue': {
    cnColorName: '军校蓝',
    hexCode: '#5F9EA0',
    rgbCode: '95,158,160',
  },
  'Azure': {
    cnColorName: '蔚蓝色',
    hexCode: '#F0FFFF',
    rgbCode: '240,255,255',
  },
  'LightCyan': {
    cnColorName: '淡青色',
    hexCode: '#E1FFFF',
    rgbCode: '225,255,255',
  },
  'PaleTurquoise': {
    cnColorName: '苍白的绿宝石',
    hexCode: '#AFEEEE',
    rgbCode: '175,238,238',
  },
  'Cyan': {
    cnColorName: '青色',
    hexCode: '#00FFFF',
    rgbCode: '0,255,255',
  },
  'Aqua': {
    cnColorName: '水绿色',
    hexCode: '#00FFFF',
    rgbCode: '0,255,255',
  },
  'DarkTurquoise': {
    cnColorName: '深绿宝石',
    hexCode: '#00CED1',
    rgbCode: '0,206,209',
  },
  'DarkSlateGray': {
    cnColorName: '深石板灰',
    hexCode: '#2F4F4F',
    rgbCode: '47,79,79',
  },
  'DarkCyan': {
    cnColorName: '深青色',
    hexCode: '#008B8B',
    rgbCode: '0,139,139',
  },
  'Teal': {
    cnColorName: '水鸭色',
    hexCode: '#008080',
    rgbCode: '0,128,128',
  },
  'MediumTurquoise': {
    cnColorName: '适中的绿宝石',
    hexCode: '#48D1CC',
    rgbCode: '72,209,204',
  },
  'LightSeaGreen': {
    cnColorName: '浅海洋绿',
    hexCode: '#20B2AA',
    rgbCode: '32,178,170',
  },
  'Turquoise': {
    cnColorName: '绿宝石',
    hexCode: '#40E0D0',
    rgbCode: '64,224,208',
  },
  'Auqamarin': {
    cnColorName: '绿玉\碧绿色',
    hexCode: '#7FFFAA',
    rgbCode: '127,255,170',
  },
  'MediumAquamarine': {
    cnColorName: '适中的碧绿色',
    hexCode: '#00FA9A',
    rgbCode: '0,250,154',
  },
  'MediumSpringGreen': {
    cnColorName: '适中的春天的绿色',
    hexCode: '#F5FFFA',
    rgbCode: '245,255,250',
  },
  'MintCream': {
    cnColorName: '薄荷奶油',
    hexCode: '#00FF7F',
    rgbCode: '0,255,127',
  },
  'SpringGreen': {
    cnColorName: '春天的绿色',
    hexCode: '#3CB371',
    rgbCode: '60,179,113',
  },
  'SeaGreen': {
    cnColorName: '海洋绿',
    hexCode: '#2E8B57',
    rgbCode: '46,139,87',
  },
  'Honeydew': {
    cnColorName: '蜂蜜',
    hexCode: '#F0FFF0',
    rgbCode: '240,255,240',
  },
  'LightGreen': {
    cnColorName: '淡绿色',
    hexCode: '#90EE90',
    rgbCode: '144,238,144',
  },
  'PaleGreen': {
    cnColorName: '苍白的绿色',
    hexCode: '#98FB98',
    rgbCode: '152,251,152',
  },
  'DarkSeaGreen': {
    cnColorName: '深海洋绿',
    hexCode: '#8FBC8F',
    rgbCode: '143,188,143',
  },
  'LimeGreen': {
    cnColorName: '酸橙绿',
    hexCode: '#32CD32',
    rgbCode: '50,205,50',
  },
  'Lime': {
    cnColorName: '酸橙色',
    hexCode: '#00FF00',
    rgbCode: '0,255,0',
  },
  'ForestGreen': {
    cnColorName: '森林绿',
    hexCode: '#228B22',
    rgbCode: '34,139,34',
  },
  'Green': {
    cnColorName: '纯绿',
    hexCode: '#008000',
    rgbCode: '0,128,0',
  },
  'DarkGreen': {
    cnColorName: '深绿色',
    hexCode: '#006400',
    rgbCode: '0,100,0',
  },
  'Chartreuse': {
    cnColorName: '查特酒绿',
    hexCode: '#7FFF00',
    rgbCode: '127,255,0',
  },
  'LawnGreen': {
    cnColorName: '草坪绿',
    hexCode: '#7CFC00',
    rgbCode: '124,252,0',
  },
  'GreenYellow': {
    cnColorName: '绿黄色',
    hexCode: '#ADFF2F',
    rgbCode: '173,255,47',
  },
  'OliveDrab': {
    cnColorName: '橄榄土褐色',
    hexCode: '#556B2F',
    rgbCode: '85,107,47',
  },
  'Beige': {
    cnColorName: '米色(浅褐色)',
    hexCode: '#6B8E23',
    rgbCode: '107,142,35',
  },
  'LightGoldenrodYellow': {
    cnColorName: '浅秋麒麟黄',
    hexCode: '#FAFAD2',
    rgbCode: '250,250,210',
  },
  'Ivory': {
    cnColorName: '象牙',
    hexCode: '#FFFFF0',
    rgbCode: '255,255,240',
  },
  'LightYellow': {
    cnColorName: '浅黄色',
    hexCode: '#FFFFE0',
    rgbCode: '255,255,224',
  },
  'Yellow': {
    cnColorName: '纯黄',
    hexCode: '#FFFF00',
    rgbCode: '255,255,0',
  },
  'Olive': {
    cnColorName: '橄榄',
    hexCode: '#808000',
    rgbCode: '128,128,0',
  },
  'DarkKhaki': {
    cnColorName: '深卡其布',
    hexCode: '#BDB76B',
    rgbCode: '189,183,107',
  },
  'LemonChiffon': {
    cnColorName: '柠檬薄纱',
    hexCode: '#FFFACD',
    rgbCode: '255,250,205',
  },
  'PaleGodenrod': {
    cnColorName: '灰秋麒麟',
    hexCode: '#EEE8AA',
    rgbCode: '238,232,170',
  },
  'Khaki': {
    cnColorName: '卡其布',
    hexCode: '#F0E68C',
    rgbCode: '240,230,140',
  },
  'Gold': {
    cnColorName: '金',
    hexCode: '#FFD700',
    rgbCode: '255,215,0',
  },
  'Cornislk': {
    cnColorName: '玉米色',
    hexCode: '#FFF8DC',
    rgbCode: '255,248,220',
  },
  'GoldEnrod': {
    cnColorName: '秋麒麟',
    hexCode: '#DAA520',
    rgbCode: '218,165,32',
  },
  'FloralWhite': {
    cnColorName: '花的白色',
    hexCode: '#FFFAF0',
    rgbCode: '255,250,240',
  },
  'OldLace': {
    cnColorName: '老饰带',
    hexCode: '#FDF5E6',
    rgbCode: '253,245,230',
  },
  'Wheat': {
    cnColorName: '小麦色',
    hexCode: '#F5DEB3',
    rgbCode: '245,222,179',
  },
  'Moccasin': {
    cnColorName: '鹿皮鞋',
    hexCode: '#FFE4B5',
    rgbCode: '255,228,181',
  },
  'Orange': {
    cnColorName: '橙色',
    hexCode: '#FFA500',
    rgbCode: '255,165,0',
  },
  'PapayaWhip': {
    cnColorName: '番木瓜',
    hexCode: '#FFEFD5',
    rgbCode: '255,239,213',
  },
  'BlanchedAlmond': {
    cnColorName: '漂白的杏仁',
    hexCode: '#FFEBCD',
    rgbCode: '255,235,205',
  },
  'NavajoWhite': {
    cnColorName: 'Navajo白',
    hexCode: '#FFDEAD',
    rgbCode: '255,222,173',
  },
  'AntiqueWhite': {
    cnColorName: '古代的白色',
    hexCode: '#FAEBD7',
    rgbCode: '250,235,215',
  },
  'Tan': {
    cnColorName: '晒黑',
    hexCode: '#D2B48C',
    rgbCode: '210,180,140',
  },
  'BrulyWood': {
    cnColorName: '结实的树',
    hexCode: '#DEB887',
    rgbCode: '222,184,135',
  },
  'Bisque': {
    cnColorName: '(浓汤)乳脂,番茄等',
    hexCode: '#FFE4C4',
    rgbCode: '255,228,196',
  },
  'DarkOrange': {
    cnColorName: '深橙色',
    hexCode: '#FF8C00',
    rgbCode: '255,140,0',
  },
  'Linen': {
    cnColorName: '亚麻布',
    hexCode: '#FAF0E6',
    rgbCode: '250,240,230',
  },
  'Peru': {
    cnColorName: '秘鲁',
    hexCode: '#CD853F',
    rgbCode: '205,133,63',
  },
  'PeachPuff': {
    cnColorName: '桃色',
    hexCode: '#FFDAB9',
    rgbCode: '255,218,185',
  },
  'SandyBrown': {
    cnColorName: '沙棕色',
    hexCode: '#F4A460',
    rgbCode: '244,164,96',
  },
  'Chocolate': {
    cnColorName: '巧克力',
    hexCode: '#D2691E',
    rgbCode: '210,105,30',
  },
  'SaddleBrown': {
    cnColorName: '马鞍棕色',
    hexCode: '#8B4513',
    rgbCode: '139,69,19',
  },
  'SeaShell': {
    cnColorName: '海贝壳',
    hexCode: '#FFF5EE',
    rgbCode: '255,245,238',
  },
  'Sienna': {
    cnColorName: '黄土赭色',
    hexCode: '#A0522D',
    rgbCode: '160,82,45',
  },
  'LightSalmon': {
    cnColorName: '浅鲜肉(鲑鱼)色',
    hexCode: '#FFA07A',
    rgbCode: '255,160,122',
  },
  'Coral': {
    cnColorName: '珊瑚',
    hexCode: '#FF7F50',
    rgbCode: '255,127,80',
  },
  'OrangeRed': {
    cnColorName: '橙红色',
    hexCode: '#FF4500',
    rgbCode: '255,69,0',
  },
  'DarkSalmon': {
    cnColorName: '深鲜肉(鲑鱼)色',
    hexCode: '#E9967A',
    rgbCode: '233,150,122',
  },
  'Tomato': {
    cnColorName: '番茄',
    hexCode: '#FF6347',
    rgbCode: '255,99,71',
  },
  'MistyRose': {
    cnColorName: '薄雾玫瑰',
    hexCode: '#FFE4E1',
    rgbCode: '255,228,225',
  },
  'Salmon': {
    cnColorName: '鲜肉(鲑鱼)色',
    hexCode: '#FA8072',
    rgbCode: '250,128,114',
  },
  'Snow': {
    cnColorName: '雪',
    hexCode: '#FFFAFA',
    rgbCode: '255,250,250',
  },
  'LightCoral': {
    cnColorName: '淡珊瑚色',
    hexCode: '#F08080',
    rgbCode: '240,128,128',
  },
  'RosyBrown': {
    cnColorName: '玫瑰棕色',
    hexCode: '#BC8F8F',
    rgbCode: '188,143,143',
  },
  'IndianRed': {
    cnColorName: '印度红',
    hexCode: '#CD5C5C',
    rgbCode: '205,92,92',
  },
  'Red': {
    cnColorName: '纯红',
    hexCode: '#FF0000',
    rgbCode: '255,0,0',
  },
  'Brown': {
    cnColorName: '棕色',
    hexCode: '#A52A2A',
    rgbCode: '165,42,42',
  },
  'FireBrick': {
    cnColorName: '耐火砖',
    hexCode: '#B22222',
    rgbCode: '178,34,34',
  },
  'DarkRed': {
    cnColorName: '深红色',
    hexCode: '#8B0000',
    rgbCode: '139,0,0',
  },
  'Maroon': {
    cnColorName: '栗色',
    hexCode: '#800000',
    rgbCode: '128,0,0',
  },
  'White': {
    cnColorName: '纯白',
    hexCode: '#FFFFFF',
    rgbCode: '255,255,255',
  },
  'WhiteSmoke': {
    cnColorName: '白烟',
    hexCode: '#F5F5F5',
    rgbCode: '245,245,245',
  },
  'Gainsboro': {
    cnColorName: 'Gainsboro',
    hexCode: '#DCDCDC',
    rgbCode: '220,220,220',
  },
  'LightGrey': {
    cnColorName: '浅灰色',
    hexCode: '#D3D3D3',
    rgbCode: '211,211,211',
  },
  'Silver': {
    cnColorName: '银白色',
    hexCode: '#C0C0C0',
    rgbCode: '192,192,192',
  },
  'DarkGray': {
    cnColorName: '深灰色',
    hexCode: '#A9A9A9',
    rgbCode: '169,169,169',
  },
  'Gray': {
    cnColorName: '灰色',
    hexCode: '#808080',
    rgbCode: '128,128,128',
  },
  'DimGray': {
    cnColorName: '暗淡的灰色',
    hexCode: '#696969',
    rgbCode: '105,105,105',
  },
  'Black': {
    cnColorName: '纯黑',
    hexCode: '#000000',
    rgbCode: '0,0,0',
  },

}
