import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"

const ErrorNotice = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">알림</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          성급한 오픈으로 혼선을 드려 죄송합니다.
          <br />
          <br />
          현업에서 마스크를 판매하고 계신 분들의 입장을 고려하지 못한 것 같습니다.
          <br />
          <br />
          좋은 의도로 개발했지만 생각했던 것과 다른 방향으로 가고 있는 것 같아 <b>당분간 서비스 중단합니다.</b>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorNotice
