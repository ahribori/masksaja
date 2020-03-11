import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const Agreement = ({ serviceOpen }) => {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">서비스 이용 동의</DialogTitle>
      <DialogContent>
        {!serviceOpen && (
          <Typography variant="body2" gutterBottom style={{ fontSize: 15, color: "red" }}>
            * <strong>서비스 준비중입니다. (3월 11일 오전 8시 오픈예정)</strong>
          </Typography>
        )}

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * <strong>3월 15일까지 베타테스트 기간입니다.</strong>
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 마스크 사용 지침 및 공적 마스크 관련 안내는{" "}
          <a
            href="https://www.mfds.go.kr/bogunMaskPanMae.jsp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>[식약처 홈페이지]</strong>
          </a>
          를 참고하세요.
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 마스크사자에서 제공하는 공적마스크 판매정보는 <strong>5분 이상 지연된 정보</strong>
          입니다.
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 일선에서 수고하시는 약사님들께 감사의 마음을 전합니다.
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13, color: "red" }}>
          * 실제 약국에 있는 재고량과 오차가 발생할 수 있으니 절대로 현장에 계신 약사님들께 문제를
          제기하지 말아주세요.
        </Typography>

        <Divider style={{ margin: "10px 0" }} />

        <Typography variant="body2" gutterBottom style={{ fontSize: 11 }}>
          데이터 관련 문의: 한국정보화진흥원(
          <a href="mailto:maskdata@nia.or.kr">maskdata@nia.or.kr</a>)
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"} color="primary" disabled={!serviceOpen}>
          {serviceOpen ? "동의합니다" : "서비스 준비중"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Agreement
