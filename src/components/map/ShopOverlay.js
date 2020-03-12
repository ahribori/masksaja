import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { amber, green, grey, red } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(0.7),
    color: "#fff",
    textAlign: "center",
    minWidth: 40
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  },
  content: {
    fontSize: 11
  }
}))

const REMAIN_STAT_MAP = {
  plenty: {
    label: "100개 이상",
    backgroundColor: green[700],
    color: grey[100],
    tooltipFontColor: green[300]
  },
  some: {
    label: "30~99 개",
    backgroundColor: amber[700],
    color: grey[100],
    tooltipFontColor: amber[300]
  },
  few: {
    label: "30개 미만",
    backgroundColor: red[700],
    color: grey[100],
    tooltipFontColor: red[300]
  },
  empty: {
    label: "품절",
    backgroundColor: grey[700],
    color: grey[100],
    tooltipFontColor: grey[300]
  },
  break: {
    label: "판매중지",
    backgroundColor: grey[700],
    color: grey[100],
    tooltipFontColor: grey[300]
  }
}

const ShopOverlay = ({
  code, // 판매기관코드
  name, // 판매기관명
  addr, // 주소,
  /**
   * 재고 상태[100개 이상(녹색): 'plenty' / 30개 이상 100개미만(노랑색): 'some' / 1개 이상 30개 미만(빨강색): 'few' / 0개(회색): 'empty']
   */
  remain_stat,
  stock_at, // 입고시간
  created_at // 데이터 생성 일자
}) => {
  const classes = useStyles()

  const mapped = !!REMAIN_STAT_MAP[remain_stat]
  const mappedAttribute = REMAIN_STAT_MAP[remain_stat] || {
    label: "정보없음",
    backgroundColor: grey[700],
    color: grey[100],
    tooltipFontColor: grey[300]
  }

  const Tooltip = () => (
    <div>
      <Typography className={classes.title} style={{ marginBottom: 3 }}>
        {name}
      </Typography>
      {mapped && (
        <Typography
          className={classes.content}
          component="p"
          style={{ color: mappedAttribute.tooltipFontColor }}
        >
          {mappedAttribute.label}
        </Typography>
      )}
      <Typography className={classes.content} component="p">
        {addr}
      </Typography>
      <Typography className={classes.content} component="p">
        입고시간: {stock_at}
      </Typography>
      <Typography className={classes.content} component="p">
        업데이트: {created_at}
      </Typography>
    </div>
  )

  return (
    <div
      data-shop-code={code}
      className={classes.container}
      data-tippy-content={renderToStaticMarkup(<Tooltip />)}
    >
      <Card
        className={classes.normal}
        style={{ backgroundColor: mappedAttribute.backgroundColor, color: mappedAttribute.color }}
      >
        <Typography className={classes.title} component="p">
          {mappedAttribute.label}
        </Typography>
      </Card>
    </div>
  )
}

export default ShopOverlay
