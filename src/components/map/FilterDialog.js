import React, { useEffect, useState } from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import { DialogActions, DialogContent } from "@material-ui/core"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Button from "@material-ui/core/Button"

const FilterDialog = ({ open, handleClose, onFilterChange }) => {
  const [hideEmpty, setHideEmpty] = useState(false)

  useEffect(() => {
    onFilterChange({
      hideEmpty
    })
  }, [hideEmpty])

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="filter-dialog-title">필터</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Switch
              checked={hideEmpty}
              onChange={e => setHideEmpty(e.target.checked)}
              value="hideEmpty"
            />
          }
          label="품절된 곳 숨기기"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FilterDialog
