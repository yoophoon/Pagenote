type TIconPagenoteColorSet={
  fileContent:string,
  fileShadow:string,
  cardColor:string,
  dogEarColor:string,
  plusSymbolColor:string,
  oSymbolColor:string,
  width:string,
  height:string,
  style:React.CSSProperties
}

const IconPagenote = (props: TIconPagenoteColorSet) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    className="note_svg__icon"
    viewBox="0 0 1024 1024"
    style={props.style}
    // {...props}
  >
    {/* 文件右侧阴影 #E4EBED*/}
    <path fill={props.fileShadow} d="M814.24 97.8h20v562.04h-20z" />
    {/* 背板填充 #40BDFF*/}
    <path
      fill={props.cardColor}
      d="M850.24 271v397a8.56 8.56 0 0 1-2.32 5.64L648.6 872.96a8 8 0 0 1-5.76 2.32H207.72l13.08 74.12a32.32 32.32 0 0 0 31.68 26.6 32.4 32.4 0 0 0 5.68-.52L924.4 854.52a32.36 32.36 0 0 0 26.2-37.4l-96.4-546.48z"
    />
    {/* 折角 #EFFAFE*/}
    <path fill={props.dogEarColor} d="m650.96 847.88 172-172h-172z" />
    {/* 背板右侧阴影 #2197F7*/}
    <path
      fill={props.cardColor}
      d="m950.6 817.12-96.4-546.48-4 .36v90.52l80.36 455.56a32.36 32.36 0 0 1-26.2 37.4l-661.2 120a32 32 0 0 0 9.32 1.4 32.4 32.4 0 0 0 5.68-.52L924.4 854.52a32.36 32.36 0 0 0 26.2-37.4"
    />
    {/* 折角阴影 */}
    <path fill={props.fileShadow} d="m802.96 675.88-152 152v20l172-172z" />
    {/* 轮廓 #263238*/}
    <path
      fill={props.fileContent}
      d="M105.2 877.2h64.6l13.24 75.24A50.28 50.28 0 0 0 232.48 994a51 51 0 0 0 8.84-.76l686.2-121a50.36 50.36 0 0 0 40.8-58.24L852.24 156V89.8a10 10 0 0 0-10-10H263.76a59.76 59.76 0 0 0-117.84 0H105.2a50.32 50.32 0 0 0-50.28 50.28v696.84a50.32 50.32 0 0 0 50.28 50.28m744-202.24a10.4 10.4 0 0 0 2.84-6.96V271l96.36 546.48a30.32 30.32 0 0 1-24.6 35.08L237.84 973.52a30.28 30.28 0 0 1-35.08-24.56l-12.64-71.76h452.8a10.04 10.04 0 0 0 7.08-2.92zm-196.4 168v-165.2H818zM204.84 50a40 40 0 0 1 38.48 30h-77a40 40 0 0 1 38.52-30M74.92 130a30.32 30.32 0 0 1 30.28-30h40v89.48a60 60 0 1 0 119.68 0v-49.8a10 10 0 1 0-20 0v49.8a40 40 0 1 1-79.68 0V100h667.04v557.88H642.96a10 10 0 0 0-10 10V857.2H105.2a30.32 30.32 0 0 1-30.28-30.28z"
    />
    {/* 文件内容 #263238*/}
    <path
      fill={props.fileContent}
      d="M236 329.32h515.04a10 10 0 0 0 0-20H236a10 10 0 0 0 0 20m-80 80h595.04a10 10 0 0 0 0-20H156a10 10 0 0 0 0 20m0 80h595.04a10 10 0 0 0 0-20H156a10 10 0 1 0 0 20m0 80h595.04a10 10 0 0 0 0-20H156a10 10 0 0 0 0 20m0 80h406.8a10 10 0 0 0 0-20H156a10 10 0 0 0 0 20m0 80h406.8a10 10 0 0 0 0-20H156a10 10 0 0 0 0 20m0 80h406.8a10 10 0 0 0 0-20H156a10 10 0 0 0 0 20"
    />
    {/* 左下角 + 号 #FD0*/}
    <path
      fill={props.plusSymbolColor}
      d="M116.92 924h-16v-16a4 4 0 0 0-8 0v16h-16a4 4 0 1 0 0 8h16v16a4 4 0 0 0 8 0v-16h16a4 4 0 0 0 0-8"
    />
    {/* 右侧 + 号 #40BDFF*/}
    <path
      fill={props.oSymbolColor}
      d="M964 405.32h-16v-16a4 4 0 1 0-8 0v16h-16a4 4 0 0 0 0 8h16v16a4 4 0 0 0 8 0v-16h16a4 4 0 0 0 0-8"
    />
    {/* 右侧 O 符号 #FD0*/}
    <path
      fill={props.plusSymbolColor}
      d="M930.52 960.36a24 24 0 1 1 24-24 24 24 0 0 1-24 24m0-40a16 16 0 1 0 16 16 16 16 0 0 0-16-16m-4-787.32a24 24 0 1 1 24-24 24 24 0 0 1-24 24m0-40a16 16 0 1 0 16 16 16 16 0 0 0-16-16"
    />
  </svg>
);
export default IconPagenote;
