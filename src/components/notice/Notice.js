import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"

const Notice = () => {
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
      <DialogTitle id="alert-dialog-title">알려드립니다</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 본 사이트에서는 코로나19 공적마스크 실시간 재고 조회 API를 사용하고 있습니다.
        </Typography>
        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 데이터 갱신 주기는 약 5분 입니다.
        </Typography>
        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 2020년 3월 8일 오후 6~7시경부터 실제 데이터가 반영됩니다.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Notice
