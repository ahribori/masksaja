import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { indigo, red } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(1),
    backgroundColor: indigo[700],
    color: "#fff"
  },
  soldOut: {
    padding: theme.spacing(1),
    backgroundColor: red[500],
    color: "#fff"
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  },
  content: {
    fontSize: 11
  }
}))

const ShopOverlay = ({
  code, // 판매기관코드
  name, // 판매기관명
  type, // 판매처 유형 (약국: 01, 우체국: 02, 농협: 03)
  addr, // 주소
  tel, // 연락처
  stock_d, // 입고일
  stock_t, // 입고시간
  stock_cnt, // 입고수량
  sold_cnt, // 판매수량
  remain_cnt, // 잔고수량
  sold_out, // 완판여부
  lat, // 위도
  lng
}) => {
  const classes = useStyles()
  return (
    <div data-shop-code={code} className={classes.container}>
      {!sold_out && (
        <Card className={classes.normal}>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.content} component="p">
            남은 수량: {remain_cnt}
          </Typography>
        </Card>
      )}
      {sold_out && (
        <Card className={classes.soldOut}>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.title}>SOLD OUT</Typography>
        </Card>
      )}
    </div>
  )
}

export default ShopOverlay
