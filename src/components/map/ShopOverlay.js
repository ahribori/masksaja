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
    color: green[700]
  },
  some: {
    label: "30~100 개",
    color: amber[700]
  },
  few: {
    label: "30개 미만",
    color: red[700]
  },
  empty: {
    label: "품절",
    color: grey[700]
  }
}

const ShopOverlay = ({
  code, // 판매기관코드
  name, // 판매기관명
  addr, // 주소,
  /**
   * 재고 상태[100개 이상(녹색): 'plenty' / 30개 이상 100개미만(노랑색): 'some' / 1개 이상 30개 미만(빨강색): 'few' / 0개(회색): 'empty']
   */
  remain_stat
}) => {
  const classes = useStyles()

  const Tooltip = () => (
    <div>
      <Typography className={classes.title}>{name}</Typography>
      <Typography className={classes.content} component="p">
        {REMAIN_STAT_MAP[remain_stat].label}
      </Typography>
      <Typography className={classes.content} component="p">
        {addr}
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
        style={{ backgroundColor: REMAIN_STAT_MAP[remain_stat].color }}
      >
        <Typography className={classes.title} component="p">
          {REMAIN_STAT_MAP[remain_stat].label}
        </Typography>
      </Card>
    </div>
  )
}

export default ShopOverlay
